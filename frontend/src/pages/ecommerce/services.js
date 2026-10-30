import { Tags, ShoppingCart, Boxes, Truck, Store, Package } from "lucide-react";

/* The pages in the navbar's "Ecommerce Solution" dropdown.
   Used for the overview cards and the "related services" links on each page. */
export const ECOMMERCE_SERVICES = [
  { path: "/ecommerce/product-listing", title: "Product Listing & Catalog Setup", short: "Search-friendly product pages, clean categories and organized catalog data.", icon: Tags },
  { path: "/ecommerce/cart-checkout", title: "Shopping Cart & Checkout Setup", short: "A fast, trustworthy checkout that turns more carts into orders.", icon: ShoppingCart },
  { path: "/ecommerce/inventory-orders", title: "Inventory & Order Management", short: "Real-time stock sync and smooth order workflows across every channel.", icon: Boxes },
  { path: "/ecommerce/shipping", title: "Shipping & Fulfillment Setup", short: "Shipping rates, labels, carriers and fulfillment options that fit your products.", icon: Truck },
  { path: "/ecommerce/marketplaces", title: "Marketplace Integration (eBay, Etsy, Walmart)", short: "Sell on major marketplaces with listings, stock and orders kept in sync.", icon: Store },
  { path: "/ecommerce/amazon-setup", title: "Amazon Setup", short: "Seller Central account, listings, brand and fulfillment set up the right way.", icon: Package },
];

/* Same link conventions as the other service pages. */
export const ECOMMERCE_LINKS = {
  start: (service) => `/get-started?service=${service}`,
  help: "/contact",
};

/* SEO metadata for every Ecommerce page (title ≤ 60 chars, description ≤ 155 chars). */
export const ECOMMERCE_SEO = {
  "/ecommerce": {
    title: "Ecommerce Solutions for Small Business | Leader Business",
    description: "Ecommerce setup services: product listings, checkout, inventory, shipping, marketplaces and Amazon. Launch and grow your online store with expert help.",
    keywords: ["ecommerce solutions", "ecommerce setup services", "online store setup", "small business ecommerce", "multichannel selling", "ecommerce consulting"],
  },
  "/ecommerce/product-listing": {
    title: "Product Listing & Catalog Setup Services | Leader Business",
    description: "Professional product listing and catalog setup: SEO titles, descriptions, categories, variants and bulk uploads for Shopify, WooCommerce and marketplaces.",
    keywords: ["product listing services", "ecommerce catalog setup", "product data management", "SEO product descriptions", "bulk product upload", "product categorization"],
  },
  "/ecommerce/cart-checkout": {
    title: "Shopping Cart & Checkout Setup Services | Leader Business",
    description: "Shopping cart and checkout setup that reduces cart abandonment: guest checkout, clear costs, digital wallets, mobile-first design and order emails.",
    keywords: ["shopping cart setup", "ecommerce checkout setup", "checkout optimization", "reduce cart abandonment", "guest checkout", "one-page checkout"],
  },
  "/ecommerce/inventory-orders": {
    title: "Inventory & Order Management Setup | Leader Business",
    description: "Inventory and order management setup: real-time stock sync, low-stock alerts, order routing and returns workflows across your store and marketplaces.",
    keywords: ["inventory management setup", "order management system", "multichannel inventory sync", "prevent overselling", "reorder point", "ecommerce order workflow"],
  },
  "/ecommerce/shipping": {
    title: "Ecommerce Shipping & Fulfillment Setup | Leader Business",
    description: "Ecommerce shipping and fulfillment setup: shipping zones and rates, carrier accounts, label printing, tracking emails, returns and 3PL onboarding.",
    keywords: ["ecommerce shipping setup", "fulfillment setup", "shipping rates configuration", "3PL onboarding", "shipping label software", "ecommerce returns process"],
  },
  "/ecommerce/marketplaces": {
    title: "eBay, Etsy & Walmart Integration | Leader Business",
    description: "Marketplace integration for eBay, Etsy and Walmart: seller account setup, optimized listings, inventory sync and centralized order management.",
    keywords: ["marketplace integration", "eBay integration", "Etsy shop setup", "Walmart Marketplace setup", "multichannel listing", "sell on marketplaces"],
  },
  "/ecommerce/amazon-setup": {
    title: "Amazon Seller Account Setup Services | Leader Business",
    description: "Amazon seller account setup: Seller Central registration, listings, Brand Registry prep, FBA or FBM fulfillment and launch support for new sellers.",
    keywords: ["Amazon seller account setup", "Amazon Seller Central setup", "Amazon listing optimization", "Amazon FBA setup", "Amazon Brand Registry", "sell on Amazon"],
  },
};

const DISCLAIMER =
  "Leader Business Developer is an independent business-services provider. We are not affiliated with, endorsed by or partnered with Amazon, eBay, Etsy, Walmart, Shopify, WooCommerce or any carrier or software named on this page; their names are trademarks of their owners. Marketplaces and platforms set their own fees, policies and approval decisions, which can change at any time. We don't guarantee account approval, sales, rankings or delivery times. Screens and figures shown are illustrative samples. Nothing on this page is legal, tax or financial advice.";

/* Section config read by EcommercePage (hub link, service list, SEO map and wording). */
export const ECOMMERCE_SECTION = {
  hubPath: "/ecommerce",
  hubLabel: "Ecommerce Solutions",
  services: ECOMMERCE_SERVICES,
  seo: ECOMMERCE_SEO,
  disclaimer: DISCLAIMER,
  relatedTitle: "Related ecommerce services",
  viewAllLabel: "View all ecommerce solutions",
  helpTitle: "Talk to an ecommerce specialist",
  helpText: "Tell us what you sell and where. We'll recommend the setup that fits your business and budget.",
  helpTo: ECOMMERCE_LINKS.help,
};
