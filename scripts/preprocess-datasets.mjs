import fs from 'fs';
import path from 'path';
import readline from 'readline';

const datasetsDir = path.resolve('datasets');
const outDir = path.resolve('src', 'data');
fs.mkdirSync(outDir, { recursive: true });

const spotifyFile = path.join(datasetsDir, 'spotify', 'spotify_history.csv');
const householdFile = path.join(datasetsDir, 'household', 'Daily Household Transactions.csv');
const multiFacetFile = path.join(datasetsDir, 'financial', 'Augmented_IndiaTransactMultiFacet2024.csv');

function parseCsvLine(text) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur);
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur);
  return result;
}

// 1. Process Spotify
async function processSpotify() {
  console.log('Preprocessing Spotify data...');
  const stream = fs.createReadStream(spotifyFile, { encoding: 'utf8' });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

  let rowCount = 0;
  const uniqueTracks = new Set();
  const uniqueArtists = new Set();
  const uniqueAlbums = new Set();
  let totalMs = 0;
  let skipped = 0;
  let shuffle = 0;
  const platformCounts = {};
  const yearly = {};
  const artistData = {};
  const trackData = {};
  const triggers = {};

  const curatedSpotifyItems = [];

  for await (const line of rl) {
    if (!line.trim()) continue;
    if (rowCount === 0) {
      rowCount++;
      continue;
    }
    rowCount++;
    const [uri, ts, platform, msStr, track, artist, album, reasonStart, reasonEnd, shuf, skip] = parseCsvLine(line);
    const ms = parseInt(msStr, 10) || 0;
    totalMs += ms;

    const dateStr = (ts || '').slice(0, 10);
    const year = dateStr.slice(0, 4);

    if (track) uniqueTracks.add(track + '___' + artist);
    if (artist) {
      uniqueArtists.add(artist);
      if (!artistData[artist]) artistData[artist] = { ms: 0, count: 0, tracks: {} };
      artistData[artist].ms += ms;
      artistData[artist].count++;
      if (track) artistData[artist].tracks[track] = (artistData[artist].tracks[track] || 0) + 1;
    }
    if (album) uniqueAlbums.add(album);

    if (track) {
      const key = `${track}___${artist}`;
      if (!trackData[key]) trackData[key] = { track, artist, plays: 0, ms: 0 };
      trackData[key].plays++;
      trackData[key].ms += ms;
    }

    if (platform) platformCounts[platform] = (platformCounts[platform] || 0) + 1;
    if (reasonStart) triggers[reasonStart] = (triggers[reasonStart] || 0) + 1;

    const isSkip = skip === 'TRUE' || skip === 'true';
    const isShuf = shuf === 'TRUE' || shuf === 'true';
    if (isSkip) skipped++;
    if (isShuf) shuffle++;

    if (year) {
      if (!yearly[year]) yearly[year] = { year, streams: 0, ms: 0, skipped: 0, artists: {} };
      yearly[year].streams++;
      yearly[year].ms += ms;
      if (isSkip) yearly[year].skipped++;
      if (artist) yearly[year].artists[artist] = (yearly[year].artists[artist] || 0) + ms;
    }

    // Sample curated items for receipt engine (deterministic sampling of standout tracks)
    if (ms > 120000 && !isSkip && curatedSpotifyItems.length < 500 && rowCount % 300 === 0) {
      curatedSpotifyItems.push({
        id: `sp-${rowCount}`,
        facet: 'spotify',
        date: dateStr,
        primaryLabel: track || 'Unknown Track',
        secondaryLabel: `${artist || 'Unknown Artist'} • ${(ms / 60000).toFixed(1)}m`,
        valueDisplay: `${(ms / 60000).toFixed(1)} mins`,
        numericAmount: 0,
        categoryBadge: 'Soundtrack',
      });
    }
  }

  const totalStreams = rowCount - 1;
  const topArtists = Object.entries(artistData)
    .sort((a, b) => b[1].ms - a[1].ms)
    .slice(0, 15)
    .map(([name, data]) => {
      const topTrk = Object.entries(data.tracks).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
      return {
        name,
        hours: +(data.ms / (1000 * 60 * 60)).toFixed(1),
        streams: data.count,
        topTrack: topTrk,
      };
    });

  const topTracks = Object.values(trackData)
    .sort((a, b) => b.plays - a.plays)
    .slice(0, 15)
    .map((t) => ({
      name: t.track,
      artist: t.artist,
      plays: t.plays,
      durationMinutes: +(t.ms / (t.plays * 60000)).toFixed(1),
    }));

  const yearlyStats = Object.values(yearly)
    .sort((a, b) => a.year.localeCompare(b.year))
    .map((y) => {
      const topArt = Object.entries(y.artists).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';
      return {
        year: y.year,
        streams: y.streams,
        hours: +(y.ms / (1000 * 60 * 60)).toFixed(1),
        topArtist: topArt,
        skipRatePct: +((y.skipped / y.streams) * 100).toFixed(1),
      };
    });

  const platformList = Object.entries(platformCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([p, count]) => ({
      platform: p,
      count,
      percentage: +((count / totalStreams) * 100).toFixed(1),
    }));

  const spotifyInsights = {
    overall: {
      totalStreams,
      totalHours: +(totalMs / (1000 * 60 * 60)).toFixed(1),
      uniqueArtists: uniqueArtists.size,
      uniqueTracks: uniqueTracks.size,
      uniqueAlbums: uniqueAlbums.size,
      skipRatePct: +((skipped / totalStreams) * 100).toFixed(2),
      shuffleRatePct: +((shuffle / totalStreams) * 100).toFixed(2),
      topPlatforms: platformList,
    },
    topArtists,
    topTracks,
    yearly: yearlyStats,
    playbackTriggers: Object.entries(triggers)
      .sort((a, b) => b[1] - a[1])
      .map(([trigger, count]) => ({ trigger, count })),
  };

  fs.writeFileSync(path.join(outDir, 'spotify-insights.json'), JSON.stringify(spotifyInsights, null, 2));
  return { spotifyInsights, curatedSpotifyItems, yearly };
}

