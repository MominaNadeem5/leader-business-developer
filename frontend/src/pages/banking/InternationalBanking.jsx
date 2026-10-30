import {
  Send, Coins, Repeat, ShoppingCart, FileText, ShieldCheck, Clock, Eye, Percent,
  MessageSquare, ClipboardCheck, Building2, Scale, BadgeCheck,
} from "lucide-react";
import { Reveal, Section, Explorer } from "../../components/service";
import BankingPage from "./BankingPage";
import BankVisual from "./BankVisual";
import { BANKING_LINKS } from "./services";

const tools = [
  {
    id: "wires", icon: <Send size={18} />, label: "International wires",
    title: "International wire transfers",
    text: "Bank-to-bank transfers sent across borders, commonly through the SWIFT network. Reliable for larger amounts, but fees can apply at several points.",
    points: ["Fees from your bank, middle banks and the receiving bank", "Need the recipient's bank and account details", "Speed varies by country and currency"],
  },
  {
    id: "fx", icon: <Repeat size={18} />, label: "Currency exchange",
    title: "Currency conversion (FX)",
    text: "When you pay or get paid in another currency, someone converts it. The exchange rate markup is often the biggest hidden cost.",
    points: ["Compare the rate to the mid-market rate", "Ask who converts: you, your bank or theirs", "Timing can affect the amount received"],
  },
  {
    id: "multi", icon: <Coins size={18} />, label: "Multi-currency",
    title: "Multi-currency accounts",
    text: "Hold balances in several currencies, so you can receive and pay without converting every time.",
    points: ["Convert only when it suits you", "Useful for regular foreign suppliers", "Often offered by banks and fintech platforms"],
  },
  {
    id: "market", icon: <ShoppingCart size={18} />, label: "Marketplace payouts",
    title: "Global marketplace payouts",
    text: "Selling on international marketplaces means payouts in different currencies, sometimes with their own conversion fees.",
    points: ["Check the payout currency options", "Watch double conversion", "Keep payout reports for your books"],
  },
];

export default function InternationalBanking() {
  return (
    <BankingPage
      path="/banking/international"
      title={{ text: "International business banking without the surprises", short: "International Banking" }}
      subtitle={<>Paying overseas suppliers or selling to customers abroad? We help you understand wires, currency conversion and multi-currency options, so more of your money arrives where it should.</>}
      primary={{ label: "Plan international banking", to: BANKING_LINKS.start("international-banking") }}
      secondary={{ label: "Cross-border tools", href: "#bk-tools" }}
      visual={<BankVisual variant="global" route={["USD", "EUR"]} title="Wire to supplier" chips={[
        { icon: <Coins size={13} />, label: "6 currencies" },
        { icon: <Send size={13} />, label: "Wire tracked" },
        { icon: <Percent size={13} />, label: "FX rate checked" },
      ]} />}
      services={{
        title: "Cross-border banking support",
        subtitle: "Help with the parts of international money that cost businesses the most.",
        items: [
          { icon: <Send size={24} />, title: "Wire transfer setup", text: "Understand what details you need and what fees to expect before you send." },
          { icon: <Repeat size={24} />, title: "FX cost awareness", text: "Learn how to compare exchange rates and spot markups." },
          { icon: <Coins size={24} />, title: "Multi-currency options", text: "Decide whether holding foreign currencies makes sense for you." },
          { icon: <Building2 size={24} />, title: "Provider comparison", text: "Compare banks and platforms on international features that matter to you." },
          { icon: <FileText size={24} />, title: "Records and compliance", text: "Keep the documentation banks may ask for on cross-border payments." },
          { icon: <ShoppingCart size={24} />, title: "Global sales payouts", text: "Plan how marketplace and processor payouts reach your account." },
        ],
      }}
      benefits={{
        title: "Why plan your international banking",
        subtitle: "Small percentages add up fast when money crosses borders.",
        items: [
          { icon: <Percent size={22} />, title: "Lower conversion costs", text: "Knowing the real rate helps you avoid avoidable markups." },
          { icon: <Clock size={22} />, title: "Predictable timing", text: "Know roughly when payments will arrive, so suppliers aren't left waiting." },
          { icon: <Eye size={22} />, title: "Fewer surprises", text: "Understand every fee before you hit send." },
          { icon: <ShieldCheck size={22} />, title: "Safer payments", text: "Verify payment details to reduce the risk of fraud and misdirected wires." },
          { icon: <BadgeCheck size={22} />, title: "Stronger supplier trust", text: "Paying the right amount on time builds better relationships." },
          { icon: <Scale size={22} />, title: "Better comparisons", text: "Judge providers on the total cost, not just the headline fee." },
        ],
      }}
      helps={["Explain wires, FX and multi-currency options", "Help you compare total transfer costs", "Prepare documents banks may request", "Plan how global payouts reach you"]}
      steps={{
        subtitle: "Turn cross-border confusion into a clear routine.",
        items: [
          { icon: <MessageSquare size={20} />, title: "Map your money flows", text: "Which countries, currencies and amounts you send and receive." },
          { icon: <ClipboardCheck size={20} />, title: "Choose your tools", text: "We explain options for wires, FX and multi-currency accounts." },
          { icon: <Send size={20} />, title: "Set up and send", text: "You open the right accounts and start paying with confidence." },
        ],
      }}
      compare={{
        title: "Ways to move money across borders",
        subtitle: "Typical characteristics. Actual speed and cost depend on the provider and route.",
        columns: ["", "Bank wire (SWIFT)", "Fintech transfer service", "Card payment"],
        rows: [
          ["Good for large amounts", true, "Often", "Limited"],
          ["Fee transparency", "Varies", "Often clearer", "Varies"],
          ["Exchange rate markup", "Varies", "Varies", "Varies"],
          ["Recipient needs a bank account", true, true, false],
          ["Typical use", "Suppliers, property, large invoices", "Regular supplier payments", "Small purchases, subscriptions"],
        ],
        highlight: 1,
      }}
      faqs={[
        ["How much does an international wire cost?", "It depends on your bank, any intermediary banks and the receiving bank, plus the exchange rate used. Ask for the full cost, including the rate, before sending."],
        ["What's a SWIFT/BIC code?", "It's an international code that identifies a bank, used to route cross-border wires. You'll usually need it along with the recipient's account number or IBAN."],
        ["What is the mid-market rate?", "It's the midpoint between buy and sell rates in currency markets. Comparing a provider's rate to it shows how much markup you're paying."],
        ["Should I invoice in my currency or theirs?", "Invoicing in your currency moves the currency risk to the customer. Invoicing in theirs may win business but means you handle conversion. It depends on your market."],
        ["Can my U.S. business account receive foreign payments?", "Most U.S. business accounts can receive incoming international wires. Fees and the conversion rate applied vary, so check with your bank."],
      ]}
      cta={{ title: "Ready to bank across borders with confidence?" }}
      related={["/banking/non-residents", "/banking/payments", "/banking/corporate"]}
    >
      <Section id="bk-tools" tone="gray" title="Your cross-border toolkit" subtitle="Tap a tool to see how it works and what to watch for.">
        <Reveal><Explorer items={tools} /></Reveal>
      </Section>
    </BankingPage>
  );
}
