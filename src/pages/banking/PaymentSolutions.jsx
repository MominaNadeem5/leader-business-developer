import {
  ArrowLeftRight, Landmark, Send, CreditCard, Smartphone, FileText, Zap, Link2, Receipt, Repeat,
  ShieldCheck, Clock, Eye, BookOpen, Wallet, MessageSquare, ClipboardCheck, Users, Banknote,
} from "lucide-react";
import { Reveal, Section, Explorer } from "../../components/service";
import BankingPage from "./BankingPage";
import BankVisual from "./BankVisual";
import { BANKING_LINKS } from "./services";

const methods = [
  {
    id: "ach", icon: <Landmark size={18} />, label: "ACH",
    title: "ACH transfers",
    text: "Electronic bank-to-bank payments in the U.S., used for payroll, supplier payments and direct debits. Usually low cost.",
    points: ["Standard and same-day options", "Great for recurring payments", "Returns and reversals have set rules"],
  },
  {
    id: "wire", icon: <Send size={18} />, label: "Wires",
    title: "Wire transfers",
    text: "Fast, bank-to-bank transfers for larger or time-sensitive payments. Generally hard to reverse once sent.",
    points: ["Domestic wires often settle same day", "Higher fees than ACH", "Always verify details by phone"],
  },
  {
    id: "cards", icon: <CreditCard size={18} />, label: "Cards",
    title: "Card payments",
    text: "Accept debit and credit cards in person or online through a merchant account or payment processor.",
    points: ["Processing fees per transaction", "Chargebacks are possible", "Security standards (PCI DSS) apply"],
  },
  {
    id: "rtp", icon: <Zap size={18} />, label: "Instant",
    title: "Instant payments",
    text: "Real-time payment networks move money in seconds, any time of day, between participating banks.",
    points: ["Funds available almost immediately", "Not every bank participates yet", "Typically final once sent"],
  },
  {
    id: "links", icon: <Link2 size={18} />, label: "Pay links",
    title: "Invoices and payment links",
    text: "Send a link or online invoice so customers can pay by card or bank transfer in a few clicks.",
    points: ["Faster invoice payments", "Automatic reminders", "Easy matching to invoices"],
  },
  {
    id: "checks", icon: <FileText size={18} />, label: "Checks",
    title: "Checks",
    text: "Still common with some customers and suppliers. Mobile deposit makes receiving them easier.",
    points: ["Mobile and remote deposit", "Positive pay helps prevent fraud", "Slower than electronic options"],
  },
];

export default function PaymentSolutions() {
  return (
    <BankingPage
      path="/banking/payments"
      title={{ text: "Business payments that move as fast as you do", short: "Payment Solutions" }}
      subtitle={<>ACH, wires, cards, instant payments and invoices. We help you understand each method, choose the right mix for paying and getting paid, and set up a payment flow that's easy to reconcile.</>}
      primary={{ label: "Plan my payments", to: BANKING_LINKS.start("payment-solutions") }}
      secondary={{ label: "Payment methods", href: "#bk-methods" }}
      visual={<BankVisual variant="payments" amount={128} chips={[
        { icon: <Zap size={13} />, label: "Instant payout" },
        { icon: <Repeat size={13} />, label: "Auto-reconciled" },
        { icon: <ShieldCheck size={13} />, label: "Verified payee" },
      ]} />}
      services={{
        title: "Payment setup support",
        subtitle: "Get paid faster, pay others safely and keep every payment easy to track.",
        items: [
          { icon: <ArrowLeftRight size={24} />, title: "Payment flow mapping", text: "We map how money comes in and goes out today, and where it slows down." },
          { icon: <CreditCard size={24} />, title: "Accepting payments", text: "Choose card, bank transfer and online options that suit your customers." },
          { icon: <Users size={24} />, title: "Paying suppliers and staff", text: "Understand ACH, wires and payroll options for outgoing payments." },
          { icon: <Receipt size={24} />, title: "Invoicing and links", text: "Set up invoices and payment links that make it easy to pay you." },
          { icon: <BookOpen size={24} />, title: "Reconciliation", text: "Keep payments matched to invoices and accounting records." },
          { icon: <ShieldCheck size={24} />, title: "Fraud awareness", text: "Simple controls to reduce payment fraud and misdirected funds." },
        ],
      }}
      benefits={{
        title: "What a good payment setup delivers",
        subtitle: "Healthier cash flow and fewer headaches.",
        items: [
          { icon: <Clock size={22} />, title: "Faster cash in", text: "Easier ways to pay usually mean faster payment." },
          { icon: <Wallet size={22} />, title: "Lower costs", text: "Use cheaper methods where speed isn't critical." },
          { icon: <Eye size={22} />, title: "Clear tracking", text: "Know what's been paid, what's pending and what's late." },
          { icon: <ShieldCheck size={22} />, title: "Safer outgoing payments", text: "Approval steps and verification reduce fraud risk." },
          { icon: <Smartphone size={22} />, title: "Better customer experience", text: "Offer the ways your customers prefer to pay." },
          { icon: <Banknote size={22} />, title: "Predictable cash flow", text: "Recurring payments make planning easier." },
        ],
      }}
      helps={["Explain each payment method's trade-offs", "Map your current payment flow", "Suggest a practical payment mix", "Share fraud-prevention basics"]}
      steps={{
        subtitle: "From scattered payment habits to a smooth system.",
        items: [
          { icon: <MessageSquare size={20} />, title: "Review your flows", text: "How customers pay you and how you pay others today." },
          { icon: <ClipboardCheck size={20} />, title: "Design your mix", text: "We recommend methods and tools for each type of payment." },
          { icon: <Send size={20} />, title: "Set up and run", text: "You enable the tools with your providers and start saving time." },
        ],
      }}
      compare={{
        title: "Payment methods at a glance",
        subtitle: "Typical characteristics in the U.S. Actual timing and cost depend on your provider.",
        columns: ["", "ACH", "Wire", "Card", "Instant"],
        rows: [
          ["Relative cost", "Low", "Higher", "Per-transaction fee", "Varies"],
          ["Typical speed", "Same day to a few days", "Often same day", "Payout timing varies", "Seconds"],
          ["Easy to reverse", "Limited", false, "Chargebacks", false],
          ["Best for", "Payroll, recurring bills", "Large, urgent payments", "Customer purchases", "Urgent payments"],
        ],
        highlight: 1,
      }}
      faqs={[
        ["What's the cheapest way to pay suppliers?", "ACH is usually the lowest-cost option for domestic payments that aren't urgent. Wires cost more but move faster."],
        ["Can a wire transfer be reversed?", "Generally no, once it's sent. That's why it's important to verify payment details, ideally by calling a known phone number, before sending."],
        ["What are instant payments?", "Real-time payment networks let participating banks send money in seconds, any time. Availability depends on whether both banks participate."],
        ["Do I need a merchant account to accept cards?", "You need some way to process cards: either your own merchant account or a payment processor that aggregates merchants. See our Merchant Account Assistance page."],
        ["How do I stop invoice payment fraud?", "Be wary of emailed changes to payment details, verify by phone using a known number, and use approval steps for outgoing payments."],
      ]}
      cta={{ title: "Ready to get paid faster and pay smarter?" }}
      related={["/banking/merchant-account", "/banking/international", "/banking/small-business"]}
    >
      <Section id="bk-methods" tone="gray" title="Choose the right payment method" subtitle="Tap a method to see how it works and when to use it.">
        <Reveal><Explorer items={methods} /></Reveal>
      </Section>
    </BankingPage>
  );
}
