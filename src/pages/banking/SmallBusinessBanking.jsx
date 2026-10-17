import {
  Store, Wrench, ShoppingCart, Briefcase, Truck, Banknote, Receipt, CreditCard, PiggyBank, BookOpen,
  Clock, ShieldCheck, Smartphone, HandCoins, MessageSquare, ClipboardCheck, Send, Coffee, Calculator,
} from "lucide-react";
import { Reveal, Section, Explorer } from "../../components/service";
import BankingPage from "./BankingPage";
import BankVisual from "./BankVisual";
import { BANKING_LINKS } from "./services";

const businessTypes = [
  {
    id: "retail", icon: <Coffee size={18} />, label: "Shops & cafés",
    title: "Retail shops and cafés",
    text: "Lots of small card payments and some cash. Easy deposits and good card processing matter most.",
    points: ["Convenient cash deposits", "Card terminal and daily payouts", "Simple reconciliation with your POS"],
  },
  {
    id: "services", icon: <Briefcase size={18} />, label: "Services",
    title: "Professional services and consultants",
    text: "Fewer, larger payments by invoice. You want to get paid quickly and keep tax money aside.",
    points: ["ACH and online invoice payments", "Savings for tax set-asides", "Integration with accounting software"],
  },
  {
    id: "trades", icon: <Wrench size={18} />, label: "Trades",
    title: "Contractors and trades",
    text: "Supplies, deposits from customers and payments on the go. Cards for the crew help keep receipts organized.",
    points: ["Mobile check deposit", "Employee cards with limits", "Clear separation of job costs"],
  },
  {
    id: "online", icon: <ShoppingCart size={18} />, label: "E-commerce",
    title: "Online stores",
    text: "Payouts from platforms and payment processors, refunds and lots of small transactions.",
    points: ["Smooth marketplace and processor payouts", "Reconciling fees and refunds", "Possibly multi-currency sales"],
  },
  {
    id: "delivery", icon: <Truck size={18} />, label: "Delivery & logistics",
    title: "Delivery and logistics",
    text: "Fuel, vehicle costs and drivers on the road. Spending controls and fast receipts are key.",
    points: ["Fuel and expense cards", "Real-time spend alerts", "Easy expense categories"],
  },
];

export default function SmallBusinessBanking() {
  return (
    <BankingPage
      path="/banking/small-business"
      title={{ text: "Small business banking that fits how you really work", short: "Small Business Banking" }}
      subtitle={<>Whether you run a café, a consultancy or a contracting crew, your bank should make daily money tasks easier. We help you find the setup that suits your business and get it open.</>}
      primary={{ label: "Get small business help", to: BANKING_LINKS.start("small-business-banking") }}
      secondary={{ label: "Banking by business type", href: "#bk-types" }}
      visual={<BankVisual
        variant="dashboard"
        label="Main Street account"
        start={18640}
        accounts={["Checking", "Savings", "Taxes"]}
        txs={[
          { name: "Card sales payout", amount: 842, icon: <CreditCard size={14} /> },
          { name: "Supplier order", amount: -312, icon: <Truck size={14} /> },
          { name: "Cash deposit", amount: 460, icon: <Banknote size={14} /> },
          { name: "Utilities", amount: -148, icon: <Receipt size={14} /> },
        ]}
        chips={[
          { icon: <Smartphone size={13} />, label: "Mobile deposit" },
          { icon: <PiggyBank size={13} />, label: "Tax pot growing" },
          { icon: <CreditCard size={13} />, label: "Card sales in" },
        ]}
      />}
      services={{
        title: "How we help small businesses bank better",
        subtitle: "Plain-language help for owners who'd rather be running their business.",
        items: [
          { icon: <Store size={24} />, title: "Setup for your business type", text: "We focus on what matters for your kind of business, not features you'll never use." },
          { icon: <Banknote size={24} />, title: "Cash and deposits", text: "Understand cash deposit options and limits if you handle cash." },
          { icon: <CreditCard size={24} />, title: "Getting paid", text: "Card, ACH and online payment options that land in the right account." },
          { icon: <PiggyBank size={24} />, title: "Saving and taxes", text: "Simple habits for setting money aside for taxes and quiet months." },
          { icon: <BookOpen size={24} />, title: "Bookkeeping basics", text: "Connect your account to your bookkeeping so records stay current." },
          { icon: <HandCoins size={24} />, title: "Credit readiness", text: "What lenders typically look at, so you're prepared when you need funding." },
        ],
      }}
      benefits={{
        title: "What small business owners gain",
        subtitle: "Less time on money admin, more time on customers.",
        items: [
          { icon: <Clock size={22} />, title: "Time saved", text: "Fewer trips to the bank and less manual bookkeeping." },
          { icon: <ShieldCheck size={22} />, title: "Clear separation", text: "Business and personal money stay apart." },
          { icon: <Calculator size={22} />, title: "Tax-ready books", text: "Records your accountant will thank you for." },
          { icon: <Smartphone size={22} />, title: "Bank from anywhere", text: "Mobile deposits, alerts and transfers on the go." },
          { icon: <PiggyBank size={22} />, title: "A cushion for slow months", text: "Reserves make seasonal swings less stressful." },
          { icon: <HandCoins size={22} />, title: "Ready for growth", text: "A solid account history helps when you want to borrow." },
        ],
      }}
      helps={["Match accounts to your business type", "Explain fees and limits that affect you", "Set up savings and tax habits", "Prepare your account documents"]}
      steps={{
        subtitle: "Simple steps for busy owners.",
        items: [
          { icon: <MessageSquare size={20} />, title: "Tell us how you operate", text: "How customers pay, whether you handle cash and what tools you use." },
          { icon: <ClipboardCheck size={20} />, title: "Get a simple plan", text: "We suggest an account setup and list what you need to open it." },
          { icon: <Send size={20} />, title: "Open and get going", text: "You open accounts with your chosen provider. We're here for questions." },
        ],
      }}
      faqs={[
        ["What's the best bank for a small business?", "It depends on how you work. A café that deposits cash needs different things than an online consultant. We help you work out what matters for you, then compare options."],
        ["Can I deposit cash at an online bank?", "Some online banks offer cash deposits through partner retail locations or ATMs, often with limits or fees. Others don't accept cash at all. Check before you choose."],
        ["How much should I keep in savings?", "Many owners aim for a few months of operating costs as a cushion, plus a separate amount for taxes. Your accountant can help you set the right targets."],
        ["Will I need a business credit check?", "Some banks check the personal credit of owners, especially for sole proprietors or when you apply for credit. Policies vary by provider."],
        ["Can I switch banks later?", "Yes. It takes some planning to move payments, payroll and automatic transactions, but many businesses switch as they grow."],
      ]}
      cta={{ title: "Ready to make banking easier for your business?" }}
      related={["/banking/checking-savings", "/banking/merchant-account", "/banking/compare"]}
    >
      <Section id="bk-types" tone="gray" title="Banking needs by business type" subtitle="Tap your kind of business to see what usually matters most.">
        <Reveal><Explorer items={businessTypes} /></Reveal>
      </Section>
    </BankingPage>
  );
}
