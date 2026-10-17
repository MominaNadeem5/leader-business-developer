import { Link } from "react-router-dom";
import {
  Tags, ShoppingCart, Boxes, Truck, Store, Package, Search, PenTool, Wrench, Rocket, Sprout, LineChart, Globe,
  Building2, Clock, TrendingUp, ShieldCheck, RefreshCw, Users, LifeBuoy, ShoppingBag, Code2, Calculator, Mail,
  Printer, ArrowRight,
} from "lucide-react";
import { Section, Explorer } from "../../components/service";
import EcommercePage from "./EcommercePage";
import { ChannelVisual } from "./EcommerceVisual";
import { ECOMMERCE_LINKS } from "./services";

const stages = [
  {
    id: "launch", icon: <Sprout size={18} />, label: "Launching",
    title: "You're launching your first online store",
    text: "Get the foundations right from day one: a clean catalog, a checkout customers trust and shipping that's simple to manage.",
    points: ["Set up products, categories and photos", "Configure checkout, payments and taxes", "Choose shipping rates and print your first labels"],
  },
  {
    id: "grow", icon: <LineChart size={18} />, label: "Growing",
    title: "Orders are growing and manual work is piling up",
    text: "Spreadsheets and copy-and-paste stop working as volume grows. Connected systems save hours and prevent costly mistakes.",
    points: ["Automate inventory and order updates", "Add low-stock alerts and reorder points", "Speed up picking, packing and shipping"],
  },
  {
    id: "multi", icon: <Globe size={18} />, label: "Going multichannel",
    title: "You want to sell on marketplaces too",
    text: "Marketplaces put your products in front of shoppers who are already searching. The key is keeping every channel in sync.",
    points: ["Open eBay, Etsy, Walmart or Amazon accounts", "Adapt listings to each marketplace's rules", "Sync stock and orders in one place"],
  },
  {
    id: "scale", icon: <Building2 size={18} />, label: "Scaling",
    title: "You're scaling and need a sturdier operation",
    text: "At higher volume, small gains in checkout, fulfillment and inventory accuracy add up to real profit.",
    points: ["Review checkout for conversion leaks", "Evaluate 3PL or marketplace fulfillment", "Connect accounting and reporting tools"],
  },
];

