import {
  ShoppingBag, ShoppingCart, CreditCard, Package, Truck, Receipt, RefreshCw, Percent, Search, PenTool,
  Wrench, Rocket, Smartphone, Clock, ShieldCheck, BarChart3, Store, Code2, Repeat, Bell,
} from "lucide-react";
import { Section, Timeline } from "../../components/service";
import IntegrationPage from "./IntegrationPage";
import { StoreVisual } from "./IntegrationVisual";
import { PlatformSplit } from "./IntegrationWidgets";
import { INTEGRATION_LINKS } from "./services";

export default function EcommerceIntegration() {
  return (
    <IntegrationPage
      path="/payment-integration/shopify-woocommerce"
      title={{ text: "Shopify and WooCommerce payment integration that keeps your store in sync", short: "Shopify & WooCommerce" }}
      subtitle={<>We connect your payment provider to your online store so <strong>every order, refund and stock update happens automatically</strong>, and your checkout works smoothly on every device.</>}
      primary={{ label: "Integrate my store", to: INTEGRATION_LINKS.start("ecommerce-integration") }}
      secondary={{ label: "Shopify or WooCommerce?", href: "#pi-platforms" }}
      visual={<StoreVisual />}
      highlights={[
        { icon: <ShoppingBag size={16} />, text: "Shopify" },
        { icon: <ShoppingCart size={16} />, text: "WooCommerce" },
        { icon: <RefreshCw size={16} />, text: "Orders & stock in sync" },
        { icon: <Smartphone size={16} />, text: "Mobile checkout" },
      ]}
      services={{
        title: "What we set up in your store",
        items: [
          { icon: <CreditCard size={24} />, title: "Payment gateway connection", text: "Install and configure your provider's official app or plugin with the right settings." },
          { icon: <Smartphone size={24} />, title: "Wallets & extra methods", text: "Digital wallets, PayPal and other methods your provider and platform support." },
          { icon: <Percent size={24} />, title: "Taxes & currencies", text: "Sales tax settings and multi-currency options where available." },
          { icon: <Package size={24} />, title: "Orders & inventory", text: "Paid orders update stock and status automatically, with no copy and paste." },
          { icon: <Repeat size={24} />, title: "Refunds & subscriptions", text: "Refunds flow back to your provider, and recurring products bill correctly." },
          { icon: <Bell size={24} />, title: "Emails & notifications", text: "Order, payment and shipping emails that match your brand." },
        ],
      }}
      benefits={{
        title: "Why a proper store integration pays off",
        items: [
          { icon: <Clock size={20} />, title: "Hours saved", text: "No manual order updates." },
          { icon: <ShieldCheck size={20} />, title: "Secure checkout", text: "Official, maintained plugins." },
          { icon: <Smartphone size={20} />, title: "Mobile friendly", text: "Smooth on every phone." },
          { icon: <Package size={20} />, title: "Accurate stock", text: "Fewer oversold items." },
          { icon: <BarChart3 size={20} />, title: "Clear reporting", text: "Sales and payouts match." },
          { icon: <Truck size={20} />, title: "Faster fulfillment", text: "Paid orders ready to ship." },
        ],
      }}
      helps={[
        "Choose the right payment apps or plugins for your store",
        "Configure checkout, taxes, currencies and emails",
        "Connect orders, inventory and refunds to payments",
        "Run test orders from cart to refund before launch",
      ]}
      steps={{
        items: [
          { icon: <Search size={22} />, title: "Review", text: "Your store, products and checkout." },
          { icon: <PenTool size={22} />, title: "Plan", text: "Provider, apps or plugins, and settings." },
          { icon: <Wrench size={22} />, title: "Integrate", text: "Install, configure and connect." },
          { icon: <Rocket size={22} />, title: "Test & launch", text: "Test orders and refunds, then go live." },
        ],
      }}
      checklist={{
        title: "What to have ready",
        items: [
          "Admin access to your Shopify or WordPress store",
          "Access to your payment provider account",
          "Your product catalog and inventory levels",
          "Shipping zones and rates",
          "Tax registration details, if applicable",
          "Your refund and return policy",
        ],
      }}
      faqs={[
        ["Do I have to use Shopify Payments on Shopify?", "Shopify offers its own payment option in many countries, and also supports a range of third-party providers. Shopify may charge extra transaction fees when you use a third-party gateway, so it's worth comparing. Check Shopify's current terms for your plan and country."],
        ["Which payment plugins work with WooCommerce?", "WooCommerce supports many providers through official plugins, including Stripe, Square and PayPal. We help you pick well-maintained options and keep the number of plugins sensible."],
        ["Can you connect my store to my accounting software?", "Often, yes, through apps or integrations so sales, fees and payouts are recorded consistently. For anything unusual, a custom API integration may be needed."],
        ["Will my store go offline during setup?", "We aim to set up and test without disrupting live sales, using test modes or staging sites where available."],
      ]}
      cta={{ title: "Make your store's payments run themselves" }}
    >
      <Section id="pi-platforms" tone="gray" title="Shopify or WooCommerce?" subtitle="Both are great. They suit different kinds of businesses.">
        <PlatformSplit
          items={[
            {
              name: "Shopify", tone: "#5e8e3e", icon: <Store size={24} />, best: "Sellers who want an all-in-one hosted store",
              text: "A hosted platform: hosting, security and updates are handled for you, with a large app store for extra features.",
              points: ["Quick to launch, no server to manage", "Built-in payments in many countries", "Monthly plan plus app costs", "Less control over the underlying code"],
            },
            {
              name: "WooCommerce", tone: "#7f54b3", icon: <Code2 size={24} />, best: "WordPress sites that want full control",
              text: "A free, open-source plugin for WordPress. You own the site and choose your hosting, themes and extensions.",
              points: ["Highly customizable", "Works with many payment plugins", "You manage hosting, updates and security", "Costs depend on hosting and extensions"],
            },
          ]}
        />
      </Section>

      <Section title="What happens when a customer pays" subtitle="Here's the flow we set up, so each step happens automatically.">
        <Timeline
          items={[
            { when: "1", title: "Checkout", text: "Customer pays with a card, wallet or other method.", icon: <ShoppingCart size={18} /> },
            { when: "2", title: "Payment approved", text: "Your provider confirms the payment securely.", icon: <CreditCard size={18} /> },
            { when: "3", title: "Order created", text: "The order is marked paid and the customer is emailed.", icon: <Receipt size={18} /> },
            { when: "4", title: "Stock updated", text: "Inventory adjusts so you don't oversell.", icon: <Package size={18} /> },
            { when: "5", title: "Ready to ship", text: "The order is queued for fulfillment.", icon: <Truck size={18} /> },
          ]}
        />
      </Section>
    </IntegrationPage>
  );
}
