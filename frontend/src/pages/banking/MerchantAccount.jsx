import {
  CreditCard, Store, Globe, ShieldCheck, FileCheck, Smartphone, BadgeCheck, Receipt, Clock, AlertTriangle,
  Scale, Layers, MessageSquare, ClipboardCheck, Send, Lock, TrendingUp, Undo2, Wifi,
} from "lucide-react";
import { Reveal, Section, Explorer } from "../../components/service";
import BankingPage from "./BankingPage";
import BankVisual from "./BankVisual";
import { BANKING_LINKS } from "./services";

const models = [
  {
    id: "merchant", icon: <Store size={18} />, label: "Dedicated merchant account",
    title: "A dedicated merchant account",
    text: "Your business is underwritten individually by an acquiring bank, usually through a processor. More setup, but more control as volume grows.",
    points: ["Full underwriting at the start", "Pricing can be tailored at higher volumes", "Often suits established businesses"],
  },
  {
    id: "aggregator", icon: <Layers size={18} />, label: "Payment aggregator",
    title: "Payment aggregator (payment facilitator)",
    text: "You process under the provider's master account. Signing up is usually quick, but accounts can be reviewed or held later.",
    points: ["Fast, simple onboarding", "Standard pricing", "Funds may be held if risk flags appear"],
  },
  {
    id: "highrisk", icon: <AlertTriangle size={18} />, label: "Higher-risk industries",
    title: "Higher-risk industries",
    text: "Some industries see more chargebacks or regulation. Specialized providers may serve them, often with reserves or extra checks.",
    points: ["More documentation upfront", "Rolling reserves are common", "Careful chargeback management matters"],
  },
];

export default function MerchantAccount() {
  return (
    <BankingPage
      path="/banking/merchant-account"
      title={{ text: "Merchant account assistance: start accepting cards the right way", short: "Merchant Account Assistance" }}
      subtitle={<>Card processors review your business before they let you accept cards. We help you understand your options, prepare a complete application and avoid the issues that lead to delays, holds or declines.</>}
      primary={{ label: "Get merchant help", to: BANKING_LINKS.start("merchant-account") }}
      secondary={{ label: "Merchant options", href: "#bk-models" }}
      visual={<BankVisual
        variant="payments"
        amount={64.5}
        feed={[["Coffee & pastry", 12.4], ["Online order #2210", 89], ["Gift card sale", 50], ["Table 4", 64.5]]}
        chips={[
          { icon: <Wifi size={13} />, label: "Tap to pay" },
          { icon: <Lock size={13} />, label: "PCI ready" },
          { icon: <BadgeCheck size={13} />, label: "Application complete" },
        ]}
      />}
      services={{
        title: "What merchant assistance covers",
        subtitle: "Everything you need to approach card processors prepared.",
        items: [
          { icon: <Scale size={24} />, title: "Option comparison", text: "Merchant account or aggregator? We explain the trade-offs for your business." },
          { icon: <FileCheck size={24} />, title: "Application preparation", text: "Organize business documents, ownership details and processing estimates." },
          { icon: <Globe size={24} />, title: "Website readiness", text: "Check your site shows the policies processors look for, like refunds and contact details." },
          { icon: <Smartphone size={24} />, title: "Hardware and online setup", text: "Understand terminals, mobile readers and online checkout options." },
          { icon: <Lock size={24} />, title: "PCI basics", text: "Plain-language overview of the card security standard and your part in it." },
          { icon: <Undo2 size={24} />, title: "Chargeback prevention", text: "Habits that reduce disputes and protect your processing account." },
        ],
      }}
      benefits={{
        title: "Why prepare before you apply",
        subtitle: "Processors judge risk on what you submit. Make it count.",
        items: [
          { icon: <Clock size={22} />, title: "Smoother review", text: "Complete applications avoid back-and-forth with underwriting." },
          { icon: <ShieldCheck size={22} />, title: "Fewer surprises", text: "Understand reserves, holds and fees before you sign." },
          { icon: <Receipt size={22} />, title: "Clear pricing questions", text: "Know what to ask about rates, fees and contract terms." },
          { icon: <TrendingUp size={22} />, title: "Room to grow", text: "Choose a setup that still works as your volume increases." },
          { icon: <Undo2 size={22} />, title: "Lower dispute risk", text: "Good policies and descriptors reduce chargebacks." },
          { icon: <CreditCard size={22} />, title: "Accept more ways to pay", text: "Cards, wallets and online checkout, set up properly." },
        ],
      }}
      helps={["Explain merchant account and aggregator options", "Prepare your application documents", "Review your website's required policies", "Share chargeback and PCI basics"]}
      steps={{
        subtitle: "From \"we take cash only\" to accepting cards with confidence.",
        items: [
          { icon: <MessageSquare size={20} />, title: "Tell us how you sell", text: "In person, online or both, what you sell and your expected volume." },
          { icon: <ClipboardCheck size={20} />, title: "Prepare and review", text: "We help assemble documents and check your website and policies." },
          { icon: <Send size={20} />, title: "Apply to a processor", text: "You apply to the provider you choose. Underwriting decisions are theirs." },
        ],
      }}
      checklist={{
        title: "Merchant application readiness",
        subtitle: "Processors commonly review these. Tick off what's ready.",
        side: "Your readiness",
        items: [
          "Business formation documents and EIN",
          "Business bank account for deposits",
          "Owner IDs and ownership details",
          "Description of products or services and how you deliver them",
          "Estimated monthly volume and average sale size",
          "Website with refund policy, terms and contact details",
          "Recent processing statements, if you've accepted cards before",
        ],
      }}
      faqs={[
        ["What's the difference between a merchant account and a payment processor?", "A merchant account is an account with an acquiring bank that lets you accept card payments. Aggregators let you process under their master account instead, which is faster to start but can be less flexible."],
        ["What is a rolling reserve?", "A percentage of your sales the processor holds for a period to cover potential chargebacks or refunds. It's more common for new or higher-risk businesses."],
        ["What is PCI DSS?", "The Payment Card Industry Data Security Standard: security rules for any business that accepts, stores or transmits card data. Most small merchants complete an annual self-assessment."],
        ["Why do processors hold funds?", "Usually because of unusual activity, a spike in volume, high chargebacks or missing information. Clear policies and accurate application details reduce the chance."],
        ["Can you guarantee approval or a specific rate?", "No. Processors set their own pricing and decide approvals. We help you prepare and know what to ask."],
      ]}
      cta={{ title: "Ready to start accepting card payments?" }}
      related={["/banking/payments", "/banking/small-business", "/banking/account-assistance"]}
    >
      <Section id="bk-models" tone="gray" title="Ways to accept card payments" subtitle="Tap an option to see who it suits.">
        <Reveal><Explorer items={models} /></Reveal>
      </Section>
    </BankingPage>
  );
}
