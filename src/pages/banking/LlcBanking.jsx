import {
  Building2, User, Users, Globe, ShieldCheck, IdCard, ClipboardCheck, Scale, BookOpen,
  BadgeCheck, TrendingUp, Receipt, MessageSquare, Send, Split, Landmark, FolderCheck,
} from "lucide-react";
import { Reveal, Section, Explorer } from "../../components/service";
import BankingPage from "./BankingPage";
import BankVisual from "./BankVisual";
import { BANKING_LINKS } from "./services";

const llcTypes = [
  {
    id: "single", icon: <User size={18} />, label: "Single-member LLC",
    title: "Single-member LLC",
    text: "You're the only owner. Even if you file taxes on your personal return, the LLC should still have its own bank account to keep your liability protection strong.",
    points: ["EIN usually recommended (and often required by banks)", "You're the owner and the signer", "Never pay personal costs from the LLC account"],
  },
  {
    id: "multi", icon: <Users size={18} />, label: "Multi-member LLC",
    title: "Multi-member LLC",
    text: "Two or more owners. Banks will want details on each owner with 25% or more, and your operating agreement often shows who can sign and move money.",
    points: ["EIN required", "Operating agreement commonly requested", "Agree signing authority and limits between members"],
  },
  {
    id: "foreign", icon: <Globe size={18} />, label: "Foreign-owned LLC",
    title: "LLC with an owner outside the U.S.",
    text: "Non-resident owners can bank a U.S. LLC, but banks apply extra identity and address checks. Some require a branch visit.",
    points: ["Passport and proof of foreign address", "U.S. business address and EIN", "Extra IRS reporting can apply (e.g. Form 5472)"],
  },
];

export default function LlcBanking() {
  return (
    <BankingPage
      path="/banking/llc"
      title={{ text: "Banking for LLCs: keep your business money separate", short: "Banking for LLCs" }}
      subtitle={<>Your LLC protects your personal assets, but only if you treat it as a separate business. A dedicated LLC bank account is the first step. We help you prepare and choose wisely.</>}
      primary={{ label: "Get LLC banking help", to: BANKING_LINKS.start("llc-banking") }}
      secondary={{ label: "LLC types", href: "#bk-llc-types" }}
      visual={<BankVisual
        variant="checklist"
        title="LLC account application"
        steps={["LLC details", "Articles of Organization", "EIN confirmation", "Members & ownership", "Ready for bank review"]}
        docs={["Articles", "EIN letter", "Operating agreement"]}
        chips={[
          { icon: <Building2 size={13} />, label: "LLC verified" },
          { icon: <Split size={13} />, label: "Funds separated" },
          { icon: <IdCard size={13} />, label: "Members listed" },
        ]}
      />}
      services={{
        title: "LLC banking support",
        subtitle: "Everything you need to open and run your LLC's account the right way.",
        items: [
          { icon: <FolderCheck size={24} />, title: "LLC document prep", text: "Articles, EIN letter, operating agreement and member details, organized and consistent." },
          { icon: <Users size={24} />, title: "Members and signers", text: "Plan who owns, who signs and who gets card access before you apply." },
          { icon: <Scale size={24} />, title: "Provider fit", text: "Understand which kinds of providers suit single-member, multi-member or foreign-owned LLCs." },
          { icon: <Split size={24} />, title: "Separation best practices", text: "Simple habits that keep LLC money and personal money apart." },
          { icon: <BookOpen size={24} />, title: "Bookkeeping setup", text: "Get the account ready to connect with your accounting tools from day one." },
          { icon: <Receipt size={24} />, title: "Owner pay basics", text: "Understand owner draws versus salary at a high level, and when to ask an accountant." },
        ],
      }}
      benefits={{
        title: "Why your LLC needs its own account",
        subtitle: "It's one of the simplest ways to protect what an LLC is meant to protect.",
        items: [
          { icon: <ShieldCheck size={22} />, title: "Protect limited liability", text: "Mixing personal and business funds can let a court disregard your LLC's protection." },
          { icon: <Receipt size={22} />, title: "Cleaner deductions", text: "Business expenses are easy to prove when they come from a business account." },
          { icon: <BadgeCheck size={22} />, title: "Professional payments", text: "Customers pay your LLC, and checks are made out to your business name." },
          { icon: <TrendingUp size={22} />, title: "Business credit history", text: "Account history can support future credit and funding." },
          { icon: <BookOpen size={22} />, title: "Simpler bookkeeping", text: "Every transaction is a business transaction. No sorting needed." },
          { icon: <Landmark size={22} />, title: "Easier to add members", text: "A clear account structure makes ownership changes more manageable." },
        ],
      }}
      helps={["Organize your LLC documents", "Clarify members, signers and access", "Explain options for your LLC type", "Share separation best practices"]}
      steps={{
        subtitle: "Get your LLC's account set up properly.",
        items: [
          { icon: <MessageSquare size={20} />, title: "Tell us about your LLC", text: "State, members, ownership split and how the LLC earns money." },
          { icon: <ClipboardCheck size={20} />, title: "Prepare your file", text: "We review your documents and flag anything a bank may question." },
          { icon: <Send size={20} />, title: "Apply and separate", text: "You open the account and start running all LLC money through it." },
        ],
      }}
      checklist={{
        title: "What banks usually ask an LLC for",
        subtitle: "Tick off what you have. Missing something? We can help with that too.",
        side: "Your LLC file",
        items: [
          "Articles of Organization (stamped or filed copy)",
          "EIN confirmation letter (CP 575 or 147C)",
          "Operating agreement",
          "Photo ID for every member with 25% or more",
          "Photo ID for each person who will sign on the account",
          "Business address that isn't a P.O. box",
        ],
        note: "Some banks also ask for a certificate of good standing, business licenses or a resolution naming authorized signers.",
      }}
      faqs={[
        ["Is a separate bank account legally required for an LLC?", "Most states don't require it in so many words, but keeping funds separate is one of the most important ways to protect your limited liability. In practice, every LLC should have one."],
        ["Can I use my SSN instead of an EIN?", "Single-member LLCs are sometimes allowed to, but many banks require an EIN for any LLC. An EIN also keeps your SSN off business paperwork."],
        ["Do I need an operating agreement to open an account?", "Not always, but many banks ask for one, especially for multi-member LLCs. It shows who owns the LLC and who can act for it."],
        ["Can I transfer money from my LLC to myself?", "Yes, as a recorded owner draw or salary, depending on how your LLC is taxed. Avoid paying personal bills directly from the LLC account. Ask an accountant about the right approach."],
        ["Can a non-resident open a bank account for a U.S. LLC?", "Often yes, though options are narrower and identity checks are stricter. See our Banking for Non-Residents page for more."],
      ]}
      cta={{ title: "Ready to give your LLC its own account?" }}
      related={["/banking/account-assistance", "/banking/non-residents", "/banking/checking-savings"]}
    >
      <Section id="bk-llc-types" tone="gray" title="Banking by LLC type" subtitle="What banks ask for depends on how your LLC is set up. Pick yours.">
        <Reveal><Explorer items={llcTypes} /></Reveal>
      </Section>
    </BankingPage>
  );
}
