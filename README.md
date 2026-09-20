# Your Life, In Receipts 🧾

> **Personal Life Analytics & Thermal Ledger Platform**  
> *Transforming 11.4 years of music streaming, daily household living, and modern card commerce into an editorial personal ledger.*

---

## 🌟 Executive Overview

**"Your Life, In Receipts"** is a high-performance, responsive, accessible, frontend-only interactive life-analytics platform. It synthesizes three diverse real-world datasets into a unified personal ledger with a tactile, thermal-receipt design metaphor:

1. **🎵 Cultural Life (Spotify History)**: **149,860 listening events** spanning **2013–2024 (11.4 Years)** across 4,113 artists, 14,639 tracks, playback reasons, platforms, and skipping patterns (**5,341.5 total listening hours**).
2. **☕ Daily Living (Household Transactions)**: **2,461 daily expenses, cashflows, and micro-moments** spanning **2015–2018 (~3.75 Years)** across groceries, transit, subscriptions, and festivals (**₹19.57L total spend**).
3. **💳 Commercial Milestones (India Multi-Facet Transactions)**: **10,267 modern card transactions** spanning **2022–2024 (2 Years)** across lifestyle categories, customer demographics, job titles, geolocations, and fraud safeguards (**₹4.89 Cr total card volume**).

---

## 🚀 Key Features

- **🧾 Interactive Thermal Receipt Generator**: Synthesizes time spent, money spent, top tracks, and standout moments into downloadable and printable thermal-paper receipts with era presets and custom scope controls.
- **📊 Executive Life Overview**: 4 high-impact KPI summary cards, unified life timeline matrix, and era-defining highlights.
- **🔍 The Three Facets Deep Dives**: Dedicated views for Spotify listening habits, household cashflow breakdowns, and multi-facet commerce patterns.
- **⏱️ Chronological Timeline Ledger**: Compound search and filtering engine across all 3 datasets by keyword, facet, and year with live result counts.
- **🛡️ Dataset Risk & Fraud Audit**: Dedicated inspection tool highlighting 5,046 flagged card transactions with strictly masked card identifiers (`**** **** **** 1234`) and privacy protection.
- **♿ WCAG 2.1 AA Accessibility & Responsive Design**: Complete keyboard traversal, visible focus rings, explicit ARIA labels, and fluid zero-overflow layouts from mobile (375px) to desktop (1280px+).

---

## 🛠️ Architecture & Tech Stack

- **Framework**: React 18 + Vite + TypeScript (Strict Type Safety, 0 errors)
- **Styling**: Vanilla CSS Tokens + Modern CSS Variables (Editorial Thermal Ledger Design System)
- **Icons**: Lucide React
- **Data Pipeline**: Pre-processed static compressed JSON indices (`src/data/`) for instant client-side execution (~145KB gzipped bundle)
- **Deployment**: Static Frontend Hosting (Vercel / Netlify / Cloudflare Pages / GitHub Pages)
- **Architecture Standard**: 100% Frontend-Only — Zero backend servers, zero databases, zero external AI APIs.

---

## 📂 Project Structure

