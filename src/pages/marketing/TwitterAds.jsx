import { Link } from "react-router-dom";
import {
  MessageCircle, Users, MousePointerClick, Video, Eye, Hash, Target, Wrench, Rocket, TrendingUp, PenTool, BarChart3,
  Clock, Repeat2, Zap, Radio, Briefcase, LineChart, Search,
} from "lucide-react";
import { Section, Explorer } from "../../components/service";
import EcommercePage from "../ecommerce/EcommercePage";
import { PromotedPostVisual } from "./MarketingVisual";
import { BudgetEstimator } from "./MarketingWidgets";
import { MARKETING_LINKS, MARKETING_SECTION } from "./services";
import "../website/Website.css";
import "../branding/Branding.css";
import "./Marketing.css";

const objectives = [
  {
    id: "reach", icon: <Eye size={18} />, label: "Reach & awareness",
    title: "Reach and awareness campaigns",
    text: "Put your brand in front of as many relevant people as possible. Great for launches, events and building recognition in a new market.",
    points: ["Broad interest and conversation targeting", "Eye-catching image and video posts", "Frequency control so people aren't overwhelmed"],
  },
  {
    id: "engage", icon: <MessageCircle size={18} />, label: "Engagement",
    title: "Engagement campaigns",
    text: "Get more likes, replies and reposts on the posts that matter most, starting conversations and extending your organic reach.",
    points: ["Promote your best-performing posts", "Polls and conversation starters", "Community replies handled promptly"],
  },
  {
    id: "followers", icon: <Users size={18} />, label: "Followers",
    title: "Follower campaigns",
    text: "Grow an audience of people genuinely interested in what you do, so every future post reaches more of the right people for free.",
    points: ["Targeting by interests and similar accounts", "A clear reason to follow in every ad", "Profile optimized to convert visits"],
  },
  {
    id: "traffic", icon: <MousePointerClick size={18} />, label: "Website traffic",
    title: "Website traffic and conversions",
    text: "Drive clicks to your website, landing page or store, and track sign-ups and purchases with the X Pixel.",
    points: ["Website cards with strong calls to action", "X Pixel and conversion events", "Retargeting of site visitors"],
  },
  {
    id: "video", icon: <Video size={18} />, label: "Video views",
    title: "Video view campaigns",
    text: "Short, sound-off-friendly videos that grab attention in a fast-moving feed and tell your story in seconds.",
    points: ["Hook in the first few seconds", "Captions for sound-off viewing", "View-through and engagement reporting"],
  },
];

