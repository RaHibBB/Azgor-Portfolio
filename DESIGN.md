# Design — Azgor Hossin site

This documents the look as built. The user pinned the direction: layout language from alejandroha.com and the palette from silviamalavasi.com. It replaces the earlier "order receipt" direction.

## Layout language
- A giant thin-wide name, AZGOR [HOSSIN], spans the full width at the top of the home page (fitted by JS). There is no portrait. Four columns of his real store pages drift upward beside the headline.
- Section headings are `[ bracket ]` headings. The heading itself carries the brackets; there are no eyebrow labels.
- Buttons are pills: black (WhatsApp), acid green (quote), outline (secondary).
- Spacing is generous. Sections alternate between light, black, acid-green and yellow bands.
- One authored scroll moment: "Small details. / Big sales." fills from grey to black as you scroll, while an acid-green brush stroke draws under it.
- Service rows on black are full-width links. On hover, green wipes in from the left, the arrow turns 45°, and a work thumbnail peeks out.

## Color
| Token | Value | Use |
|---|---|---|
| `--bg` | #f2ede4 | Page ground (warm white) |
| `--bg-2` | #e9e3d7 | Chips, groups, table heads |
| `--ink` / `--black` | #0a0907 | Text, dark bands |
| `--on-black-2` | #a9a59b | Secondary text on black |
| `--acid` | #b8ff00 | Primary action, marks, results band |
| `--pink` | #ff006e | Pins, focus ring on light, list dashes |
| `--pink-soft` | #ffc9df | Product-page tag, negative deltas |
| `--yellow` | #f3cf00 | VA shift-log band, landing-page tag |

## Type
- **Anybody** (variable wdth 50–150, wght 100–900): display. Weight 200 at wdth 150 for the name and closer; weight 800 at wdth 110–130 for headings, pills and nav.
- **Hanken Grotesk**: running text.
- **Martian Mono** (wdth 87.5): meta labels, tables, numbers.

## Components
Pill, chip, bracket heading, `.mark` highlight, service row, nums band, why cards, group cards, list-lines, data table (`.table-wrap`), SEO field sheet, timeline (`.track`), shift log, KPI grid, anatomy with pins, proof thumbs, portfolio card (hover scrolls the full page inside a 3:4 frame), filters, full-page `<dialog>` viewer, next-service link, closer + footer.

## Rules
- Shadows are neutral with offset and blur. No glows.
- Real content is tagged "Real rows", "Real data" or "Real orders". The VA day is tagged "Example schedule".
- No invented reviews, clients, prices or stats. Customer and store names are removed from screenshots.
