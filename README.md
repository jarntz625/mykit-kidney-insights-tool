# myKIT — KidneyInsightsTool

A responsive, interactive front-end prototype for a patient-facing CKD/ESRD care app. The visual system follows the selected option 3: clean clinical surfaces, teal and navy navigation, pastel quick actions, accessible health summaries, and a persistent action bar.

## Included user experiences

- Home dashboard with health metrics, sparklines, next treatment, medications, education, fluid tracking, and progress messaging.
- My Health with a kidney health score, trend charts, care priorities, and vital logging.
- Treatments with a hemodialysis schedule, preparation checklist, treatment week, and care notes.
- Medications with dose completion, reminders, adherence, and safety guidance.
- Diet & Nutrition with nutrient targets, meal planning, food search, and dietitian contact.
- Fluid Tracker with goal editing, quick-add amounts, a seven-day chart, and a daily log.
- Appointments, Lab Results, Education, Messages, Support, and Settings screens.
- Working modals, navigation, filters, toggles, forms, responsive drawer navigation, and success toasts.

All data is fictional demonstration data. This prototype is not intended for clinical decision-making.

## Run locally

```bash
npm install
npm run dev -- --host 0.0.0.0
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

## UI verification

Start the development server on port 4173, then run:

```bash
npm run verify:ui
```

The Playwright verification covers all 12 app sections, fluid logging, medication completion, message sending, mobile navigation, horizontal overflow, and browser console errors. Results are written to `verification.json`.

## Key files

- `src/main.jsx` — application, views, mock state, and interactions.
- `src/styles.css` — responsive visual system and component styling.
- `public/assets/` — local avatar and article imagery extracted from the selected visual reference.
- `source-option-3.png` — selected source concept.
- `prototype-1024x1536.png` and `prototype-mobile-390x844.png` — verified browser captures.
- `design-qa.md` — final visual comparison and QA gate.
