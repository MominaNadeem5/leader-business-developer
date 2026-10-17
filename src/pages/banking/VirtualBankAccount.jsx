import {
  Smartphone, Laptop, CreditCard, Hash, Bell, Plug, Clock, Globe, Zap, Banknote,
  MessageSquare, ClipboardCheck, Send, Receipt, Users, Lock, Eye,
} from "lucide-react";
import { Reveal, Section, Explorer } from "../../components/service";
import BankingPage from "./BankingPage";
import BankVisual from "./BankVisual";
import { BANKING_LINKS } from "./services";

const kinds = [
  {
    id: "online", icon: <Laptop size={18} />, label: "Online bank account",
    title: "An account at an online-only bank",
    text: "A licensed bank with no branches. You open and manage everything through a website and app, and deposits can be insured like at any other bank.",
    points: ["Open and manage the account online", "Often lower monthly fees", "Customer support by chat, phone or email"],
  },
  {
    id: "fintech", icon: <Smartphone size={18} />, label: "Fintech platform",
    title: "An account through a fintech platform",
    text: "A technology company provides the app and tools, while a partner bank holds your deposits. Read their disclosures to see who holds your money.",
    points: ["Strong software and integrations", "Deposits held at a partner bank", "Coverage depends on how the arrangement works"],
  },
  {
    id: "cards", icon: <CreditCard size={18} />, label: "Virtual cards",
    title: "Virtual card numbers",
    text: "Card numbers that live in your app, not your wallet. Create one per vendor or team member, set limits and freeze them in a tap.",
    points: ["Separate cards per subscription or vendor", "Spending limits and instant freeze", "Fewer problems if one number leaks"],
  },
  {
    id: "numbers", icon: <Hash size={18} />, label: "Virtual account numbers",
    title: "Virtual account numbers",
    text: "Extra account numbers that route into one main account. Some businesses give each large customer a unique number to match incoming payments.",
    points: ["Easier payment matching", "Fewer reconciliation errors", "Availability varies by provider"],
  },
];

