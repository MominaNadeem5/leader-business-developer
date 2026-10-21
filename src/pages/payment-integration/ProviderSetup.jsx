import {
  UserCheck, Landmark, Settings, Webhook, TestTube2, Users, Search, ClipboardCheck, Wrench, Rocket,
  ShieldCheck, Clock, Layers, RefreshCw, Bell, FileText,
} from "lucide-react";
import { Section } from "../../components/service";
import IntegrationPage from "./IntegrationPage";
import { ProviderVisual } from "./IntegrationVisual";
import { ProviderMatcher } from "./IntegrationWidgets";
import { INTEGRATION_LINKS } from "./services";

export default function ProviderSetup() {
  return (
    <IntegrationPage
      path="/payment-integration/stripe-square-paypal"
      title={{ text: "Stripe, Square and PayPal setup, done right the first time", short: "Stripe, Square, PayPal Setup" }}
      subtitle={<>Each provider has its strengths. We help you <strong>pick the right one, set up your account and connect it</strong> to your website, store or counter, then test it all before you go live.</>}
      primary={{ label: "Set up my provider", to: INTEGRATION_LINKS.start("provider-setup") }}
      secondary={{ label: "Match me to a provider", href: "#pi-matcher" }}
      visual={<ProviderVisual />}
      highlights={[
        { icon: <UserCheck size={16} />, text: "Account setup support" },
        { icon: <Landmark size={16} />, text: "Payouts connected" },
        { icon: <Webhook size={16} />, text: "Webhooks & notifications" },
        { icon: <TestTube2 size={16} />, text: "Tested before launch" },
      ]}
      services={{
        title: "What's included in a provider setup",
        items: [
          { icon: <UserCheck size={24} />, title: "Account & verification", text: "Help preparing business details and documents your provider asks for during sign-up." },
          { icon: <Landmark size={24} />, title: "Payouts & banking", text: "Connect your business bank account and understand your payout schedule." },
          { icon: <Settings size={24} />, title: "Settings & branding", text: "Statement descriptor, receipts, branding, taxes and currencies configured properly." },
          { icon: <ShieldCheck size={24} />, title: "Security & fraud tools", text: "Two-factor login, fraud rules and dispute notifications turned on." },
          { icon: <Webhook size={24} />, title: "Connections", text: "Link your provider to your website, store, POS, invoicing or accounting software." },
          { icon: <Users size={24} />, title: "Team access", text: "Separate logins and roles so staff only see what they need." },
        ],
      }}
      compare={{
        title: "Stripe vs Square vs PayPal at a glance",
        subtitle: "A general guide to what each is commonly used for. Features and availability vary by country and change over time.",
        columns: ["", "Stripe", "Square", "PayPal"],
        rows: [
          ["Commonly chosen for", "Online & platforms", "In-person retail", "Trusted online button"],
          ["Online checkout", true, true, true],
          ["In-person hardware", true, true, "Varies by country"],
          ["Built-in POS & inventory", false, true, "Limited"],
          ["Subscriptions", true, true, true],
          ["Invoicing", true, true, true],
          ["Developer API depth", "Extensive", "Good", "Good"],
        ],
        note: "Always check each provider's current pricing, features and terms on their own website before you sign up.",
      }}
      benefits={{
        title: "Why get help with setup",
        items: [
          { icon: <Clock size={20} />, title: "Save time", text: "No guessing at settings." },
          { icon: <ShieldCheck size={20} />, title: "Fewer surprises", text: "Know what providers ask for." },
          { icon: <Layers size={20} />, title: "Right fit", text: "A provider that suits your model." },
          { icon: <RefreshCw size={20} />, title: "Connected tools", text: "Your systems talk to each other." },
          { icon: <Bell size={20} />, title: "Alerts on", text: "Disputes and payouts tracked." },
          { icon: <FileText size={20} />, title: "Clean records", text: "Easier bookkeeping later." },
        ],
      }}
      helps={[
        "Compare providers against how you actually sell",
        "Prepare details and documents for sign-up",
        "Configure payouts, receipts, taxes and security",
        "Connect and test with your website, store or POS",
      ]}
      steps={{
        items: [
          { icon: <Search size={22} />, title: "Assess", text: "How you sell and what you need." },
          { icon: <ClipboardCheck size={22} />, title: "Choose", text: "The provider (or two) that fits." },
          { icon: <Wrench size={22} />, title: "Set up", text: "Account, payouts and settings." },
          { icon: <Rocket size={22} />, title: "Connect & test", text: "Real test payments, then live." },
        ],
      }}
      checklist={{
        title: "What providers usually ask for",
        items: [
          "Legal business name and address",
          "EIN or ITIN",
          "Owner's personal details for identity checks",
          "Business bank account for payouts",
          "Website or description of what you sell",
          "Customer support email and phone",
        ],
        note: "Requirements vary by provider and business type. The provider decides whether to approve your account.",
      }}
      faqs={[
        ["Can I use more than one provider?", "Yes. Many businesses do, for example Square at the counter and Stripe or PayPal online. We can help you keep reporting and bookkeeping tidy across them."],
        ["Can you guarantee my account will be approved?", "No. Each provider runs its own review and makes the decision. We help you prepare accurate information so the process goes as smoothly as possible."],
        ["How long does setup take?", "Basic account setup can be quick. Connecting to your website, store or other tools and testing everything takes longer and depends on your setup."],
        ["Can I switch providers later?", "Usually, yes. Switching can involve moving saved customer payment details and updating integrations, so it's worth planning carefully. We can help."],
      ]}
      cta={{ title: "Start accepting payments with confidence" }}
    >
      <Section id="pi-matcher" tone="gray" title="Which provider fits you?" subtitle="Tick what you need and watch the match update. It's a quick guide, not a final answer.">
        <ProviderMatcher />
      </Section>
    </IntegrationPage>
  );
}
