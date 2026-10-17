import {
  Network, Landmark, ShieldCheck, Repeat, LineChart, KeyRound, Users, FileCheck, Layers,
  BadgeCheck, Eye, Clock, MessageSquare, ClipboardCheck, Send, Lock, Wallet, ArrowLeftRight, Scale,
} from "lucide-react";
import { Reveal, Section, Explorer } from "../../components/service";
import BankingPage from "./BankingPage";
import BankVisual from "./BankVisual";
import { BANKING_LINKS } from "./services";

const treasury = [
  {
    id: "cash", icon: <Wallet size={18} />, label: "Cash management",
    title: "Cash management",
    text: "Tools to see and move cash across accounts, so working capital sits where it's needed.",
    points: ["Consolidated balance reporting", "Scheduled and bulk payments", "Daily cash positioning"],
  },
  {
    id: "sweep", icon: <Repeat size={18} />, label: "Sweep accounts",
    title: "Sweep arrangements",
    text: "Automatic transfers that move excess balances into interest-bearing or investment options, then back when needed.",
    points: ["Target balance rules", "Can help with idle cash", "Check how deposit insurance applies"],
  },
  {
    id: "fraud", icon: <ShieldCheck size={18} />, label: "Fraud controls",
    title: "Payment fraud controls",
    text: "Services like positive pay match issued checks and payments against what you approved, to catch fraud early.",
    points: ["Positive pay for checks and ACH", "Dual approval for payments", "User roles and limits"],
  },
  {
    id: "entities", icon: <Network size={18} />, label: "Multi-entity",
    title: "Multiple entities and subsidiaries",
    text: "Groups with several companies need clear account structures, intercompany records and the right signers for each entity.",
    points: ["Separate accounts per entity", "Clear intercompany transfers", "Entity-level signing authority"],
  },
  {
    id: "credit", icon: <LineChart size={18} />, label: "Credit lines",
    title: "Credit and lending relationships",
    text: "Lines of credit and term loans are often easier to discuss once you have an established banking relationship.",
    points: ["Lenders review financial statements", "Covenants and reporting may apply", "Terms vary widely between lenders"],
  },
];

export default function CorporateBanking() {
  return (
    <BankingPage
      path="/banking/corporate"
      title={{ text: "Corporate banking for companies with more moving parts", short: "Corporate Banking" }}
      subtitle={<>Multiple entities, larger balances, approval workflows and treasury needs. We help corporations understand the services available and prepare for conversations with banks.</>}
      primary={{ label: "Discuss corporate banking", to: BANKING_LINKS.start("corporate-banking") }}
      secondary={{ label: "Treasury services", href: "#bk-treasury" }}
      visual={<BankVisual
        variant="dashboard"
        label="Treasury overview"
        start={1284500}
        accounts={["Operating", "Payroll", "Reserve", "Sub. LLC"]}
        txs={[
          { name: "Customer wire", amount: 48000, icon: <ArrowLeftRight size={14} /> },
          { name: "Payroll run", amount: -61200, icon: <Users size={14} /> },
          { name: "Intercompany transfer", amount: 25000, icon: <Repeat size={14} /> },
          { name: "Vendor batch (ACH)", amount: -18740, icon: <Layers size={14} /> },
        ]}
        chips={[
          { icon: <KeyRound size={13} />, label: "Dual approval" },
          { icon: <ShieldCheck size={13} />, label: "Positive pay on" },
          { icon: <Network size={13} />, label: "4 entities" },
        ]}
      />}
      services={{
        title: "Corporate banking support",
        subtitle: "Help with the structure, controls and paperwork that larger companies need.",
        items: [
          { icon: <Network size={24} />, title: "Account structure design", text: "Plan operating, payroll, reserve and entity-level accounts that make sense together." },
          { icon: <KeyRound size={24} />, title: "Signers and approvals", text: "Define who can initiate, approve and release payments, with sensible limits." },
          { icon: <FileCheck size={24} />, title: "Corporate documentation", text: "Board resolutions, incumbency details and ownership charts, organized for review." },
          { icon: <Landmark size={24} />, title: "Treasury services overview", text: "Understand cash management, sweeps and fraud tools before you talk to a bank." },
          { icon: <Scale size={24} />, title: "Relationship comparison", text: "Compare the general strengths of different provider types for corporate needs." },
          { icon: <MessageSquare size={24} />, title: "Meeting preparation", text: "Know what to ask and what to bring when you meet a relationship manager." },
        ],
      }}
      benefits={{
        title: "What a good corporate setup gives you",
        subtitle: "Control and visibility that grow with the company.",
        items: [
          { icon: <Eye size={22} />, title: "Full visibility", text: "See cash across every account and entity in one view." },
          { icon: <Lock size={22} />, title: "Stronger controls", text: "Approval rules make it harder for mistakes or fraud to slip through." },
          { icon: <Clock size={22} />, title: "Time back for finance", text: "Batch payments and automation reduce manual work." },
          { icon: <BadgeCheck size={22} />, title: "Audit-ready records", text: "Clean structures make audits and due diligence smoother." },
          { icon: <Layers size={22} />, title: "Room to grow", text: "Add entities, users and services without rebuilding everything." },
          { icon: <LineChart size={22} />, title: "Lending readiness", text: "An organized relationship helps when you discuss credit." },
        ],
      }}
      helps={["Design your account and approval structure", "Organize corporate documents", "Explain treasury and fraud services", "Prepare you for relationship meetings"]}
      steps={{
        subtitle: "From complex needs to a clear plan.",
        items: [
          { icon: <MessageSquare size={20} />, title: "Discovery", text: "Entities, cash flows, team roles and the services you think you need." },
          { icon: <ClipboardCheck size={20} />, title: "Structure and documents", text: "We map accounts, approvals and paperwork into one clear plan." },
          { icon: <Send size={20} />, title: "Bank conversations", text: "You meet providers prepared, with the right questions and documents." },
        ],
      }}
      checklist={{
        title: "Corporate documents banks often request",
        subtitle: "Larger accounts usually mean more paperwork. Check what you have.",
        side: "Corporate file",
        items: [
          "Articles of Incorporation and bylaws",
          "Board resolution authorizing the account and signers",
          "EIN confirmation for each entity",
          "Ownership chart showing owners of 25% or more",
          "IDs for authorized signers and control persons",
          "Recent financial statements (often for credit services)",
        ],
      }}
      faqs={[
        ["What's the difference between business and corporate banking?", "The terms overlap. Corporate banking usually means services for larger companies, like treasury management, multi-entity structures, approval workflows and credit relationships."],
        ["Do we need a separate account for each entity?", "Generally yes. Each legal entity should have its own accounts and records. This keeps finances, taxes and liability properly separated."],
        ["What is positive pay?", "A fraud-prevention service where you tell the bank which checks or payments you issued. Items that don't match are flagged for your review before they're paid."],
        ["How does deposit insurance work for large balances?", "FDIC insurance covers up to $250,000 per depositor, per insured bank, per ownership category. Companies with larger balances often look at how to manage amounts above that limit."],
        ["Can you negotiate with banks for us?", "We don't act as your agent with banks. We help you prepare, understand options and ask the right questions."],
      ]}
      cta={{ title: "Ready to build a corporate banking setup that scales?" }}
      related={["/banking/international", "/banking/payments", "/banking/consultation"]}
    >
      <Section id="bk-treasury" tone="gray" title="Treasury services, explained" subtitle="Tap a service to see what it does and what to ask about.">
        <Reveal><Explorer items={treasury} /></Reveal>
      </Section>
    </BankingPage>
  );
}
