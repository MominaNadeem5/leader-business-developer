import {
  Compass, Search, FileCheck, Settings2, Repeat, ShieldCheck, BookOpen, Receipt, Users, Bell,
  Lock, Lightbulb, Clock, Scale, MessageSquare, Send, AlertTriangle, ListChecks,
} from "lucide-react";
import { Reveal, Section, Explorer } from "../../components/service";
import BankingPage from "./BankingPage";
import BankVisual from "./BankVisual";
import { BANKING_LINKS } from "./services";

const guide = [
  {
    id: "choose", icon: <Search size={18} />, label: "1. Choose",
    title: "Choosing the right account",
    text: "Start with how your business really uses money: how customers pay, whether you handle cash and which tools you rely on.",
    points: ["List your must-have features first", "Compare fees against your real usage", "Decide between branch, online or both"],
  },
  {
    id: "open", icon: <FileCheck size={18} />, label: "2. Open",
    title: "Opening the account",
    text: "Banks verify the business, its owners and the people who will sign. Consistent documents make this much smoother.",
    points: ["Get your EIN and formation documents first", "Match names and addresses exactly", "Know who owns 25% or more"],
  },
  {
    id: "setup", icon: <Settings2 size={18} />, label: "3. Set up",
    title: "Setting it up properly",
    text: "The first week is when good habits start. A little setup saves a lot of clean-up later.",
    points: ["Turn on two-factor sign-in and alerts", "Connect your bookkeeping software", "Set user roles and card limits"],
  },
  {
    id: "manage", icon: <BookOpen size={18} />, label: "4. Manage",
    title: "Managing it month to month",
    text: "Keep business money separate, review activity regularly and set money aside for taxes.",
    points: ["Reconcile your account every month", "Move tax money to savings as you earn", "Watch for fees creeping up"],
  },
  {
    id: "switch", icon: <Repeat size={18} />, label: "5. Switch",
    title: "Switching banks when you outgrow one",
    text: "Changing banks is common as businesses grow. Plan it so payments don't bounce in the middle.",
    points: ["Open the new account before closing the old one", "Move automatic payments and payroll", "Update your details with customers"],
  },
];

const mistakes = [
  { icon: <AlertTriangle size={20} />, title: "Mixing personal and business money", text: "It complicates taxes and can weaken an LLC or corporation's liability protection." },
  { icon: <Receipt size={20} />, title: "Ignoring the fee schedule", text: "Low headline fees can hide charges for wires, cash or extra transactions." },
  { icon: <Users size={20} />, title: "Unclear signing authority", text: "Without clear roles, it's hard to control who can move money." },
  { icon: <Lock size={20} />, title: "Weak account security", text: "Skipping two-factor sign-in and alerts makes fraud easier." },
];

export default function BusinessAccountGuidance() {
  return (
    <BankingPage
      path="/banking/business-account-guidance"
      title={{ text: "Business bank account guidance, from first account to the next one", short: "Account Guidance" }}
      subtitle={<>Choosing, opening and running a business bank account doesn't have to be confusing. Get clear, practical guidance at every stage, so your account works for your business instead of against it.</>}
      primary={{ label: "Get account guidance", to: BANKING_LINKS.start("business-account-guidance") }}
      secondary={{ label: "The account guide", href: "#bk-guide" }}
      visual={<BankVisual
        variant="checklist"
        title="Your account roadmap"
        steps={["Know your needs", "Compare account types", "Prepare documents", "Open and secure", "Manage month to month"]}
        docs={["Needs list", "Fee check", "Security setup"]}
        chips={[
          { icon: <Compass size={13} />, label: "Clear next step" },
          { icon: <Scale size={13} />, label: "Options compared" },
          { icon: <ShieldCheck size={13} />, label: "Account secured" },
        ]}
      />}
      services={{
        title: "What our guidance covers",
        subtitle: "Practical help for every stage of your business account.",
        items: [
          { icon: <Search size={24} />, title: "Needs assessment", text: "Work out which features actually matter for how your business runs." },
          { icon: <Scale size={24} />, title: "Option comparison", text: "Understand branch banks, online banks, credit unions and fintech platforms." },
          { icon: <FileCheck size={24} />, title: "Opening preparation", text: "Know what you'll be asked for and get it ready in advance." },
          { icon: <ShieldCheck size={24} />, title: "Security setup", text: "Set up sign-in security, alerts, user roles and card limits." },
          { icon: <BookOpen size={24} />, title: "Good money habits", text: "Simple routines for reconciling, saving for taxes and spotting fees." },
          { icon: <Repeat size={24} />, title: "Switching support", text: "A step-by-step plan for moving banks without missed payments." },
        ],
      }}
      benefits={{
        title: "What good guidance gets you",
        subtitle: "Fewer surprises and an account that grows with you.",
        items: [
          { icon: <Lightbulb size={22} />, title: "Confident choices", text: "Know why an account suits you before you open it." },
          { icon: <Clock size={22} />, title: "Time saved", text: "Skip the research rabbit hole and the repeat applications." },
          { icon: <Receipt size={22} />, title: "Fewer fee surprises", text: "Understand the costs that apply to how you actually bank." },
          { icon: <ShieldCheck size={22} />, title: "Better protection", text: "Security settings and controls set up from day one." },
          { icon: <Bell size={22} />, title: "Stay on top of things", text: "Habits and alerts that keep your account in good shape." },
          { icon: <Repeat size={22} />, title: "Ready to grow", text: "Know when and how to upgrade or switch." },
        ],
      }}
      helps={["Explain options in plain language", "Help you compare against your real needs", "Share setup and security best practices", "Plan a smooth switch when it's time"]}
      steps={{
        subtitle: "Guidance that starts wherever you are.",
        items: [
          { icon: <MessageSquare size={20} />, title: "Tell us your stage", text: "Choosing a first account, setting one up, or thinking about switching." },
          { icon: <ListChecks size={20} />, title: "Get tailored guidance", text: "We walk you through the steps and trade-offs that apply to you." },
          { icon: <Send size={20} />, title: "Act with confidence", text: "You make the call with your bank. We're here if questions come up." },
        ],
      }}
      faqs={[
        ["What's the most important thing when choosing a business account?", "How well it fits the way you work. A business that handles cash needs different features from one that's paid entirely online. Start from your needs, then compare."],
        ["How often should I review my business account?", "Reconcile it monthly, and review fees and features at least once a year or whenever your business changes significantly."],
        ["Should I have more than one business account?", "Many businesses use a checking account for daily spending plus a savings account for taxes and reserves. Some add separate accounts for payroll."],
        ["How do I switch business banks safely?", "Open the new account first, move automatic payments, payroll and customer details over, keep the old account open until everything has moved, then close it."],
        ["Is this financial advice?", "No. We provide general guidance on banking options and processes. For tax, legal or investment advice, speak with a licensed professional."],
      ]}
      cta={{ title: "Ready to get your business account right?" }}
      related={["/banking/virtual-bank", "/banking/physical-bank", "/banking/compare"]}
    >
      <Section id="bk-guide" tone="gray" title="The business account guide" subtitle="Five stages of a business bank account. Tap a stage for the essentials.">
        <Reveal><Explorer items={guide} /></Reveal>
      </Section>
      <Section title="Common mistakes to avoid" subtitle="Small slips that cause big headaches later.">
        <Reveal className="svc-grid svc-grid-4">
          {mistakes.map((m, i) => (
            <div key={m.title} className="svc-card" style={{ "--i": i }}>
              <div className="svc-card__icon">{m.icon}</div>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
            </div>
          ))}
        </Reveal>
      </Section>
    </BankingPage>
  );
}
