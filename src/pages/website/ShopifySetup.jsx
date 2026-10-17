import { Link } from "react-router-dom";
import {
  ShoppingBag, Palette, Tags, CreditCard, Truck, Puzzle, Search, PenTool, Wrench, Rocket, Clock, ShieldCheck,
  Smartphone, TrendingUp, Boxes, Store, Percent, Mail, BarChart3, ClipboardList, Package, Globe, Settings,
} from "lucide-react";
import { Section, Timeline } from "../../components/service";
import EcommercePage from "../ecommerce/EcommercePage";
import { ShopifyVisual } from "./WebsiteVisual";
import { WEBSITE_LINKS, WEBSITE_SECTION } from "./services";
import "./Website.css";

export default function ShopifySetup() {
  return (
    <EcommercePage
      section={WEBSITE_SECTION}
      path="/website/shopify"
      title={{ text: "Shopify store setup so you can start selling online, fast", short: "Shopify Setup" }}
      subtitle={<>We build <strong>ready-to-sell Shopify stores</strong> with a customized theme, organized products, payments, shipping, taxes and the right apps, so you can launch with confidence.</>}
      primary={{ label: "Launch my Shopify store", to: WEBSITE_LINKS.start("shopify") }}
      secondary={{ label: "See the launch timeline", href: "#ws-launch" }}
      visual={<ShopifyVisual />}
      highlights={[
        { icon: <Palette size={16} />, text: "Theme customization" },
        { icon: <Tags size={16} />, text: "Products & collections" },
        { icon: <CreditCard size={16} />, text: "Payments & taxes" },
        { icon: <Truck size={16} />, text: "Shipping setup" },
      ]}
      overview={{
        title: "A Shopify store that's ready to sell from day one",
        body: [
          <>Shopify is one of the most popular platforms for selling online, and for good reason. It handles hosting, security and checkout for you, works on any device and connects to hundreds of sales channels and apps. But a store that's ready to sell takes more than signing up. You need a theme that reflects your brand, well-organized products, correct payment, tax and shipping settings, legal pages and a checkout customers trust.</>,
          <>Our Shopify store setup service takes care of all of it. We configure your store settings, customize a theme to match your brand, and set up your navigation, homepage and key pages. We add your products and collections with clear descriptions and images, connect payments, configure shipping zones and rates, and set up taxes. We install only the apps you need, for reviews, email marketing or upsells, and run test orders before launch so everything works perfectly.</>,
          <>Already have products and a plan? Combine this service with our ecommerce specialties: <Link to="/ecommerce/product-listing">product listing and catalog setup</Link> for large catalogs, <Link to="/ecommerce/cart-checkout">checkout optimization</Link>, <Link to="/ecommerce/shipping">shipping and fulfillment</Link> and <Link to="/ecommerce/marketplaces">marketplace integrations</Link>. Need a custom domain? Our <Link to="/website/domain-hosting">domain setup</Link> service connects it to Shopify. Not sure Shopify is right? Compare it with <Link to="/website/wordpress">WordPress</Link>.</>,
        ],
        glance: {
          title: "What's included",
          items: [
            "Store settings and custom domain",
            "Theme customization to your brand",
            "Products, collections and navigation",
            "Payments, taxes and shipping",
            "Essential apps and email notifications",
            "Test orders, launch and training",
          ],
        },
      }}
      services={{
        title: "Our Shopify setup services",
        subtitle: "Everything you need to open your online store with confidence.",
        items: [
          { icon: <Settings size={24} />, title: "Store configuration", text: "Store details, currencies, domain connection, staff accounts and notification settings." },
          { icon: <Palette size={24} />, title: "Theme customization", text: "A theme styled with your logo, colors and fonts, plus a homepage designed to convert." },
          { icon: <Tags size={24} />, title: "Products & collections", text: "Products, variants, images and collections organized so customers find what they want." },
          { icon: <CreditCard size={24} />, title: "Payments & taxes", text: "Payment methods connected and tax settings configured for where you sell." },
          { icon: <Truck size={24} />, title: "Shipping setup", text: "Shipping zones, rates, free-shipping thresholds and label printing." },
          { icon: <Puzzle size={24} />, title: "Apps & integrations", text: "Hand-picked apps for reviews, email, upsells and more, without slowing your store." },
        ],
      }}
      steps={{
        items: [
          { icon: <Search size={22} />, title: "Plan", text: "Products, brand and store structure." },
          { icon: <PenTool size={22} />, title: "Design", text: "Theme styling and key pages." },
          { icon: <Wrench size={22} />, title: "Build", text: "Products, payments, shipping and apps." },
          { icon: <Rocket size={22} />, title: "Test & launch", text: "Test orders, then open your store." },
        ],
      }}
      benefits={{
        title: "Why sell on Shopify",
        items: [
          { icon: <Clock size={20} />, title: "Fast to launch", text: "No servers to manage." },
          { icon: <ShieldCheck size={20} />, title: "Secure checkout", text: "Hosting and security handled." },
          { icon: <Smartphone size={20} />, title: "Mobile ready", text: "Shop on any device." },
          { icon: <Boxes size={20} />, title: "Built-in tools", text: "Inventory, orders and reports." },
          { icon: <Store size={20} />, title: "Sell everywhere", text: "Online, social and in person." },
          { icon: <TrendingUp size={20} />, title: "Grows with you", text: "Apps for every stage." },
        ],
      }}
      tools={{
        title: "Shopify features and tools we set up",
        items: [
          { icon: <Palette size={20} />, title: "Shopify themes", text: "Free and premium themes." },
          { icon: <CreditCard size={20} />, title: "Payments", text: "Shopify Payments and other providers." },
          { icon: <Percent size={20} />, title: "Discounts", text: "Codes, automatic deals and gift cards." },
          { icon: <Mail size={20} />, title: "Email marketing", text: "Notifications and campaigns." },
          { icon: <Globe size={20} />, title: "Sales channels", text: "Social, marketplaces and POS." },
          { icon: <BarChart3 size={20} />, title: "Analytics", text: "Sales, traffic and conversion." },
        ],
      }}
      checklist={{
        title: "What to have ready",
        items: [
          "Your logo, brand colors and fonts",
          "Product names, prices, photos and descriptions",
          "Product weights for shipping rates",
          "Business and tax details",
          "Bank details for payouts",
          "Shipping, returns and privacy policies (or we'll help draft them)",
        ],
      }}
      faqs={[
        ["How long does it take to set up a Shopify store?", "A simple store with a handful of products can be ready fairly quickly once we have your content. Larger catalogs and custom designs take longer. We'll give you a timeline after reviewing your products."],
        ["Do I need a Shopify plan before you start?", "No. We can help you choose a plan and set up the account in your name. Shopify often offers a free trial, so you can build before you pay. Check Shopify's site for current plans and pricing."],
        ["Can you move my store from another platform to Shopify?", "Yes. We can migrate products, customers and order history from platforms like WooCommerce, then set up redirects so you keep your search rankings."],
        ["Which Shopify apps do I need?", "Fewer than you might think. Shopify has strong built-in features, so we only add apps that solve a real need, such as reviews or email marketing, to keep your store fast and costs down."],
        ["Will I be able to manage the store myself?", "Yes. Shopify is designed for store owners, and we'll show you how to add products, process orders and run discounts, with a short guide for reference."],
      ]}
      cta={{ title: "Open your Shopify store with everything ready" }}
    >
      <Section id="ws-launch" tone="soft" title="From signup to your first sale" subtitle="Here's how we take your Shopify store from idea to launch.">
        <Timeline
          items={[
            { when: "Step 1", title: "Store plan", text: "Products, collections and pages mapped out.", icon: <ClipboardList size={18} /> },
            { when: "Step 2", title: "Brand & theme", text: "Theme styled and homepage designed.", icon: <Palette size={18} /> },
            { when: "Step 3", title: "Products added", text: "Variants, images and descriptions.", icon: <Package size={18} /> },
            { when: "Step 4", title: "Payments & shipping", text: "Checkout, taxes and rates configured.", icon: <CreditCard size={18} /> },
            { when: "Step 5", title: "Launch", text: "Test orders, then open your doors.", icon: <ShoppingBag size={18} /> },
          ]}
        />
      </Section>
    </EcommercePage>
  );
}