```text
"Your Life, In Receipts"/
├── datasets/                               # Immutable raw source datasets
│   ├── spotify/                            # Spotify History CSV (149,860 rows)
│   ├── household/                          # Daily Household Transactions CSV (2,461 rows)
│   └── financial/                          # India Multi-Facet Transactions CSV (10,267 rows)
├── reports/
│   ├── data-audit.json                     # Computed audit metrics
│   └── data-audit.md                       # Comprehensive data audit report
├── scripts/
│   ├── audit-datasets.mjs                  # Deterministic dataset inspection script
│   ├── preprocess-datasets.mjs             # Static JSON aggregation pipeline
│   └── validate-data.mjs                   # Data integrity and masking validator
├── src/
│   ├── types/                              # Strict TypeScript data contracts (index.ts)
│   ├── data/                               # Pre-processed static JSON indices
│   │   ├── timeline-summary.json           # 12-year timeline matrix
│   │   ├── spotify-insights.json           # Artist, album, track & platform aggregates
│   │   ├── household-insights.json         # Cashflow, categories & micro-moments
│   │   ├── financial-insights.json         # Commerce categories, states & fraud audit
│   │   └── curated-receipts.json           # 3,000+ itemized records for instant receipt compilation
│   ├── components/
│   │   ├── layout/                         # Header, Navbar, StatBar, Footer
│   │   ├── overview/                       # Executive KPIs, Unified Pulse Chart
│   │   ├── receipt/                        # ThermalReceipt, ReceiptGenerator
│   │   ├── facets/                         # SpotifyTab, HouseholdTab, FinancialTab, FacetExplorer
│   │   ├── timeline/                       # TimelineLedger with compound search
│   │   ├── audit/                          # FraudAudit view with masked data
│   │   └── common/                         # Badge, EmptyState
│   ├── App.tsx                             # Root application orchestration
│   ├── main.tsx                            # React DOM entry point
│   └── index.css                           # Thermal ledger design tokens & print styles
├── PDR.md                                  # Authoritative Product Requirements Document
├── AGENTS.md                               # Authoritative Engineering & Operational Manual
└── README.md                               # Living Public Project Documentation
```

---

## 💻 Verified Local Commands

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Commands Executed & Verified
```bash
# Data Preprocessing & Validation
node scripts/audit-datasets.mjs       # Verified (PASS: 162k+ records audited)
node scripts/preprocess-datasets.mjs  # Verified (PASS: 5 static JSON files generated)
node scripts/validate-data.mjs        # Verified (PASS: 0 validation errors)

# Typecheck & Build
npx tsc --noEmit                     # Verified (PASS: 0 TypeScript errors)
npm run build                        # Verified (PASS: dist bundle 145 kB gzipped)
```

---

## 📊 Dataset Provenance & Ground Truth

| Dataset | Source Path | Records | Time Span | Key Verified Metrics |
| :--- | :--- | :--- | :--- | :--- |
| **Spotify Streaming History** | `datasets/spotify/spotify_history.csv` | 149,860 | 2013–2024 | 5,341.5 hrs sound • Top: The Beatles (336h), The Killers (294h) • 5.25% skip rate |
| **Daily Household Transactions** | `datasets/household/Daily Household Transactions.csv` | 2,461 | 2015–2018 | ₹19.57L expenses • ₹30.42L income • 50+ memorable living notes |
| **India Multi-Facet Transactions** | `datasets/financial/Augmented_IndiaTransactMultiFacet2024.csv` | 10,267 | 2022–2024 | ₹4.89 Cr card volume • 5,046 fraud-flagged records • 100% masked cards |

---

## 🎯 Deployment & Status

### Vercel Deployment Specification
- **Deployment target**: Vercel (static web application).
- **Deployment procedure**: Deployment is performed manually by the project owner.
- **Framework Preset**: `Vite` / `React`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Environment Variables**: None required (100% client-side, zero backend / API keys required)

| Item | Details / Status |
| :--- | :--- |
| **Application** | "Your Life, In Receipts 🧾" |
| **Architecture** | 100% Client-Side Static Single Page Application |
| **Data Layer** | Complete & Preprocessed (`src/data/`) |
| **TypeScript Validation** | Verified (`tsc --noEmit` PASS, 0 errors) |
| **Production Build** | Verified (`dist/` generated, exit code 0) |
| **Live Production URL** | *Deployment target: Vercel. Deployment is performed manually by the project owner.* |
| **GitHub Repository** | *Managed manually by the project owner.* |

---

## 📜 Privacy & Engineering Compliance

100% client-side, zero external data tracking, privacy-preserving with strictly masked financial card numbers, and built with WCAG 2.1 AA accessibility standards.
