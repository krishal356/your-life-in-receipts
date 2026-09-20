# Product Development Requirements (PDR)
## Project: Your Life, In Receipts 🧾

---

## 1. Executive Summary

**"Your Life, In Receipts"** is a high-performance, responsive, accessible, frontend-only interactive life analytics and storytelling platform. It transforms raw personal data—spanning music listening history, daily household expenses, and multi-facet financial transactions—into an editorial, unified personal ledger ("Life Receipts").

Rather than presenting three disconnected analytics dashboards, **Your Life, In Receipts** weaves together cultural habits, daily living micro-moments, and modern financial footprints across an 11-year timeline (2013–2024). It allows users to explore life chapters, generate printable and shareable thermal-style "Life Receipts", filter through multi-dimensional life facets, inspect interactive timelines, and uncover deep lifestyle correlations—all rendered with deterministic precision, zero backend latency, and complete client-side security.

As a production-oriented frontend application, it prioritizes functional completeness, robust static data processing, rich yet restrained editorial aesthetics, WCAG 2.1 AA-aligned accessibility, and multi-device responsiveness.

---

## 2. Project Context & Operational Parameters

| Parameter | Specification |
| :--- | :--- |
| **Application Title** | "Your Life, In Receipts 🧾" |
| **Project Type** | Standalone Interactive Personal Analytics Platform |
| **Architecture** | **Strictly Frontend-Only**. No backend servers, no cloud databases, no external AI API services |
| **Persistence / Processing** | Static pre-processed client JSON assets + browser storage for client-side interactions |
| **Target Viewports** | Mobile (<768px), Tablet (768px–1024px), Desktop (>1024px) |
| **Accessibility Target** | WCAG 2.1 AA-Aligned (Semantic HTML5, ARIA labels, Keyboard navigation, Focus rings) |
| **Performance Target** | Instant client-side load, optimized static bundle (<150 kB gzipped), zero layout shift |
| **Data Privacy** | 100% Client-Side execution, masked card identifiers (`**** **** **** 1234`), PII protection |

---

## 3. Requirements Classification & Status

To ensure clarity and architectural consistency, requirements are grouped as follows:

### A. Core Architectural & Product Standards (`CORE`)
1. **Frontend-Only Execution**: No Express/Node/Python backend servers, databases, or cloud task stores.
2. **Comprehensive 3-Dataset Integration**: All three raw source datasets must be synthesized meaningfully.
3. **Explicit Timeline Coverage & No Continuous Overlap Assumption**:
   - **2013–2014**: Spotify listening coverage.
   - **2015–2018**: Spotify listening + Daily Household spending coverage.
   - **2019–2021**: Spotify listening coverage.
   - **2022–2024**: Spotify listening + India Multi-Facet card transactions coverage.
   - *Rule*: The application must explicitly communicate facet availability per time period and never fabricate missing data for unrepresented facets.
4. **Data Privacy & Display Safety**:
   - Strict card masking: Mask all card numbers (e.g., `**** **** **** 1234`), never expose raw numbers.
   - PII protection: Do not display raw `customer_id`, full street addresses, exact coordinates, or unnecessary DOBs.
   - Aggregate presentation: Present demographic, geographical, and occupational data as aggregated insights rather than individual customer profiles.
5. **Dataset Fraud Audit Terminology (No AI Claims)**:
   - Use precise terminology: *"Dataset Fraud Audit"*, *"Flagged Transactions"*, *"Fraud-labelled Records"*, or *"Dataset Risk Review"*.
   - *Rule*: Do NOT claim the application detects or predicts fraud with AI/ML; the application visualizes, audits, and explores pre-existing labels from the provided dataset.
6. **Responsive Web Application**: Flawless display across mobile (<768px), tablet (768px–1024px), and desktop (>1024px) viewports with zero horizontal overflow.
7. **Accessible Interface**: WCAG 2.1 AA-aligned semantics, keyboard navigation, high-contrast states, and explicit accessible names.
8. **Static Deployment Ready**: Publicly accessible, HTTPS production-ready build for static hosting.
9. **Interactive Rigor**: High-precision interaction depth, clear visual hierarchy, type safety, and instant sub-100ms client-side response times.

