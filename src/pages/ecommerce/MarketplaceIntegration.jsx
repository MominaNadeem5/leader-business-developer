import { Link } from "react-router-dom";
import {
  Store, UserCheck, Tags, RefreshCw, Inbox, BarChart3, Search, Wrench, Rocket, Users, TrendingUp,
  ShieldCheck, Clock, Globe, Boxes, ShoppingBag, Code2, Truck, Gavel, Palette, Building2, Package, Bell,
} from "lucide-react";
import { Section, Timeline } from "../../components/service";
import { OptionCards } from "../merchant/MerchantPage";
import EcommercePage from "./EcommercePage";
import { MarketplaceVisual } from "./EcommerceVisual";
import { ECOMMERCE_LINKS } from "./services";

export default function MarketplaceIntegration() {
  return (
    <EcommercePage
      path="/ecommerce/marketplaces"
      title={{ text: "Marketplace integration for eBay, Etsy and Walmart, all in sync", short: "Marketplace Integration" }}
      subtitle={<>Reach millions of shoppers on major marketplaces. We <strong>set up your seller accounts, adapt your listings and sync inventory and orders</strong> with your store, so multichannel selling stays simple.</>}
      primary={{ label: "Expand to marketplaces", to: ECOMMERCE_LINKS.start("marketplaces") }}
      secondary={{ label: "Compare eBay, Etsy & Walmart", href: "#ec-channels" }}
      visual={<MarketplaceVisual />}
      highlights={[
        { icon: <Gavel size={16} />, text: "eBay" },
        { icon: <Palette size={16} />, text: "Etsy" },
        { icon: <Building2 size={16} />, text: "Walmart Marketplace" },
        { icon: <RefreshCw size={16} />, text: "Inventory & order sync" },
      ]}
      overview={{
        title: "Sell where your customers already shop",
        body: [
          <>Marketplaces like eBay, Etsy and Walmart Marketplace attract shoppers who are ready to buy. Listing your products there can open new revenue streams without the cost of driving all that traffic to your own website. But every marketplace has its own account requirements, listing formats, category rules and policies, and managing several channels by hand quickly leads to overselling and missed orders.</>,
          <>Our marketplace integration service handles the setup and the connections. We help you prepare and apply for seller accounts, adapt your product listings to each marketplace's format and search behavior, and map your products to the right categories and attributes. Then we connect each marketplace to your store or inventory system, so stock levels update everywhere when something sells and all your orders arrive in one place for fulfillment.</>,
          <>Marketplace success depends on strong foundations: <Link to="/ecommerce/product-listing">complete, optimized product data</Link>, accurate <Link to="/ecommerce/inventory-orders">multichannel inventory</Link> and reliable <Link to="/ecommerce/shipping">shipping and fulfillment</Link> that meets each channel's delivery expectations. Planning to sell on Amazon as well? Our dedicated <Link to="/ecommerce/amazon-setup">Amazon setup</Link> service covers Seller Central, Brand Registry and FBA.</>,
        ],
        glance: {
          title: "What's included",
          items: [
            "Marketplace fit assessment",
            "Seller account application support",
            "Listings adapted to each marketplace",
            "Category and attribute mapping",
            "Inventory and order synchronization",
            "Policy, shipping and returns settings",
          ],
        },
      }}
      services={{
        title: "Our marketplace integration services",
        subtitle: "From account setup to a fully synced multichannel operation.",
        items: [
          { icon: <UserCheck size={24} />, title: "Seller account setup", text: "Guidance preparing business details and documents, and setting up policies, payments and profiles." },
          { icon: <Tags size={24} />, title: "Listing optimization", text: "Titles, descriptions, photos and item specifics tailored to how each marketplace's search works." },
          { icon: <Boxes size={24} />, title: "Category & attribute mapping", text: "Products mapped to the right categories with required attributes, so listings go live without errors." },
          { icon: <RefreshCw size={24} />, title: "Inventory sync", text: "Stock levels shared across your store and every marketplace to prevent overselling." },
          { icon: <Inbox size={24} />, title: "Centralized orders", text: "Marketplace orders flow into one dashboard for faster, error-free fulfillment." },
          { icon: <BarChart3 size={24} />, title: "Performance setup", text: "Shipping templates, return settings and reporting that help you meet seller standards." },
        ],
      }}
      steps={{
        items: [
          { icon: <Search size={22} />, title: "Assess", text: "Which marketplaces fit your products." },
          { icon: <UserCheck size={22} />, title: "Apply & set up", text: "Seller accounts, policies and payments." },
          { icon: <Wrench size={22} />, title: "List & connect", text: "Listings, mapping and inventory sync." },
          { icon: <Rocket size={22} />, title: "Launch & monitor", text: "Go live and track early performance." },
        ],
      }}
      benefits={{
        title: "Why sell on marketplaces",
        items: [
          { icon: <Users size={20} />, title: "Built-in audiences", text: "Shoppers already searching." },
          { icon: <TrendingUp size={20} />, title: "New revenue", text: "Grow beyond your own site." },
          { icon: <ShieldCheck size={20} />, title: "Lower risk", text: "Spread sales across channels." },
          { icon: <RefreshCw size={20} />, title: "No overselling", text: "One synced inventory." },
          { icon: <Clock size={20} />, title: "Less admin", text: "All orders in one place." },
          { icon: <Globe size={20} />, title: "Brand exposure", text: "More people discover you." },
        ],
      }}
      tools={{
        title: "Platforms and tools we connect",
        items: [
          { icon: <Gavel size={20} />, title: "eBay", text: "Fixed-price and auction listings." },
          { icon: <Palette size={20} />, title: "Etsy", text: "Handmade, vintage and craft supplies." },
          { icon: <Building2 size={20} />, title: "Walmart Marketplace", text: "Approved third-party sellers." },
          { icon: <ShoppingBag size={20} />, title: "Shopify", text: "Sales channels and connectors." },
          { icon: <Code2 size={20} />, title: "WooCommerce", text: "Marketplace integration plugins." },
          { icon: <Boxes size={20} />, title: "Multichannel software", text: "Listing and inventory sync tools." },
        ],
      }}
      faqs={[
        ["Which marketplace is right for my products?", "It depends on what you sell. Etsy focuses on handmade, vintage and craft supplies; eBay suits a wide range of new and used goods; Walmart Marketplace suits established sellers with competitive pricing and reliable fulfillment. We'll assess the fit before you apply."],
        ["What does Walmart Marketplace require to sell?", "Walmart reviews every application. Commonly cited requirements include a registered U.S. business with a tax ID, a U.S. address, a track record of ecommerce success and reliable fulfillment. Requirements can change, so we check the current criteria with you."],
        ["Can I sell the same product on several marketplaces?", "Yes, as long as each listing follows that marketplace's rules. Multichannel inventory sync is essential so a sale on one channel reduces the available stock everywhere else."],
        ["How do marketplace fees work?", "Each marketplace sets its own fees, which may include listing fees, a commission or referral fee on each sale, and payment processing fees. We'll help you understand current fees so you can price profitably."],
        ["Will marketplace orders come into my main store?", "With the right integration, yes. We connect marketplaces to your store or inventory system so orders arrive in one place and stock stays accurate everywhere."],
      ]}
      cta={{ title: "Put your products in front of millions more shoppers" }}
    >
      <Section id="ec-channels" title="eBay vs Etsy vs Walmart Marketplace" subtitle="Each marketplace attracts different shoppers. Here's where each one shines.">
        <OptionCards
          ctaTo={ECOMMERCE_LINKS.start("marketplaces")}
          ctaLabel="Start on this marketplace"
          items={[
            { name: "eBay", icon: <Gavel size={22} />, best: "New, used, collectible and refurbished goods", text: "A huge, broad marketplace with fixed-price and auction-style listings.", points: ["Wide range of categories", "Auction and Buy It Now formats", "Detailed item specifics help search"] },
            { name: "Etsy", icon: <Palette size={22} />, badge: "Easiest to start", featured: true, best: "Handmade, vintage and craft supplies", text: "A creative marketplace where shoppers look for unique, personal items.", points: ["Quick shop setup", "Strong for gifts and personalization", "Listing, transaction and processing fees"] },
            { name: "Walmart Marketplace", icon: <Building2 size={22} />, best: "Established sellers with competitive prices", text: "An application-based marketplace with high expectations for pricing and delivery.", points: ["Approval required to sell", "Registered U.S. business needed", "Fast, reliable shipping expected"] },
          ]}
        />
        <p className="mc-small">A general guide. Each marketplace sets and changes its own requirements, fees and policies, and makes every approval decision.</p>
      </Section>

      <Section tone="gray" title="How multichannel sync works" subtitle="What happens behind the scenes when a marketplace order comes in.">
        <Timeline
          items={[
            { when: "1", title: "Sale on a marketplace", text: "A customer buys your product on eBay, Etsy or Walmart.", icon: <Store size={18} /> },
            { when: "2", title: "Order imported", text: "The order lands in your central dashboard.", icon: <Inbox size={18} /> },
            { when: "3", title: "Stock updated", text: "Inventory drops on every channel at once.", icon: <RefreshCw size={18} /> },
            { when: "4", title: "Order shipped", text: "You or your 3PL pick, pack and ship.", icon: <Truck size={18} /> },
            { when: "5", title: "Tracking synced", text: "Tracking goes back to the marketplace.", icon: <Bell size={18} /> },
          ]}
        />
        <div className="svc-center"><Link to="/ecommerce/inventory-orders" className="svc-link"><Package size={16} /> Learn about inventory & order management</Link></div>
      </Section>
    </EcommercePage>
  );
}