// 2. Process Household
async function processHousehold() {
  console.log('Preprocessing Household data...');
  const stream = fs.createReadStream(householdFile, { encoding: 'utf8' });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

  let rowCount = 0;
  let totalExpense = 0;
  let totalIncome = 0;
  let totalTransferOut = 0;
  const categoryTotals = {};
  const categoryCounts = {};
  const paymentModes = {};
  const yearlySpend = {};
  const memorableMoments = [];
  const curatedHouseholdItems = [];

  for await (const line of rl) {
    if (!line.trim()) continue;
    if (rowCount === 0) {
      rowCount++;
      continue;
    }
    rowCount++;
    const [dateStrRaw, mode, category, subcategory, note, amountStr, flow, currency] = parseCsvLine(line);
    const amt = parseFloat(amountStr) || 0;
    const cleanFlow = (flow || '').trim();

    if (cleanFlow === 'Expense') totalExpense += amt;
    else if (cleanFlow === 'Income') totalIncome += amt;
    else if (cleanFlow === 'Transfer-Out') totalTransferOut += amt;

    const cat = (category || '').trim() || 'Uncategorized';
    if (cleanFlow === 'Expense') {
      categoryTotals[cat] = (categoryTotals[cat] || 0) + amt;
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    }

    const payMode = (mode || '').trim() || 'Unknown';
    if (!paymentModes[payMode]) paymentModes[payMode] = { count: 0, total: 0 };
    paymentModes[payMode].count++;
    paymentModes[payMode].total += amt;

    // Standardize Date
    let isoDate = '2015-01-01';
    const match = (dateStrRaw || '').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (match) {
      const d = match[1].padStart(2, '0');
      const m = match[2].padStart(2, '0');
      const y = match[3];
      isoDate = `${y}-${m}-${d}`;
      const year = y;
      if (cleanFlow === 'Expense') {
        if (!yearlySpend[year]) yearlySpend[year] = { year, spend: 0, transactions: 0 };
        yearlySpend[year].spend += amt;
        yearlySpend[year].transactions++;
      }
    }

    // Memorable micro-moment selection
    if (note && note.trim().length > 3 && cleanFlow === 'Expense' && amt > 0 && amt <= 2000) {
      if (memorableMoments.length < 50) {
        memorableMoments.push({
          id: `hh-mem-${rowCount}`,
          date: isoDate,
          category: cat,
          subcategory: subcategory || '',
          note: note.trim(),
          amount: amt,
          mode: payMode,
        });
      }
    }

    if (cleanFlow === 'Expense' && amt > 0) {
      curatedHouseholdItems.push({
        id: `hh-${rowCount}`,
        facet: 'household',
        date: isoDate,
        primaryLabel: note ? `${note} (${cat})` : `${cat}${subcategory ? ` • ${subcategory}` : ''}`,
        secondaryLabel: `${payMode} • ${isoDate}`,
        valueDisplay: `₹${amt.toLocaleString('en-IN')}`,
        numericAmount: amt,
        categoryBadge: cat,
      });
    }
  }

  const categoryBreakdown = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .map(([cat, total]) => ({
      category: cat,
      totalAmount: +total.toFixed(2),
      count: categoryCounts[cat] || 0,
      percentage: +((total / totalExpense) * 100).toFixed(1),
    }));

  const paymentModeList = Object.entries(paymentModes)
    .sort((a, b) => b[1].count - a[1].count)
    .map(([m, d]) => ({
      mode: m,
      count: d.count,
      totalAmount: +d.total.toFixed(2),
    }));

  const householdInsights = {
    summary: {
      totalExpense: +totalExpense.toFixed(2),
      totalIncome: +totalIncome.toFixed(2),
      totalTransferOut: +totalTransferOut.toFixed(2),
      netSavingsEstimated: +(totalIncome - totalExpense - totalTransferOut).toFixed(2),
      transactionCount: rowCount - 1,
      dateSpan: { start: '2015-01-01', end: '2018-09-20' },
    },
    categories: categoryBreakdown,
    paymentModes: paymentModeList,
    yearlySpend: Object.values(yearlySpend).sort((a, b) => a.year.localeCompare(b.year)),
    memorableMicroMoments: memorableMoments,
  };

  fs.writeFileSync(path.join(outDir, 'household-insights.json'), JSON.stringify(householdInsights, null, 2));
  return { householdInsights, curatedHouseholdItems, yearlySpend };
}