### B. Verified Dataset Ground Truth (`VERIFIED`)
1. **Spotify Streaming History**: 149,860 listening records (2013–2024) across tracks, artists, albums, playback reasons, platforms, shuffle, and skip behaviors.
2. **Daily Household Transactions**: 2,461 cash/bank/card personal expenses and cashflows (2015–2018) with categories, subcategories, amounts, notes, and payment modes in INR.
3. **India Multi-Facet Transactions**: 10,267 card transactions (2022–2024) with merchant names, categories, amounts, customer demographics, job titles, geolocations, and fraud flags.

### C. Product Features & Modules (`IMPLEMENTED`)
1. **Unified "Life Receipt" Engine**: A thermal receipt generator synthesizing time spent, money spent, top tracks, and standout moments into downloadable/printable SVG receipts.
2. **Multi-Era Life Timeline**: A cohesive chronological navigator syncing music eras (2013–2024), household years (2015–2018), and multi-facet commerce years (2022–2024).
3. **Facet Explorer & Cross-Correlation**: Interactive slicing by category, time-of-day (morning coffee vs midnight streaming), spending intensity, and soundtrack pairings.
4. **Personal Audit & Fraud Safeguard**: A security receipt view highlighting anomalous/flagged transactions from the multi-facet dataset.

---

## 4. Source of Truth Hierarchy

When resolving implementation decisions or feature ambiguities, follow this order of precedence:
1. **Actual Source Datasets** (`datasets/spotify/`, `datasets/household/`, `datasets/financial/`)
2. **`PDR.md`** (This Document — Authoritative Product & Functional Specification)
3. **`AGENTS.md`** (Authoritative Operational & Engineering Manual)
4. **`README.md`** (Living Public Documentation)
5. **Source Code Implementation**

---

## 5. Product Vision & Value Proposition

### The Vision
"Your Life, In Receipts" reframes personal analytics. Receipts are usually cold proofs of purchase; this platform turns them into evocative snapshots of human life. Every song played is an emotional receipt; every chai and train ticket is a lived micro-moment; every credit card transaction is a commercial milestone.

### Core Value Pillars
1. **Unified Narrative Over Siloed Dashboards**: Connects soundtrack to spend, creating an interconnected story of how time and money were spent over a decade.
2. **Tactile "Receipt" Physicality**: Employs an editorial, thermal-paper design metaphor with serrated edges, barcodes, monospaced itemization, and punchy summary totals.
3. **Deterministic & Blazing Fast**: Instant client-side filtering, searching, and metric calculations across hundreds of thousands of data points via pre-aggregated static indices.
4. **Privacy-Preserving & Zero-Backend**: Operates 100% locally in the browser with no telemetry, external tracking, or cloud dependencies.

---

## 6. Target Users & Personas

- **The Nostalgic Explorer (Aarav, 28)**: Wants to look back at what songs defined his college years (2014) and what everyday expenses were like when he started working (2016).
- **The Financial & Habit Auditor (Priya, 34)**: Wants a crisp, aggregated breakdown of recurring subscription costs, food habits, and travel expenditures, plus quick visibility into flagged card transactions.
- **The Storyteller / Sharer (Rohan, 22)**: Wants to generate an aesthetic, shareable "Year in Receipts" thermal slip highlighting his top 5 artists, biggest expense, and most active streaming days.

---

## 7. Dataset Inventory & Schema Specifications

Treat the extracted files in `datasets/` as the immutable source of truth:

```text
datasets/
├── spotify/
│   ├── spotify_data_dictionary.csv (655 bytes)
│   └── spotify_history.csv         (21,329,900 bytes, 149,862 lines)
├── household/
│   └── Daily Household Transactions.csv (189,954 bytes, 2,463 lines)
└── financial/
    ├── Augmented_IndiaTransactMultiFacet2024.csv  (2,530,613 bytes, 10,269 lines)
    ├── Augmented_IndiaTransactMultiFacet2024.json (4,950,433 bytes)
    ├── Augmented_IndiaTransactMultiFacet2024.tsv  (2,500,339 bytes)
    └── Augmented_IndiaTransactMultiFacet2024.xml  (7,819,157 bytes)
```

