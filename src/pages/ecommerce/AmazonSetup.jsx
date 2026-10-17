import { Link } from "react-router-dom";
import {
  UserCheck, Tags, BadgeCheck, Truck, Megaphone, BarChart3, Search, PenTool, Rocket, Users, TrendingUp,
  ShieldCheck, Clock, Star, Package, Store, Image, Barcode, Warehouse,
} from "lucide-react";
import { Reveal, Section, CompareTable } from "../../components/service";
import EcommercePage from "./EcommercePage";
import { AmazonVisual } from "./EcommerceVisual";
import { AmazonPlanChooser } from "./EcommerceWidgets";
import { ECOMMERCE_LINKS } from "./services";

export default function AmazonSetup() {
  return (
    <EcommercePage
      path="/ecommerce/amazon-setup"
      title={{ text: "Amazon seller setup to launch your products the right way", short: "Amazon Setup" }}
      subtitle={<>We guide you through <strong>Seller Central registration, optimized listings, Brand Registry preparation and FBA or FBM fulfillment</strong>, so you start selling on Amazon with fewer delays and costly mistakes.</>}
      primary={{ label: "Start selling on Amazon", to: ECOMMERCE_LINKS.start("amazon-setup") }}
      secondary={{ label: "Choose your seller plan", href: "#ec-plan" }}
      visual={<AmazonVisual />}
      highlights={[
        { icon: <UserCheck size={16} />, text: "Seller Central setup" },
        { icon: <Tags size={16} />, text: "Optimized listings" },
        { icon: <BadgeCheck size={16} />, text: "Brand Registry prep" },
        { icon: <Truck size={16} />, text: "FBA or FBM" },
      ]}
      overview={{
        title: "Get your Amazon business set up correctly from day one",
        body: [
          <>Amazon is one of the largest places to sell online, but getting started can be confusing. Registration involves identity and business verification, tax and bank details, and choosing between Individual and Professional selling plans. Then there are product identifiers, category requirements, listing rules, fulfillment choices and brand protection to think about. Small mistakes at the start can delay your launch or cause listing problems later.</>,
          <>Our Amazon seller account setup service walks you through every step. We help you prepare the information and documents Amazon typically asks for, choose the right plan, and configure your Seller Central account. We create keyword-optimized listings with compelling titles, bullet points, descriptions and images that meet Amazon's guidelines. We also help you decide between Fulfillment by Amazon (FBA) and fulfilling orders yourself (FBM), and prepare your products and shipments accordingly.</>,
          <>If you own a brand, Amazon Brand Registry can unlock brand protection and enhanced content, and it generally requires an active or pending trademark, which our <Link to="/business/trademark">trademark registration service</Link> can help with. Your Amazon listings also benefit from a clean <Link to="/ecommerce/product-listing">product catalog</Link> and synced <Link to="/ecommerce/inventory-orders">inventory</Link>, especially if you also sell on your own store or on <Link to="/ecommerce/marketplaces">eBay, Etsy and Walmart</Link>.</>,
        ],
        glance: {
          title: "What's included",
          items: [
            "Seller plan recommendation",
            "Seller Central registration guidance",
            "Account, tax and payment settings",
            "Keyword-optimized product listings",
            "Brand Registry preparation",
            "FBA or FBM setup and first shipment",
          ],
        },
      }}
      services={{
        title: "Our Amazon setup services",
        subtitle: "Everything you need to go from \"thinking about Amazon\" to your first sale.",
        items: [
          { icon: <UserCheck size={24} />, title: "Seller account setup", text: "Guidance through registration and verification, plus account, tax, payment and notification settings." },
          { icon: <Tags size={24} />, title: "Listing creation & optimization", text: "Keyword research, titles, bullet points, descriptions and backend search terms that follow Amazon's rules." },
          { icon: <Image size={24} />, title: "Images & enhanced content", text: "Image requirements checked, plus A+ Content planning for brand-registered sellers." },
          { icon: <BadgeCheck size={24} />, title: "Brand Registry preparation", text: "Get your trademark and brand details ready so you can apply for Brand Registry." },
          { icon: <Warehouse size={24} />, title: "FBA & FBM setup", text: "Choose your fulfillment method, set up shipping templates or prepare your first FBA shipment." },
          { icon: <Megaphone size={24} />, title: "Launch readiness", text: "Pricing review, launch checklist and guidance on getting your first reviews the right way." },
        ],
      }}
      steps={{
        items: [
          { icon: <Search size={22} />, title: "Plan", text: "Products, plan type and fulfillment." },
          { icon: <UserCheck size={22} />, title: "Register", text: "Seller Central account and settings." },
          { icon: <PenTool size={22} />, title: "List", text: "Optimized listings and images." },
          { icon: <Rocket size={22} />, title: "Launch", text: "Fulfillment ready, then go live." },
        ],
      }}
      benefits={{
        title: "Why get expert help with Amazon",
        items: [
          { icon: <Clock size={20} />, title: "Faster launch", text: "Avoid common setup delays." },
          { icon: <ShieldCheck size={20} />, title: "Fewer mistakes", text: "Listings that follow the rules." },
          { icon: <Star size={20} />, title: "Better listings", text: "Built to rank and convert." },
          { icon: <Users size={20} />, title: "Huge audience", text: "Reach Amazon's shoppers." },
          { icon: <BadgeCheck size={20} />, title: "Brand protection", text: "Ready for Brand Registry." },
          { icon: <TrendingUp size={20} />, title: "Room to grow", text: "Ready for ads and new products." },
        ],
      }}
      tools={{
        title: "Amazon programs and tools we work with",
        items: [
          { icon: <Store size={20} />, title: "Seller Central", text: "Your Amazon seller dashboard." },
          { icon: <Warehouse size={20} />, title: "Fulfillment by Amazon", text: "Amazon stores and ships orders." },
          { icon: <Truck size={20} />, title: "Merchant fulfilled", text: "You ship orders yourself." },
          { icon: <BadgeCheck size={20} />, title: "Brand Registry", text: "Brand protection and A+ Content." },
          { icon: <Barcode size={20} />, title: "Product identifiers", text: "UPC/GTIN and exemptions." },
          { icon: <BarChart3 size={20} />, title: "Business reports", text: "Sales and traffic insights." },
        ],
      }}
      checklist={{
        title: "What Amazon typically asks for",
        items: [
          "Government-issued photo ID",
          "Business details and tax ID (EIN or SSN)",
          "Bank account for payouts",
          "Credit card for seller fees",
          "Phone number for verification",
          "Product identifiers (UPC/GTIN) or an exemption",
        ],
        note: "Requirements vary by country and business type, and Amazon makes every verification decision.",
      }}
      faqs={[
        ["What do I need to open an Amazon seller account?", "Amazon typically asks for a government-issued ID, business and tax information, a bank account for payouts, a credit card for fees and a phone number for verification. Exact requirements depend on your country and business type."],
        ["Should I choose the Individual or Professional plan?", "Individual charges a fee per item sold, while Professional has a flat monthly subscription and unlocks tools like advertising and bulk listing. A common rule of thumb is that Professional pays off at around 40 sales a month. Check Seller Central for current fees."],
        ["What is the difference between FBA and FBM?", "With Fulfillment by Amazon (FBA), you send inventory to Amazon and it stores, packs, ships and handles customer service for those orders. With FBM, you store and ship orders yourself. FBA adds fees but can make products eligible for Prime shipping."],
        ["Do I need a trademark for Amazon Brand Registry?", "Brand Registry generally requires an active or pending registered trademark for your brand. Our trademark service can help you file, and we'll prepare your Amazon application once you're ready."],
        ["Can you guarantee my account will be approved?", "No. Amazon runs its own verification and makes every decision. We help you prepare accurate, consistent information, which helps the process go as smoothly as possible."],
      ]}
      cta={{ title: "Launch your Amazon business with confidence" }}
    >
      <Section id="ec-plan" title="Which Amazon selling plan fits you?" subtitle="Slide to your expected monthly sales and compare plan fees.">
        <AmazonPlanChooser />
      </Section>

      <Section tone="soft" title="FBA vs FBM at a glance" subtitle="How the two main Amazon fulfillment methods compare.">
        <Reveal>
          <CompareTable
            columns={["", "FBA (Fulfillment by Amazon)", "FBM (Merchant fulfilled)"]}
            rows={[
              ["Who stores and ships", "Amazon", "You or your 3PL"],
              ["Prime shipping eligibility", true, "Only via approved programs"],
              ["Customer service & returns", "Handled by Amazon", "Handled by you"],
              ["Storage & fulfillment fees", true, false],
              ["Control over packaging", "Limited", "Full"],
              ["Best for", "Fast-moving, small to mid-size items", "Bulky, slow-moving or custom items"],
            ]}
          />
        </Reveal>
        <p className="mc-small">Many sellers use both, sending best sellers to FBA and fulfilling other items themselves. <Link to="/ecommerce/shipping" className="svc-link"><Package size={14} /> See shipping & fulfillment setup</Link></p>
      </Section>
    </EcommercePage>
  );
}
