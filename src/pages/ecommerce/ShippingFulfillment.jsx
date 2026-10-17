import { Link } from "react-router-dom";
import {
  Truck, MapPin, Printer, Bell, RotateCcw, Warehouse, Search, PenTool, Wrench, Rocket, Clock, DollarSign,
  ShieldCheck, Users, Package, Globe, ShoppingBag, Code2, Store, Tag, Gift, Calculator, Home,
} from "lucide-react";
import { Reveal, Section, Explorer, CompareTable } from "../../components/service";
import EcommercePage from "./EcommercePage";
import { ShippingVisual } from "./EcommerceVisual";
import { ECOMMERCE_LINKS } from "./services";

const strategies = [
  {
    id: "free", icon: <Gift size={18} />, label: "Free shipping",
    title: "Free shipping (or free over a threshold)",
    text: "Shoppers love free shipping, and a minimum order threshold can raise your average order value. The cost has to be built into prices or margins.",
    points: ["Set a threshold above your average order", "Show progress toward free shipping in the cart", "Check margins on heavy or bulky items"],
  },
  {
    id: "flat", icon: <Tag size={18} />, label: "Flat rate",
    title: "Flat-rate shipping",
    text: "One simple price per order or per zone. Easy for customers to understand, and works well when products are similar in size and weight.",
    points: ["Simple and predictable", "Easy to communicate on product pages", "Can overcharge or undercharge on outliers"],
  },
  {
    id: "live", icon: <Calculator size={18} />, label: "Real-time rates",
    title: "Real-time carrier rates",
    text: "Customers see live rates from carriers based on weight, size and destination. Accurate, and lets shoppers choose speed versus cost.",
    points: ["Accurate costs for every order", "Offer economy and express options", "Needs correct product weights and box sizes"],
  },
  {
    id: "local", icon: <Home size={18} />, label: "Local pickup & delivery",
    title: "Local pickup and delivery",
    text: "Great for businesses with a physical location. Customers save on shipping and get their order faster.",
    points: ["No shipping cost for pickup orders", "Delivery zones by ZIP code or radius", "Pickup-ready notifications"],
  },
];