### Dataset 1: Spotify Listening History
- **Source File**: `datasets/spotify/spotify_history.csv`
- **Record Count**: **149,860 streams** (*Note: Record counts exclude CSV header rows*)
- **Date Range**: `2013-07-08` to `2024-12-15` (11.4 years)
- **Schema**:
  | Field | Type | Description | Sample Value |
  | :--- | :--- | :--- | :--- |
  | `spotify_track_uri` | `string` | Unique track identifier | `2J3n32GeLmMjwuAzyhcSNe` |
  | `ts` | `string` | Playback end timestamp (UTC) | `2013-07-08 02:44:34` |
  | `platform` | `string` | Playback client/OS | `web player`, `android`, `ios` |
  | `ms_played` | `number` | Playback duration in milliseconds | `229589` |
  | `track_name` | `string` | Name of the song | `Electric Feel` |
  | `artist_name` | `string` | Name of the recording artist | `MGMT` |
  | `album_name` | `string` | Album or release title | `Oracular Spectacular` |
  | `reason_start` | `string` | Playback trigger | `clickrow`, `trackdone`, `fwdbtn` |
  | `reason_end` | `string` | Playback termination trigger | `trackdone`, `clickrow`, `fwdbtn` |
  | `shuffle` | `boolean` | Shuffle mode active (`TRUE`/`FALSE`) | `FALSE` |
  | `skipped` | `boolean` | Track skipped before completion | `FALSE` |

### Dataset 2: Daily Household Transactions
- **Source File**: `datasets/household/Daily Household Transactions.csv`
- **Record Count**: **2,461 entries** (*Note: Record counts exclude CSV header rows*)
- **Date Range**: `2015-01-01` to `2018-09-20` (~3.75 years)
- **Schema**:
  | Field | Type | Description | Sample Value |
  | :--- | :--- | :--- | :--- |
  | `Date` | `string` | Transaction date (with optional time) | `20/09/2018 12:04:08`, `1/1/2015` |
  | `Mode` | `string` | Payment channel | `Cash`, `Saving Bank account 1`, `Credit Card` |
  | `Category` | `string` | High-level expenditure category | `Food`, `Transportation`, `subscription` |
  | `Subcategory` | `string` | Granular purchase type | `Train`, `snacks`, `Netflix`, `Milk` |
  | `Note` | `string` | User memo / contextual detail | `Idli medu Vada mix 2 plates`, `Ganesh idol` |
  | `Amount` | `number` | Transaction value | `60`, `12500` |
  | `Income/Expense`| `string` | Cashflow direction | `Expense`, `Income`, `Transfer-Out` |
  | `Currency` | `string` | Currency code | `INR` |

### Dataset 3: India Multi-Facet Transactions
- **Source File**: `datasets/financial/Augmented_IndiaTransactMultiFacet2024.csv`
- **Record Count**: **10,267 records** (*Note: Record counts exclude CSV header rows*)
- **Date Range**: `2022-04-17` to `2024-04-16` (2 years)
- **Schema**:
  | Field | Type | Description | Sample Value |
  | :--- | :--- | :--- | :--- |
  | `trans_id` | `number?` | Transaction reference ID | `295780.0` |
  | `trans_date_trans_time` | `string` | Date and time stamp | `12/26/2023 0:55` |
  | `cc_num` | `string/num`| Masked card number | `4126110000000000.0` |
  | `merchant` | `string` | Merchant business name | `fraud_Bedi-Krish Pvt Ltd` |
  | `category` | `string` | Merchant category | `entertainment`, `travel`, `online_shopping` |
  | `amt` | `number` | Transaction amount in INR | `8552.65` |
  | `first`, `last` | `string` | Customer name | `Baiju Sharma`, `Drishya Bumb` |
  | `gender` | `string` | Customer gender (`M`/`F`) | `F` |
  | `street`, `city`, `state` | `string` | Customer location details | `Varanasi`, `Rajasthan` |
  | `lat`, `long` | `number` | Customer geographic coordinates | `27.8408555`, `93.934433` |
  | `city_pop` | `number` | Population of customer city | `691077.0` |
  | `job` | `string` | Occupation title | `Surveyor, hydrographic` |
  | `dob` | `string` | Date of birth | `2/23/1993` |
  | `merch_lat`, `merch_long` | `number` | Merchant coordinates | `-3.676868`, `145.213831` |
  | `is_fraud` | `number?`| Fraud indicator (`1.0` or `0.0`) | `0.0` / `1.0` |
  | `customer_id` | `string/num`| Customer identifier | `6.24e+18` |

