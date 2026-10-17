import { Link } from "react-router-dom";
import {
  Search, MapPin, ShoppingBag, Video, Sparkles, Target, Wrench, Rocket, TrendingUp, BarChart3, MousePointerClick,
  DollarSign, Clock, Ban, FileText, Gauge, LayoutGrid, LineChart, KeyRound,
} from "lucide-react";
import { Section, Explorer } from "../../components/service";
import EcommercePage from "../ecommerce/EcommercePage";
import { SearchAdVisual } from "./MarketingVisual";
import { BudgetEstimator } from "./MarketingWidgets";
import { MARKETING_LINKS, MARKETING_SECTION } from "./services";
import "../website/Website.css";
import "../branding/Branding.css";
import "./Marketing.css";

const campaignTypes = [
  {
    id: "search", icon: <Search size={18} />, label: "Search",
    title: "Search campaigns",
    text: "Text ads that appear when people search for your products or services. Because people are actively looking, search is usually the highest-intent traffic you can buy.",
    points: ["Keyword research and tightly themed ad groups", "Responsive search ads with strong headlines", "Negative keywords to block wasted clicks"],
  },
  {
    id: "local", icon: <MapPin size={18} />, label: "Local & Maps",
    title: "Local campaigns and call ads",
    text: "Reach nearby customers on Search and Maps, and drive calls, directions and store visits. Ideal for service-area businesses, restaurants and shops.",
    points: ["Location targeting and radius bidding", "Call, location and lead form assets", "Linked Google Business Profile"],
  },
  {
    id: "shopping", icon: <ShoppingBag size={18} />, label: "Shopping",
    title: "Shopping campaigns",
    text: "Product ads with images, prices and your store name. Shoppers see what you sell before they click, which brings in qualified buyers.",
    points: ["Merchant Center setup and product feed", "Product titles and attributes optimized", "Bidding by product, margin and performance"],
  },
  {
    id: "pmax", icon: <Sparkles size={18} />, label: "Performance Max",
    title: "Performance Max campaigns",
    text: "One campaign that uses Google's automation to show ads across Search, YouTube, Display, Gmail, Maps and Discover. Powerful with good inputs and accurate conversion tracking.",
    points: ["High-quality text, image and video assets", "Audience signals from your customer data", "Brand exclusions and careful reporting"],
  },
  {
    id: "youtube", icon: <Video size={18} />, label: "YouTube",
    title: "YouTube video campaigns",
    text: "Video ads that build awareness and consideration with the people most likely to become customers, and remarketing to people who've already visited.",
    points: ["Short video ad formats and hooks", "Audience and topic targeting", "View and engagement tracking"],
  },
];

