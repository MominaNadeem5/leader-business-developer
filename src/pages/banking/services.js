import {
  Landmark, ClipboardCheck, PiggyBank, Building2, Building, Rocket, Store, Globe, Plane,
  ArrowLeftRight, CreditCard, Scale, MessageSquare, Smartphone, MapPin, Compass,
} from "lucide-react";

/* Every page in the Banking Solutions section.
   Used for the hub grid, "related services" links and breadcrumbs. */
export const BANKING_SERVICES = [
  { path: "/banking", title: "Business Banking Solutions", short: "An overview of every way we help you set up and run your business finances.", icon: Landmark },
  { path: "/banking/virtual-bank", title: "Virtual Bank Account", short: "Run your business account entirely online, from any device.", icon: Smartphone },
  { path: "/banking/physical-bank", title: "Physical Bank Account", short: "A traditional branch account with in-person service and cash handling.", icon: MapPin },
  { path: "/banking/business-account-guidance", title: "Business Bank Account Guidance", short: "Plain-language guidance on choosing, opening and managing your account.", icon: Compass },
  { path: "/banking/account-assistance", title: "Business Bank Account Assistance", short: "Get your documents in order and apply with confidence.", icon: ClipboardCheck },
  { path: "/banking/checking-savings", title: "Business Checking & Savings", short: "Understand account types and set up the right mix.", icon: PiggyBank },
  { path: "/banking/llc", title: "Banking for LLCs", short: "Open an account that keeps your LLC's money separate.", icon: Building2 },
  { path: "/banking/corporate", title: "Corporate Banking", short: "Treasury, cash management and multi-entity structures.", icon: Building },
  { path: "/banking/startups", title: "Startup Banking Solutions", short: "Banking built around fundraising, runway and growth.", icon: Rocket },
  { path: "/banking/small-business", title: "Small Business Banking", short: "Practical, everyday banking for owner-run businesses.", icon: Store },
  { path: "/banking/international", title: "International Business Banking", short: "Wires, currencies and cross-border payments.", icon: Globe },
  { path: "/banking/non-residents", title: "Banking for Non-Residents", short: "U.S. business banking when you live outside the U.S.", icon: Plane },
  { path: "/banking/payments", title: "Business Payment Solutions", short: "Send, receive and reconcile payments the right way.", icon: ArrowLeftRight },
  { path: "/banking/merchant-account", title: "Merchant Account Assistance", short: "Accept card payments with a clean, complete application.", icon: CreditCard },
  { path: "/banking/compare", title: "Compare Business Bank Accounts", short: "Find the type of account that fits how you work.", icon: Scale },
  { path: "/banking/consultation", title: "Business Banking Consultation", short: "One-on-one guidance from a banking specialist.", icon: MessageSquare },
];

export const findService = (path) => BANKING_SERVICES.find((s) => s.path === path);

export const BANKING_LINKS = {
  consult: "/banking/consultation",
  start: (service) => `/get-started?service=${service}`,
};