---

## 8. Data Integration & Preprocessing Strategy

Because the raw datasets total ~24 MB (with 150k+ rows) and the application must be strictly frontend-only, browser memory and initial bundle load must be protected:

1. **Pre-aggregated Static Indices**:
   - Generate compact, type-safe JSON summaries at build time:
     - `timeline-summary.json`: Monthly/yearly aggregated metrics across all 3 datasets.
     - `spotify-insights.json`: Top artists, albums, platforms, skip rates, and listening hours per year and overall.
     - `household-insights.json`: Category breakdowns, cashflow distributions, daily habits, and memorable micro-moments.
     - `financial-insights.json`: Category distribution, geographic spread, demographic breakdown, and fraud audit highlights.
     - `curated-receipts.json`: Representative receipt samples from all 3 facets for instant itemized browsing.
2. **Client-Side Search & Filter Engine**:
   - Fast in-memory filtering across indexed items without blocking the main UI thread.
3. **Data Integrity & Null Handling**:
   - Cleanse missing values in `trans_id`, `category`, `city`, `state`, and `is_fraud` using deterministic fallback values (e.g., `"Uncategorized"`, `"General Merchant"`, `"Unknown Location"`).
   - Normalize dates into ISO 8601 timestamps (`YYYY-MM-DDTHH:mm:ssZ`) for uniform sorting and comparison.

---

## 9. Information Architecture & Navigation

```text
Your Life, In Receipts
├── Header & Master Navigation
│   ├── Logo & Brand Monogram ("🧾 Life in Receipts")
│   ├── Global Summary Stat Bar (Total Days, Tracks Streamed, Total INR Spent, Active Eras)
│   └── Section Nav (1. Life Overview, 2. Thermal Receipt Generator, 3. The 3 Facets, 4. Timeline Ledger, 5. Security & Risk Audit)
│
├── Section 1: Executive Life Overview (The Master Ledger)
│   ├── 4 High-Impact KPI Stat Cards (Music Time, Household Spend, Card Commerce, Fraud Shield)
│   ├── Unified Life Pulse Chart (Soundtrack hours vs Financial expenditure over 2013–2024)
│   └── "Receipt of the Era" Featured Showcase
│
├── Section 2: Interactive Thermal Receipt Generator (The Hero Experience)
│   ├── Preset Selector ("College Years 2014", "Household Hustle 2016", "Digital Commerce 2023", "All-Time Master Receipt")
│   ├── Custom Scope Builder (Date Range, Facet Filter, Item Count)
│   ├── Live Rendered Thermal Receipt Component
│   │   ├── Jagged Paper Edge (Top & Bottom)
│   │   ├── Monospaced Store Header & Barcode
│   │   ├── Itemized Table (Tracks / Expenses / Card Transactions)
│   │   ├── Subtotal, Tax/Time, and Grand Total
│   │   └── QR Code & Paper Tear Animation
│   └── Action Bar (Download SVG/PNG, Copy Summary, Print Receipt, Toggle Dark/Thermal Theme)
│
├── Section 3: The Three Life Facets (Deep Dives)
│   ├── Tab 1: 🎵 Cultural Receipt (Spotify Listening Life)
│   │   ├── Top Artists, Tracks & Albums
│   │   ├── Platform Shifts (Web Player → Android/iOS)
│   │   └── Skip & Shuffle Behavior Analysis
│   ├── Tab 2: ☕ Everyday Living Receipt (Daily Household)
│   │   ├── Category Pie/Bar Breakdown (Food, Transit, Subscriptions, Festivals)
│   │   ├── Real-life Micro-moments ("Tea", "Ganesh idol", "Ironing")
│   │   └── Cashflow Direction (Income vs Expense vs Investments)
│   └── Tab 3: 💳 Commercial Milestone Receipt (Multi-Facet Financial)
│   │   ├── Lifestyle Spending by Category & Merchant
│   │   ├── Demographics & Geographic State Map/Cards
│   │   └── Employment/Job spending patterns
│
├── Section 4: Interactive Timeline & Item Ledger
│   ├── Compound Filter Bar (Search Query + Facet Filter + Year/Era Slider + Sort Order)
│   ├── Chronological Item Cards (Music streams, Grocery items, Card transactions)
│   └── Contextual Empty & Loading States
│
├── Section 5: Security & Anomaly Audit (Fraud Receipts)
│   ├── Fraud vs Legitimate Transaction Split
│   ├── Flagged Merchant Highlights
│   └── Geolocation Distance Delta Warning
│
└── Footer & Compliance Meta
    ├── Architecture & Compliance Info
    ├── Source Code Repository Link
    └── Dataset Provenance & Privacy Statement (100% Client-Side)
```

