import fs from 'fs';
import path from 'path';
import readline from 'readline';

const datasetsDir = path.resolve('datasets');
const spotifyFile = path.join(datasetsDir, 'spotify', 'spotify_history.csv');
const householdFile = path.join(datasetsDir, 'household', 'Daily Household Transactions.csv');
const multiFacetFile = path.join(datasetsDir, 'financial', 'Augmented_IndiaTransactMultiFacet2024.csv');

// Helper to parse CSV line handling quotes
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

// 1. Audit Spotify Dataset
async function auditSpotify() {
  console.log('Auditing Spotify History...');
  const stream = fs.createReadStream(spotifyFile, { encoding: 'utf8' });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

  let rowCount = 0;
  let headers = [];
  let minDate = '9999-99-99';
  let maxDate = '0000-00-00';
  const uniqueTracks = new Set();
  const uniqueArtists = new Set();
  const uniqueAlbums = new Set();
  let totalMsPlayed = 0;
  let skippedCount = 0;
  let shuffleCount = 0;
  const platformCounts = {};
  const yearlyMs = {};
  const yearlyCount = {};
  const artistMs = {};
  const trackCount = {};
  const reasonStartCounts = {};
  const reasonEndCounts = {};
  let missingFieldsCount = 0;

  for await (const line of rl) {
    if (!line.trim()) continue;
    if (rowCount === 0) {
      headers = parseCsvLine(line);
      rowCount++;
      continue;
    }
    rowCount++;
    const cols = parseCsvLine(line);
    // Columns: spotify_track_uri, ts, platform, ms_played, track_name, artist_name, album_name, reason_start, reason_end, shuffle, skipped
    const [uri, ts, platform, msStr, track, artist, album, reasonStart, reasonEnd, shuffle, skipped] = cols;

    if (!track || !artist || !ts) {
      missingFieldsCount++;
    }

    const dateStr = (ts || '').slice(0, 10);
    if (dateStr) {
      if (dateStr < minDate) minDate = dateStr;
      if (dateStr > maxDate) maxDate = dateStr;
      const year = dateStr.slice(0, 4);
      const ms = parseInt(msStr, 10) || 0;
      yearlyMs[year] = (yearlyMs[year] || 0) + ms;
      yearlyCount[year] = (yearlyCount[year] || 0) + 1;
    }

    const ms = parseInt(msStr, 10) || 0;
    totalMsPlayed += ms;

    if (track) uniqueTracks.add(track + '___' + artist);
    if (artist) {
      uniqueArtists.add(artist);
      artistMs[artist] = (artistMs[artist] || 0) + ms;
    }
    if (album) uniqueAlbums.add(album + '___' + artist);
    if (track) {
      trackCount[track + ' — ' + artist] = (trackCount[track + ' — ' + artist] || 0) + 1;
    }

    if (platform) platformCounts[platform] = (platformCounts[platform] || 0) + 1;
    if (reasonStart) reasonStartCounts[reasonStart] = (reasonStartCounts[reasonStart] || 0) + 1;
    if (reasonEnd) reasonEndCounts[reasonEnd] = (reasonEndCounts[reasonEnd] || 0) + 1;
    if (shuffle === 'TRUE' || shuffle === 'true') shuffleCount++;
    if (skipped === 'TRUE' || skipped === 'true') skippedCount++;
  }

  const topArtists = Object.entries(artistMs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, ms]) => ({ name, hours: +(ms / (1000 * 60 * 60)).toFixed(1) }));

  const topTracks = Object.entries(trackCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, count]) => ({ name, plays: count }));

  return {
    records: rowCount - 1,
    headers,
    dateRange: { min: minDate, max: maxDate },
    uniqueTracksCount: uniqueTracks.size,
    uniqueArtistsCount: uniqueArtists.size,
    uniqueAlbumsCount: uniqueAlbums.size,
    totalListeningHours: +(totalMsPlayed / (1000 * 60 * 60)).toFixed(1),
    skippedCount,
    skipRatePct: +((skippedCount / (rowCount - 1)) * 100).toFixed(2),
    shuffleCount,
    shuffleRatePct: +((shuffleCount / (rowCount - 1)) * 100).toFixed(2),
    platformCounts,
    yearlyBreakdown: Object.entries(yearlyMs).map(([year, ms]) => ({
      year,
      streams: yearlyCount[year],
      hours: +(ms / (1000 * 60 * 60)).toFixed(1),
    })),
    topArtists,
    topTracks,
    reasonStartCounts,
    reasonEndCounts,
    missingFieldsCount,
  };
}