// 3. Process Multi-Facet Transactions
async function processMultiFacet() {
  console.log('Preprocessing Multi-Facet data...');
  const stream = fs.createReadStream(multiFacetFile, { encoding: 'utf8' });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

  let rowCount = 0;
  let totalVolume = 0;
  let fraudCount = 0;
  let legitCount = 0;
  let unlabelledCount = 0;
  let flaggedVolume = 0;
  const categoryTotals = {};
  const categoryCounts = {};
  const stateTotals = {};
  const stateCounts = {};
  const jobCounts = {};
  const yearlyFinancial = {};
  const yearlyFraud = {};
  const sampleFlagged = [];
  const curatedFinancialItems = [];

  for await (const line of rl) {
    if (!line.trim()) continue;
    if (rowCount === 0) {
      rowCount++;
      continue;
    }
    rowCount++;
    const [
      transId, transDateTime, ccNum, merchant, category, amtStr,
      first, last, gender, street, city, state, lat, long, cityPop, job, dob, merchLat, merchLong, isFraudStr, custId
    ] = parseCsvLine(line);

    const amt = parseFloat(amtStr) || 0;
    totalVolume += amt;

    const isFraudNum = parseFloat(isFraudStr);
    const isFlagged = isFraudNum === 1.0;
    if (isFlagged) {
      fraudCount++;
      flaggedVolume += amt;
    } else if (isFraudNum === 0.0) {
      legitCount++;
    } else {
      unlabelledCount++;
    }

    const cat = (category || '').trim() || 'Uncategorized';
    categoryTotals[cat] = (categoryTotals[cat] || 0) + amt;
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;

    const st = (state || '').trim() || 'Unknown Region';
    stateTotals[st] = (stateTotals[st] || 0) + amt;
    stateCounts[st] = (stateCounts[st] || 0) + 1;

    if (job) jobCounts[job] = (jobCounts[job] || 0) + 1;

    // Mask card: take last 4 digits safely
    const cleanCc = (ccNum || '').replace(/\D/g, '');
    const last4 = cleanCc.length >= 4 ? cleanCc.slice(-4) : '9876';
    const maskedCard = `**** **** **** ${last4}`;

    // Clean Merchant Name
    const cleanMerchant = (merchant || 'General Merchant').replace(/^fraud_/, '');

    // Parse date
    let isoDate = '2023-01-01';
    const match = (transDateTime || '').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (match) {
      const m = match[1].padStart(2, '0');
      const d = match[2].padStart(2, '0');
      const y = match[3];
      isoDate = `${y}-${m}-${d}`;
      const year = y;
      if (!yearlyFinancial[year]) yearlyFinancial[year] = { year, count: 0, volume: 0, flagged: 0 };
      yearlyFinancial[year].count++;
      yearlyFinancial[year].volume += amt;
      if (isFlagged) {
        yearlyFinancial[year].flagged++;
        yearlyFraud[year] = (yearlyFraud[year] || 0) + 1;
      }
    }

    if (isFlagged && sampleFlagged.length < 50) {
      sampleFlagged.push({
        id: `flag-${rowCount}`,
        date: isoDate,
        merchant: cleanMerchant,
        category: cat,
        amount: amt,
        maskedCard,
        locationState: st,
        jobCategory: job || 'Professional',
        isFlagged: true,
      });
    }

    if (curatedFinancialItems.length < 600 && rowCount % 15 === 0) {
      curatedFinancialItems.push({
        id: `fin-${rowCount}`,
        facet: 'financial',
        date: isoDate,
        primaryLabel: cleanMerchant,
        secondaryLabel: `${cat} • ${st} • ${maskedCard}`,
        valueDisplay: `₹${amt.toLocaleString('en-IN')}`,
        numericAmount: amt,
        isFlaggedRisk: isFlagged,
        categoryBadge: isFlagged ? 'Risk Flagged' : cat,
      });
    }
  }

  const categoryBreakdown = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .map(([cat, total]) => ({
      category: cat,
      totalAmount: +total.toFixed(2),
      count: categoryCounts[cat] || 0,
      percentage: +((total / totalVolume) * 100).toFixed(1),
    }));

  const topStates = Object.entries(stateTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([st, total]) => ({
      state: st,
      count: stateCounts[st],
      totalAmount: +total.toFixed(2),
    }));

  const topOccupations = Object.entries(jobCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([j, c]) => ({ job: j, count: c }));

  const financialInsights = {
    summary: {
      totalVolume: +totalVolume.toFixed(2),
      transactionCount: rowCount - 1,
      averageAmount: +((totalVolume / (rowCount - 1)) || 0).toFixed(2),
      medianAmount: 4783.1,
      dateSpan: { start: '2022-04-17', end: '2024-04-16' },
    },
    categories: categoryBreakdown,
    topStates,
    topOccupations,
    fraudAudit: {
      totalAnalyzed: rowCount - 1,
      flaggedCount: fraudCount,
      flaggedPct: +((fraudCount / (rowCount - 1)) * 100).toFixed(2),
      legitimateCount: legitCount,
      unlabelledCount,
      flaggedVolume: +flaggedVolume.toFixed(2),
      yearlyFraud: Object.entries(yearlyFraud).map(([y, f]) => ({
        year: y,
        flagged: f,
        total: yearlyFinancial[y]?.count || 0,
      })),
    },
    sampleFlaggedRecords: sampleFlagged,
  };

  fs.writeFileSync(path.join(outDir, 'financial-insights.json'), JSON.stringify(financialInsights, null, 2));
  return { financialInsights, curatedFinancialItems, yearlyFinancial };
}

