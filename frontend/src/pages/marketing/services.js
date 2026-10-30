import { Search, MessageCircle, Users } from "lucide-react";

/* The pages in the navbar's "Marketing Services" dropdown.
   Used for the overview cards and the "related services" links on each page. */
export const MARKETING_SERVICES = [
  { path: "/marketing/google-ads", title: "Google Ads", short: "Search, Maps, Shopping and YouTube campaigns that reach people ready to buy.", icon: Search },
  { path: "/marketing/twitter-ads", title: "Twitter (X) Ads", short: "Promoted posts and follower campaigns that join the conversations your audience follows.", icon: MessageCircle },
  { path: "/marketing/meta-ads", title: "Meta Ads", short: "Facebook and Instagram ads that build awareness, leads and sales with precise targeting.", icon: Users },
];

export const MARKETING_LINKS = {
  start: (service) => `/get-started?service=${service}`,
  help: "/contact",
};

/* SEO metadata for every Marketing page (title ≤ 60 chars, description ≤ 155 chars). */
export const MARKETING_SEO = {
  "/marketing": {
    title: "Paid Advertising & Marketing Services | Leader Business",
    description: "Paid advertising services for small businesses: Google Ads, Twitter (X) Ads and Meta Ads campaigns, set up, tracked and optimized to grow leads and sales.",
    keywords: ["paid advertising services", "PPC management", "small business marketing", "online advertising agency", "social media ads", "ad campaign management"],
  },
  "/marketing/google-ads": {
    title: "Google Ads Management Services | Leader Business",
    description: "Google Ads management: keyword research, search, Performance Max and YouTube campaigns, conversion tracking and ongoing optimization for a better return.",
    keywords: ["Google Ads management", "PPC management", "Google Ads setup", "search ads", "Performance Max", "Google Ads for small business"],
  },
  "/marketing/twitter-ads": {
    title: "Twitter (X) Ads Management Services | Leader Business",
    description: "Twitter (X) Ads management: promoted posts, follower and website campaigns, keyword and interest targeting, creative and reporting for your business.",
    keywords: ["Twitter ads management", "X ads", "promoted posts", "Twitter advertising", "X ads campaign setup", "social media advertising"],
  },
  "/marketing/meta-ads": {
    title: "Meta Ads Management (Facebook & Instagram) | Leader Business",
    description: "Meta Ads management for Facebook and Instagram: audience targeting, scroll-stopping creative, Pixel and Conversions API tracking, testing and retargeting.",
    keywords: ["Meta ads management", "Facebook ads", "Instagram ads", "Facebook advertising agency", "Meta Pixel setup", "social media ads management"],
  },
};

const DISCLAIMER =
  "Leader Business Developer is an independent marketing-services provider. We are not affiliated with, endorsed by or partnered with Google, X Corp., Meta or any advertising platform named on this page; Google Ads, X, Twitter, Facebook, Instagram and Meta are trademarks of their owners. Ad spend is paid directly to the platform and is separate from our management fees. Platforms set their own policies, auction prices and approval rules, which can change at any time. We don't guarantee clicks, leads, sales or a specific return on ad spend. Dashboards, ads and figures shown are illustrative samples.";

/* Section config read by the shared service page template. */
export const MARKETING_SECTION = {
  hubPath: "/marketing",
  hubLabel: "Marketing Services",
  services: MARKETING_SERVICES,
  seo: MARKETING_SEO,
  disclaimer: DISCLAIMER,
  relatedTitle: "Related marketing services",
  viewAllLabel: "View all marketing services",
  helpTitle: "Talk to an advertising specialist",
  helpText: "Tell us about your goals and budget. We'll recommend the channels and campaign setup most likely to pay off.",
  helpTo: MARKETING_LINKS.help,
};