// 2. Audit Daily Household Transactions
async function auditHousehold() {
  console.log('Auditing Household Transactions...');
  const stream = fs.createReadStream(householdFile, { encoding: 'utf8' });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

  let rowCount = 0;
  let headers = [];
  let minDate = '9999-99-99';
  let maxDate = '0000-00-00';
  let totalExpense = 0;
  let totalIncome = 0;
  let totalTransferOut = 0;
  let totalTransferIn = 0;
  const categoryAmounts = {};
  const categoryCounts = {};
  const subcategoryCounts = {};
  const paymentModeCounts = {};
  const paymentModeAmounts = {};
  const yearlySpend = {};
  const yearlyCounts = {};
  const flowCounts = {};
  const largestExpenses = [];
  let missingCategoryCount = 0;
  let missingNoteCount = 0;

  for await (const line of rl) {
    if (!line.trim()) continue;
    if (rowCount === 0) {
      headers = parseCsvLine(line);
      rowCount++;
      continue;
    }
    rowCount++;
    const cols = parseCsvLine(line);
    // Columns: Date, Mode, Category, Subcategory, Note, Amount, Income/Expense, Currency
    const [dateStrRaw, mode, category, subcategory, note, amountStr, flow, currency] = cols;

    const amt = parseFloat(amountStr) || 0;
    const cleanFlow = (flow || '').trim();
    flowCounts[cleanFlow] = (flowCounts[cleanFlow] || 0) + 1;

    if (cleanFlow === 'Expense') totalExpense += amt;
    else if (cleanFlow === 'Income') totalIncome += amt;
    else if (cleanFlow === 'Transfer-Out') totalTransferOut += amt;
    else if (cleanFlow === 'Transfer-In') totalTransferIn += amt;

    const cat = (category || '').trim() || 'Uncategorized';
    if (!category) missingCategoryCount++;
    if (!note) missingNoteCount++;

    if (cleanFlow === 'Expense') {
      categoryAmounts[cat] = (categoryAmounts[cat] || 0) + amt;
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    }

    if (subcategory) {
      subcategoryCounts[subcategory] = (subcategoryCounts[subcategory] || 0) + 1;
    }

    const payMode = (mode || '').trim() || 'Unknown';
    paymentModeCounts[payMode] = (paymentModeCounts[payMode] || 0) + 1;
    paymentModeAmounts[payMode] = (paymentModeAmounts[payMode] || 0) + amt;

    // Parse date: e.g. "20/09/2018 12:04:08", "12/9/2018", "1/1/2015"
    let isoDate = null;
    const dateMatch = (dateStrRaw || '').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (dateMatch) {
      const day = dateMatch[1].padStart(2, '0');
      const month = dateMatch[2].padStart(2, '0');
      const year = dateMatch[3];
      isoDate = `${year}-${month}-${day}`;
      if (isoDate < minDate) minDate = isoDate;
      if (isoDate > maxDate) maxDate = isoDate;

      if (cleanFlow === 'Expense') {
        yearlySpend[year] = (yearlySpend[year] || 0) + amt;
      }
      yearlyCounts[year] = (yearlyCounts[year] || 0) + 1;
    }

    if (cleanFlow === 'Expense' && amt > 0) {
      largestExpenses.push({
        date: isoDate || dateStrRaw,
        category: cat,
        subcategory: subcategory || '',
        note: note || '',
        amount: amt,
        mode: payMode,
      });
    }
  }

  largestExpenses.sort((a, b) => b.amount - a.amount);

  return {
    records: rowCount - 1,
    headers,
    dateRange: { min: minDate, max: maxDate },
    cashflowSummary: {
      totalExpense: +totalExpense.toFixed(2),
      totalIncome: +totalIncome.toFixed(2),
      totalTransferOut: +totalTransferOut.toFixed(2),
      totalTransferIn: +totalTransferIn.toFixed(2),
      flowCounts,
    },
    categoryDistribution: Object.entries(categoryAmounts)
      .sort((a, b) => b[1] - a[1])
      .map(([cat, total]) => ({ category: cat, total: +total.toFixed(2), count: categoryCounts[cat] })),
    paymentModes: Object.entries(paymentModeCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([m, count]) => ({ mode: m, count, totalAmount: +(paymentModeAmounts[m] || 0).toFixed(2) })),
    yearlySpend: Object.entries(yearlySpend).map(([year, spend]) => ({
      year,
      spend: +spend.toFixed(2),
      transactions: yearlyCounts[year] || 0,
    })),
    topExpenses: largestExpenses.slice(0, 10),
    missingValues: { missingCategory: missingCategoryCount, missingNote: missingNoteCount },
  };
}

