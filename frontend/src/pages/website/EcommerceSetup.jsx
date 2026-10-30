import { Link } from "react-router-dom";
import {
  ShoppingCart, ShoppingBag, Code2, Store, Tags, CreditCard, Truck, Boxes, Package, Search, PenTool, Wrench, Rocket,
  Clock, ShieldCheck, Smartphone, TrendingUp, Globe, Mail, BarChart3, ClipboardList, Palette, Settings, RefreshCw,
  Users, ArrowRight,
} from "lucide-react";
import { Section, Timeline } from "../../components/service";
import EcommercePage from "../ecommerce/EcommercePage";
import { ShopifyVisual } from "./WebsiteVisual";
import { WEBSITE_LINKS, WEBSITE_SECTION } from "./services";
import "./Website.css";

export default function EcommerceSetup() {
  return (
    <EcommercePage
      section={WEBSITE_SECTION}
      path="/website/ecommerce-setup"
      title={{ text: "E-commerce setup to launch an online store that's ready to sell", short: "E-commerce Setup" }}
      subtitle={<>We set up your <strong>complete online store</strong>: platform, products, checkout, payments, shipping and taxes, so you can open for business with confidence.</>}
      primary={{ label: "Start my store setup", to: WEBSITE_LINKS.start("ecommerce") }}
      secondary={{ label: "See the launch plan", href: "#ws-ecom-launch" }}
      visual={<ShopifyVisual />}
      highlights={[
        { icon: <ShoppingCart size={16} />, text: "Store & platform setup" },
        { icon: <Tags size={16} />, text: "Products & catalog" },
        { icon: <CreditCard size={16} />, text: "Payments & checkout" },
        { icon: <Truck size={16} />, text: "Shipping & taxes" },
      ]}
      overview={{
        title: "Everything you need to open your online store",
        body: [
          <>Starting an online store means making a lot of decisions at once: which platform to use, how to organize products, how customers will pay, where you'll ship and what taxes apply. Get them wrong and you lose sales to a confusing checkout or surprise shipping costs. Get them right and your store is simple for customers to buy from and simple for you to run.</>,
          <>Our e-commerce setup service handles the whole launch. We help you choose the right platform, configure your store, design a clean storefront, add your products, connect payment methods, set up shipping and taxes, and run test orders before you go live. You finish with a store that works, plus a short walkthrough so you can manage it yourself.</>,
          <>Need to go further? Once you're live, we can add <Link to="/ecommerce/inventory-orders">inventory and order management</Link>, <Link to="/ecommerce/marketplaces">marketplace selling</Link> and <Link to="/ecommerce/amazon-setup">Amazon setup</Link>. See the full range on our <Link to="/ecommerce">ecommerce solutions</Link> page.</>,
        ],
        glance: {
          title: "What's included",
          items: [
            "Platform recommendation and account setup",
            "Storefront design that matches your brand",
            "Products, categories and variants",
            "Payments, taxes and shipping rates",
            "Order emails and policy pages",
            "Test orders, launch and training",
          ],
        },
      }}
      services={{
        title: "What our e-commerce setup covers",
        subtitle: "Every piece of a store that's ready to take its first order.",
        items: [
          { icon: <Settings size={24} />, title: "Store configuration", text: "Store details, domain connection, currencies, staff accounts and notification settings." },
          { icon: <Palette size={24} />, title: "Storefront design", text: "A clean, mobile-friendly theme styled with your logo, colors and fonts." },
          { icon: <Tags size={24} />, title: "Products & categories", text: "Product pages, images, variants and categories organized so shoppers find what they want." },
          { icon: <CreditCard size={24} />, title: "Payments & checkout", text: "Cards, digital wallets and a simple checkout with guest ordering." },
          { icon: <Truck size={24} />, title: "Shipping & taxes", text: "Shipping zones, rates, free-shipping thresholds and tax settings for where you sell." },
          { icon: <Mail size={24} />, title: "Emails & policies", text: "Order confirmation and shipping emails, plus returns, privacy and terms pages." },
        ],
      }}
      steps={{
        items: [
          { icon: <Search size={22} />, title: "Discover", text: "Your products, customers and goals." },
          { icon: <PenTool size={22} />, title: "Plan", text: "Platform, store structure and design." },
          { icon: <Wrench size={22} />, title: "Build", text: "Products, payments, shipping and taxes." },
          { icon: <Rocket size={22} />, title: "Test & launch", text: "Test orders, then open your store." },
        ],
      }}
      benefits={{
        title: "Why set up your store with us",
        items: [
          { icon: <Clock size={20} />, title: "Faster launch", text: "A clear plan and no guesswork." },
          { icon: <ShieldCheck size={20} />, title: "Trusted checkout", text: "Secure, familiar payment options." },
          { icon: <Smartphone size={20} />, title: "Mobile ready", text: "Shop smoothly on any device." },
          { icon: <TrendingUp size={20} />, title: "Built to convert", text: "Clear pages and a simple path to buy." },
          { icon: <RefreshCw size={20} />, title: "Room to grow", text: "Add channels and tools later." },
          { icon: <Users size={20} />, title: "Expert support", text: "Help from setup through launch." },
        ],
      }}
      tools={{
        title: "Platforms and tools we set up",
        subtitle: "We choose the platform that fits your business, not the other way around.",
        items: [
          { icon: <ShoppingBag size={20} />, title: "Shopify", text: "Hosted all-in-one store builder." },
          { icon: <Code2 size={20} />, title: "WooCommerce", text: "Flexible store on WordPress." },
          { icon: <CreditCard size={20} />, title: "Payment providers", text: "Cards, wallets and bank payments." },
          { icon: <Truck size={20} />, title: "Shipping tools", text: "Rates, labels and tracking." },
          { icon: <Store size={20} />, title: "Marketplaces", text: "Amazon, eBay, Etsy and Walmart." },
          { icon: <BarChart3 size={20} />, title: "Analytics", text: "Sales, traffic and conversion." },
        ],
      }}
      checklist={{
        title: "What to have ready",
        items: [
          "Your logo, brand colors and fonts",
          "Product names, prices, photos and descriptions",
          "Product weights and sizes for shipping rates",
          "Business and tax details",
          "Bank details for payouts",
          "Shipping, returns and privacy policies (or we'll help draft them)",
        ],
      }}
      faqs={[
        ["What is included in e-commerce setup?", "We configure your platform and store settings, design the storefront, add your products, connect payments, set up shipping and taxes, and test the whole order flow before launch. You also get a short walkthrough for managing the store."],
        ["Which platform should I choose?", "It depends on your products, budget and how much control you want. Shopify suits businesses that want an all-in-one hosted store, while WooCommerce suits those who already use WordPress. We'll recommend the best fit during discovery."],
        ["How long does it take to launch my store?", "A small store with a few products can launch quickly once we have your content. Larger catalogs and custom designs take longer. We'll give you a timeline after reviewing what you sell."],
        ["Can you move my existing store to a new platform?", "Yes. We can migrate products, customers and order history and set up redirects so you keep your search rankings."],
        ["Can I sell on Amazon or other marketplaces too?", "Yes. After your store is live, we can connect marketplaces such as eBay, Etsy, Walmart and Amazon, and keep stock and orders in sync."],
      ]}
      cta={{ title: "Launch your online store with everything ready" }}
    >
      <Section id="ws-ecom-launch" tone="soft" title="From idea to your first order" subtitle="Here's how we take your online store from plan to launch.">
        <Timeline
          items={[
            { when: "Step 1", title: "Store plan", text: "Platform, products and pages mapped out.", icon: <ClipboardList size={18} /> },
            { when: "Step 2", title: "Design", text: "Storefront styled to your brand.", icon: <Palette size={18} /> },
            { when: "Step 3", title: "Products added", text: "Variants, images and descriptions.", icon: <Package size={18} /> },
            { when: "Step 4", title: "Payments & shipping", text: "Checkout, taxes and rates configured.", icon: <Boxes size={18} /> },
            { when: "Step 5", title: "Launch", text: "Test orders, then open your store.", icon: <Globe size={18} /> },
          ]}
        />
        <div className="svc-center"><Link to="/ecommerce" className="svc-link">Explore all ecommerce solutions <ArrowRight size={16} /></Link></div>
      </Section>
    </EcommercePage>
  );
}
