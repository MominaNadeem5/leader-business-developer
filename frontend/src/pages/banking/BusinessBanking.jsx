import {
  ShieldCheck, ArrowDownLeft, FileCheck, ClipboardCheck, Scale, CreditCard, Globe, Rocket, MessageSquare,
  Building2, BookOpen, BadgeCheck, TrendingUp, Clock, Wrench, Sprout, Users, Plane,
} from "lucide-react";
import { Reveal, Section, Explorer } from "../../components/service";
import BankingPage from "./BankingPage";
import BankVisual from "./BankVisual";
import { BANKING_LINKS } from "./services";

const stages = [
  {
    id: "new", icon: <Sprout size={18} />, label: "Just formed",
    title: "You've just formed your business",
    text: "Your first priority is a dedicated business account, so business money never mixes with personal money from day one.",
    points: ["Get your EIN and formation documents together", "Open a business checking account", "Set up simple bookkeeping from the start"],
  },
  {
    id: "growing", icon: <TrendingUp size={18} />, label: "Growing",
    title: "You're growing and getting busier",
    text: "More customers means more payments to collect and more bills to pay. The right accounts and payment tools save hours every month.",
    points: ["Add savings or tax-reserve accounts", "Accept cards and online payments", "Give team members controlled card access"],
  },
  {
    id: "raising", icon: <Rocket size={18} />, label: "Raising money",
    title: "You're raising investment",
    text: "Investors will wire funds and expect clean records. Your banking setup should make that easy and keep cash working safely.",
    points: ["Receive investor wires smoothly", "Track runway and spending", "Think about deposit insurance limits on larger balances"],
  },
  {
    id: "global", icon: <Globe size={18} />, label: "Going global",
    title: "You buy or sell across borders",
    text: "International customers and suppliers bring currency costs and wire fees. Planning ahead keeps more of your money.",
    points: ["Understand wire and currency conversion costs", "Consider multi-currency options", "Keep records for cross-border payments"],
  },
  {
    id: "abroad", icon: <Plane size={18} />, label: "Living abroad",
    title: "You own a U.S. business from outside the U.S.",
    text: "Non-resident owners face extra identity and address checks. Knowing what banks ask for avoids wasted applications.",
    points: ["Prepare passport and proof of address", "Have your EIN and U.S. business address ready", "Learn which providers serve non-residents"],
  },
];

export default function BusinessBanking() {
  return (
    <BankingPage
      path="/banking"
      title={{ text: "Business banking, set up right from day one", short: "Business Banking" }}
      subtitle={<>From your first business checking account to international payments, we help you understand your options, get your documents in order and approach banks with confidence.</>}
      primary={{ label: "Get banking help", to: BANKING_LINKS.start("banking") }}
      secondary={{ label: "Explore services", href: "#bk-services" }}
      visual={<BankVisual variant="dashboard" chips={[
        { icon: <FileCheck size={13} />, label: "Documents ready" },
        { icon: <ArrowDownLeft size={13} />, label: "Payment received" },
        { icon: <ShieldCheck size={13} />, label: "Finances separated" },
      ]} />}
      services={{
        title: "Everything your business needs to bank well",
        subtitle: "Pick a starting point, or let us guide you through all of it.",
        items: [
          { icon: <ClipboardCheck size={24} />, title: "Account opening support", text: "We help you gather the right documents and understand each bank's requirements before you apply." },
          { icon: <Scale size={24} />, title: "Compare account options", text: "Checking, savings, online banks, credit unions and fintech platforms, explained side by side." },
          { icon: <CreditCard size={24} />, title: "Payments and merchant setup", text: "Get ready to accept cards, send ACH and wires, and keep payments organized." },
          { icon: <Globe size={24} />, title: "International and non-resident", text: "Guidance for cross-border businesses and owners who live outside the U.S." },
          { icon: <Building2 size={24} />, title: "Startup and corporate structures", text: "Banking setups for funded startups, multi-entity groups and growing companies." },
          { icon: <MessageSquare size={24} />, title: "One-on-one consultation", text: "Talk through your situation with a specialist and leave with a clear plan." },
        ],
      }}
      benefits={{
        title: "Why proper business banking matters",
        subtitle: "A separate, well-organized setup protects you and saves time every month.",
        items: [
          { icon: <ShieldCheck size={22} />, title: "Protect your liability shield", text: "Mixing funds can weaken the legal separation an LLC or corporation gives you." },
          { icon: <BookOpen size={22} />, title: "Cleaner books and taxes", text: "One place for business money makes bookkeeping and tax time far simpler." },
          { icon: <BadgeCheck size={22} />, title: "Look professional", text: "Customers pay your business name, not your personal account." },
          { icon: <Clock size={22} />, title: "Fewer delays", text: "Complete, consistent applications avoid back-and-forth with the bank." },
          { icon: <TrendingUp size={22} />, title: "Build a financial history", text: "A business account history helps when you look for credit or funding later." },
          { icon: <Wrench size={22} />, title: "Tools that fit", text: "Choose accounts and payment tools that match how you actually work." },
        ],
      }}
      helps={["Explain account types in plain language", "Prepare and organize your documents", "Compare options against your real needs", "Stay on hand while you go through the bank's process"]}
      steps={{
        subtitle: "Three steps from questions to a clear banking plan.",
        items: [
          { icon: <Users size={20} />, title: "Tell us about your business", text: "Your structure, where you operate, how you get paid and what you need from a bank." },
          { icon: <ClipboardCheck size={20} />, title: "We map your options", text: "We explain suitable account types and build your document checklist." },
          { icon: <FileCheck size={20} />, title: "You apply with confidence", text: "You apply with the provider you choose. We're here if questions come up." },
        ],
      }}
      faqs={[
        ["Are you a bank?", "No. We're a business-services company. We help you understand options and prepare for the application. Your account is opened with, and held by, the bank or provider you choose."],
        ["Can you guarantee my account will be approved?", "No one can. Every bank runs its own identity, ownership and risk checks and makes its own decision. What we can do is help you submit a complete, accurate application."],
        ["Do I really need a separate business account?", "For an LLC or corporation, keeping business money separate is strongly recommended to protect your limited liability and keep clean records. Sole proprietors benefit too, especially at tax time."],
        ["What do banks usually ask for?", "Commonly your EIN, formation documents, ownership details, government-issued ID for owners and signers, and a business address. Requirements vary by bank and business type."],
        ["Is my money insured?", "At FDIC-insured banks and NCUA-insured credit unions, eligible deposits are insured up to $250,000 per depositor, per institution, per ownership category. Fintech platforms usually hold deposits at partner banks, so check how coverage works."],
        ["Which page should I start with?", "If you're opening your first account, start with Business Bank Account Assistance. If you're weighing options, try Compare Business Bank Accounts. Not sure? Book a consultation."],
      ]}
      cta={{ title: "Ready to get your business banking sorted?" }}
    >
      <Section tone="gray" title="Find your banking path" subtitle="Every stage of business needs something different. Pick where you are today.">
        <Reveal><Explorer items={stages} /></Reveal>
      </Section>
    </BankingPage>
  );
}
