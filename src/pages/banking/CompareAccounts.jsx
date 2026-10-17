import {
  Scale, Receipt, Percent, Store, Plug, ShieldCheck, Clock, Eye, Target, Search,
  MessageSquare, Send, Sparkles, Landmark, Banknote, Wallet,
} from "lucide-react";
import { Reveal, Section } from "../../components/service";
import BankingPage from "./BankingPage";
import BankVisual from "./BankVisual";
import AccountMatcher from "./AccountMatcher";
import { BANKING_LINKS } from "./services";

export default function CompareAccounts() {
  return (
    <BankingPage
      path="/banking/compare"
      title={{ text: "Compare business bank accounts and find your fit", short: "Compare Accounts" }}
      subtitle={<>Traditional banks, online banks, credit unions and fintech platforms all work differently. Use our matcher to see which type of provider fits your priorities, then let us help you compare the details.</>}
      primary={{ label: "Get a comparison", to: BANKING_LINKS.start("compare-accounts") }}
      secondary={{ label: "Try the matcher", href: "#bk-matcher" }}
      visual={<BankVisual variant="compare" chips={[
        { icon: <Sparkles size={13} />, label: "Best fit found" },
        { icon: <Receipt size={13} />, label: "Fees compared" },
        { icon: <Plug size={13} />, label: "Integrations checked" },
      ]} />}
      services={{
        title: "What we compare for you",
        subtitle: "The details that matter after you've opened the account.",
        items: [
          { icon: <Receipt size={24} />, title: "Fees and minimums", text: "Monthly fees, waivers, minimum balances and the transaction fees that add up." },
          { icon: <Banknote size={24} />, title: "Deposits and cash", text: "Mobile deposit, cash options, limits and how quickly funds become available." },
          { icon: <Percent size={24} />, title: "Interest and savings", text: "Whether balances earn anything, and the conditions attached." },
          { icon: <Plug size={24} />, title: "Tools and integrations", text: "Accounting, payroll and payment connections that save you time." },
          { icon: <Store size={24} />, title: "Access and support", text: "Branches, phone support and online-only service, compared honestly." },
          { icon: <ShieldCheck size={24} />, title: "Protection and controls", text: "Deposit insurance setup, user roles and fraud tools." },
        ],
      }}
      benefits={{
        title: "Why compare before you open",
        subtitle: "Switching later is possible, but it's easier to choose well the first time.",
        items: [
          { icon: <Target size={22} />, title: "Fit over features", text: "Focus on what you'll actually use." },
          { icon: <Wallet size={22} />, title: "Avoid hidden costs", text: "Spot the fees that only appear with your usage pattern." },
          { icon: <Clock size={22} />, title: "Save time later", text: "The right tools now avoid manual work every month." },
          { icon: <Eye size={22} />, title: "Clear trade-offs", text: "Understand what you gain and give up with each option." },
          { icon: <Landmark size={22} />, title: "Know who holds your money", text: "Banks, credit unions and platforms are structured differently." },
          { icon: <Scale size={22} />, title: "Confident decisions", text: "Choose with a clear, side-by-side view." },
        ],
      }}
      helps={["Explain how provider types differ", "Compare fees and features against your usage", "Highlight terms worth reading closely", "Help you prepare to open your chosen account"]}
      steps={{
        subtitle: "A side-by-side view built around your business.",
        items: [
          { icon: <MessageSquare size={20} />, title: "Share your priorities", text: "Cash, branches, fees, integrations, international needs and more." },
          { icon: <Search size={20} />, title: "We compare options", text: "We look at provider types and the features that match your needs." },
          { icon: <Send size={20} />, title: "Choose and open", text: "You pick the provider. We help you prepare the application." },
        ],
      }}
      compare={{
        title: "Provider types side by side",
        subtitle: "General tendencies. Always check the specific account's current terms.",
        columns: ["", "Traditional bank", "Online bank", "Credit union", "Fintech platform"],
        rows: [
          ["Branch access", true, false, "Often", false],
          ["Cash deposits", true, "Limited", true, "Limited"],
          ["Monthly fees", "Often, with waivers", "Often low or none", "Often low", "Often low or none"],
          ["Software integrations", "Varies", "Varies", "Varies", "Usually strong"],
          ["Lending relationship", "Strong", "Limited", "Varies", "Limited"],
          ["Deposits insured by", "FDIC", "FDIC", "NCUA", "Partner bank's FDIC coverage"],
        ],
        highlight: 2,
        note: "Fintech platforms are not banks. Deposit insurance only applies if their partner bank holds your funds in an eligible way.",
      }}
      faqs={[
        ["Which type of account is best?", "There isn't a single best option. A business that handles cash and wants a local lending relationship has different needs than an online business that wants low fees and integrations."],
        ["Do you recommend specific banks?", "We don't have bank partnerships, and we don't rank banks. We help you understand provider types and compare the features that matter to you."],
        ["Is a credit union a good option for a business?", "Many credit unions offer business accounts with competitive fees. You usually need to qualify for membership, and features vary widely."],
        ["How is a fintech platform different from a bank?", "Fintech platforms provide the app and tools, while a partner bank typically holds the deposits. Read their disclosures to understand who holds your money and how insurance applies."],
        ["Can I have accounts with more than one provider?", "Yes. Some businesses keep a traditional bank for cash and lending, plus an online account for low fees or integrations."],
      ]}
      cta={{ title: "Ready to find the account that fits?" }}
      related={["/banking/checking-savings", "/banking/account-assistance", "/banking/consultation"]}
    >
      <Section id="bk-matcher" tone="gray" title="Account matcher" subtitle="Pick what matters to you and see which type of provider tends to fit.">
        <Reveal><AccountMatcher /></Reveal>
      </Section>
    </BankingPage>
  );
}
