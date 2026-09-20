# Data Audit Report: Your Life, In Receipts 🧾

**Date Generated**: 2026-09-20  
**Audit Scope**: All 3 raw source datasets under `datasets/`  
**Target Application**: Your Life, In Receipts Interactive Life Analytics Platform

---

## 1. Executive Summary & Inventory

| Dataset Name | Source Path | File Size | Record Count | Header Count | Verified Date Range | Coverage Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Spotify Streaming History** | `datasets/spotify/spotify_history.csv` | 21.3 MB | **149,860** | 11 columns | `2013-07-08` to `2024-12-15` | Continuous 11.4 years |
| **Daily Household Transactions** | `datasets/household/Daily Household Transactions.csv` | 189.9 KB | **2,461** | 8 columns | `2015-01-01` to `2018-09-20` | ~3.75 years (Living spend) |
| **India Multi-Facet Transactions** | `datasets/financial/Augmented_IndiaTransactMultiFacet2024.csv` | 2.53 MB | **10,267** | 21 columns | `2022-04-17` to `2024-04-16` | 2 years (Modern card & risk) |

---

## 2. Dataset 1: Spotify Listening History Audit

### 2.1 Schema & Column Inventory
- `spotify_track_uri` (string): Track identifier
- `ts` (string): UTC timestamp of track end (`YYYY-MM-DD HH:MM:SS`)
- `platform` (string): Playback device/OS
- `ms_played` (number): Duration played in milliseconds
- `track_name` (string): Song title
- `artist_name` (string): Artist / band name
- `album_name` (string): Album title
- `reason_start` (string): Trigger for track start (`clickrow`, `trackdone`, `fwdbtn`, `appload`, etc.)
- `reason_end` (string): Trigger for track end (`trackdone`, `fwdbtn`, `logout`, `endplay`, etc.)
- `shuffle` (boolean string): `TRUE` / `FALSE`
- `skipped` (boolean string): `TRUE` / `FALSE`

### 2.2 Key Calculated Metrics
- **Total Listening Hours**: **5,341.5 hours** (~222.5 full 24-hour days of streaming)
- **Unique Tracks**: 14,639 distinct track/artist combinations
- **Unique Artists**: 4,113 distinct musical artists
- **Unique Albums**: 8,437 distinct albums
- **Total Tracks Skipped**: 7,869 tracks (**5.25% skip rate**)
- **Shuffle Mode Usage**: 111,583 streams (**74.46% shuffle rate**)

### 2.3 Yearly Listening Distribution
- **2013**: 185 streams (7.8 hrs)
- **2014**: 23 streams (1.0 hrs)
- **2015**: 2,809 streams (59.2 hrs)
- **2016**: 6,413 streams (197.6 hrs)
- **2017**: 26,320 streams (670.6 hrs)
- **2018**: 14,817 streams (474.2 hrs)
- **2019**: 14,927 streams (479.2 hrs)
- **2020**: 24,280 streams (920.7 hrs) — *Peak pandemic listening year*
- **2021**: 22,991 streams (891.8 hrs)
- **2022**: 16,202 streams (641.6 hrs)
- **2023**: 11,023 streams (515.1 hrs)
- **2024**: 9,870 streams (482.7 hrs)

### 2.4 Top Artists & Tracks (Verified Ground Truth)
- **Top 5 Artists by Hours**:
  1. The Beatles (336.2 hrs)
  2. The Killers (294.3 hrs)
  3. John Mayer (201.4 hrs)
  4. Bob Dylan (158.2 hrs)
  5. Paul McCartney (99.3 hrs)
- **Top 5 Tracks by Plays**:
  1. *Ode To The Mets* — The Strokes (207 plays)
  2. *In the Blood* — John Mayer (181 plays)
  3. *Dying Breed* — The Killers (166 plays)
  4. *Caution* — The Killers (164 plays)
  5. *19 Dias y 500 Noches - En Directo* — Joaquín Sabina (148 plays)

### 2.5 Platform Distribution
- **Android**: 139,821 streams (93.3%)
- **Cast to Device**: 3,898 streams (2.6%)
- **iOS**: 3,049 streams (2.0%)
- **Windows**: 1,691 streams (1.1%)
- **Mac**: 1,176 streams (0.8%)
- **Web Player**: 225 streams (0.2%)

---

## 3. Dataset 2: Daily Household Transactions Audit

### 3.1 Schema & Column Inventory
- `Date` (string): Date in `DD/MM/YYYY` or `DD/MM/YYYY HH:MM:SS` format
- `Mode` (string): Payment method (`Cash`, `Saving Bank account 1`, `Credit Card`, `Equity Mutual Fund`)
- `Category` (string): Expense/Transfer category
- `Subcategory` (string): Detailed item classification
- `Note` (string): Memo with real-world personal annotations
- `Amount` (number): Transaction magnitude in INR
- `Income/Expense` (string): Flow direction (`Expense`, `Income`, `Transfer-Out`)
- `Currency` (string): `INR`

### 3.2 Cashflow & Financial Summary
- **Total Recorded Expense**: **₹1,957,390.53** (2,176 transactions)
- **Total Recorded Income**: **₹3,042,397.35** (125 transactions)
- **Total Transfer-Out / Investments**: **₹1,770,780.90** (160 transactions)
- **Net Cashflow**: Positive operational balance with disciplined savings/investments.

