import { Link } from "react-router-dom";
import {
  ShoppingCart, UserX, Receipt, Smartphone, CreditCard, Mail, Search, PenTool, Wrench, Rocket, TrendingUp,
  ShieldCheck, Zap, Accessibility, BarChart3, RefreshCw, ShoppingBag, Code2, Wallet, Percent, Gift, DollarSign,
  Clock, Lock, ListChecks,
} from "lucide-react";
import { Section, Explorer } from "../../components/service";
import EcommercePage from "./EcommercePage";
import { CheckoutVisual } from "./EcommerceVisual";
import { ECOMMERCE_LINKS } from "./services";

const problems = [
  {
    id: "costs", icon: <DollarSign size={18} />, label: "Surprise costs",
    title: "Problem: unexpected shipping, tax or fees at the last step",
    text: "Extra costs that appear only at payment are one of the most common reasons shoppers leave. We show shipping, tax and fees early and keep totals updated as choices change.",
    points: ["Shipping estimate in the cart", "Free-shipping progress messages", "No new charges at the final step"],
  },
  {
    id: "account", icon: <UserX size={18} />, label: "Forced sign-up",
    title: "Problem: customers must create an account to buy",
    text: "Making account creation mandatory adds friction for first-time buyers. We enable guest checkout and offer an optional account after the order is placed.",
    points: ["Guest checkout turned on", "Optional account after purchase", "Order lookup by email"],
  },
  {
    id: "long", icon: <ListChecks size={18} />, label: "Too many steps",
    title: "Problem: a long, confusing checkout",
    text: "Every unnecessary field slows customers down. We remove what isn't needed, add address autocomplete and show clear progress.",
    points: ["Fewer, smarter form fields", "Address autocomplete", "Clear progress indicator"],
  },
  {
    id: "pay", icon: <Wallet size={18} />, label: "Missing payment options",
    title: "Problem: customers can't pay the way they want",
    text: "Mobile shoppers especially expect digital wallets. We add the payment methods your customers prefer and your provider supports.",
    points: ["Cards plus digital wallets", "Buy-now-pay-later where it fits", "Clear messages if a card is declined"],
  },
  {
    id: "trust", icon: <Lock size={18} />, label: "Trust concerns",
    title: "Problem: shoppers aren't sure the checkout is safe",
    text: "A checkout that looks different from the rest of your site, or hides policies, makes people hesitate. We keep it on-brand with clear policies and security cues.",
    points: ["Consistent branding", "Visible return and shipping policies", "Secure, provider-hosted card fields"],
  },
];