---

## 10. Visual Design System & Aesthetics

### Core Aesthetic: "Editorial Thermal Ledger"
Avoid generic flat dashboards or garish neon schemes. Use a tactile, editorial aesthetic inspired by thermal receipt rolls, archival newsprint, and warm modern typography.

### Design Tokens (`:root`)
```css
:root {
  /* Canvas & Backgrounds */
  --color-canvas: #f6f3ee;          /* Archival warm paper */
  --color-canvas-subtle: #eee9e0;   /* Secondary paper tint */
  --color-surface: #ffffff;         /* Clean card surface */
  --color-surface-elevated: #faf8f5;/* Thermal receipt paper surface */
  --color-receipt-border: #e0d8cc;  /* Paper fold/perforation line */
  
  /* Typography & Ink */
  --color-ink-primary: #1e1b18;     /* Deep carbon black */
  --color-ink-secondary: #5c554e;   /* Faded thermal ink */
  --color-ink-muted: #8c827a;       /* Monospaced metadata ink */
  
  /* Brand Accents */
  --color-accent-primary: #c2410c;  /* Warm ember/terracotta */
  --color-accent-subtle: #ffedd5;   /* Amber wash */
  --color-accent-music: #059669;    /* Forest mint (Spotify / Sound) */
  --color-accent-spend: #2563eb;    /* Indigo blue (Daily Household) */
  --color-accent-card: #7c3aed;     /* Royal violet (Commerce / Multi-facet) */
  
  /* Semantic Status */
  --color-status-success: #16a34a;  /* Verified / Legitimate */
  --color-status-warning: #d97706;  /* High spend / Alert */
  --color-status-danger: #dc2626;   /* Flagged / Fraudulent */
  --color-status-info: #0284c7;     /* Information / Insight */
  
  /* Structural Dimensions */
  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --shadow-paper: 0 4px 20px -2px rgba(30, 27, 24, 0.08), 0 2px 6px -1px rgba(30, 27, 24, 0.04);
  --shadow-receipt: 0 10px 30px -5px rgba(0, 0, 0, 0.12), 0 0 1px 1px rgba(0, 0, 0, 0.05);
}
```

---

## 11. Core User Journeys

### Journey 1: Generating a Period-Scoped Master Receipt
1. User lands on the overview and views aggregate stats (11-year timeline, total listening hours, total spend).
2. User navigates to the **Thermal Receipt Generator** and selects a period preset (e.g. `"2016 Era"` or custom date range).
3. The receipt dynamically compiles and renders:
   - Top tracks streamed during that period (derived dynamically from Spotify data).
   - Top daily expenses (derived dynamically from Household data if within 2015–2018).
   - Total time listened vs total expenditure for the selected scope.
4. User clicks `"Print / Save Receipt"` to generate a downloadable vector SVG or print directly via browser print styles.

### Journey 2: Cross-Facet Deep Dive & Timeline Exploration
1. User visits the **Timeline Ledger**.
2. User filters by category (e.g., `"Food & Refreshment"` or `"Travel"`) and selects an era.
3. The ledger updates instantly with available facet items corresponding to that period.
4. User uses the search bar to query keywords; matching records are highlighted with clear facet provenance tags.

