# Azgor Hossin — Shopify services site

A static multi-page site with no build step on Vercel. There are 12 pages:

| URL | File |
|---|---|
| `/` | `index.html` |
| `/services` | `services.html` |
| `/services/product-research` and the other 6 service pages | `services/*.html` |
| `/portfolio` | `portfolio.html` |
| `/about` | `about.html` |
| `/contact` | `contact.html` |

## Editing pages

Every page is generated from `src/build.mjs` (layout and copy) and `src/data.mjs` (services and the portfolio list). Edit those files, then run this from the project root:

```
node src/build.mjs
```

Don't edit the generated `.html` files by hand. The next build overwrites them.

## Before going live

1. **Contact links:** fill in the `CONTACT` block at the top of `script.js` (WhatsApp number, email, Fiverr URL, Upwork URL). Until then, every contact button points to `/contact`.
2. **Domain:** set `site.url` in `src/data.mjs` to the real domain, then rebuild. The share (OG) image uses it.

## Content sources

All content comes from the friend's Google Drive folder "shopify":

- Service copy comes from the Doc "Shopify Dropshipping & E-Commerce Services" and the untitled PDF, which supplied the skills list and "why hire me".
- The research table uses real rows from `Product Research - Sheet1.pdf`, with the links removed.
- The description sample is from the "Baby Electric Nail Polisher" doc.
- Portfolio images are the store screenshots, converted to WebP at 640px wide. Very long pages are cut off at 6400px.
- Results come from the Shopify analytics screenshot, with the store name blacked out.
- The orders table comes from the Shopify orders screenshot, with customer names removed.

Left out on purpose:

- The GreenPan.us screenshot, which is GreenPan's own site. Using it would imply he built GreenPan.
- The two PDFs `Shopify Product Page Desing.pdf` and `screencapture-app-funnelish-funnels…pdf`.
- The duplicate files that appear in more than one folder.

## Deploy on Vercel

Import the repo with the framework preset set to **Other**. Leave the build command empty and use the project root as the output directory. `vercel.json` turns on clean URLs. To deploy from this folder with the CLI:

```
vercel --prod
```
