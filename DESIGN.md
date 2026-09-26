# Design — The Order Receipt

Seed key 5c66db7f. Built world; this documents what shipped.

## World
The page is one continuous store receipt feeding out of a printer onto a cash-register-blue counter. Headings are stamped on the counter (left, sticky on desktop); content is printed on the paper roll (right, max 640px). On screens under 900px, each section becomes its own torn slip with teeth top and bottom.

## Color
| Token | Value | Role |
|---|---|---|
| `--counter` | #2233e0 | Drenched page ground |
| `--on-counter` / `--on-counter-soft` | #fff / #cdd3ff | Text on blue |
| `--paper` | #f6f6f2 | Thermal paper (cool white, never cream) |
| `--ink` / `--ink-soft` / `--ink-faint` | #16161a / #55555e / #74747c | Thermal ink |
| `--canary` | #ffd83d | Primary action, hover, carbon copy, focus ring on blue |
| `--pink` / `--pink-soft` | #ff6fa0 / #ffd3e2 | Second carbon copy, annotations, end-of-roll stripe |
Carbon-copy segments (e.g. the VA shift log) use #fff3b8 paper.

## Type
- **Archivo** (variable, wdth 68–90, weight 750–850, uppercase): stamped display (headlines, big totals, stub values).
- **Martian Mono** (wdth 87.5): everything printed by the receipt (labels, line items, tables, times, buttons).
- Archivo at wdth 100 for running copy. Display tops out at 6rem.

## Components
Line item (qty · item · dotted leader · value), dashed rule, double rule, perforation (dashed line with punched notches), barcode (generated SVG), research sheet table, before/after swap grid, pink letter pins + key, tracking timeline, shift log, tear-off contact stubs (masked notches), stub-shaped nav button.

## Motion
One authored moment: the hero receipt feeds out of the printer and its lines ink in sequentially. Off under `prefers-reduced-motion`. Everything else is hover only (lift, stub tilt).

## Rules
- Shadows are neutral black with offset and blur; no colored glows.
- Tags such as "Example", "Illustration" and "Example schedule" mark any synthetic content.
- No invented reviews, clients, prices or stats.