export default function CartCheckout() {
  return (
    <EcommercePage
      path="/ecommerce/cart-checkout"
      title={{ text: "Shopping cart & checkout setup that turns more carts into orders", short: "Shopping Cart & Checkout Setup" }}
      subtitle={<>We build a <strong>fast, clear and trustworthy checkout</strong> with guest checkout, upfront costs, digital wallets and a mobile-first design, so fewer customers abandon their carts.</>}
      primary={{ label: "Improve my checkout", to: ECOMMERCE_LINKS.start("cart-checkout") }}
      secondary={{ label: "Common checkout problems", href: "#ec-problems" }}
      visual={<CheckoutVisual />}
      highlights={[
        { icon: <UserX size={16} />, text: "Guest checkout" },
        { icon: <Receipt size={16} />, text: "Clear, upfront costs" },
        { icon: <Smartphone size={16} />, text: "Mobile-first" },
        { icon: <Wallet size={16} />, text: "Digital wallets" },
      ]}
      overview={{
        title: "Your checkout is where sales are won or lost",
        body: [
          <>Getting shoppers to add products to their cart is hard work. Losing them at checkout is painful, and it happens a lot. Industry research, including studies by the Baymard Institute, has long put average online cart abandonment at roughly 70%. The most common reasons are surprisingly fixable: unexpected costs, forced account creation, long forms, missing payment options and doubts about security.</>,
          <>Our shopping cart and checkout setup service tackles each of those causes. We configure a clean cart with clear totals and shipping estimates, enable guest checkout, streamline form fields, add the payment methods your customers expect, and make sure everything works beautifully on mobile, where most shopping now happens. We also set up order confirmation emails, abandoned-cart reminders and discount codes, so the experience feels complete from first click to receipt.</>,
          <>A great checkout works hand in hand with the rest of your store. Accurate <Link to="/ecommerce/shipping">shipping rates</Link> prevent surprise costs, real-time <Link to="/ecommerce/inventory-orders">inventory</Link> stops customers buying items you can't ship, and strong <Link to="/ecommerce/product-listing">product pages</Link> bring motivated buyers to the cart in the first place. Need deeper payment customization? See our <Link to="/payment-integration/gateway">payment gateway customization</Link> service.</>,
        ],
        glance: {
          title: "What's included",
          items: [
            "Cart and checkout configuration",
            "Guest checkout and streamlined forms",
            "Shipping, tax and discount setup",
            "Digital wallets and payment methods",
            "Order and abandoned-cart emails",
            "Full test orders on desktop and mobile",
          ],
        },
      }}
      services={{
        title: "Our cart & checkout services",
        subtitle: "Every step between \"Add to cart\" and \"Thank you\", set up to convert.",
        items: [
          { icon: <ShoppingCart size={24} />, title: "Cart configuration", text: "A clear cart with editable quantities, saved items, shipping estimates and helpful upsells." },
          { icon: <Zap size={24} />, title: "Streamlined checkout", text: "Guest checkout, fewer fields, address autocomplete and a clear progress indicator." },
          { icon: <CreditCard size={24} />, title: "Payment methods", text: "Cards, digital wallets and other options your payment provider supports." },
          { icon: <Percent size={24} />, title: "Taxes, shipping & discounts", text: "Accurate tax settings, shipping options, discount codes and free-shipping thresholds." },
          { icon: <Mail size={24} />, title: "Emails & cart recovery", text: "Branded order confirmations and abandoned-cart reminders that bring shoppers back." },
          { icon: <BarChart3 size={24} />, title: "Checkout analytics", text: "Funnel tracking so you can see where shoppers drop off and improve over time." },
        ],
      }}
      steps={{
        items: [
          { icon: <Search size={22} />, title: "Audit", text: "Your current cart, checkout and drop-off points." },
          { icon: <PenTool size={22} />, title: "Plan", text: "Fixes ranked by impact and effort." },
          { icon: <Wrench size={22} />, title: "Configure", text: "Checkout, payments, taxes and emails." },
          { icon: <Rocket size={22} />, title: "Test & launch", text: "Real test orders on every device." },
        ],
      }}
      benefits={{
        title: "Why a better checkout matters",
        items: [
          { icon: <TrendingUp size={20} />, title: "More completed orders", text: "Fewer reasons to abandon." },
          { icon: <Smartphone size={20} />, title: "Mobile friendly", text: "Easy to finish on a phone." },
          { icon: <ShieldCheck size={20} />, title: "More trust", text: "Secure, consistent, transparent." },
          { icon: <RefreshCw size={20} />, title: "Recovered sales", text: "Reminders bring carts back." },
          { icon: <Accessibility size={20} />, title: "Accessible", text: "Clear labels and contrast." },
          { icon: <Clock size={20} />, title: "Faster purchases", text: "Fewer clicks to complete." },
        ],
      }}
      tools={{
        title: "Platforms and tools we configure",
        items: [
          { icon: <ShoppingBag size={20} />, title: "Shopify checkout", text: "Settings, apps and branding." },
          { icon: <Code2 size={20} />, title: "WooCommerce checkout", text: "Blocks, fields and plugins." },
          { icon: <CreditCard size={20} />, title: "Payment providers", text: "Stripe, PayPal, Square and more." },
          { icon: <Wallet size={20} />, title: "Digital wallets", text: "Popular one-tap payment options." },
          { icon: <Mail size={20} />, title: "Email tools", text: "Order and cart-recovery emails." },
          { icon: <Gift size={20} />, title: "Discounts & gift cards", text: "Codes, thresholds and promos." },
        ],
      }}
      faqs={[
        ["Why do customers abandon their shopping carts?", "Common reasons include unexpected shipping or tax costs, being forced to create an account, a long or confusing checkout, missing payment options and concerns about security. Many of these can be fixed with better setup."],
        ["Should I offer guest checkout?", "In most cases, yes. Guest checkout lets first-time buyers purchase quickly. You can still invite them to create an account after the order, when it feels like a benefit rather than a barrier."],
        ["Is a one-page checkout better than multi-step?", "It depends on your products and customers. What matters most is fewer unnecessary fields, clear progress and no surprises. We recommend the format that suits your store and platform."],
        ["Can you set up abandoned-cart emails?", "Yes. We configure abandoned-cart reminders through your platform or email tool, with timing and messaging that encourage shoppers to return without being pushy."],
        ["Will you change my payment provider?", "Not unless you want to. We work with your existing provider and add the payment methods it supports. If a change makes sense, we'll explain why and help with the switch."],
      ]}
      cta={{ title: "Stop losing sales at the last step" }}
    >
      <Section id="ec-problems" title="Common checkout problems and how we fix them" subtitle="Pick a problem to see what's causing it and what we change.">
        <Explorer items={problems} />
      </Section>
    </EcommercePage>
  );
}
