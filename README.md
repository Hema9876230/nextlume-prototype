# NextLume

**From Parental Doubt to Career Confidence**

*One learner. One family. A future backed by evidence.*

NextLume is an AI-enabled career counselling and family decision-support platform for vocational education in India. It brings the learner **and** their family into one conversation, finds the family's specific worry, answers it with sourced data, and ends with one shared career plan.

This repository contains the **working front-end prototype (React + Vite)** built for Smart India Hackathon 2026.

| | |
|---|---|
| **Hackathon** | Smart India Hackathon 2026 |
| **Problem Statement ID** | 26241 |
| **Problem Statement** | AI-Enabled Career Counselling and Family Decision-Support Platform for Vocational Education |
| **Theme / Category** | Smart Education / Software |
| **Team** | Innovent |
| **Live prototype** | https://nextlume-prototype.netlify.app/ |

> **Prototype notice.** All data, "AI" replies, salaries, costs, confidence scores and outcome figures in this prototype are simulated or illustrative. There is no backend, no real authentication and no real language model. Do not enter real personal details.

---

## Table of contents

1. [The problem](#the-problem)
2. [The solution](#the-solution)
3. [How NextLume compares](#how-nextlume-compares)
4. [App workflow](#app-workflow)
5. [Architecture: target vs prototype](#architecture-target-vs-prototype)
6. [Prototype features](#prototype-features)
7. [Getting started](#getting-started)
8. [Project structure](#project-structure)
9. [How the prototype works](#how-the-prototype-works)
10. [Design principles](#design-principles)
11. [Risks and mitigation](#risks-and-mitigation)
12. [Viability](#viability)
13. [Impact and success metrics](#impact-and-success-metrics)
14. [Research and references](#research-and-references)
15. [Roadmap](#roadmap)
16. [Limitations](#limitations)
17. [Licence](#licence)

---

## The problem

Vocational training in India often fails before it starts, not because options are missing, but because **parental perception** is a barrier. A learner may want a vocational path, but the family rejects it on doubt about salary, job security, safety, social status or distance. Existing tools talk to the learner alone, give generic answers, or cannot scale to every district.

## The solution

NextLume runs a joint learner-and-parent counselling session:

1. **Finds the worry.** The family's main concern is tagged (salary, safety, job security, social status, distance).
2. **Answers with evidence.** Responses use sourced, dated data rather than guesses, and say so when data is missing.
3. **Lets the family test the numbers.** Career comparison and a deterministic ROI calculator show cost, time and earning range.
4. **Ends with one shared plan.** A 30-day family action plan, saved and printable.
5. **Escalates when needed.** Unresolved cases go to a human counsellor, with consent.
6. **Shows administrators where resistance is concentrated.** Aggregate dashboards only.

### Key ideas

- **Family Confidence Engine:** a before/after confidence score for each session.
- **Proof-of-Outcome cards:** career evidence with source, date and limits; the system abstains when there is no data.
- **Deterministic ROI simulator:** costs, payback and earnings come from code and database queries, never from an LLM guess.
- **Voice, Hindi and English:** designed for low-literacy parents.
- **Human counsellor and resistance map:** escalation for hard cases and aggregate analytics for administrators.

## How NextLume compares

Typical capability by category; not a review of any named product.

| Capability | **NextLume** | Learner-only portals | Generic AI chatbots | Offline counselling |
|---|:---:|:---:|:---:|:---:|
| Engages parent and learner together | Yes | No | No | Partly |
| Detects the parent's specific concern | Yes | No | Partly | Partly |
| Verified, cited local outcome data | Yes | Partly | No | No |
| Voice and regional languages for low literacy | Yes | Partly | Partly | Yes |
| Human counsellor escalation | Yes | No | No | Yes |
| Resistance analytics for administrators | Yes | No | No | No |
| Scales cheaply across districts | Yes | Yes | Yes | No |

## App workflow

```
Family onboarding ─► Concern analysis ─► Evidence retrieval ─► Joint counselling ─► Resolved?
 language, district,   AI tags salary,    database + RAG,       voice chat, career     │
 budget, worry         safety, status     cited sources         comparison             ├─ Yes ─► Family plan saved ─► Follow-up enrolment
                                                                                       └─ No ──► Human counsellor (with consent)
                                                                                                          │
                                                          Admin dashboard (aggregate only) ◄──────────────┘
                                                          concern map, confidence change, escalations
```

## Architecture: target vs prototype

The submission proposes the full stack below. This repository implements the **front-end journey** with simulated services so the whole experience can be demonstrated end to end.

| Layer | Target design | Status in this repository |
|---|---|---|
| Frontend | React + Tailwind, installable PWA | React + Vite with plain CSS. No Tailwind, no PWA manifest or service worker yet |
| Backend | FastAPI with role-based access | Not built. State lives in the browser (`localStorage`); "Demo access" has no real login |
| Evidence DB | PostgreSQL: statistics, sources, dates | Not built. 8 illustrative careers are hard-coded in `src/data.js` |
| AI layer | LLM + RAG with cited answers | Simulated: keyword matching returns canned replies (English and Hindi) |
| Voice | Hindi and English speech in / out | Not built |
| Analytics | Recharts dashboard, Docker deploy | Dashboards and ROI chart built with plain HTML/SVG. No Docker setup yet |

## Prototype features

| Page | Route | What it does |
|---|---|---|
| Home | `#/` | Overview, how it works, benefits |
| Family counselling | `#/start` | 4-step onboarding with validation: learner, career and budget, family concerns, review |
| Careers | `#/explore` | Search and sort 8 vocational careers |
| Career details | `#/career/:id` | Training, salary, skills, safety, progression, location |
| Chat | `#/chat` | Simulated counsellor; speak as Family or Learner; quick-reply chips; finish session (raises the demo confidence score) |
| Compare | `#/compare` | Side-by-side table with a "what differs" summary |
| ROI | `#/roi` | Deterministic payback calculator with cost vs cumulative income chart |
| Action plan | `#/plan` | 4-week checklist, documents, questions for the provider, family checklist, print / save as PDF |
| Sessions | `#/sessions` | Saved sessions; resume, open plan, mark complete, reset demo data |
| Dashboards | `#/dash` | Counsellor view (sessions and detail) and Admin view (concern, career, budget, district and status charts) with filters |

Also included: English / Hindi toggle, automatic light and dark theme, print-friendly plan, data persisted in the browser, labelled inputs and visible focus styles.

## Getting started

**Requirements:** Node.js 20.19+ (or 22.12+) and npm.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | Purpose |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build in `dist/` |
| `npm run preview` | Serve the production build locally |

`package.json` uses the `latest` tag for every dependency, so `npm install` fetches the newest releases; commit the generated `package-lock.json` to pin them.

### Deploying

The app is a static site with hash routes, so it runs on any static host (GitHub Pages, Netlify, Vercel, S3) with no rewrite rules. Upload `dist/`. For a sub-path such as `https://user.github.io/nextlume/`, set the base in `vite.config.js`:

```js
export default defineConfig({
  base: "/nextlume/",
  plugins: [react()],
});
```

## Project structure

```
nextlume/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx          Entry point
    ├── App.jsx           Header, language button, footer, hash router
    ├── store.jsx         AppProvider / useApp(): persisted state, UI state, actions, i18n helpers
    ├── data.js           Careers, districts, concern labels, translations, seed sessions, reply text
    ├── utils.js          Reply engine, chat greeting, action-plan builder, helpers
    ├── format.js         Indian-style number formatting
    ├── index.css         Styles (light, dark, print)
    └── pages/            Home, Start, Explore, Career, Chat, Compare, Roi, Plan, Sessions, Dashboard
```

## How the prototype works

- **State.** `AppProvider` keeps persisted state (language, sessions, chat messages, plan ticks) in `localStorage` under the key `nl_v2`, and in-memory UI state (compare list, ROI inputs, filters, half-filled form). Pages read it through `useApp()`.
- **Simulated counsellor.** `reply()` in `utils.js` matches the message against English and Hindi keyword patterns (`KW` in `data.js`), then builds an answer from the selected career. If nothing matches, it falls back to the session's main concern. This is the function to replace with a real RAG service.
- **Language.** UI text lives in `T` and the career, concern and status tables as `[English, Hindi]` pairs.
- **Adding a career.** Add an object to the `C` array in `data.js` (`id`, `n`, `h`, `d`, `m`, `c`, `q`, `s`, `sk`, `r`, `sf`, `p`, `km`). Every page picks it up.
- **Resetting.** Use **Reset demo data** on the Sessions page, or clear `nl_v2` in local storage.

## Design principles

> **The LLM explains. Statistics and ROI come from database queries and deterministic code.**

- Every number shown must have a source, a date and stated limits, or the system abstains.
- Collect only what is needed; get consent before sharing with a counsellor; administrators see aggregates only.
- A confidence score is an indicator, not proof.
- Provider fees never buy ranking or change the evidence shown.

## Risks and mitigation

| Risk | Mitigation |
|---|---|
| Sparse or inconsistent local placement data | Seed official sources; show source, date and limits; abstain when data is missing |
| The LLM may invent salaries or rates | Numbers come from database queries only; the LLM explains; every claim is cited |
| Family privacy and learners' data | Collect only what is needed; consent before sharing; admins see aggregates only |
| A confidence score is not proof | Treat it as an indicator; track follow-up enrolment; escalate unresolved cases |

## Viability

Proposed revenue streams (pricing to be set after the pilot):

1. **B2G platform licence:** state and district skill missions pay an annual licence per district deployed.
2. **Provider outcome analytics:** training centres subscribe to verified-outcome reports and parent-ready profiles.
3. **CSR and NGO grants:** funded pilots in rural, low-literacy and first-generation-learner districts.
4. **Counsellor network fee:** per-session fee for certified human counsellors on escalated cases.

## Impact and success metrics

| Audience | Impact |
|---|---|
| Learners and parents | Decide together on evidence; fewer vocational options rejected on doubt alone |
| Counsellors and training providers | Start each session with the concern, summary and evidence prepared |
| Administrators and policymakers | See where resistance is concentrated and which trades need better evidence |

**Measures of success:** counselling completion rate, change in confidence score, evidence coverage, human escalation rate, career-plan acceptance, and follow-up enrolment.

> Dropout reduction will be claimed only after a real pilot with follow-up evidence.

## Research and references

| Source | Used for |
|---|---|
| Skill India Digital Hub (skillindiadigital.gov.in) | Course, provider and qualification data for the evidence database |
| MSDE outcome and placement reports (msde.gov.in) | Published outcomes; PMKVY phases kept separate |
| Press Information Bureau, Feb 2026 (pib.gov.in) | Government report on PMKVY 1.0 to 3.0 short-term placement |
| NSQF and NCVET framework (ncvet.gov.in) | Progression routes from trainee to higher-level qualifications |
| SIH 2026 Problem Statement 26241, MSDE (sih.gov.in) | Parental perception as a barrier; organiser dummy datasets |

The submission cites a historical placement figure of **42.8%** for certified candidates in PMKVY 1.0 to 3.0 short-term training (PIB, Feb 2026). It is a scheme-level historical figure, **not a guarantee**. The concern-share and confidence charts in the deck, and all numbers in this prototype, are synthetic demo data for illustration only.

## Roadmap

- [ ] FastAPI backend with role-based access (family, counsellor, administrator)
- [ ] PostgreSQL evidence database with source, date and coverage for every figure
- [ ] LLM + RAG answers with citations, and abstention when no data exists
- [ ] Hindi and English speech in and out
- [ ] Human counsellor escalation flow with consent and summary sharing
- [ ] Follow-up enrolment tracking
- [ ] Installable PWA (manifest, offline shell)
- [ ] Tailwind and Recharts, if the team wants to match the proposed stack
- [ ] Docker deployment
- [ ] Automated tests (Vitest and React Testing Library)
- [ ] Real pilot with follow-up evidence

## Limitations

- No backend, database, login, voice or real AI; everything runs in the browser.
- Data is per browser and per device.
- Salaries, costs, placement and confidence scores are illustrative, not verified statistics or guarantees.
- Hindi covers the main interface and chat replies; some form labels and long descriptions are English only.

## Licence

Prototype for Smart India Hackathon 2026. Add a licence before publishing publicly.
