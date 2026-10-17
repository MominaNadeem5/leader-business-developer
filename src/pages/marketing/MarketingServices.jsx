import { Link } from "react-router-dom";
import {
  Search, MessageCircle, Users, Target, Wrench, Rocket, BarChart3, TrendingUp, DollarSign, Eye, Clock, LineChart,
  MousePointerClick, PenTool, FileText, ClipboardList, Gauge, ShieldCheck,
} from "lucide-react";
import { Section, Timeline } from "../../components/service";
import EcommercePage from "../ecommerce/EcommercePage";
import { AdsDashboardVisual } from "./MarketingVisual";
import { ChannelPicker } from "./MarketingWidgets";
import { MARKETING_LINKS, MARKETING_SECTION } from "./services";
import "../website/Website.css";
import "../branding/Branding.css";
import "./Marketing.css";

export default function MarketingServices() {
  return (
    <EcommercePage
      section={MARKETING_SECTION}
      path="/marketing"
      title={{ text: "Paid advertising services that turn your budget into customers", short: "Marketing Services" }}
      subtitle={<>We plan, launch and manage <strong>Google Ads, Twitter (X) Ads and Meta Ads campaigns</strong> with proper tracking and continuous optimization, so you know exactly what your ad spend is bringing in.</>}
      primary={{ label: "Grow with ads", to: MARKETING_LINKS.start("marketing") }}
      secondary={{ label: "Which channel fits?", href: "#mk-picker" }}
      visual={<AdsDashboardVisual />}
      highlights={[
        { icon: <Search size={16} />, text: "Google Ads" },
        { icon: <MessageCircle size={16} />, text: "Twitter (X) Ads" },
        { icon: <Users size={16} />, text: "Meta Ads" },
        { icon: <BarChart3 size={16} />, text: "Clear reporting" },
      ]}
      overview={{
        title: "Advertising that's measured, not guessed",
        body: [
          <>Paid advertising is one of the fastest ways to reach new customers. Unlike waiting for search rankings or social followers to grow, ads can put your business in front of the right people this week. But it's also easy to waste money: broad targeting, weak ads, missing conversion tracking and campaigns left running on autopilot can burn through a budget with little to show for it.</>,
          <>Our marketing services focus on what matters: leads, sales and the cost of getting them. We help you choose the right channels for your goals, then build campaigns properly from the start. On <Link to="/marketing/google-ads">Google Ads</Link>, we reach people actively searching for what you sell. On <Link to="/marketing/meta-ads">Meta Ads</Link>, we use Facebook and Instagram to build awareness and demand with precise audiences. On <Link to="/marketing/twitter-ads">Twitter (X) Ads</Link>, we join timely conversations and reach engaged niche communities.</>,
          <>Every campaign includes conversion tracking, regular optimization and plain-English reports. Good ads also need a good destination, so pair them with a fast, conversion-focused <Link to="/website">website</Link> and a consistent <Link to="/branding">brand identity</Link> that customers recognize.</>,
        ],
        glance: {
          title: "Why work with us",
          items: [
            "Strategy based on your goals and budget",
            "Conversion tracking set up from day one",
            "Ad accounts owned by your business",
            "Ongoing optimization, not set-and-forget",
            "Monthly reports in plain English",
          ],
        },
      }}
      services={{
        title: "Our advertising services",
        subtitle: "Run one channel or combine them into a single, coordinated strategy.",
        items: [
          { icon: <Search size={24} />, title: "Google Ads", text: "Search, Maps, Shopping, Performance Max and YouTube campaigns that capture people ready to buy.", to: "/marketing/google-ads" },
          { icon: <MessageCircle size={24} />, title: "Twitter (X) Ads", text: "Promoted posts, follower and website campaigns targeted by keywords, interests and conversations.", to: "/marketing/twitter-ads" },
          { icon: <Users size={24} />, title: "Meta Ads", text: "Facebook and Instagram campaigns with scroll-stopping creative, smart audiences and retargeting.", to: "/marketing/meta-ads" },
        ],
      }}
      steps={{
        subtitle: "A clear process that puts tracking and testing first.",
        items: [
          { icon: <Target size={22} />, title: "Strategy", text: "Goals, audience, channels and budget." },
          { icon: <Wrench size={22} />, title: "Build", text: "Tracking, campaigns and creative." },
          { icon: <Rocket size={22} />, title: "Launch", text: "Go live and watch early results." },
          { icon: <TrendingUp size={22} />, title: "Optimize", text: "Test, refine and scale what works." },
        ],
      }}
      benefits={{
        title: "What well-managed ads give you",
        items: [
          { icon: <Clock size={20} />, title: "Fast results", text: "Reach customers right away." },
          { icon: <Target size={20} />, title: "Precise targeting", text: "Only the people you want." },
          { icon: <DollarSign size={20} />, title: "Budget control", text: "Spend what you choose." },
          { icon: <BarChart3 size={20} />, title: "Measurable", text: "See what each dollar does." },
          { icon: <Eye size={20} />, title: "Brand visibility", text: "Stay top of mind." },
          { icon: <TrendingUp size={20} />, title: "Scalable", text: "Grow spend on what works." },
        ],
      }}
      tools={{
        title: "Platforms and tools we work with",
        items: [
          { icon: <Search size={20} />, title: "Google Ads", text: "Search, Shopping and YouTube." },
          { icon: <Users size={20} />, title: "Meta Ads Manager", text: "Facebook and Instagram." },
          { icon: <MessageCircle size={20} />, title: "X Ads", text: "Promoted posts and trends." },
          { icon: <LineChart size={20} />, title: "Analytics", text: "Traffic and conversion data." },
          { icon: <MousePointerClick size={20} />, title: "Tag management", text: "Pixels and conversion tags." },
          { icon: <Gauge size={20} />, title: "Landing pages", text: "Built to convert clicks." },
        ],
      }}
      faqs={[
        ["Which advertising platform is best for my business?", "It depends on your goals. Google Ads is usually best for capturing people already searching for your product or service. Meta Ads is great for visual products, awareness and precise audiences. Twitter (X) Ads works well for timely offers and engaged niche or professional audiences. Try our channel picker above, and we'll recommend a starting point."],
        ["How much should I spend on ads?", "There's no single right number. It depends on your industry, location, competition and goals. We'll suggest a realistic test budget, measure the results, and then recommend whether to scale up, adjust or shift channels."],
        ["Is ad spend included in your fees?", "No. Ad spend is paid directly to the platform from your own ad account, so you always see exactly what was spent. Our management fee covers strategy, setup, creative, optimization and reporting."],
        ["How soon will I see results?", "Ads can start bringing traffic as soon as they're approved. The first few weeks are a learning period while platforms gather data and we test audiences and ads, and results usually improve as campaigns are optimized."],
        ["Do I own my ad accounts?", "Yes. We set up or work inside ad accounts owned by your business and are given access as managers. If you ever stop working with us, your accounts, data and history stay with you."],
      ]}
      cta={{ title: "Ready to put your ad budget to work?" }}
    >
      <Section id="mk-picker" tone="soft" title="Which advertising channel fits your goals?" subtitle="Tick your goals to see where your budget is likely to work hardest.">
        <ChannelPicker />
      </Section>

      <Section title="What your first 90 days look like" subtitle="A typical path from kickoff to a well-tuned campaign.">
        <Timeline
          items={[
            { when: "Week 1", title: "Kickoff & audit", text: "Goals, offers, accounts and past results.", icon: <ClipboardList size={18} /> },
            { when: "Week 2", title: "Tracking", text: "Conversions, pixels and analytics set up.", icon: <ShieldCheck size={18} /> },
            { when: "Weeks 2–3", title: "Creative & build", text: "Ads, audiences and landing pages.", icon: <PenTool size={18} /> },
            { when: "Month 1", title: "Launch & learn", text: "Early data and first optimizations.", icon: <Rocket size={18} /> },
            { when: "Months 2–3", title: "Optimize & scale", text: "Cut waste, grow what works, report.", icon: <FileText size={18} /> },
          ]}
        />
      </Section>
    </EcommercePage>
  );
}