### Journey 3: Dataset Risk Review & Fraud-Label Audit
1. User clicks into the **Security & Anomaly Audit** section.
2. User inspects transactions flagged with `is_fraud = 1.0` (from Dataset 3).
3. The UI presents an anonymized, privacy-safe "Dataset Risk Slip" with masked cards (`****1234`), merchant categories, and transaction amounts.

---

## 12. Functional Requirements Matrix (P0 – P3)

### Phase 1: Functional Core (P0 — Challenge Critical)
- **FR-01: Static Data Loading & Aggregation**: Pre-processed datasets load asynchronously without lag or blocking.
- **FR-02: Global KPIs Calculation**: Total streaming hours, total financial outlay, transaction volume, active date span.
- **FR-03: Interactive Thermal Receipt Generator**: Dynamic receipt rendering with itemized tracks, household expenses, and card transactions.
- **FR-04: Multi-Dataset Facet Views**: Dedicated tabs/views for Spotify, Daily Household, and India Multi-Facet data.
- **FR-05: Compound Search & Filter Engine**: Live filtering by search query + facet/category + year/period.
- **FR-06: Zero Application-Caused Runtime Errors**: Clean console, pure functions, zero broken imports.

### Phase 2: Evaluation Safety & UX (P1 — Evaluation Critical)
- **FR-07: WCAG AA Semantic Accessibility**: Semantic HTML5 tags (`<main>`, `<section>`, `<article>`, `<header>`), explicit `aria-label`s on all buttons and inputs.
- **FR-08: Full Keyboard Traversal**: Logical tab order, visible `:focus-visible` rings on all interactive elements, keyboard-operable tabs and receipt presets.
- **FR-09: Fluid Responsive Layout**: Zero horizontal scrollbar across 375px (mobile), 768px (tablet), and 1280px (desktop).
- **FR-10: Receipt Export & Print Styling**: Pure CSS `@media print` layout and SVG download for the Thermal Receipt.
- **FR-11: Contextual Empty & Error States**: Distinct messages when search returns 0 matches vs when filters are cleared.

### Phase 3: Visual Polish & Interaction (P2 — Strong Polish)
- **FR-12: Tactile Paper & Serrated Receipt Edge**: CSS SVG mask or clip-path rendering realistic thermal slip perforations.
- **FR-13: Dynamic Barcode & Monospaced Typography**: Aesthetic receipt codes generated deterministically from dataset hashes.
- **FR-14: Micro-Interactions**: Smooth accordion expansions, tab transitions, and copy-to-clipboard feedback.

### Phase 4: Extended Value (P3 — Optional / Time Permitting)
- **FR-15: Custom Receipt Builder**: Allow user to check/uncheck individual items to build a custom composite receipt.
- **FR-16: Local Storage Saved Receipts**: Bookmark customized receipts to `localStorage` for re-opening across refreshes.

---

## 13. Responsive Viewport Specifications

| Breakpoint | Target Layout & Behavior |
| :--- | :--- |
| **Mobile (< 768px)** | - Single-column vertical layout.<br>- Full-width Thermal Receipt with horizontal padding.<br>- Segmented control tabs for facets (horizontal scroll or grid).<br>- Search input takes 100% width.<br>- 44px x 44px minimum touch targets on all buttons. |
| **Tablet (768px – 1024px)** | - 2-column stats and facet cards.<br>- Centered Thermal Receipt component with side controls.<br>- Inline filter bar with wrap. |
| **Desktop (> 1024px)** | - Max-width container (`1200px`) centered.<br>- Split view: Thermal Receipt preview on left, customizable controls/ledger on right.<br>- Multi-column facet breakdowns and interactive charts. |

---

## 14. Accessibility (A11y) Requirements (WCAG 2.1 AA)

1. **Explicit Accessible Names**:
   - Every button, tab, input, and icon control MUST have a clear `aria-label` or visible text.
   - Example: `<button aria-label="Generate 2016 Hustle Year Receipt">`
