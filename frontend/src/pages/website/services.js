import { Globe, LayoutTemplate, ShoppingBag, ShoppingCart, Wrench } from "lucide-react";

/* The pages in the navbar's "Website Setup" dropdown.
   Used for the overview cards and the "related services" links on each page. */
export const WEBSITE_SERVICES = [
  { path: "/website/domain-hosting", title: "Domain & Hosting Setup", short: "The right domain, reliable hosting, SSL and professional email, configured properly.", icon: Globe },
  { path: "/website/wordpress", title: "WordPress Setup", short: "A fast, secure, easy-to-edit WordPress website built around your business.", icon: LayoutTemplate },
  { path: "/website/shopify", title: "Shopify Setup", short: "A ready-to-sell Shopify store with theme, products, payments and shipping set up.", icon: ShoppingBag },
  { path: "/website/ecommerce-setup", title: "E-commerce Setup", short: "A complete online store with platform, products, checkout, payments, shipping and taxes ready to go.", icon: ShoppingCart },
  { path: "/website/maintenance", title: "Website Maintenance", short: "Updates, backups, security and uptime monitoring so your site stays healthy.", icon: Wrench },
];

export const WEBSITE_LINKS = {
  start: (service) => `/get-started?service=${service}`,
  help: "/contact",
};

/* SEO metadata for every Website Setup page (title ≤ 60 chars, description ≤ 155 chars). */
export const WEBSITE_SEO = {
  "/website": {
    title: "Website Setup Services for Small Business | Leader Business",
    description: "Website setup services for small businesses: domain and hosting, WordPress and Shopify builds, plus ongoing maintenance to keep your site fast and secure.",
    keywords: ["website setup services", "small business website", "website design and setup", "business website launch", "WordPress or Shopify", "website management"],
  },
  "/website/domain-hosting": {
    title: "Domain & Hosting Setup Services | Leader Business",
    description: "Domain and hosting setup: choose and register your domain, pick reliable web hosting, and configure DNS, SSL certificates and professional business email.",
    keywords: ["domain and hosting setup", "domain registration", "web hosting setup", "DNS configuration", "SSL certificate setup", "business email setup"],
  },
  "/website/wordpress": {
    title: "WordPress Website Setup Services | Leader Business",
    description: "WordPress website setup: hosting, theme, essential plugins, SEO, security, speed and backups, so you get a professional site that's easy to update.",
    keywords: ["WordPress website setup", "WordPress installation", "WordPress theme setup", "WordPress plugins", "WordPress SEO", "small business WordPress site"],
  },
  "/website/shopify": {
    title: "Shopify Store Setup Services | Leader Business",
    description: "Shopify store setup: theme customization, products and collections, payments, shipping, taxes, apps and launch, so you can start selling online fast.",
    keywords: ["Shopify store setup", "Shopify setup service", "Shopify theme customization", "Shopify product upload", "launch a Shopify store", "Shopify expert"],
  },
  "/website/ecommerce-setup": {
    title: "E-commerce Setup Services for Online Stores | Leader Business",
    description: "E-commerce setup services: platform, storefront, products, payments, shipping and taxes configured so your online store is ready to sell from launch day.",
    keywords: ["ecommerce setup", "online store setup", "ecommerce store setup service", "launch an online store", "Shopify or WooCommerce setup", "small business ecommerce"],
  },
  "/website/maintenance": {
    title: "Website Maintenance Services & Plans | Leader Business",
    description: "Website maintenance services: software updates, daily backups, security monitoring, uptime checks, speed optimization and content edits for your site.",
    keywords: ["website maintenance services", "WordPress maintenance", "website care plan", "website security monitoring", "website backups", "website updates"],
  },
};

const DISCLAIMER =
  "Leader Business Developer is an independent business-services provider. We are not affiliated with, endorsed by or partnered with WordPress, Shopify, or any domain registrar, hosting company or software named on this page; their names are trademarks of their owners. Third-party platforms set their own pricing, plans and terms, which can change at any time. We don't guarantee search rankings, traffic, sales or uptime provided by third-party hosts. Screens and figures shown are illustrative samples.";

/* Section config read by the shared service page template. */
export const WEBSITE_SECTION = {
  hubPath: "/website",
  hubLabel: "Website Setup",
  services: WEBSITE_SERVICES,
  seo: WEBSITE_SEO,
  disclaimer: DISCLAIMER,
  relatedTitle: "Related website services",
  viewAllLabel: "View all website services",
  helpTitle: "Talk to a website specialist",
  helpText: "Tell us about your business and goals. We'll recommend the platform and setup that fit your budget.",
  helpTo: WEBSITE_LINKS.help,
};