### 3.3 Top Expense Categories
1. **Money transfer / Remittance**: ₹606,528.90 (43 txns)
2. **Investment & Mutual Funds**: ₹271,858.00 (103 txns)
3. **Transportation**: ₹169,053.78 (307 txns)
4. **Household & Utilities**: ₹161,645.58 (176 txns)
5. **Subscriptions**: ₹114,587.91 (143 txns)
6. **Food & Groceries**: ₹96,403.10 (907 txns) — *Highest transaction frequency*
7. **Public Provident Fund**: ₹90,000.00 (8 txns)
8. **Family & Pocket Money**: ₹78,582.20 (71 txns)
9. **Health & Medical**: ₹66,252.75 (94 txns)
10. **Tourism & Trips**: ₹63,608.85 (5 txns)

### 3.4 Micro-Moments & Notable Personal Notes
The dataset contains granular human annotations:
- Food & Chai: *"tea"*, *"Amul butter"*, *"Idli medu Vada mix"*, *"bendys chicken biryani"*, *"Half lit milk"*, *"snacks"*.
- Transit: *"auto - Place 2 station to Permanent Residence"*, *"share jeep - Place T top to base"*, *"ropeway"*.
- Culture & Faith: *"Ganesh idol"*, *"Temple Prasad"*, *"monument"*.
- Domestic: *"cook"*, *"11 clothes ironing"*, *"water jar"*.

---

## 4. Dataset 3: India Multi-Facet Transactions Audit

### 4.1 Schema & Privacy Assessment
| Field | Type | Missing Count | Privacy Classification | UI Action |
| :--- | :--- | :--- | :--- | :--- |
| `trans_id` | number | 845 | Operational | Safe to display with fallback ID |
| `trans_date_trans_time` | string | 0 | Safe | Normalize to ISO Date |
| `cc_num` | string/num | 0 | **SENSITIVE** | **Strict Masking Required** (`**** **** **** 1234`) |
| `merchant` | string | 0 | Safe | Display clean merchant name |
| `category` | string | 797 | Safe | Map empty values to `"Uncategorized"` |
| `amt` | number | 0 | Safe | Format as INR currency (`₹`) |
| `first`, `last` | string | 602 | **PII** | **Do not display as customer profile** |
| `gender` | string | 602 | Demographic | Use only in aggregate demographic charts |
| `street` | string | 823 | **PII** | **Suppress full street address** |
| `city`, `state` | string | 711 | Safe | Aggregate by state / city |
| `lat`, `long` | number | 609 | **PII** | Suppress exact customer coordinates |
| `city_pop` | number | 609 | Demographic | Aggregate city tier info |
| `job` | string | 602 | Safe | Display as aggregate occupation breakdown |
| `dob` | string | 602 | **PII** | Suppress individual DOBs |
| `merch_lat`, `merch_long`| number | 609 | Safe | Use for merchant distance calculations |
| `is_fraud` | number | 645 | Audit Label | Categorize as `Flagged` (1.0) / `Legitimate` (0.0) / `Unlabelled` |
| `customer_id` | string/num | 602 | **PII** | **Suppress raw customer IDs** |

### 4.2 Financial & Risk Breakdown
- **Total Card Volume**: **₹48,966,073.38** across 10,267 transactions
- **Average Transaction Amount**: **₹4,769.27** (Median: ₹4,783.10)
- **Dataset Fraud-Labelled Count**:
  - **Flagged Transactions (`is_fraud = 1.0`)**: **5,046** (49.15%)
  - **Legitimate Transactions (`is_fraud = 0.0`)**: **4,576** (44.57%)
  - **Unlabelled / Missing (`is_fraud = null`)**: **645** (6.28%)
- **Top Merchant Categories by Spend**:
  1. Travel: ₹12,044,742.40 (2,419 txns)
  2. Entertainment: ₹11,572,453.74 (2,388 txns)
  3. Online Shopping: ₹11,558,159.70 (2,596 txns)
  4. Fitness & Medical: ₹9,785,338.10 (2,067 txns)
  5. Uncategorized: ₹4,005,379.44 (797 txns)

---

## 5. Timeline Coverage Matrix

```text
Timeline Horizon: 2013 ─── 2014 ─── 2015 ─── 2016 ─── 2017 ─── 2018 ─── 2019 ─── 2020 ─── 2021 ─── 2022 ─── 2023 ─── 2024
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────
🎵 Spotify:       [==============================================================================================]
☕ Household:                             [===================================]
💳 Multi-Facet:                                                                                   [==============]
```

### Coverage Rules for the Frontend:
1. **2013–2014 Era**: Spotify Cultural Receipt only (Foundational streaming era).
2. **2015–2018 Era**: Unified Spotify + Daily Household living receipts (Everyday life & soundtracks).
3. **2019–2021 Era**: Spotify Cultural Receipt (Pandemic listening surge).
4. **2022–2024 Era**: Unified Spotify + Modern Multi-Facet commerce & risk audit.

---

## 6. Preprocessing & Data Extraction Plan

To deliver instant client-side performance (<200KB bundle) and ensure zero CORS/latency issues:
1. **`timeline-summary.json`**: Pre-aggregated yearly matrix across all 3 datasets with active facet tags.
2. **`spotify-insights.json`**: Pre-computed artist, album, track, platform, skip rate, and duration metrics.
3. **`household-insights.json`**: Category, subcategory, payment mode, cashflow, and curated micro-moments.
4. **`financial-insights.json`**: Card categories, state breakdown, occupation rankings, fraud-audit counts.
5. **`curated-receipts.json`**: Privacy-safe itemized receipts with masked card numbers and clean tags.