export default function TwitterAds() {
  return (
    <EcommercePage
      section={MARKETING_SECTION}
      path="/marketing/twitter-ads"
      title={{ text: "Twitter (X) Ads that put your business in the conversation", short: "Twitter (X) Ads" }}
      subtitle={<>We plan, create and manage <strong>Twitter (X) ad campaigns</strong>, from promoted posts to follower and website campaigns, targeted by the keywords, interests and conversations your audience follows.</>}
      primary={{ label: "Start my X Ads", to: MARKETING_LINKS.start("twitter-ads") }}
      secondary={{ label: "Campaign objectives", href: "#mk-objectives" }}
      visual={<PromotedPostVisual />}
      highlights={[
        { icon: <MessageCircle size={16} />, text: "Promoted posts" },
        { icon: <Hash size={16} />, text: "Keyword targeting" },
        { icon: <Users size={16} />, text: "Follower growth" },
        { icon: <BarChart3 size={16} />, text: "Clear reporting" },
      ]}
      overview={{
        title: "Reach people while they're paying attention",
        body: [
          <>Twitter, now called X, is where people go to follow news, trends, live events and the topics they care about. That makes it a powerful place to advertise when timing and relevance matter: a product launch, a limited-time offer, an event or an announcement. Ads appear as promoted posts right in people's feeds and search results, and they look and feel like the content around them.</>,
          <>Our Twitter (X) Ads service takes care of the whole process. We pick the right campaign objective for your goal, whether that's awareness, engagement, followers, website visits or video views. We build audiences using keywords people post and search, interests, similar accounts and your own customer lists, and we write short, punchy posts and creative designed for a fast-scrolling feed. We install the X Pixel so we can track website actions and retarget visitors.</>,
          <>Once live, we monitor performance, test new creative and refine targeting, then report the results clearly. X works best alongside a strong presence elsewhere, so make sure your <Link to="/branding/profile-optimization">social profiles are optimized</Link> and your brand looks consistent with our <Link to="/branding/logo-design">visual design</Link> service. Looking for people already searching to buy? Combine it with <Link to="/marketing/google-ads">Google Ads</Link>.</>,
        ],
        glance: {
          title: "What's included",
          items: [
            "Ad account setup or audit",
            "Objective and audience strategy",
            "Post copy and creative for ads",
            "X Pixel and conversion tracking",
            "Ongoing testing and optimization",
            "Monthly performance reports",
          ],
        },
      }}
      services={{
        title: "Our Twitter (X) Ads services",
        subtitle: "Everything you need to advertise effectively on X.",
        items: [
          { icon: <Wrench size={24} />, title: "Account setup", text: "Ad account, billing, brand profile and X Pixel configured properly." },
          { icon: <Target size={24} />, title: "Audience targeting", text: "Keywords, interests, follower look-alikes, locations and your own customer lists." },
          { icon: <PenTool size={24} />, title: "Ad creative", text: "Short, punchy posts with images, video and website cards built for the feed." },
          { icon: <Radio size={24} />, title: "Timely campaigns", text: "Launches, events and offers timed to the conversations your audience follows." },
          { icon: <Repeat2 size={24} />, title: "Retargeting", text: "Reach people who visited your site or engaged with your posts." },
          { icon: <TrendingUp size={24} />, title: "Optimization & reporting", text: "Regular creative tests, bid adjustments and plain-English monthly reports." },
        ],
      }}
      steps={{
        items: [
          { icon: <Target size={22} />, title: "Plan", text: "Goal, audience and offer." },
          { icon: <PenTool size={22} />, title: "Create", text: "Posts, creative and targeting." },
          { icon: <Rocket size={22} />, title: "Launch", text: "Go live and monitor closely." },
          { icon: <TrendingUp size={22} />, title: "Optimize", text: "Test, refine and report." },
        ],
      }}
      benefits={{
        title: "Why advertise on Twitter (X)",
        items: [
          { icon: <Zap size={20} />, title: "Real-time", text: "Ride news, events and trends." },
          { icon: <Hash size={20} />, title: "Keyword targeting", text: "Reach people by what they post." },
          { icon: <Briefcase size={20} />, title: "Niche audiences", text: "Tech, B2B and enthusiasts." },
          { icon: <MessageCircle size={20} />, title: "Conversations", text: "Engage, not just broadcast." },
          { icon: <Users size={20} />, title: "Audience growth", text: "Followers who stay." },
          { icon: <Clock size={20} />, title: "Quick to launch", text: "Campaigns live fast." },
        ],
      }}
      tools={{
        title: "Targeting and tools we use",
        items: [
          { icon: <Hash size={20} />, title: "Keyword targeting", text: "What people post and search." },
          { icon: <Users size={20} />, title: "Follower look-alikes", text: "Fans of similar accounts." },
          { icon: <Search size={20} />, title: "Interests & topics", text: "Hobbies, industries, events." },
          { icon: <MousePointerClick size={20} />, title: "X Pixel", text: "Site visits and conversions." },
          { icon: <Repeat2 size={20} />, title: "Custom audiences", text: "Customer lists and visitors." },
          { icon: <LineChart size={20} />, title: "Analytics", text: "Engagement and results." },
        ],
      }}
      checklist={{
        title: "What to have ready",
        items: [
          "Your X account (or we'll help create one)",
          "Your main goal: awareness, followers, traffic or sales",
          "Any upcoming launches, events or offers",
          "Brand assets: logo, photos and videos",
          "A monthly ad budget you're comfortable testing",
          "Access to your website to install the X Pixel",
        ],
      }}
      faqs={[
        ["Is Twitter (X) advertising worth it for small businesses?", "It can be, especially for businesses with timely offers, events, tech or B2B audiences, or niche communities that are active on X. We'll be honest about whether it fits your goals, and often recommend testing it alongside Google or Meta."],
        ["How much do X Ads cost?", "You set your own budget and bid, and pay X directly. Costs depend on your objective, audience and competition. Our management fee covers strategy, creative, setup, optimization and reporting, and is separate from your ad spend."],
        ["What can I target on X?", "You can target by keywords people use, interests, follower look-alikes of similar accounts, location, language, device and your own custom audiences such as customer lists and website visitors."],
        ["What makes a good X ad?", "Short, clear copy with a single message, a strong image or short video, and an obvious call to action. Ads that feel native to the conversation, rather than like a billboard, tend to perform best."],
        ["Do you handle replies to my ads?", "We can monitor comments on your ads and flag anything that needs your attention, or reply on your behalf using guidelines we agree on together."],
      ]}
      cta={{ title: "Join the conversation your customers are already having" }}
    >
      <Section id="mk-objectives" title="Campaign objectives we run on X" subtitle="Pick an objective to see when and how we use it.">
        <Explorer items={objectives} />
      </Section>

      <Section id="mk-budget" tone="soft" title="Estimate what your budget could deliver" subtitle="See how budget, cost per click and conversion rate shape your results.">
        <BudgetEstimator channel="Twitter (X) Ads" budget={1000} cpc={1} conv={2} cpcMax={6} />
      </Section>
    </EcommercePage>
  );
}
