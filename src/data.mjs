// Site content. Edit here, then run: node src/build.mjs

export const site = {
  name: "Azgor Hossin",
  url: "https://azgor-portfolio.vercel.app", // change if a custom domain is added
};

export const services = [
  {
    slug: "product-research",
    name: "Product research",
    menu: "Product research",
    short: "Winning, untapped, in-trend and upcoming-trend products, delivered as a sheet with every number you need.",
    peek: "/img/proof/tracker-1.webp",
  },
  {
    slug: "product-listing",
    name: "Listings & descriptions",
    menu: "Listings & SEO descriptions",
    short: "Unique, SEO-optimized titles, descriptions, tags and alt text, uploaded with clean images and correct variants.",
    peek: "/img/proof/desc-bracelet.webp",
  },
  {
    slug: "product-page-design",
    name: "Product page design",
    menu: "Product & landing page design",
    short: "Product and landing pages that build trust, work on mobile first and turn visitors into customers.",
    peek: "/img/work/pdp-cookware-set.webp",
  },
  {
    slug: "store-setup",
    name: "Store setup & theme",
    menu: "Store setup & theme customization",
    short: "A full store or a one product store, built and styled around your brand instead of a default theme.",
    peek: "/img/work/store-mojo-beauty.webp",
  },
  {
    slug: "order-fulfillment",
    name: "Order fulfillment",
    menu: "Order fulfillment",
    short: "Orders forward to suppliers automatically, tracking syncs back, and customers get updated.",
    peek: "/img/work/pdp-sauna-shorts.webp",
  },
  {
    slug: "shopify-va",
    name: "Full-time Shopify VA",
    menu: "Full-time Shopify VA",
    short: "Daily orders, stock, customer support and store updates, with a report every day.",
    peek: "/img/work/store-halibuy-fashion.webp",
  },
  {
    slug: "woocommerce-funnels",
    name: "WooCommerce funnels",
    menu: "WooCommerce funnels",
    short: "Elementor product pages and sales funnels with CartFlows or FunnelKit, order bumps and one-click upsells.",
    peek: "/img/work/woo-autolift.webp",
  },
];

// Portfolio: [category, file, title, subtitle, width, height]
export const work = [
  ["store", "store-mojo-beauty", "Mojo Beauty", "Beauty store homepage", 640, 3068],
  ["store", "store-halibuy-fashion", "Halibuy Fashion", "Fashion store, 80% off launch", 640, 3202],
  ["store", "store-home-living", "Home & living store", "Homepage with category grid", 640, 3220],
  ["store", "store-tactical-outdoor", "Tactical outdoor store", "Spring sale homepage", 640, 1540],
  ["store", "store-fairy-wings", "Fairy wings store", "One product store", 640, 2002],
  ["store", "store-playstation-portal", "Gaming accessory store", "One product store", 640, 1136],
  ["store", "store-valentine-roses", "Preserved roses store", "Valentineâ€™s Day campaign", 640, 1318],
  ["store", "store-trend-nifty", "Trend Nifty", "Gadget store homepage", 640, 1258],
  ["store", "store-gifts", "Gift store", "Homepage with top categories", 640, 1288],
  ["store", "store-inara", "Inara", "Best sellers homepage", 640, 674],
  ["store", "store-pet-collection", "Pet toys collection", "Collection row", 640, 204],
  ["pdp", "pdp-cookware-set", "Ceramic cookware set", "Product page, GemPages", 640, 2942],
  ["pdp", "pdp-sauna-shorts", "Sauna sweat shorts", "Product page, US store", 640, 5550],
  ["pdp", "pdp-montessori-puzzle", "Montessori fraction puzzle", "Product page with bundle offers", 640, 3724],
  ["pdp", "pdp-inflatable-tent", "Inflatable tent", "Product page, Dutch store", 640, 2260],
  ["pdp", "pdp-espresso-fr", "Espresso machine", "Product page, French store", 640, 6400],
  ["pdp", "pdp-coffee-machine", "Coffee machine", "Product page, Australian store", 640, 6400],
  ["pdp", "pdp-ems-massager", "EMS face massager", "Product page, GemPages", 640, 2188],
  ["pdp", "pdp-skindion", "Skindion Rosa", "Product page, Spanish store", 640, 3678],
  ["pdp", "pdp-swivel-tap", "Swivel tap extender", "Product page, German store", 640, 2842],
  ["pdp", "pdp-led-mask", "LED face mask", "Product page, Dutch store", 640, 2094],
  ["pdp", "pdp-pure-skin", "Pure Skin", "Store homepage and product grid", 640, 1862],
  ["pdp", "pdp-infinity-hoop", "Infinity Hoop Plus", "One product page", 640, 1058],
  ["lp", "lp-nut-milk-maker", "Nut milk maker", "Landing page", 640, 4014],
  ["lp", "lp-headlamp", "USB headlamp", "Landing page", 640, 4860],
  ["lp", "lp-smart-faucet", "Smart display faucet", "Landing page", 640, 3686],
  ["lp", "lp-belly-pro", "Belly Pro", "Maternity landing page", 640, 5086],
  ["lp", "lp-mini-printer", "Mini thermal printer", "Landing page", 640, 4474],
  ["lp", "lp-valari-pillow", "Valari pillow", "Landing page", 640, 4272],
  ["lp", "lp-gesture-car", "Gesture sensing car", "Landing page", 640, 3354],
  ["lp", "lp-nutrition-hubb", "Nutrition Hubb", "Supplement store homepage", 640, 4144],
  ["lp", "lp-bamboo-pillowcase", "BambuDream pillowcase", "Landing page", 640, 5008],
  ["lp", "lp-neck-device", "EMS neck device", "Landing page", 640, 3124],
  ["woo", "woo-autolift", "AutoLift 3000", "WooCommerce funnel, Swedish store", 640, 2538],
  ["woo", "woo-pruner", "Cordless pruner", "WooCommerce funnel, Swedish store", 640, 3726],
  ["woo", "woo-product-import", "WooCommerce product import", "Products imported with descriptions", 640, 1004],
];

export const catLabel = { store: "Store", pdp: "Product page", lp: "Landing page", woo: "WooCommerce" };