export default function ShippingFulfillment() {
  return (
    <EcommercePage
      path="/ecommerce/shipping"
      title={{ text: "Shipping & fulfillment setup that gets orders out the door faster", short: "Shipping & Fulfillment Setup" }}
      subtitle={<>We set up <strong>shipping zones, rates, carriers, labels, tracking and returns</strong>, and help you choose between shipping yourself or using a fulfillment partner.</>}
      primary={{ label: "Set up my shipping", to: ECOMMERCE_LINKS.start("shipping") }}
      secondary={{ label: "Compare fulfillment options", href: "#ec-fulfillment" }}
      visual={<ShippingVisual />}
      highlights={[
        { icon: <MapPin size={16} />, text: "Zones & rates" },
        { icon: <Printer size={16} />, text: "Label printing" },
        { icon: <Bell size={16} />, text: "Tracking emails" },
        { icon: <Warehouse size={16} />, text: "3PL onboarding" },
      ]}
      overview={{
        title: "Fast, affordable shipping customers can count on",
        body: [
          <>Shipping shapes how customers feel about your store. High or unexpected shipping costs drive cart abandonment, slow delivery leads to support tickets, and a confusing returns process discourages repeat purchases. Behind the scenes, poorly configured rates can quietly eat into your margins on every order.</>,
          <>Our ecommerce shipping and fulfillment setup gets the details right. We set up shipping zones and rates that balance customer expectations with your costs, whether that means free shipping over a threshold, flat rates or real-time carrier pricing. We connect carrier accounts and shipping software so you can compare rates and print labels in bulk, set up branded tracking notifications, and create a returns process that's easy for customers and simple for you.</>,
          <>As you grow, we help you decide whether to keep fulfilling in-house or move to a third-party logistics (3PL) provider or marketplace fulfillment, then handle the onboarding. Shipping works best when your <Link to="/ecommerce/product-listing">product weights and dimensions</Link> are accurate, your <Link to="/ecommerce/inventory-orders">inventory and orders</Link> are synced and your <Link to="/ecommerce/cart-checkout">checkout</Link> shows costs upfront. Selling on Amazon? See our <Link to="/ecommerce/amazon-setup">Amazon setup</Link> service for FBA and FBM.</>,
        ],
        glance: {
          title: "What's included",
          items: [
            "Shipping zones, rates and rules",
            "Carrier and shipping software setup",
            "Packaging and box size planning",
            "Bulk label printing and packing slips",
            "Branded tracking notifications",
            "Returns process and 3PL onboarding",
          ],
        },
      }}
      services={{
        title: "Our shipping & fulfillment services",
        subtitle: "Everything between a paid order and a happy customer.",
        items: [
          { icon: <MapPin size={24} />, title: "Shipping zones & rates", text: "Domestic and international zones with free, flat, tiered or real-time rates that protect your margins." },
          { icon: <Truck size={24} />, title: "Carrier setup", text: "Connect the carriers that suit your products and compare rates, speed and service in one place." },
          { icon: <Printer size={24} />, title: "Labels & packing slips", text: "Shipping software set up for bulk label printing, packing slips and pick lists." },
          { icon: <Bell size={24} />, title: "Tracking & notifications", text: "Branded shipping confirmations and tracking updates that cut \"where's my order?\" emails." },
          { icon: <RotateCcw size={24} />, title: "Returns management", text: "A clear returns policy, return labels and a process that restocks items quickly." },
          { icon: <Warehouse size={24} />, title: "3PL selection & onboarding", text: "Compare fulfillment partners, then connect your store and inventory for a smooth handover." },
        ],
      }}
      steps={{
        items: [
          { icon: <Search size={22} />, title: "Review", text: "Products, order volume and destinations." },
          { icon: <PenTool size={22} />, title: "Strategy", text: "Rates, carriers and fulfillment model." },
          { icon: <Wrench size={22} />, title: "Configure", text: "Zones, software, labels and emails." },
          { icon: <Rocket size={22} />, title: "Test & ship", text: "Test orders, then go live." },
        ],
      }}
      benefits={{
        title: "Why a solid shipping setup matters",
        items: [
          { icon: <DollarSign size={20} />, title: "Protected margins", text: "Rates that cover real costs." },
          { icon: <Clock size={20} />, title: "Faster dispatch", text: "Print, pack and ship in batches." },
          { icon: <Users size={20} />, title: "Fewer support tickets", text: "Proactive tracking updates." },
          { icon: <ShieldCheck size={20} />, title: "Fewer surprises", text: "Clear costs at checkout." },
          { icon: <RotateCcw size={20} />, title: "Easy returns", text: "Builds repeat-buyer confidence." },
          { icon: <Globe size={20} />, title: "Room to expand", text: "Ready for new regions and partners." },
        ],
      }}
      tools={{
        title: "Platforms and tools we set up",
        items: [
          { icon: <ShoppingBag size={20} />, title: "Shopify shipping", text: "Zones, rates and labels." },
          { icon: <Code2 size={20} />, title: "WooCommerce shipping", text: "Zones, methods and plugins." },
          { icon: <Printer size={20} />, title: "Shipping software", text: "Multi-carrier label platforms." },
          { icon: <Truck size={20} />, title: "Major carriers", text: "National and regional carriers." },
          { icon: <Warehouse size={20} />, title: "3PL partners", text: "Outsourced warehousing and fulfillment." },
          { icon: <Store size={20} />, title: "Marketplace fulfillment", text: "Programs like Amazon FBA." },
        ],
      }}
      checklist={{
        title: "What to have ready",
        items: [
          "Product weights and package dimensions",
          "Where you ship from and where you ship to",
          "Your typical monthly order volume",
          "Packaging you use (or want to use)",
          "Your current shipping and returns policy",
          "Admin access to your store",
        ],
      }}
      faqs={[
        ["Should I offer free shipping?", "Free shipping is popular with customers, but the cost has to come from somewhere. Many stores offer free shipping above an order threshold, which can also raise average order value. We'll model what works for your margins."],
        ["What's the difference between flat-rate and real-time shipping?", "Flat-rate charges a set price per order or zone, which is simple to understand. Real-time rates pull live prices from carriers based on weight, size and destination, which is more accurate but needs correct product data."],
        ["When should I use a 3PL?", "A third-party logistics provider can make sense when packing orders takes too much of your time, you run out of space, or you need faster delivery across regions. Compare full fee schedules, including storage, pick-and-pack and returns, before you commit."],
        ["Can you help with international shipping?", "Yes. We can set up international zones and rates, and help you understand customs forms, duties and restricted items, so customers abroad know what to expect."],
        ["How do I reduce \"where is my order?\" emails?", "Automatic shipping confirmations with tracking links, plus a tracking page on your site, answer most of these questions before customers ask. We set these up as part of every shipping project."],
      ]}
      cta={{ title: "Ship faster and spend less doing it" }}
    >
      <Section id="ec-strategy" title="Choose a shipping strategy" subtitle="There's no single best option. Here's how the most common approaches compare.">
        <Explorer items={strategies} />
      </Section>

      <Section id="ec-fulfillment" tone="soft" title="Self-fulfillment vs 3PL vs marketplace fulfillment" subtitle="Which fulfillment model fits your business right now?">
        <Reveal>
          <CompareTable
            columns={["", "Ship it yourself", "3PL partner", "Marketplace fulfillment"]}
            rows={[
              ["Best for", "New and low-volume stores", "Growing multichannel stores", "Marketplace-heavy sellers"],
              ["Upfront cost", "Low", "Setup and onboarding fees", "Inbound shipping and prep"],
              ["Control over packaging", true, "Often customizable", "Limited"],
              ["Your time spent packing", "High", "Low", "Low"],
              ["Works across all channels", true, true, "Varies by program"],
              ["Storage fees", false, true, true],
            ]}
            highlight={2}
          />
        </Reveal>
        <p className="mc-small">A general guide. Fees and capabilities vary widely between providers and programs, so always compare full written rate sheets based on your products and volume.</p>
        <p className="mc-small"><Package size={14} style={{ verticalAlign: "-2px" }} /> Many brands combine models, for example shipping from their own stock for their website and using marketplace fulfillment for Amazon.</p>
      </Section>
    </EcommercePage>
  );
}
