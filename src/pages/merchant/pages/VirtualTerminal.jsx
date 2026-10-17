import {
  Keyboard, Phone, Mail, FileText, Repeat, Users, ShieldCheck, Clock, Globe, Receipt, Search,
  ClipboardCheck, Settings, Rocket, Lock, BarChart3,
} from "lucide-react";
import { Section } from "../../../components/service";
import MerchantPage from "../MerchantPage";
import { VirtualTerminalVisual } from "../MerchantVisual";
import { MethodGrid } from "../MerchantWidgets";
import { MERCHANT_LINKS } from "../services";

export default function VirtualTerminal() {
  return (
    <MerchantPage
      path="/merchant/virtual-terminal"
      title={{ text: "Virtual terminal solutions for phone, mail and invoice payments", short: "Virtual Terminal" }}
      subtitle={<>A virtual terminal turns any secure browser into a card terminal. We help you <strong>set one up with the right security checks</strong> so your team can take keyed payments confidently.</>}
      primary={{ label: "Set up a virtual terminal", to: MERCHANT_LINKS.start("virtual-terminal") }}
      secondary={{ label: "Who it's for", href: "#mc-vt-uses" }}
      visual={<VirtualTerminalVisual />}
      services={{
        title: "What a virtual terminal can do",
        items: [
          { icon: <Keyboard size={24} />, title: "Keyed card payments", text: "Enter card details from any computer, with no hardware required." },
          { icon: <Lock size={24} />, title: "Security checks", text: "Use address and CVV verification to reduce card-not-present fraud." },
          { icon: <Repeat size={24} />, title: "Saved cards & repeat billing", text: "Store cards with customer consent for future or recurring charges." },
          { icon: <Receipt size={24} />, title: "Email receipts", text: "Send professional receipts automatically after each payment." },
          { icon: <Users size={24} />, title: "Team access", text: "Give staff their own logins and limit what each role can do." },
          { icon: <BarChart3 size={24} />, title: "Transaction history", text: "Search, refund and export payments in one place." },
        ],
      }}
      benefits={{
        title: "Why businesses use virtual terminals",
        items: [
          { icon: <Clock size={20} />, title: "Quick to start", text: "Usually just a login." },
          { icon: <Phone size={20} />, title: "Phone orders", text: "Take payments while you talk." },
          { icon: <Globe size={20} />, title: "Work from anywhere", text: "Any secure browser works." },
          { icon: <ShieldCheck size={20} />, title: "Fraud tools", text: "AVS and CVV on every charge." },
          { icon: <FileText size={20} />, title: "Invoice payments", text: "Collect on B2B invoices." },
          { icon: <Users size={20} />, title: "Controlled access", text: "Roles and permissions per user." },
        ],
      }}
      helps={[
        "Check whether a virtual terminal fits your sales",
        "Set up users, permissions and receipts",
        "Turn on recommended fraud checks",
        "Write a simple card-handling policy for staff",
      ]}
      steps={{
        items: [
          { icon: <Search size={22} />, title: "Review", text: "How customers order by phone, mail or invoice." },
          { icon: <ClipboardCheck size={22} />, title: "Choose", text: "A provider that offers a virtual terminal." },
          { icon: <Settings size={22} />, title: "Configure", text: "Users, AVS/CVV rules and receipts." },
          { icon: <Rocket size={22} />, title: "Train & launch", text: "Safe card handling, then go live." },
        ],
      }}
      checklist={{
        title: "Safe card-handling basics",
        side: "Staff checklist",
        items: [
          "Never write card numbers on paper or in notes",
          "Never send or accept card numbers by email or chat",
          "Use a private, secure device and network",
          "Give each staff member their own login",
          "Turn on address and CVV checks",
          "Store cards only with customer consent",
        ],
      }}
      faqs={[
        ["What is a virtual terminal?", "It's a secure web page from your payment provider where you can type in a customer's card details to process a payment, without a physical terminal."],
        ["Do keyed payments cost more?", "Usually, yes. Card-not-present transactions generally have higher interchange and fraud risk than chip or tap payments."],
        ["Is it PCI compliant to take cards over the phone?", "It can be, if you follow proper practices: enter details directly into the terminal, don't record them anywhere else, and follow your provider's guidance."],
        ["Can I charge a saved card later?", "Many virtual terminals let you save cards with the customer's authorization for future or recurring charges."],
      ]}
      cta={{ title: "Take phone and invoice payments securely" }}
    >
      <Section id="mc-vt-uses" tone="gray" title="Who uses a virtual terminal" subtitle="Common situations where keyed payments make sense.">
        <MethodGrid
          items={[
            { icon: <Phone size={20} />, title: "Phone orders", text: "Restaurants, retailers and catalog sellers." },
            { icon: <Mail size={20} />, title: "Mail orders", text: "Order forms returned by mail." },
            { icon: <FileText size={20} />, title: "B2B invoices", text: "Clients who prefer to pay by card." },
            { icon: <Users size={20} />, title: "Professional services", text: "Deposits and retainers." },
            { icon: <Repeat size={20} />, title: "Repeat customers", text: "Saved cards with consent." },
            { icon: <Keyboard size={20} />, title: "Backup checkout", text: "When a terminal is down." },
          ]}
        />
      </Section>
    </MerchantPage>
  );
}
