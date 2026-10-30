import {
  MonitorSmartphone, Package, Users, BarChart3, Wifi, Receipt, Utensils, ShoppingBag, Scissors, Truck,
  Search, ClipboardCheck, Settings, Rocket, Clock, Layers, ShieldCheck, Printer, Tablet, Smartphone,
} from "lucide-react";
import { Section, Explorer } from "../../../components/service";
import MerchantPage from "../MerchantPage";
import { PosTerminal } from "../MerchantVisual";
import { MERCHANT_LINKS } from "../services";

export default function PosSolutions() {
  return (
    <MerchantPage
      path="/merchant/pos-terminal"
      title={{ text: "POS system solutions that keep your counter moving", short: "POS System Solutions" }}
      subtitle={<>A point-of-sale system does more than take payments. We help you <strong>choose hardware and software that fit your workflow</strong>, then plan a smooth setup for your team.</>}
      primary={{ label: "Plan my POS setup", to: MERCHANT_LINKS.start("pos") }}
      secondary={{ label: "Explore POS types", href: "#mc-pos-types" }}
      visual={<PosTerminal />}
      services={{
        title: "What a modern POS can handle",
        subtitle: "We'll help you decide which features you actually need.",
        items: [
          { icon: <Wifi size={24} />, title: "Payments", text: "Chip, tap, swipe and mobile wallets, with tips and split checks where needed." },
          { icon: <Package size={24} />, title: "Inventory", text: "Track stock levels, variants and low-stock alerts across locations." },
          { icon: <Users size={24} />, title: "Staff management", text: "Logins, permissions, time tracking and tip reporting for your team." },
          { icon: <BarChart3 size={24} />, title: "Sales reporting", text: "Daily summaries, best sellers and trends to guide decisions." },
          { icon: <Receipt size={24} />, title: "Receipts & loyalty", text: "Printed or digital receipts, customer profiles and simple loyalty programs." },
          { icon: <Layers size={24} />, title: "Integrations", text: "Connect to accounting, e-commerce and scheduling tools you already use." },
        ],
      }}
      options={{
        title: "POS setups we commonly help with",
        subtitle: "Hardware and software vary by provider. These are general setup styles.",
        items: [
          { icon: <Smartphone size={22} />, name: "Mobile POS", best: "Pop-ups, markets, field services", text: "A phone or tablet with a card reader.", points: ["Low hardware footprint", "Works where you are", "Depends on connectivity"] },
          { icon: <Tablet size={22} />, name: "Countertop POS", badge: "Most common", featured: true, best: "Retail shops, cafés, salons", text: "A tablet or terminal station at the counter.", points: ["Customer-facing display", "Receipt printer & cash drawer", "Inventory and staff tools"] },
          { icon: <MonitorSmartphone size={22} />, name: "Multi-station POS", best: "Restaurants and multi-location stores", text: "Several connected stations, plus kitchen or back-office screens.", points: ["Table and order management", "Kitchen display support", "Central reporting"] },
        ],
      }}
      benefits={{
        title: "Benefits of the right POS",
        items: [
          { icon: <Clock size={20} />, title: "Shorter lines", text: "Faster checkout at busy times." },
          { icon: <Package size={20} />, title: "Fewer stockouts", text: "Inventory that updates with each sale." },
          { icon: <BarChart3 size={20} />, title: "Better decisions", text: "Reports you'll actually read." },
          { icon: <Users size={20} />, title: "Easier staffing", text: "Roles, shifts and permissions." },
          { icon: <ShieldCheck size={20} />, title: "Secure payments", text: "EMV and encrypted card readers." },
          { icon: <Printer size={20} />, title: "Everything connected", text: "Printers, drawers and scanners." },
        ],
      }}
      helps={[
        "List the POS features your business really needs",
        "Compare hardware and software options with you",
        "Check that the POS works with your merchant account",
        "Plan install, menu or catalog setup and staff training",
      ]}
      steps={{
        items: [
          { icon: <Search size={22} />, title: "Walk the workflow", text: "From order to payment to receipt." },
          { icon: <ClipboardCheck size={22} />, title: "Pick the system", text: "Match features, hardware and budget." },
          { icon: <Settings size={22} />, title: "Set it up", text: "Catalog, taxes, staff and payment settings." },
          { icon: <Rocket size={22} />, title: "Open for business", text: "Test, train the team and go live." },
        ],
      }}
      checklist={{
        title: "Before you choose a POS",
        side: "Your POS checklist",
        items: [
          "List of products or services with prices",
          "Number of checkout stations and staff",
          "Reliable internet (and a backup plan)",
          "Merchant account or provider in mind",
          "Accounting or e-commerce tools to connect",
          "Budget for hardware and monthly software",
        ],
      }}
      faqs={[
        ["Do I need a POS system or just a terminal?", "If you only need to take payments, a standalone terminal may be enough. If you want inventory, staff tools or reporting, a POS system adds that on top."],
        ["Can I keep my current merchant account?", "Sometimes. Some POS systems only work with their own processing, while others support several providers. We'll help you check before you buy."],
        ["Should I buy or lease hardware?", "Buying usually costs less over time. Leases can carry long, non-cancellable terms, so read them carefully before signing."],
        ["What happens if the internet goes down?", "Some systems offer an offline mode that stores transactions and processes them later. Check the limits and risks with your provider."],
      ]}
      cta={{ title: "Let's find the POS that fits your counter" }}
    >
      <Section id="mc-pos-types" tone="gray" title="POS needs by industry" subtitle="Different businesses lean on different features.">
        <Explorer
          items={[
            { id: "retail", icon: <ShoppingBag size={16} />, label: "Retail", text: "Retailers focus on inventory and fast checkout.", points: ["Barcode scanning and variants", "Stock alerts and transfers", "Returns and exchanges"] },
            { id: "food", icon: <Utensils size={16} />, label: "Restaurants", text: "Restaurants need table, order and kitchen flow.", points: ["Table maps and coursing", "Kitchen display or printers", "Tips and split checks"] },
            { id: "service", icon: <Scissors size={16} />, label: "Services", text: "Salons and studios revolve around appointments.", points: ["Booking and reminders", "Staff commissions", "Cards on file with consent"] },
            { id: "field", icon: <Truck size={16} />, label: "Field & mobile", text: "Mobile businesses need portability.", points: ["Card readers and tap-to-pay", "Invoices on the spot", "Offline mode awareness"] },
          ]}
        />
      </Section>
    </MerchantPage>
  );
}
