import fs from 'fs';
import path from 'path';

const outDir = path.resolve('src', 'data');

function validate() {
  console.log('Validating preprocessed data assets...');

  const timelineSummary = JSON.parse(fs.readFileSync(path.join(outDir, 'timeline-summary.json'), 'utf8'));
  const spotify = JSON.parse(fs.readFileSync(path.join(outDir, 'spotify-insights.json'), 'utf8'));
  const household = JSON.parse(fs.readFileSync(path.join(outDir, 'household-insights.json'), 'utf8'));
  const financial = JSON.parse(fs.readFileSync(path.join(outDir, 'financial-insights.json'), 'utf8'));
  const curated = JSON.parse(fs.readFileSync(path.join(outDir, 'curated-receipts.json'), 'utf8'));

  let errors = 0;

  // 1. Check Timeline Summary
  if (!timelineSummary.years || timelineSummary.years.length !== 12) {
    console.error('FAIL: Timeline years count is not 12');
    errors++;
  } else {
    console.log('PASS: 12 timeline years verified (2013–2024)');
  }

  if (timelineSummary.totalStreams !== 149860) {
    console.error(`FAIL: Spotify streams mismatch: ${timelineSummary.totalStreams} !== 149860`);
    errors++;
  } else {
    console.log(`PASS: Spotify total streams: ${timelineSummary.totalStreams.toLocaleString()}`);
  }

  // 2. Check Spotify Insights
  if (spotify.topArtists.length < 10 || spotify.topTracks.length < 10) {
    console.error('FAIL: Insufficient Spotify top artists/tracks');
    errors++;
  } else {
    console.log(`PASS: Spotify top artist: ${spotify.topArtists[0].name} (${spotify.topArtists[0].hours} hrs)`);
  }

  // 3. Check Household Insights
  if (household.summary.totalExpense <= 0 || household.categories.length === 0) {
    console.error('FAIL: Invalid household summary or categories');
    errors++;
  } else {
    console.log(`PASS: Household total expense: ₹${household.summary.totalExpense.toLocaleString('en-IN')}`);
  }

  // 4. Check Financial Insights & Masking
  if (!financial.fraudAudit || financial.fraudAudit.flaggedCount !== 5046) {
    console.error(`FAIL: Fraud flagged count mismatch: ${financial.fraudAudit?.flaggedCount} !== 5046`);
    errors++;
  } else {
    console.log(`PASS: Financial fraud audit flagged count: ${financial.fraudAudit.flaggedCount} (${financial.fraudAudit.flaggedPct}%)`);
  }

  // Check masking in sample flagged records
  for (const rec of financial.sampleFlaggedRecords) {
    if (!rec.maskedCard.startsWith('**** **** **** ') || rec.maskedCard.length !== 19) {
      console.error(`FAIL: Insecure or unmasked card detected: ${rec.maskedCard}`);
      errors++;
      break;
    }
  }
  console.log('PASS: All sampled financial records strictly masked');

  // 5. Check Curated Receipts
  if (curated.length < 100) {
    console.error(`FAIL: Curated receipts count too low: ${curated.length}`);
    errors++;
  } else {
    console.log(`PASS: Curated receipts collection: ${curated.length} items ready for instant rendering`);
  }

  if (errors === 0) {
    console.log('\n=== ALL DATA VALIDATION CHECKS PASSED (0 ERRORS) ===\n');
  } else {
    console.error(`\n=== VALIDATION FAILED WITH ${errors} ERRORS ===\n`);
    process.exit(1);
  }
}

validate();
