import {
  SlidersHorizontal, Plug, ShoppingCart, Code2, Search, PenTool, Wrench, Rocket, ShieldCheck, RefreshCw,
  Zap, Users, LineChart, Sprout, Store, Building2, Layers, LifeBuoy, ClipboardList, TestTube2,
} from "lucide-react";
import { Section, Explorer, Timeline } from "../../components/service";
import IntegrationPage from "./IntegrationPage";
import { HubVisual } from "./IntegrationVisual";
import { INTEGRATION_LINKS } from "./services";

const stages = [
  {
    id: "first", icon: <Sprout size={18} />, label: "First payments",
    title: "You're taking your first payments",
    text: "Start simple: one trusted provider, a clean checkout and payouts going to your business bank account.",
    points: ["Pick a provider that fits how you sell", "Set up a branded checkout or payment link", "Connect payouts and test a real payment"],
  },
  {
    id: "store", icon: <Store size={18} />, label: "Online store",
    title: "You sell through an online store",
    text: "Your payments should talk to your store, so orders, stock and refunds all stay in sync without manual work.",
    points: ["Connect your provider to Shopify or WooCommerce", "Add wallets and the methods customers expect", "Automate order and inventory updates"],
  },
  {
    id: "growing", icon: <LineChart size={18} />, label: "Scaling up",
    title: "You're growing and checkout is holding you back",
    text: "Small improvements to checkout speed, trust and payment options can make a real difference at higher volume.",
    points: ["Streamline the checkout steps", "Add subscriptions or saved payment methods", "Review fraud and dispute settings"],
  },
  {
    id: "platform", icon: <Building2 size={18} />, label: "Custom platform",
    title: "You run your own app or platform",
    text: "When off-the-shelf plugins aren't enough, a direct API integration gives you full control over the payment flow.",
    points: ["Design server-side payment flows", "Handle webhooks reliably", "Connect payments to your CRM, accounting or ERP"],
  },
];

export default function PaymentIntegration() {
  return (
    <IntegrationPage
      path="/payment-integration"
      title={{ text: "Payment integration that connects every way you get paid", short: "Payment Integration" }}
      subtitle={<>From a single checkout button to a fully custom API, we help you <strong>choose, configure and connect payments</strong> so they work smoothly with your website, store and business tools.</>}
      primary={{ label: "Start your integration", to: INTEGRATION_LINKS.start("payment-integration") }}
      secondary={{ label: "Find your starting point", href: "#pi-stages" }}
      visual={<HubVisual />}
      highlights={[
        { icon: <Plug size={16} />, text: "Stripe, Square & PayPal" },
        { icon: <ShoppingCart size={16} />, text: "Shopify & WooCommerce" },
        { icon: <Code2 size={16} />, text: "Custom API work" },
        { icon: <ShieldCheck size={16} />, text: "Security-first setup" },
      ]}
      services={{
        title: "Our payment integration services",
        subtitle: "Choose one, or combine them into a complete payment setup.",
        cols: 2,
        items: [
          { icon: <SlidersHorizontal size={24} />, title: "Payment Gateway Customization", text: "A fast, on-brand checkout with the payment methods your customers expect and the security checks you need.", to: "/payment-integration/gateway" },
          { icon: <Plug size={24} />, title: "Stripe, Square, PayPal Setup", text: "Pick the right provider, set up your account, payouts and settings, and test everything before launch.", to: "/payment-integration/stripe-square-paypal" },
          { icon: <ShoppingCart size={24} />, title: "Shopify & WooCommerce Integration", text: "Connect payments to your store so orders, inventory, taxes and refunds stay in sync.", to: "/payment-integration/shopify-woocommerce" },
          { icon: <Code2 size={24} />, title: "API Integration", text: "Custom payment flows, webhooks and connections to your app, CRM or accounting tools.", to: "/payment-integration/api" },
        ],
      }}
      benefits={{
        title: "Why get help with payment integration",
        items: [
          { icon: <Zap size={20} />, title: "Launch faster", text: "Skip the trial and error." },
          { icon: <ShieldCheck size={20} />, title: "Safer setup", text: "Card data stays with your provider." },
          { icon: <RefreshCw size={20} />, title: "Fewer manual tasks", text: "Orders and records stay in sync." },
          { icon: <Users size={20} />, title: "Better checkout", text: "Methods customers already use." },
          { icon: <Layers size={20} />, title: "Room to grow", text: "Add tools without rebuilding." },
          { icon: <LifeBuoy size={20} />, title: "Plain-English help", text: "We explain every choice." },
        ],
      }}
      helps={[
        "Map how money flows from customer to your bank",
        "Recommend providers and tools that fit your sales",
        "Configure checkout, payouts, webhooks and notifications",
        "Test everything end to end before you go live",
      ]}
      steps={{
        items: [
          { icon: <Search size={22} />, title: "Discover", text: "How you sell today and where you want to go." },
          { icon: <PenTool size={22} />, title: "Plan", text: "Providers, tools and the checkout flow." },
          { icon: <Wrench size={22} />, title: "Build", text: "Configure, connect and customize." },
          { icon: <Rocket size={22} />, title: "Test & launch", text: "Real test payments, then go live." },
        ],
      }}
      faqs={[
        ["What is payment integration?", "It's connecting a payment provider to the places you sell, such as your website, online store, app or point of sale, so customers can pay and your records update automatically."],
        ["Do I need a developer?", "Not always. Many store and provider setups use built-in apps and settings. Custom checkouts and direct API work usually need development, which we can scope with you."],
        ["Which payment provider should I use?", "It depends on how you sell. In-person sellers, online stores, subscription businesses and platforms often choose differently. Our Stripe, Square and PayPal page includes a quick matcher to help you compare."],
        ["Will you have access to my customers' card details?", "No. A well-built integration lets your provider collect and store card details, so they never touch your servers or ours."],
        ["Can you work with my existing setup?", "Yes. We can review what you have, fix problems and add new payment methods or tools without starting over."],
      ]}
      cta={{ title: "Get a payment setup that just works" }}
    >
      <Section id="pi-stages" tone="gray" title="Find your starting point" subtitle="Every business is at a different stage. Pick yours to see where we'd begin.">
        <Explorer items={stages} />
      </Section>

      <Section title="What a typical project looks like" subtitle="Timelines depend on scope. Here's the usual shape of the work.">
        <Timeline
          items={[
            { when: "Step 1", title: "Discovery call", text: "We learn how you sell and what tools you already use.", icon: <ClipboardList size={18} /> },
            { when: "Step 2", title: "Integration plan", text: "A clear plan for providers, checkout and connections.", icon: <PenTool size={18} /> },
            { when: "Step 3", title: "Build & configure", text: "We set up accounts, settings and integrations.", icon: <Wrench size={18} /> },
            { when: "Step 4", title: "Test payments", text: "Real tests for payments, refunds and notifications.", icon: <TestTube2 size={18} /> },
            { when: "Step 5", title: "Launch & handover", text: "Go live with a simple guide for your team.", icon: <Rocket size={18} /> },
          ]}
        />
      </Section>
    </IntegrationPage>
  );
}