export default function EcommerceSolutions() {
  return (
    <EcommercePage
      path="/ecommerce"
      title={{ text: "Ecommerce solutions to launch, run and grow your online store", short: "Ecommerce Solutions" }}
      subtitle={<>From your first product listing to selling on Amazon and other marketplaces, we <strong>set up every part of your ecommerce operation</strong> so it runs smoothly and scales with you.</>}
      primary={{ label: "Start your ecommerce setup", to: ECOMMERCE_LINKS.start("ecommerce") }}
      secondary={{ label: "Find your starting point", href: "#ec-stages" }}
      visual={<ChannelVisual />}
      highlights={[
        { icon: <Tags size={16} />, text: "Catalog & listings" },
        { icon: <ShoppingCart size={16} />, text: "Checkout setup" },
        { icon: <Boxes size={16} />, text: "Inventory & orders" },
        { icon: <Truck size={16} />, text: "Shipping & fulfillment" },
        { icon: <Store size={16} />, text: "Marketplaces & Amazon" },
      ]}
      overview={{
        title: "Everything your online store needs, set up to work together",
        body: [
          <>Running an online store means juggling a lot of moving parts: product pages, a shopping cart, payments, stock levels, shipping and, increasingly, marketplaces like Amazon, eBay, Etsy and Walmart. When those parts are set up separately, they rarely talk to each other. The result is overselling, slow fulfillment, abandoned carts and hours of manual work every week.</>,
          <>Our ecommerce solutions bring it all together. We start with a strong foundation: <Link to="/ecommerce/product-listing">product listings and a well-organized catalog</Link>, and a <Link to="/ecommerce/cart-checkout">fast, trustworthy checkout</Link>. Then we connect the operational side, with <Link to="/ecommerce/inventory-orders">inventory and order management</Link> and <Link to="/ecommerce/shipping">shipping and fulfillment</Link>, so every order flows smoothly from click to doorstep.</>,
          <>When you're ready to reach more customers, we extend your store to <Link to="/ecommerce/marketplaces">eBay, Etsy and Walmart</Link> and handle your <Link to="/ecommerce/amazon-setup">Amazon seller setup</Link>, with stock and orders kept in sync across every channel. Whether you're launching your first product or scaling a growing brand, you get one partner, one plan and a setup built to grow with your small business.</>,
        ],
        glance: {
          title: "Why work with us",
          items: [
            "One team for your whole ecommerce setup",
            "Works with Shopify, WooCommerce and other popular platforms",
            "Multichannel selling with inventory kept in sync",
            "Plain-English guidance, no jargon",
            "A launch checklist and handover for your team",
          ],
        },
      }}
      services={{
        title: "Our ecommerce services",
        subtitle: "Choose a single service or combine them into a complete ecommerce setup.",
        items: [
          { icon: <Tags size={24} />, title: "Product Listing & Catalog Setup", text: "SEO-friendly titles and descriptions, organized categories, variants and bulk product uploads.", to: "/ecommerce/product-listing" },
          { icon: <ShoppingCart size={24} />, title: "Shopping Cart & Checkout Setup", text: "Guest checkout, clear costs, digital wallets and a mobile-first flow that reduces abandonment.", to: "/ecommerce/cart-checkout" },
          { icon: <Boxes size={24} />, title: "Inventory & Order Management", text: "Real-time stock sync, low-stock alerts and order workflows that prevent overselling.", to: "/ecommerce/inventory-orders" },
          { icon: <Truck size={24} />, title: "Shipping & Fulfillment Setup", text: "Shipping zones and rates, carrier accounts, labels, tracking emails, returns and 3PL options.", to: "/ecommerce/shipping" },
          { icon: <Store size={24} />, title: "Marketplace Integration", text: "eBay, Etsy and Walmart Marketplace accounts, listings and synced inventory and orders.", to: "/ecommerce/marketplaces" },
          { icon: <Package size={24} />, title: "Amazon Setup", text: "Seller Central registration, optimized listings, Brand Registry prep and FBA or FBM setup.", to: "/ecommerce/amazon-setup" },
        ],
      }}
      steps={{
        subtitle: "A clear path from first conversation to a store that runs smoothly.",
        items: [
          { icon: <Search size={22} />, title: "Discover", text: "What you sell, where, and your goals." },
          { icon: <PenTool size={22} />, title: "Plan", text: "Platforms, channels and a setup roadmap." },
          { icon: <Wrench size={22} />, title: "Build", text: "Catalog, checkout, inventory and shipping." },
          { icon: <Rocket size={22} />, title: "Launch & grow", text: "Test orders, go live, then expand channels." },
        ],
      }}
      benefits={{
        title: "What a connected ecommerce setup gives you",
        items: [
          { icon: <Clock size={20} />, title: "Hours back every week", text: "Less copy-and-paste and fewer manual updates." },
          { icon: <TrendingUp size={20} />, title: "More sales", text: "Better listings and a smoother checkout." },
          { icon: <RefreshCw size={20} />, title: "No overselling", text: "Stock synced across every channel." },
          { icon: <ShieldCheck size={20} />, title: "Customer trust", text: "Professional pages and reliable delivery." },
          { icon: <Users size={20} />, title: "Room to grow", text: "Add channels without starting over." },
          { icon: <LifeBuoy size={20} />, title: "Expert support", text: "Guidance whenever you need it." },
        ],
      }}
      tools={{
        title: "Platforms and tools we work with",
        subtitle: "We set up your business on the tools that fit it, not the other way around.",
        items: [
          { icon: <ShoppingBag size={20} />, title: "Shopify", text: "Hosted all-in-one store builder." },
          { icon: <Code2 size={20} />, title: "WooCommerce", text: "Flexible store on WordPress." },
          { icon: <Store size={20} />, title: "Marketplaces", text: "Amazon, eBay, Etsy and Walmart." },
          { icon: <Printer size={20} />, title: "Shipping software", text: "Label printing and rate shopping." },
          { icon: <Calculator size={20} />, title: "Accounting", text: "Sales, fees and payouts recorded." },
          { icon: <Mail size={20} />, title: "Email & analytics", text: "Order emails and sales reporting." },
        ],
      }}
      faqs={[
        ["What ecommerce services do you offer?", "We set up product listings and catalogs, shopping carts and checkout, inventory and order management, shipping and fulfillment, marketplace integrations for eBay, Etsy and Walmart, and Amazon seller accounts. You can choose one service or a complete package."],
        ["Which ecommerce platform should I use?", "It depends on your products, budget and how much control you want. Shopify suits businesses that want an all-in-one hosted store, while WooCommerce suits WordPress sites that want more flexibility. We'll recommend the best fit during discovery."],
        ["Can you help me sell on several channels at once?", "Yes. We connect your store and marketplaces so listings, inventory and orders stay in sync. That way you can sell on your website, Amazon, eBay, Etsy and Walmart without overselling."],
        ["How long does an ecommerce setup take?", "A focused service like checkout or shipping setup can be done quickly, while a full store launch with marketplaces takes longer. Timing also depends on your catalog size and on marketplace approval times, which we don't control."],
        ["Do you work with existing stores?", "Absolutely. Many clients come to us with a store that's already live. We review what's working, fix what isn't and add new channels or tools without rebuilding from scratch."],
      ]}
      cta={{ title: "Ready to build an online store that runs itself?" }}
    >
      <Section id="ec-stages" tone="soft" title="Find your starting point" subtitle="Every store is at a different stage. Pick yours to see where we'd begin.">
        <Explorer items={stages} />
        <div className="svc-center"><Link to="/ecommerce/product-listing" className="svc-link">Most stores start with their catalog. Explore product listing setup <ArrowRight size={16} /></Link></div>
      </Section>
    </EcommercePage>
  );
}