export default function VirtualBankAccount() {
  return (
    <BankingPage
      path="/banking/virtual-bank"
      title={{ text: "A virtual business bank account you run from your phone", short: "Virtual Bank Account" }}
      subtitle={<>Open and manage your business account online, issue cards in seconds and connect your bookkeeping tools. We help you understand how virtual accounts work, what to check before choosing one and how to get set up.</>}
      primary={{ label: "Get virtual account help", to: BANKING_LINKS.start("virtual-bank-account") }}
      secondary={{ label: "What \"virtual\" means", href: "#bk-virtual" }}
      visual={<BankVisual
        variant="card"
        name="BRIGHTLEAF LLC"
        spend={[["Software", 54], ["Ads", 71], ["Travel", 32]]}
        alerts={["Virtual card created for Ads", "Payment received by ACH", "Card frozen in one tap", "Receipt added from your phone"]}
        chips={[
          { icon: <Smartphone size={13} />, label: "100% online" },
          { icon: <Zap size={13} />, label: "Instant cards" },
          { icon: <Bell size={13} />, label: "Real-time alerts" },
        ]}
      />}
      services={{
        title: "How we help with virtual accounts",
        subtitle: "Going branchless is easy. Choosing well takes a little homework.",
        items: [
          { icon: <Eye size={24} />, title: "Know who holds your money", text: "We explain the difference between online banks and fintech platforms, and how deposit insurance applies." },
          { icon: <Receipt size={24} />, title: "Fee and limit review", text: "Check monthly fees, transfer limits, ATM access and charges for wires or cash deposits." },
          { icon: <Banknote size={24} />, title: "Cash handling plan", text: "If you take cash, we look at how and where you can deposit it with a virtual account." },
          { icon: <Plug size={24} />, title: "Tool connections", text: "Confirm the account works with your accounting, payroll and payment software." },
          { icon: <ClipboardCheck size={24} />, title: "Online application prep", text: "Get your documents scanned, consistent and ready to upload." },
          { icon: <Users size={24} />, title: "Team access setup", text: "Plan user roles, card limits and approvals before you invite your team." },
        ],
      }}
      benefits={{
        title: "Why businesses go virtual",
        subtitle: "Banking that fits around your day, not branch opening hours.",
        items: [
          { icon: <Clock size={22} />, title: "Bank any time", text: "Pay, transfer and check balances day or night." },
          { icon: <Laptop size={22} />, title: "Online setup", text: "Many applications can be completed without a branch visit." },
          { icon: <CreditCard size={22} />, title: "Cards on demand", text: "Create virtual cards for vendors and team members in seconds." },
          { icon: <Bell size={22} />, title: "Instant visibility", text: "Real-time notifications for every payment in and out." },
          { icon: <Plug size={22} />, title: "Connected tools", text: "Sync transactions with your bookkeeping automatically." },
          { icon: <Globe size={22} />, title: "Work from anywhere", text: "Manage your business money wherever you are." },
        ],
      }}
      helps={["Explain online banks vs. fintech platforms", "Point out fees, limits and cash options to check", "Prepare documents for an online application", "Plan cards, users and integrations"]}
      steps={{
        subtitle: "From choosing to banking online in three steps.",
        items: [
          { icon: <MessageSquare size={20} />, title: "Share how you work", text: "How you get paid, whether you handle cash and which tools you use." },
          { icon: <ClipboardCheck size={20} />, title: "Choose and prepare", text: "We help you weigh options and get your documents ready to upload." },
          { icon: <Send size={20} />, title: "Apply online", text: "You apply with the provider you choose, then set up cards and users." },
        ],
      }}
      compare={{
        title: "Virtual vs. branch-based accounts",
        subtitle: "General tendencies. Individual providers differ.",
        columns: ["", "Virtual account", "Branch account"],
        rows: [
          ["Open online", "Usually", "Sometimes"],
          ["In-person help", false, true],
          ["Cash deposits", "Limited or via partners", true],
          ["Virtual cards and app tools", "Usually strong", "Varies"],
          ["Monthly fees", "Often low or none", "Often, with waivers"],
          ["Lending relationship", "Limited", "Often stronger"],
        ],
        highlight: 1,
        note: "Fintech platforms are not banks. Deposit insurance only applies if a partner bank holds your funds in an eligible way.",
      }}
      checklist={{
        title: "Ready for an online application?",
        subtitle: "Online providers usually ask you to upload these. Tick off what you have.",
        side: "Your uploads",
        items: [
          "Clear scan or photo of each owner's ID",
          "EIN confirmation letter",
          "Formation documents for your business",
          "Business address (not a P.O. box)",
          "Ownership details for owners of 25% or more",
          "Website or description of what you sell",
        ],
      }}
      faqs={[
        ["Is a virtual bank account safe?", "It can be. Online banks are licensed and insured like other banks. Fintech platforms usually hold deposits at partner banks. Check who holds your money, how insurance applies and what security features they offer, such as two-factor login."],
        ["Is my money FDIC-insured?", "At an FDIC-insured online bank, eligible deposits are insured up to $250,000 per depositor, per bank, per ownership category. With a fintech platform, coverage depends on the partner bank arrangement, so read their disclosures."],
        ["Can I deposit cash into a virtual account?", "Some providers allow cash deposits at partner retail locations or ATMs, often with limits or fees. Others don't accept cash at all. If you handle a lot of cash, a branch account may suit you better."],
        ["Can I get checks and a debit card?", "Most virtual accounts include a debit card, and many let you mail or deposit checks through the app. Check which features each provider includes."],
        ["Can I open a virtual account without visiting the U.S.?", "Some providers serve non-resident owners online, depending on country and business type. See our Banking for Non-Residents page."],
      ]}
      cta={{ title: "Ready to bank from anywhere?" }}
      related={["/banking/physical-bank", "/banking/compare", "/banking/business-account-guidance"]}
      footnotes={[<>Features named on this page are common examples. Availability, fees and limits depend on the provider you choose.</>]}
    >
      <Section id="bk-virtual" tone="gray" title={'What "virtual" can mean'} subtitle="The word covers a few different things. Tap one to learn more.">
        <Reveal><Explorer items={kinds} /></Reveal>
        <p className="bk-small"><Lock size={13} style={{ verticalAlign: "-2px" }} /> Always turn on two-factor sign-in and app alerts, whichever provider you choose.</p>
      </Section>
    </BankingPage>
  );
}