// 3. Audit India Multi-Facet Transactions
async function auditMultiFacet() {
  console.log('Auditing India Multi-Facet Transactions...');
  const stream = fs.createReadStream(multiFacetFile, { encoding: 'utf8' });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

  let rowCount = 0;
  let headers = [];
  let minDate = '9999-99-99';
  let maxDate = '0000-00-00';
  let totalAmount = 0;
  const amounts = [];
  let fraudCount = 0;
  let legitCount = 0;
  let missingFraudCount = 0;
  const categoryCounts = {};
  const categoryAmounts = {};
  const stateCounts = {};
  const genderCounts = {};
  const jobCounts = {};
  const yearlyCounts = {};
  const yearlyAmounts = {};
  const yearlyFraud = {};
  const merchantCounts = {};
  let missingTransIdCount = 0;
  let missingCategoryCount = 0;
  let missingCityCount = 0;
  let missingStateCount = 0;
  let missingCustomerCount = 0;
  let missingCoordsCount = 0;

  for await (const line of rl) {
    if (!line.trim()) continue;
    if (rowCount === 0) {
      headers = parseCsvLine(line);
      rowCount++;
      continue;
    }
    rowCount++;
    const cols = parseCsvLine(line);
    // Columns: trans_id,trans_date_trans_time,cc_num,merchant,category,amt,first,last,gender,street,city,state,lat,long,city_pop,job,dob,merch_lat,merch_long,is_fraud,customer_id
    const [
      transId, transDateTime, ccNum, merchant, category, amtStr,
      first, last, gender, street, city, state, lat, long, cityPop, job, dob, merchLat, merchLong, isFraudStr, custId
    ] = cols;

    const amt = parseFloat(amtStr) || 0;
    totalAmount += amt;
    amounts.push(amt);

    if (!transId) missingTransIdCount++;
    if (!category) missingCategoryCount++;
    if (!city) missingCityCount++;
    if (!state) missingStateCount++;
    if (!custId) missingCustomerCount++;
    if (!lat || !long || !merchLat || !merchLong) missingCoordsCount++;

    const isFraud = parseFloat(isFraudStr);
    if (isFraud === 1.0) fraudCount++;
    else if (isFraud === 0.0) legitCount++;
    else missingFraudCount++;

    const cat = (category || '').trim() || 'Uncategorized';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    categoryAmounts[cat] = (categoryAmounts[cat] || 0) + amt;

    if (merchant) merchantCounts[merchant] = (merchantCounts[merchant] || 0) + 1;
    if (state) stateCounts[state] = (stateCounts[state] || 0) + 1;
    if (gender) genderCounts[gender] = (genderCounts[gender] || 0) + 1;
    if (job) jobCounts[job] = (jobCounts[job] || 0) + 1;

    // Date parsing e.g. "12/26/2023 0:55", "7/7/2023 7:02"
    let isoDate = null;
    const dateMatch = (transDateTime || '').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (dateMatch) {
      const month = dateMatch[1].padStart(2, '0');
      const day = dateMatch[2].padStart(2, '0');
      const year = dateMatch[3];
      isoDate = `${year}-${month}-${day}`;
      if (isoDate < minDate) minDate = isoDate;
      if (isoDate > maxDate) maxDate = isoDate;

      yearlyCounts[year] = (yearlyCounts[year] || 0) + 1;
      yearlyAmounts[year] = (yearlyAmounts[year] || 0) + amt;
      if (isFraud === 1.0) {
        yearlyFraud[year] = (yearlyFraud[year] || 0) + 1;
      }
    }
  }

  amounts.sort((a, b) => a - b);
  const medianAmt = amounts.length ? amounts[Math.floor(amounts.length / 2)] : 0;
  const avgAmt = amounts.length ? +(totalAmount / amounts.length).toFixed(2) : 0;

  return {
    records: rowCount - 1,
    headers,
    dateRange: { min: minDate, max: maxDate },
    financialMetrics: {
      totalVolume: +totalAmount.toFixed(2),
      averageAmount: avgAmt,
      medianAmount: +medianAmt.toFixed(2),
      minAmount: amounts[0] || 0,
      maxAmount: amounts[amounts.length - 1] || 0,
    },
    fraudAudit: {
      fraudLabelledCount: fraudCount,
      fraudLabelledPct: +((fraudCount / (rowCount - 1)) * 100).toFixed(2),
      legitimateCount: legitCount,
      missingOrUnlabelledFraudCount: missingFraudCount,
      yearlyFraudBreakdown: yearlyFraud,
    },
    yearlyBreakdown: Object.entries(yearlyCounts).map(([year, count]) => ({
      year,
      count,
      totalAmount: +(yearlyAmounts[year] || 0).toFixed(2),
      fraudCount: yearlyFraud[year] || 0,
    })),
    categoryDistribution: Object.entries(categoryAmounts)
      .sort((a, b) => b[1] - a[1])
      .map(([cat, total]) => ({ category: cat, total: +total.toFixed(2), count: categoryCounts[cat] })),
    topStates: Object.entries(stateCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([st, c]) => ({ state: st, count: c })),
    genderDistribution: genderCounts,
    topJobs: Object.entries(jobCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([j, c]) => ({ job: j, count: c })),
    missingValues: {
      missingTransId: missingTransIdCount,
      missingCategory: missingCategoryCount,
      missingCity: missingCityCount,
      missingState: missingStateCount,
      missingCustomerId: missingCustomerCount,
      missingCoords: missingCoordsCount,
      missingFraudLabel: missingFraudCount,
    },
  };
}

async function runFullAudit() {
  const spotify = await auditSpotify();
  const household = await auditHousehold();
  const multiFacet = await auditMultiFacet();

  const auditReport = {
    auditTimestamp: new Date().toISOString(),
    spotify,
    household,
    multiFacet,
  };

  fs.mkdirSync('reports', { recursive: true });
  fs.writeFileSync(path.join('reports', 'data-audit.json'), JSON.stringify(auditReport, null, 2));
  console.log('Data audit JSON saved to reports/data-audit.json');
}

runFullAudit().catch(console.error);
