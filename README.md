# Azgor Hossin — Shopify services site

Static one-page site: `index.html`, `styles.css`, `script.js`, `favicon.svg`. No build step.

## Before going live, fill these in

1. **Contact links**: the `CONTACT` block at the top of `script.js`, which holds WhatsApp number, email, Fiverr URL and Upwork URL. Until you set them, every contact button scrolls to the contact section.
2. **Sample content** is labelled on the page and should be swapped for real material when you have it:
   - Research sheet rows (tagged "Example data, not real results")
   - The "MagGrip 360" before/after title (tagged "Example")
   - The product page illustration (tagged "Illustration")
   - The VA shift log (tagged "Example schedule")
3. **Proof**: the only figures used are "200+ stores" and "2+ years", both taken from Azgor's own service document. Real reviews or screenshots can go in the contact section later.

## Deploy on Vercel

Import the folder or repo in Vercel with the framework preset set to **Other**. It needs no build command, and the output directory is the project root. You can also deploy from this folder with the Vercel CLI:

```
vercel --prod
```
