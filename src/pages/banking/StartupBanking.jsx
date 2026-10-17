import {
  Rocket, Lightbulb, FileCheck, Landmark, HandCoins, TrendingUp, Users, Gauge, ShieldCheck, Plug,
  CreditCard, BarChart3, Zap, Eye, MessageSquare, ClipboardCheck, Send, Layers,
} from "lucide-react";
import { Section, Timeline } from "../../components/service";
import BankingPage from "./BankingPage";
import BankVisual from "./BankVisual";
import { BANKING_LINKS } from "./services";

const journey = [
  { when: "Idea", title: "Form the company", text: "Choose your structure, form the entity and get your EIN.", icon: <Lightbulb size={18} /> },
  { when: "Day one", title: "Open accounts", text: "A business account for founder money, first expenses and early revenue.", icon: <Landmark size={18} /> },
  { when: "Funding", title: "Receive investment", text: "Investor wires land in the company's account, not a founder's.", icon: <HandCoins size={18} /> },
  { when: "Scale", title: "Control spend", text: "Team cards, approvals and runway tracking as headcount grows.", icon: <TrendingUp size={18} /> },
];

export default function StartupBanking() {
  return (
    <BankingPage
      path="/banking/startups"
      title={{ text: "Startup banking that keeps up with your growth", short: "Startup Banking" }}
      subtitle={<>Founders need banking that handles investor wires, team spending and runway tracking without slowing them down. We help you choose and set up the right foundation early.</>}
      primary={{ label: "Set up startup banking", to: BANKING_LINKS.start("startup-banking") }}
      secondary={{ label: "The startup journey", href: "#bk-journey" }}
      visual={<BankVisual
        variant="card"
        name="NOVA LABS INC."
        spend={[["Cloud", 68], ["Payroll", 82], ["Marketing", 41]]}
        alerts={["Investor wire received", "Card issued to new hire", "Runway: 18 months (sample)", "Receipt matched automatically"]}
        chips={[
          { icon: <HandCoins size={13} />, label: "Seed wire in" },
          { icon: <Gauge size={13} />, label: "Runway tracked" },
          { icon: <Users size={13} />, label: "Team cards" },
        ]}
      />}
      services={{
        title: "Startup banking support",
        subtitle: "Practical help for founders, from incorporation to your first big round.",
        items: [
          { icon: <Rocket size={24} />, title: "Founder-ready setup", text: "Get the right documents together so your first account opens smoothly." },
          { icon: <HandCoins size={24} />, title: "Funding readiness", text: "Prepare to receive investor wires and keep clean records for due diligence." },
          { icon: <CreditCard size={24} />, title: "Team spend controls", text: "Plan card limits, roles and approvals as you hire." },
          { icon: <Plug size={24} />, title: "Tool integrations", text: "Choose providers that connect with your accounting, payroll and expense tools." },
          { icon: <ShieldCheck size={24} />, title: "Cash safety planning", text: "Understand deposit insurance limits as your balances grow after a raise." },
          { icon: <BarChart3 size={24} />, title: "Runway visibility", text: "Simple structures that make burn and runway easy to track." },
        ],
      }}
      benefits={{
        title: "Why founders get this right early",
        subtitle: "Small decisions now save painful clean-up later.",
        items: [
          { icon: <Eye size={22} />, title: "Investor confidence", text: "Clean company accounts make due diligence faster." },
          { icon: <Zap size={22} />, title: "Speed", text: "Digital-first tools let you move as fast as your team." },
          { icon: <Layers size={22} />, title: "Scales with you", text: "Add users, cards and accounts without switching banks." },
          { icon: <ShieldCheck size={22} />, title: "Protect raised cash", text: "Plan how to hold larger balances thoughtfully." },
          { icon: <Gauge size={22} />, title: "Know your runway", text: "See burn clearly and plan the next raise in time." },
          { icon: <FileCheck size={22} />, title: "Clean separation", text: "Founder money and company money stay apart." },
        ],
      }}
      helps={["Prepare your company documents", "Explain startup-friendly provider types", "Plan team access and controls", "Talk through holding larger balances"]}
      steps={{
        subtitle: "From incorporation to funded, with banking that fits.",
        items: [
          { icon: <MessageSquare size={20} />, title: "Share your stage", text: "Pre-revenue, revenue or raising? Tell us where you are and what's next." },
          { icon: <ClipboardCheck size={20} />, title: "Pick your setup", text: "We outline suitable account types, tools and controls." },
          { icon: <Send size={20} />, title: "Open and build", text: "You open accounts with your chosen providers and connect your stack." },
        ],
      }}
      compare={{
        title: "What startups often look for",
        subtitle: "General tendencies by provider type. Specific products vary.",
        columns: ["", "Startup-focused fintech", "Traditional bank"],
        rows: [
          ["Fast online setup", "Usually", "Varies"],
          ["Software integrations", "Usually strong", "Varies"],
          ["Branch access and cash", false, true],
          ["Venture debt or credit lines", "Some", "Some"],
          ["Deposits held at", "Partner banks", "The bank itself"],
        ],
        highlight: 1,
        note: "Fintech platforms are not banks. Check which bank holds your deposits and how insurance applies.",
      }}
      faqs={[
        ["When should a startup open a bank account?", "As soon as the company is formed and has an EIN. Founder contributions, first expenses and early revenue should all run through the company's account."],
        ["Can investors wire money to my personal account?", "They shouldn't. Investment belongs to the company and should go into the company's account to keep records and ownership clean."],
        ["What about balances above the insurance limit?", "FDIC insurance covers up to $250,000 per depositor, per insured bank, per ownership category. Startups holding more often look at ways to manage the amount above that. Ask your provider how they handle it."],
        ["Do I need a Delaware corporation to get startup banking?", "No. Many startup-focused providers work with companies formed in different states. Your structure should be driven by your plans, not your bank."],
        ["Is a fintech platform as safe as a bank?", "Fintech platforms usually partner with insured banks to hold deposits. Coverage can depend on how the arrangement works, so read their disclosures carefully."],
      ]}
      cta={{ title: "Ready to give your startup a strong financial foundation?" }}
      related={["/banking/corporate", "/banking/compare", "/banking/payments"]}
    >
      <Section id="bk-journey" tone="gray" title="Banking through the startup journey" subtitle="What your banking needs to handle at each stage.">
        <Timeline items={journey} />
      </Section>
    </BankingPage>
  );
}
