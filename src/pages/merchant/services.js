import { Landmark, MonitorSmartphone, Keyboard } from "lucide-react";

/* The pages in the navbar's "Merchant Solution" dropdown.
   Used for the "related merchant services" links at the bottom of each page. */
export const MERCHANT_SERVICES = [
  { path: "/merchant/merchant-account", title: "Merchant Account Services", short: "Prepare a complete application and choose the right account type.", icon: Landmark },
  { path: "/merchant/pos-terminal", title: "POS Solutions", short: "Countertop, mobile and multi-station point-of-sale setups.", icon: MonitorSmartphone },
  { path: "/merchant/virtual-terminal", title: "Virtual Terminal Solutions", short: "Key in card payments from any browser for phone and mail orders.", icon: Keyboard },
];

/* Same link conventions as the other service pages. */
export const MERCHANT_LINKS = {
  start: (service) => `/get-started?service=${service}`,
  help: "/contact",
};
