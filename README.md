# Antibiotic Guide — final static build

Static GitHub Pages app for empiric therapy, antimicrobial spectrum, and local susceptibility.

## Included
- Independent antibiotic, organism, and infection selectors.
- Drug search highlights the clinically meaningful antibiotic class.
- Organisms not shown by default are inserted into the appropriate Gram/shape group when selected.
- Solid spectrum bars = expected activity; diagonal hatching = variable/unreliable activity.
- Clinically meaningful class splits, including antipseudomonal vs non-antipseudomonal carbapenems and fluoroquinolone subgroups.
- Rich adult infection library with contextual care-setting/severity and resistance modifiers.
- Preferred and alternative treatment tiers.
- Site-specific antibiograms:
  - UCSF Parnassus inpatient: 2025 Gram-negative and Gram-positive data.
  - UCSF ambulatory: 2025 outpatient S. aureus and urinary E. coli data.
  - ZSFG: 2022 urine and non-urine data.
  - SF VA: 2024 urine and non-urine data.
- UTI syndromes automatically use urine antibiograms at ZSFG/SFVA; other syndromes use non-urine tables.
- Susceptibility colors: green 90–100%, yellow 80–<90%, red <80%. No-data states remain distinct.
- Small isolate counts (<30) are flagged when available.
- Persistent not-clinical-advice disclaimer.

## Deploy
Upload `index.html` and `README.md` to the root of the existing GitHub Pages repository and commit to `main`.

## Important
This is an educational/reference tool and not clinical advice. Current institutional guidance and patient-specific isolate susceptibilities supersede this static snapshot.