export default function GoogleAds() {
  return (
    <EcommercePage
      section={MARKETING_SECTION}
      path="/marketing/google-ads"
      title={{ text: "Google Ads management that reaches customers the moment they search", short: "Google Ads" }}
      subtitle={<>We build and manage <strong>Google Ads campaigns across Search, Maps, Shopping and YouTube</strong>, with accurate conversion tracking and ongoing optimization to lower your cost per lead.</>}
      primary={{ label: "Start my Google Ads", to: MARKETING_LINKS.start("google-ads") }}
      secondary={{ label: "Estimate my results", href: "#mk-budget" }}
      visual={<SearchAdVisual />}
      highlights={[
        { icon: <Search size={16} />, text: "Search ads" },
        { icon: <MapPin size={16} />, text: "Local & Maps" },
        { icon: <ShoppingBag size={16} />, text: "Shopping" },
        { icon: <Video size={16} />, text: "YouTube" },
      ]}
      overview={{
        title: "Be the answer when customers are looking",
        body: [
          <>Every day, people search Google for exactly what your business offers: "plumber near me", "best running shoes", "accountant for small business". Google Ads puts your business at the top of those results, so you reach customers at the moment they're ready to act. You only pay when someone clicks, and you control your budget completely.</>,
          <>The challenge is that Google Ads rewards expertise. Poor keyword choices, broad match settings, weak ads and missing negative keywords can drain a budget on irrelevant clicks. Our Google Ads management starts with research into what your customers search for and what competitors are doing. We structure campaigns around your most profitable services or products, write compelling ads, and set up conversion tracking for calls, forms and purchases so every decision is based on real results.</>,
          <>After launch, we optimize continuously: refining keywords and bids, testing ads, adding negative keywords and shifting budget to what works. A great landing page makes a big difference, so we'll recommend improvements or help build one with our <Link to="/website">website setup</Link> team. Local business? Make sure your <Link to="/branding/profile-optimization">Google Business Profile is optimized</Link> too. Want to create demand as well as capture it? Add <Link to="/marketing/meta-ads">Meta Ads</Link>.</>,
        ],
        glance: {
          title: "What's included",
          items: [
            "Keyword and competitor research",
            "Campaign and ad group structure",
            "Ad copy and assets written for you",
            "Conversion tracking for calls, forms and sales",
            "Weekly optimization and negative keywords",
            "Monthly performance reports",
          ],
        },
      }}
      services={{
        title: "Our Google Ads services",
        subtitle: "Everything it takes to run profitable Google Ads campaigns.",
        items: [
          { icon: <KeyRound size={24} />, title: "Keyword research", text: "Find the high-intent searches your customers use, and the ones to avoid paying for." },
          { icon: <LayoutGrid size={24} />, title: "Campaign setup", text: "Well-structured campaigns, ad groups, bidding strategies and budgets from day one." },
          { icon: <FileText size={24} />, title: "Ad copywriting", text: "Responsive search ads and assets like sitelinks, callouts and calls that earn the click." },
          { icon: <MousePointerClick size={24} />, title: "Conversion tracking", text: "Track calls, forms, bookings and purchases so you know what each campaign returns." },
          { icon: <TrendingUp size={24} />, title: "Ongoing optimization", text: "Bid, keyword and ad testing, negative keywords and budget shifts every week." },
          { icon: <Search size={24} />, title: "Account audit", text: "Already running ads? We'll find wasted spend and quick wins in your existing account." },
        ],
      }}
      steps={{
        items: [
          { icon: <Search size={22} />, title: "Research", text: "Keywords, competitors and offers." },
          { icon: <Wrench size={22} />, title: "Build", text: "Tracking, campaigns and ads." },
          { icon: <Rocket size={22} />, title: "Launch", text: "Go live with a test budget." },
          { icon: <TrendingUp size={22} />, title: "Optimize", text: "Cut waste and scale winners." },
        ],
      }}
      benefits={{
        title: "Why businesses choose Google Ads",
        items: [
          { icon: <Target size={20} />, title: "High intent", text: "Reach people ready to buy." },
          { icon: <Clock size={20} />, title: "Fast", text: "Traffic as soon as you launch." },
          { icon: <DollarSign size={20} />, title: "Pay per click", text: "Only pay for visits." },
          { icon: <MapPin size={20} />, title: "Local reach", text: "Target by location and radius." },
          { icon: <BarChart3 size={20} />, title: "Measurable", text: "Track every lead and sale." },
          { icon: <Ban size={20} />, title: "Less waste", text: "Block irrelevant searches." },
        ],
      }}
      tools={{
        title: "Tools we use",
        items: [
          { icon: <Search size={20} />, title: "Google Ads", text: "Campaigns and bidding." },
          { icon: <LineChart size={20} />, title: "Google Analytics", text: "Behavior and conversions." },
          { icon: <MousePointerClick size={20} />, title: "Tag management", text: "Conversion tags done right." },
          { icon: <ShoppingBag size={20} />, title: "Merchant Center", text: "Product feeds for Shopping." },
          { icon: <KeyRound size={20} />, title: "Keyword Planner", text: "Search volume and costs." },
          { icon: <Gauge size={20} />, title: "Landing page tests", text: "Speed and conversion checks." },
        ],
      }}
      checklist={{
        title: "What to have ready",
        items: [
          "Your main products or services and their value to you",
          "The areas you serve or ship to",
          "A monthly ad budget you're comfortable testing",
          "Access to your website or landing pages",
          "Any existing Google Ads or Analytics accounts",
          "What counts as a lead or sale for your business",
        ],
      }}
      faqs={[
        ["How much does Google Ads cost?", "You set your own budget and pay Google per click. Cost per click varies widely by industry, location and competition. Our management fee is separate from ad spend, which goes directly to Google from your account."],
        ["How long until Google Ads works?", "Ads can show as soon as they're approved, often within a day or two. Expect a learning period of a few weeks while we gather data and optimize. Results typically improve steadily over the first few months."],
        ["What is conversion tracking and why does it matter?", "Conversion tracking records valuable actions, like calls, form submissions and purchases, that come from your ads. Without it, you can't tell which keywords and ads make money, and Google's automated bidding can't optimize properly."],
        ["Should I use Performance Max?", "Performance Max can work very well, especially for ecommerce, but it depends on good conversion tracking, quality assets and enough budget. We often start with Search for control and add Performance Max when the data supports it."],
        ["Can you fix my existing Google Ads account?", "Yes. We start with an audit to find wasted spend, tracking gaps and structural issues, then make improvements while keeping your account history."],
      ]}
      cta={{ title: "Show up first when customers search for you" }}
    >
      <Section id="mk-types" title="Google Ads campaign types we manage" subtitle="Pick a campaign type to see how we use it.">
        <Explorer items={campaignTypes} />
      </Section>

      <Section id="mk-budget" tone="soft" title="Estimate what your budget could deliver" subtitle="A simple way to understand how clicks, costs and conversions add up.">
        <BudgetEstimator channel="Google Ads" budget={1500} cpc={2.5} conv={4} cpcMax={15} />
      </Section>
    </EcommercePage>
  );
}
