import {
  Building2, Landmark, Shield, CreditCard, Layers, ShoppingCart, Globe, Palette,
  Megaphone, FileText, Zap, TrendingUp, Building, Briefcase, Store, FileCheck,
  ClipboardCheck, IdCard, ScrollText, MapPin, Mail, Stamp, Search, SearchCheck, Bell,
  Lightbulb, Copyright,
} from "lucide-react";
import { BANKING_SERVICES } from "../banking/services";
import { MERCHANT_SERVICES } from "../merchant/services";
import { INTEGRATION_SERVICES } from "../payment-integration/services";
import { ECOMMERCE_SERVICES } from "../ecommerce/services";
import { WEBSITE_SERVICES } from "../website/services";
import { BRANDING_SERVICES } from "../branding/services";
import { MARKETING_SERVICES } from "../marketing/services";
import { LEGAL_FORMS, LEGAL_FILINGS } from "../forms/forms";
import { FREE_TOOLS } from "../resources/resources";

/* Business, Grow & Manage and Safeguard pages have no shared data file (their links live in the navbar),
   so they are listed here with the same paths the router uses. Everything else is read from each
   section's own services.js so this page can never drift out of sync with the section hubs. */
const FORMATION = [
  { path: "/business/llc", title: "Start an LLC", short: "Protect your personal assets with a fully filed limited liability company.", icon: Building2, popular: true },
  { path: "/business/corporation", title: "Form a Corporation (C / S Corp)", short: "Incorporate for investors, stock issuance and long-term growth.", icon: Landmark },
  { path: "/business/dba", title: "Register a Trade Name (DBA)", short: "Operate under a brand name that differs from your legal name.", icon: Store },
  { path: "/business/sole-proprietor", title: "Go Solo: Sole Proprietor", short: "Launch as an individual with the simplest structure and setup.", icon: Briefcase },
  { path: "/business/federal-filing", title: "State & Federal Filing", short: "We prepare and submit the paperwork your state and the IRS require.", icon: FileCheck },
];

const MANAGE = [
  { path: "/business/compliance", title: "Compliance Shield", short: "Deadline tracking and reminders that keep your company in good standing.", icon: Shield, popular: true },
  { path: "/business/annual-report", title: "Annual Report Filing", short: "On-time state annual reports without the guesswork.", icon: ClipboardCheck },
  { path: "/business/licenses", title: "Licenses & Permits", short: "Find and obtain the local, state and industry licenses you need.", icon: Stamp },
  { path: "/business/ein", title: "Get Your EIN & ITIN", short: "Your federal tax ID, for banking, hiring and filing taxes.", icon: IdCard, popular: true },
  { path: "/business/operating-agreement", title: "Operating Agreement", short: "A clear ownership and management agreement for your LLC.", icon: ScrollText },
  { path: "/business/registered-agent", title: "Registered Agent Service", short: "A reliable address for legal notices and state correspondence.", icon: MapPin },
  { path: "/business/virtual-address", title: "Virtual Address", short: "A professional business address with mail handling.", icon: Mail },
];

const BRAND = [
  { path: "/business/trademark", title: "Secure Your Trademark", short: "Register your name or logo and protect it nationwide.", icon: Stamp, popular: true },
  { path: "/business/trademark-search", title: "Deep Trademark Search", short: "A thorough search for conflicts before you file or launch.", icon: Search },
  { path: "/business/free-name-check", title: "Quick Free Name Check", short: "See whether your business name looks available.", icon: SearchCheck },
  { path: "/business/brand-watch", title: "Brand Watch Alerts", short: "Get alerted when someone files something similar to your brand.", icon: Bell },
  { path: "/business/provisional-patent", title: "Patent-Pending Filing", short: "Secure an early filing date for your invention.", icon: Lightbulb },
  { path: "/business/copyright", title: "Copyright Protection", short: "Register creative work such as writing, art, software and media.", icon: Copyright },
];

const withoutHub = (list, hubPath) => list.filter((s) => s.path !== hubPath);

/* Order follows a founder's journey: start, run, protect, get paid, sell, grow, document. */
export const CATEGORIES = [
  { id: "formation", label: "Business Formation", blurb: "Choose a structure and make it official.", icon: Building2, items: FORMATION },
  { id: "manage", label: "Grow & Manage", blurb: "Stay compliant and keep things running.", icon: TrendingUp, items: MANAGE },
  { id: "brand", label: "Brand Protection", blurb: "Safeguard your name, logo and ideas.", icon: Shield, items: BRAND },
  { id: "banking", label: "Banking", blurb: "Open and manage the right business accounts.", icon: Building, hub: "/banking", items: withoutHub(BANKING_SERVICES, "/banking") },
  { id: "merchant", label: "Merchant Solutions", blurb: "Take card payments in person and online.", icon: CreditCard, items: MERCHANT_SERVICES },
  { id: "integration", label: "Payment Integration", blurb: "Connect gateways, providers and APIs.", icon: Layers, hub: "/payment-integration", items: INTEGRATION_SERVICES },
  { id: "ecommerce", label: "Ecommerce", blurb: "Everything you need to sell online.", icon: ShoppingCart, hub: "/ecommerce", items: ECOMMERCE_SERVICES },
  { id: "website", label: "Website Setup", blurb: "Launch and maintain your online home.", icon: Globe, hub: "/website", items: WEBSITE_SERVICES },
  { id: "branding", label: "Branding & Identity", blurb: "Look professional everywhere you appear.", icon: Palette, hub: "/branding", items: BRANDING_SERVICES },
  { id: "marketing", label: "Marketing", blurb: "Reach customers with paid campaigns.", icon: Megaphone, hub: "/marketing", items: MARKETING_SERVICES },
  { id: "forms", label: "Legal Forms & Templates", blurb: "Ready-to-use agreements and state filings.", icon: FileText, hub: "/forms/legal", items: [...LEGAL_FORMS, ...LEGAL_FILINGS] },
  { id: "tools", label: "Free Tools", blurb: "Instant calculators and checkers.", icon: Zap, hub: "/resources/tools", items: FREE_TOOLS.map((t) => ({ ...t, free: true })) },
];

/* Flat, de-duplicated list (a path can only ever appear once). */
const seen = new Set();
export const SERVICES = CATEGORIES.flatMap((c) =>
  c.items
    .filter((s) => !seen.has(s.path) && seen.add(s.path))
    .map((s) => ({ ...s, category: c.id, categoryLabel: c.label }))
);

export const POPULAR = SERVICES.filter((s) => s.popular);

