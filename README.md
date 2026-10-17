# Antibiotic Guide — final static build

Dark-mode static GitHub Pages app for antimicrobial spectrum, hospital site-based susceptibility, and UCSF IDMP empiric treatment guidance.

## Design decisions
- Spectrum uses horizontal class-colored bars only. Color denotes antibiotic class, **not** susceptibility or likelihood.
- Diagonal hatching denotes variable / agent-dependent expected activity.
- Local antibiogram percentages appear only in the right-side detail panel.
- Antibiotic rows and organism columns highlight when selected.
- Common organisms are shown by default; organisms not shown are dynamically inserted in the correct Gram stain / morphology group when searched.
- Antibiotic families use clinically meaningful subrows where within-class differences affect treatment.
- Clinical modifiers are shown only when they materially change the Preferred / Alternative recommendation displayed.

## Static susceptibility snapshot
- UCSF Parnassus inpatient: 2025 Gram-positive and Gram-negative tables supplied in this project.
- UCSF ambulatory: 2025 outpatient S. aureus and urinary E. coli tables.
- ZSFG: 2022 urine and non-urine antibiogram supplied as PDF.
- SF VA: 2024 urine and non-urine antibiogram supplied as PDF.

For ZSFG and SF VA, urinary infections automatically use the urine table; other infections use the non-urine table. With only an organism selected, both are shown when data are available.

## Deploy
Keep only `index.html` and `README.md` in the repository root if desired. GitHub Pages can publish directly from `main` / root.

## Disclaimer
For educational and reference purposes only; not clinical advice.
