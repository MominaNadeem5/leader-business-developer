import {
  Palette, CreditCard, Smartphone, ShieldCheck, Gauge, Globe, Search, PenTool, Wrench, Rocket, Zap,
  MousePointerClick, Accessibility, Bell, Repeat, Lock,
} from "lucide-react";
import { Section } from "../../components/service";
import IntegrationPage from "./IntegrationPage";
import { GatewayVisual } from "./IntegrationVisual";
import { CheckoutBuilder } from "./IntegrationWidgets";
import { INTEGRATION_LINKS } from "./services";

export default function GatewayCustomization() {
  return (
    <IntegrationPage
      path="/payment-integration/gateway"
      title={{ text: "Payment gateway customization for a checkout that feels like your brand", short: "Gateway Customization" }}
      subtitle={<>Your checkout is the last step before a sale. We help you <strong>design and configure a fast, trustworthy checkout</strong> with the payment methods your customers expect.</>}
      primary={{ label: "Customize my checkout", to: INTEGRATION_LINKS.start("gateway-customization") }}
      secondary={{ label: "Try the checkout builder", href: "#pi-builder" }}
      visual={<GatewayVisual />}
      highlights={[
        { icon: <Palette size={16} />, text: "On-brand design" },
        { icon: <Smartphone size={16} />, text: "Mobile-first" },
        { icon: <CreditCard size={16} />, text: "Cards, wallets & more" },
        { icon: <Lock size={16} />, text: "Provider-hosted card fields" },
      ]}
      services={{
        title: "What we customize",
        items: [
          { icon: <Palette size={24} />, title: "Branded checkout", text: "Your colors, logo, fonts and tone, so customers know they're still with you." },
          { icon: <CreditCard size={24} />, title: "Payment methods", text: "Cards, digital wallets, bank payments and buy-now-pay-later where your provider supports them." },
          { icon: <MousePointerClick size={24} />, title: "Fewer steps", text: "Simplify forms and fields to reduce friction and abandoned checkouts." },
          { icon: <ShieldCheck size={24} />, title: "Fraud & security rules", text: "Address and CVV checks, 3-D Secure and risk settings tuned to your business." },
          { icon: <Repeat size={24} />, title: "Saved & recurring payments", text: "Let returning customers pay faster, with their consent, and support repeat billing." },
          { icon: <Bell size={24} />, title: "Receipts & notifications", text: "Branded receipts and alerts for you and your customers after every payment." },
        ],
      }}
      options={{
        title: "Choose your checkout approach",
        subtitle: "There's no single right answer. It depends on how much control you need.",
        items: [
          { name: "Hosted checkout", icon: <Globe size={22} />, best: "Getting started quickly", text: "Customers pay on a secure page hosted by your provider, styled with your branding.", points: ["Fastest to launch", "Provider handles card security", "Limited layout control"] },
          { name: "Embedded checkout", badge: "Most popular", featured: true, icon: <CreditCard size={22} />, best: "A seamless on-site experience", text: "Secure payment fields from your provider sit inside your own checkout page.", points: ["Customers stay on your site", "Card data still handled by provider", "Good balance of control and effort"] },
          { name: "Fully custom", icon: <Wrench size={22} />, best: "Platforms with unique flows", text: "A checkout built around your product, using your provider's API and secure components.", points: ["Complete design freedom", "Custom logic and flows", "Needs development work"], to: "/payment-integration/api", cta: "See API integration" },
        ],
      }}
      benefits={{
        title: "Why a better checkout matters",
        items: [
          { icon: <Zap size={20} />, title: "Faster payments", text: "Fewer fields, fewer drop-offs." },
          { icon: <ShieldCheck size={20} />, title: "More trust", text: "A consistent, secure look." },
          { icon: <Smartphone size={20} />, title: "Mobile ready", text: "Built for small screens." },
          { icon: <CreditCard size={20} />, title: "More ways to pay", text: "Methods customers prefer." },
          { icon: <Accessibility size={20} />, title: "Accessible", text: "Clear labels and contrast." },
          { icon: <Gauge size={20} />, title: "Easy to improve", text: "Measure and refine over time." },
        ],
      }}
      helps={[
        "Review your current checkout and spot friction",
        "Design an on-brand, mobile-friendly checkout",
        "Configure payment methods and security rules",
        "Test every method and edge case before launch",
      ]}
      steps={{
        items: [
          { icon: <Search size={22} />, title: "Audit", text: "Your current checkout and drop-off points." },
          { icon: <PenTool size={22} />, title: "Design", text: "Layout, branding and payment methods." },
          { icon: <Wrench size={22} />, title: "Configure", text: "Provider settings and security rules." },
          { icon: <Rocket size={22} />, title: "Test & launch", text: "Every method, on every device." },
        ],
      }}
      checklist={{
        title: "What to have ready",
        items: [
          "Access to your payment provider account",
          "Your logo, brand colors and fonts",
          "A list of the payment methods you want to offer",
          "Access to your website or store admin",
          "Your refund and cancellation policy",
          "Any checkout problems customers have reported",
        ],
      }}
      faqs={[
        ["What is a payment gateway?", "A payment gateway securely passes payment details from your checkout to the card networks and banks, and returns whether the payment was approved. Many providers bundle the gateway with the merchant account."],
        ["Can I customize my provider's checkout page?", "Most providers let you change colors, logo and some content on their hosted checkout. Embedded and custom options give you more control over layout and flow."],
        ["Does customizing checkout affect PCI compliance?", "Using your provider's hosted page or secure embedded fields generally keeps card data off your servers, which keeps your compliance work simpler. We design around that."],
        ["Which payment methods should I offer?", "It depends on your customers. Cards are the baseline; digital wallets are popular on mobile; bank payments and pay-later options suit some businesses. Availability depends on your provider and country."],
      ]}
      cta={{ title: "Turn your checkout into a strength" }}
    >
      <Section id="pi-builder" tone="gray" title="Try the checkout builder" subtitle="Play with the options and see how small design choices change the feel of your checkout.">
        <CheckoutBuilder />
      </Section>
    </IntegrationPage>
  );
}