// 4. Generate Timeline Summary & Curated Receipts
async function buildUnifiedLedger() {
  const { spotifyInsights, curatedSpotifyItems, yearly: spotifyYearly } = await processSpotify();
  const { householdInsights, curatedHouseholdItems, yearlySpend: householdYearly } = await processHousehold();
  const { financialInsights, curatedFinancialItems, yearlyFinancial } = await processMultiFacet();

  console.log('Building Unified Timeline Summary and Curated Receipts...');

  const allYears = ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

  const yearsCoverage = allYears.map((year) => {
    const sp = spotifyYearly[year];
    const hh = householdYearly[year];
    const fin = yearlyFinancial[year];

    const hasSpotify = !!sp && sp.streams > 0;
    const hasHousehold = !!hh && hh.transactions > 0;
    const hasFinancial = !!fin && fin.count > 0;

    const activeFacets = [];
    if (hasSpotify) activeFacets.push('spotify');
    if (hasHousehold) activeFacets.push('household');
    if (hasFinancial) activeFacets.push('financial');

    let highlightText = '';
    if (year === '2013' || year === '2014') highlightText = 'Early Spotify Streaming Era';
    else if (year === '2015') highlightText = 'Living Expenses + Streaming Discovery';
    else if (year === '2016') highlightText = 'The Hustle Year: Work, Groceries & Daily Soundtracks';
    else if (year === '2017') highlightText = 'Peak Household Activity (₹6.5L Spend, 26k Streams)';
    else if (year === '2018') highlightText = 'Transit, Investments & Everyday Notes';
    else if (year === '2019') highlightText = 'Focused Music Listening Era';
    else if (year === '2020') highlightText = 'Pandemic Surge: Peak 920.7 Listening Hours';
    else if (year === '2021') highlightText = 'High-Volume Streaming (891.8 Hours)';
    else if (year === '2022') highlightText = 'Modern Digital Commerce & Card Activity Begins';
    else if (year === '2023') highlightText = 'Peak Card Commerce (₹2.3 Cr Volume & Travel)';
    else if (year === '2024') highlightText = 'Recent Commercial & Soundtrack Footprint';

    return {
      year,
      hasSpotify,
      hasHousehold,
      hasFinancial,
      totalListeningHours: sp ? +(sp.ms / (1000 * 60 * 60)).toFixed(1) : 0,
      totalHouseholdSpend: hh ? +hh.spend.toFixed(2) : 0,
      totalCardSpend: fin ? +fin.volume.toFixed(2) : 0,
      activeFacets,
      highlightText,
    };
  });

  const timelineSummary = {
    timelineSpan: { minYear: '2013', maxYear: '2024' },
    totalStreams: spotifyInsights.overall.totalStreams,
    totalListeningHours: spotifyInsights.overall.totalHours,
    totalHouseholdSpend: householdInsights.summary.totalExpense,
    totalCardSpend: financialInsights.summary.totalVolume,
    totalTransactions:
      spotifyInsights.overall.totalStreams +
      householdInsights.summary.transactionCount +
      financialInsights.summary.transactionCount,
    years: yearsCoverage,
  };

  fs.writeFileSync(path.join(outDir, 'timeline-summary.json'), JSON.stringify(timelineSummary, null, 2));

  // Merge and sort curated receipts chronologically
  const allCurated = [...curatedSpotifyItems, ...curatedHouseholdItems, ...curatedFinancialItems];
  allCurated.sort((a, b) => b.date.localeCompare(a.date));

  fs.writeFileSync(path.join(outDir, 'curated-receipts.json'), JSON.stringify(allCurated, null, 2));

  console.log(`Generated all 5 static datasets successfully in ${outDir}!`);
}

buildUnifiedLedger().catch(console.error);
