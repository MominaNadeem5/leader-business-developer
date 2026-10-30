import { SlidersHorizontal, Plug, ShoppingCart, Code2 } from "lucide-react";

/* The pages in the navbar's "Payment Integration" dropdown.
   Used for the overview cards and the "related services" links on each page. */
export const INTEGRATION_SERVICES = [
  { path: "/payment-integration/gateway", title: "Payment Gateway Customization", short: "A branded, fast checkout with the payment methods your customers expect.", icon: SlidersHorizontal },
  { path: "/payment-integration/stripe-square-paypal", title: "Stripe, Square, PayPal Setup", short: "Choose, configure and connect the payment provider that fits how you sell.", icon: Plug },
  { path: "/payment-integration/shopify-woocommerce", title: "Shopify & WooCommerce Integration", short: "Connect payments to your online store so orders, stock and payouts stay in sync.", icon: ShoppingCart },
  { path: "/payment-integration/api", title: "API Integration", short: "Custom payment flows, webhooks and system connections for your app or platform.", icon: Code2 },
];

/* Same link conventions as the other service pages. */
export const INTEGRATION_LINKS = {
  start: (service) => `/get-started?service=${service}`,
  help: "/contact",
};
