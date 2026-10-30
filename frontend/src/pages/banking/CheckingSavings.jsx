import {
  Wallet, PiggyBank, Landmark, Lock, ArrowDownLeft, Percent, Receipt, CalendarClock, Layers, ShieldCheck,
  CreditCard, BookOpen, Split, Coins, MessageSquare, ListChecks, Send, CircleDollarSign,
} from "lucide-react";
import { Reveal, Section, Explorer } from "../../components/service";
import BankingPage from "./BankingPage";
import BankVisual from "./BankVisual";
import { BANKING_LINKS } from "./services";

const accountTypes = [
  {
    id: "checking", icon: <Wallet size={18} />, label: "Checking",
    title: "Business checking",
    text: "Your everyday operating account. Money comes in from customers and goes out to suppliers, payroll and bills.",
    points: ["Debit cards, ACH, wires and checks", "Usually little or no interest", "Watch for monthly fees and transaction limits"],
  },
  {
    id: "savings", icon: <PiggyBank size={18} />, label: "Savings",
    title: "Business savings",
    text: "A place for money you don't need day to day, like an emergency fund or money set aside for taxes.",
    points: ["Typically earns interest", "May limit withdrawals or transfers", "Good for tax reserves and safety cushions"],
  },
  {
    id: "mm", icon: <Coins size={18} />, label: "Money market",
    title: "Money market accounts",
    text: "A mix of savings and checking features. Often pays interest while allowing some check writing or transfers.",
    points: ["Interest often tiered by balance", "May require a higher minimum balance", "Limited monthly transactions are common"],
  },
  {
    id: "cd", icon: <Lock size={18} />, label: "CDs",
    title: "Certificates of deposit",
    text: "You lock money away for a fixed term in exchange for a set interest rate. Useful for cash you won't need for a while.",
    points: ["Fixed term, from months to years", "Penalties for early withdrawal", "Can be laddered to stagger access"],
  },
];

export default function CheckingSavings() {
  return (
    <BankingPage
      path="/banking/checking-savings"
      title={{ text: "Business checking and savings, organized the smart way", short: "Checking & Savings" }}
      subtitle={<>One account for spending, others for saving and taxes. We help you understand account types, what to look for in the fine print, and how to set up a structure that keeps cash under control.</>}
      primary={{ label: "Plan my accounts", to: BANKING_LINKS.start("checking-savings") }}
      secondary={{ label: "Compare account types", href: "#bk-types" }}
      visual={<BankVisual variant="dashboard" label="Business checking" start={36420} accounts={["Checking", "Savings", "Taxes"]} chips={[
        { icon: <PiggyBank size={13} />, label: "Auto-save on" },
        { icon: <Percent size={13} />, label: "Interest earned" },
        { icon: <ArrowDownLeft size={13} />, label: "Deposit received" },
      ]} />}
      services={{
        title: "How we help you choose",
        subtitle: "Account features look similar until you read the details. We help you read them.",
        items: [
          { icon: <Layers size={24} />, title: "Account structure planning", text: "Decide how many accounts you need and what each one is for." },
          { icon: <Receipt size={24} />, title: "Fee and limit review", text: "Understand monthly fees, minimum balances and transaction limits before you commit." },
          { icon: <Percent size={24} />, title: "Interest and savings options", text: "Learn how savings, money market and CD options differ, and when each fits." },
          { icon: <CreditCard size={24} />, title: "Cards and access", text: "Plan debit cards, user access and spending controls for your team." },
          { icon: <BookOpen size={24} />, title: "Bookkeeping readiness", text: "Set up accounts so they connect cleanly with your accounting software." },
          { icon: <ListChecks size={24} />, title: "Opening checklist", text: "Get the documents ready for the accounts you've chosen." },
        ],
      }}
      benefits={{
        title: "Why split checking and savings?",
        subtitle: "A simple structure makes your money easier to manage and harder to overspend.",
        items: [
          { icon: <Split size={22} />, title: "Clear purpose per account", text: "Operating money, reserves and taxes each have a home." },
          { icon: <CalendarClock size={22} />, title: "Tax time without panic", text: "Set money aside as you earn, so tax bills aren't a surprise." },
          { icon: <ShieldCheck size={22} />, title: "A safety cushion", text: "An emergency fund helps you ride out slow months." },
          { icon: <Percent size={22} />, title: "Idle cash can earn", text: "Money you don't need right away may earn interest in savings." },
          { icon: <Landmark size={22} />, title: "Insurance awareness", text: "Know how coverage limits apply as balances grow." },
          { icon: <CircleDollarSign size={22} />, title: "Better visibility", text: "See at a glance what's spendable and what's reserved." },
        ],
      }}
      helps={["Explain account types and their trade-offs", "Highlight fees and limits to check", "Suggest a simple account structure", "Prepare your opening documents"]}
      steps={{
        subtitle: "From one cluttered account to a clear structure.",
        items: [
          { icon: <MessageSquare size={20} />, title: "Share how money flows", text: "Tell us how you get paid, what you spend on and what you want to save for." },
          { icon: <Layers size={20} />, title: "Design your structure", text: "We suggest a checking and savings setup that fits your business." },
          { icon: <Send size={20} />, title: "Open and connect", text: "You open accounts with your chosen provider and connect your tools." },
        ],
      }}
      compare={{
        title: "Checking vs. savings at a glance",
        subtitle: "General differences. Every bank's product terms are different.",
        columns: ["", "Business checking", "Business savings"],
        rows: [
          ["Main purpose", "Daily spending and receiving", "Holding reserves"],
          ["Debit card", true, false],
          ["Typically earns interest", "Rarely", "Usually"],
          ["Frequent transactions", true, "Often limited"],
          ["Good for tax set-asides", false, true],
          ["Common fees to check", "Monthly, overdraft, wire", "Minimum balance, excess withdrawals"],
        ],
        highlight: 1,
      }}
      faqs={[
        ["How many business accounts should I have?", "Many small businesses start with one checking and one savings account. Some add a separate account for taxes or payroll. The right number depends on how much structure helps you."],
        ["Can I avoid monthly fees?", "Many banks waive fees if you keep a minimum balance or meet activity requirements. Some online providers don't charge monthly fees at all. Always check the current fee schedule."],
        ["Are business accounts insured?", "Eligible deposits at FDIC-insured banks or NCUA-insured credit unions are insured up to $250,000 per depositor, per institution, per ownership category."],
        ["Should I use savings for my tax money?", "Many owners do. Moving a share of every payment into a separate savings account makes quarterly and annual tax payments much easier."],
        ["What's the difference between APY and interest rate?", "The interest rate is the base rate. APY includes the effect of compounding over a year, so it shows what you'd actually earn."],
      ]}
      cta={{ title: "Ready to organize your business accounts?" }}
      related={["/banking/account-assistance", "/banking/compare", "/banking/small-business"]}
    >
      <Section id="bk-types" tone="gray" title="Know your account types" subtitle="Tap an account type to see what it's good for.">
        <Reveal><Explorer items={accountTypes} /></Reveal>
      </Section>
    </BankingPage>
  );
}