2. **Keyboard Traversal**:
   - All interactive controls reachable via <kbd>Tab</kbd> and actionable via <kbd>Enter</kbd> or <kbd>Space</kbd>.
   - Modal/drawer close buttons actionable via <kbd>Escape</kbd>.
3. **Contrast Compliance**:
   - Text to background contrast ratio $\ge 4.5:1$ for body copy and $\ge 3:1$ for large text/headings.
   - Thermal receipt monospaced ink has high contrast against paper background.
4. **Color Independence**:
   - Status indicators (e.g. Fraud, Legitimate, Expense, Income) must include text labels or icons alongside color.
5. **Visible Focus**:
   - Every interactive control must display an intentional `:focus-visible` outline (`outline: 2px solid var(--color-accent-primary); outline-offset: 2px;`).

---

## 15. Performance & Bundle Budget

- **Initial Bundle Size**: $< 200\text{ KB}$ gzipped JS + CSS.
- **Time to Interactive (TTI)**: $< 1.0\text{ s}$ on standard mobile 4G.
- **Zero Blocking APIs**: No external network requests during core browsing; all datasets pre-compiled as static local assets.
- **Zero Heavy UI Bloat**: No Material-UI, Ant Design, or heavy chart libraries that introduce massive runtime overhead. Use lightweight SVG or pure CSS visualizations.

---

## 16. Edge Cases & Error Handling

1. **Missing / Malformed Dataset Fields**:
   - Fall back to standard placeholders (`"Unknown Artist"`, `"General Expense"`, `"Uncategorized"`).
2. **High Volume Search Filtering**:
   - Debounce search input ($150\text{ms}$) to keep typing fluid over large result lists.
3. **Zero Match Queries**:
   - Display a dedicated "No Receipts Found" empty state with a "Reset Filters" action button.
4. **Print / Export Failures**:
   - Provide direct SVG copy and standard browser `window.print()` fallback if clipboard API is restricted.

---

## 17. Implementation & Verification Roadmap

```text
Phase 1: Discovery, Pre-processing & Architecture
  ├── 1. Data inspection & validation across all 3 source datasets
  ├── 2. Core documentation: PDR.md, AGENTS.md, README.md
  └── 3. Pre-processing scripts to produce clean static JSON assets in src/data/

Phase 2: Core Foundation & UI Shell
  ├── 1. Project bootstrap (Vite + React 18 + TypeScript)
  ├── 2. Design system tokens & layout shell (Editorial Thermal Ledger)
  ├── 3. Global KPI metric calculations & data loaders
  └── 4. Thermal Receipt Generator core component

Phase 3: The 3 Facets & Timeline Ledger
  ├── 1. Cultural (Spotify), Living (Household), and Commercial (Card) facet views
  ├── 2. Compound search & filtering engine
  ├── 3. Timeline ledger with multi-era navigation
  └── 4. Dataset risk and fraud audit view

Phase 4: Verification, Build & Deployment Preparation
  ├── 1. Typecheck (`tsc --noEmit`), Lint (`npm run lint`), and Build (`npm run build`)
  ├── 2. Verification of static bundle output in `dist/`
  ├── 3. Verification of accessibility (WCAG 2.1 AA) and responsive layout
  └── 4. Deployment preparation and documentation for static hosting (Vercel)
```

---

## 18. Definition of Done (DoD)

The project is considered complete and production-ready ONLY when:
- [ ] All three source datasets are integrated and accessible via the UI.
- [ ] The Thermal Receipt Generator generates accurate, printable, and downloadable receipts.
- [ ] The 3 facet deep-dives (Spotify, Household, Multi-Facet) display accurate derived statistics.
- [ ] Compound search and filtering operates seamlessly with zero lag.
- [ ] Layout is fully responsive with zero horizontal overflow across 375px, 768px, and 1280px viewports.
- [ ] Accessibility standards (WCAG 2.1 AA, keyboard traversal, visible focus, ARIA labels) are satisfied.
- [ ] `tsc --noEmit` succeeds with 0 TypeScript errors.
- [ ] `npm run lint` succeeds with 0 ESLint errors.
- [ ] Production build (`npm run build`) succeeds cleanly.
- [ ] Static deployment specification is documented and verified.
- [ ] `README.md` reflects the final delivered implementation.
