import { UserRoundCheck, PenTool, Mail } from "lucide-react";

/* The pages in the navbar's "Branding & Digital Identity" dropdown.
   Used for the overview cards and the "related services" links on each page. */
export const BRANDING_SERVICES = [
  { path: "/branding/profile-optimization", title: "Profile Optimization", short: "Google, LinkedIn and social profiles that are complete, consistent and easy to find.", icon: UserRoundCheck },
  { path: "/branding/logo-design", title: "Logo & Visual Design", short: "A distinctive logo, color palette and typography that make your brand recognizable.", icon: PenTool },
  { path: "/branding/email-digital-cards", title: "Business Email & Digital Cards", short: "Email on your own domain, branded signatures and shareable digital business cards.", icon: Mail },
];

export const BRANDING_LINKS = {
  start: (service) => `/get-started?service=${service}`,
  help: "/contact",
};

/* SEO metadata for every Branding page (title ≤ 60 chars, description ≤ 155 chars). */
export const BRANDING_SEO = {
  "/branding": {
    title: "Branding & Digital Identity Services | Leader Business",
    description: "Branding and digital identity services for small businesses: logo and visual design, optimized online profiles, business email and digital business cards.",
    keywords: ["branding services", "digital identity", "small business branding", "brand identity design", "online presence", "business branding package"],
  },
  "/branding/profile-optimization": {
    title: "Business Profile Optimization Services | Leader Business",
    description: "Profile optimization for Google Business Profile, LinkedIn, social media and directories: complete, consistent and keyword-rich so customers find you.",
    keywords: ["profile optimization", "Google Business Profile optimization", "LinkedIn profile optimization", "social media profile setup", "local SEO listings", "NAP consistency"],
  },
  "/branding/logo-design": {
    title: "Logo & Visual Identity Design Services | Leader Business",
    description: "Logo and visual design services: custom logo concepts, color palette, typography and a brand style guide, delivered in every file format you need.",
    keywords: ["logo design services", "small business logo", "visual identity design", "brand style guide", "brand color palette", "custom logo design"],
  },
  "/branding/email-digital-cards": {
    title: "Business Email & Digital Business Cards | Leader Business",
    description: "Professional business email on your own domain, branded email signatures and digital business cards with QR codes that are easy to share anywhere.",
    keywords: ["business email setup", "professional email address", "email signature design", "digital business card", "QR code business card", "branded email"],
  },
};

const DISCLAIMER =
  "Leader Business Developer is an independent business-services provider. We are not affiliated with, endorsed by or partnered with Google, LinkedIn, Meta, Microsoft or any platform, email provider or software named on this page; their names are trademarks of their owners. Third-party platforms set their own features, pricing and verification rules, which can change at any time. We don't guarantee search rankings, profile verification, reach or sales. Logo designs are original work; trademark registration is a separate service. Screens, names and figures shown are illustrative samples.";

/* Section config read by the shared service page template. */
export const BRANDING_SECTION = {
  hubPath: "/branding",
  hubLabel: "Branding & Digital Identity",
  services: BRANDING_SERVICES,
  seo: BRANDING_SEO,
  disclaimer: DISCLAIMER,
  relatedTitle: "Related branding services",
  viewAllLabel: "View all branding services",
  helpTitle: "Talk to a branding specialist",
  helpText: "Tell us about your business and audience. We'll recommend where to start and what will make the biggest difference.",
  helpTo: BRANDING_LINKS.help,
};
