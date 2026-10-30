import { Link } from "react-router-dom";
import {
  Users, Image, Repeat2, Target, Wrench, Rocket, TrendingUp, PenTool, Eye, MousePointerClick, ShoppingBag,
  Video, LayoutGrid, MessageCircle, BarChart3, Smartphone, DollarSign, Sparkles, ShieldCheck, TestTube2, FileText,
} from "lucide-react";
import { Reveal, Section, CompareTable, Timeline } from "../../components/service";
import EcommercePage from "../ecommerce/EcommercePage";
import { FeedAdVisual } from "./MarketingVisual";
import { BudgetEstimator } from "./MarketingWidgets";
import { MARKETING_LINKS, MARKETING_SECTION } from "./services";
import "../website/Website.css";
import "../branding/Branding.css";
import "./Marketing.css";

export default function MetaAds() {
  return (
    <EcommercePage
      section={MARKETING_SECTION}
      path="/marketing/meta-ads"
      title={{ text: "Meta Ads management for Facebook & Instagram that drives real growth", short: "Meta Ads" }}
      subtitle={<>We create and manage <strong>Facebook and Instagram ad campaigns</strong> with scroll-stopping creative, smart audience targeting, accurate tracking and retargeting that brings visitors back to buy.</>}
      primary={{ label: "Start my Meta Ads", to: MARKETING_LINKS.start("meta-ads") }}
      secondary={{ label: "Estimate my results", href: "#mk-budget" }}
      visual={<FeedAdVisual />}
      highlights={[
        { icon: <Users size={16} />, text: "Facebook & Instagram" },
        { icon: <Target size={16} />, text: "Precise targeting" },
        { icon: <Image size={16} />, text: "Creative that converts" },
        { icon: <Repeat2 size={16} />, text: "Retargeting" },
      ]}
      overview={{
        title: "Reach the right people where they spend their time",
        body: [
          <>Facebook and Instagram are where billions of people catch up with friends, discover new products and follow the brands they love. Meta Ads let you reach them with image, video, carousel and Stories ads, targeted by location, interests, behaviors and lookalikes of your best customers. It's one of the most effective ways for small businesses to build awareness and create demand for products people didn't know they wanted yet.</>,
          <>Our Meta Ads management covers the full funnel. We start by setting up tracking properly, with the Meta Pixel and Conversions API, so we can measure purchases, leads and bookings accurately. Then we build campaigns that introduce your brand to new audiences, nurture people who've shown interest, and retarget visitors who didn't convert. Creative matters more on Meta than almost anywhere else, so we write the copy and design or brief image and video ads built to stop the scroll.</>,
          <>We test audiences, formats and messages continuously, scale the winners and cut what isn't working, with clear monthly reports. Strong ads need a strong brand behind them: our <Link to="/branding/logo-design">visual design</Link> and <Link to="/branding/profile-optimization">profile optimization</Link> services make your Facebook and Instagram pages look the part. Selling products? Connect your catalog with our <Link to="/ecommerce">ecommerce solutions</Link> for dynamic product ads, and capture search demand with <Link to="/marketing/google-ads">Google Ads</Link>.</>,
        ],
        glance: {
          title: "What's included",
          items: [
            "Business Manager and ad account setup",
            "Meta Pixel and Conversions API tracking",
            "Audience strategy and lookalikes",
            "Ad copy and creative (image, video, carousel)",
            "A/B testing and weekly optimization",
            "Monthly performance reports",
          ],
        },
      }}
      services={{
        title: "Our Meta Ads services",
        subtitle: "Everything you need to grow with Facebook and Instagram advertising.",
        items: [
          { icon: <Wrench size={24} />, title: "Account & tracking setup", text: "Business portfolio, ad account, Pixel, Conversions API and domain verification." },
          { icon: <Target size={24} />, title: "Audience strategy", text: "Interest, location and lookalike audiences, plus custom audiences from your customers." },
          { icon: <PenTool size={24} />, title: "Ad creative", text: "Thumb-stopping copy, images, carousels, Reels and Stories designed for each placement." },
          { icon: <Repeat2 size={24} />, title: "Retargeting", text: "Bring back website visitors, video viewers and cart abandoners with tailored ads." },
          { icon: <ShoppingBag size={24} />, title: "Catalog & shopping ads", text: "Connect your product catalog for dynamic ads that show people what they browsed." },
          { icon: <TestTube2 size={24} />, title: "Testing & optimization", text: "Structured tests of audiences, creative and offers, with budget moved to what works." },
        ],
      }}
      steps={{
        items: [
          { icon: <Target size={22} />, title: "Strategy", text: "Goals, audience and offer." },
          { icon: <ShieldCheck size={22} />, title: "Tracking", text: "Pixel and Conversions API." },
          { icon: <Rocket size={22} />, title: "Launch", text: "Creative and campaigns live." },
          { icon: <TrendingUp size={22} />, title: "Scale", text: "Test, optimize and grow." },
        ],
      }}
      benefits={{
        title: "Why advertise on Facebook & Instagram",
        items: [
          { icon: <Users size={20} />, title: "Huge reach", text: "Where your customers scroll." },
          { icon: <Target size={20} />, title: "Precise targeting", text: "Interests, places, lookalikes." },
          { icon: <Image size={20} />, title: "Visual formats", text: "Show, don't just tell." },
          { icon: <Repeat2 size={20} />, title: "Retargeting", text: "Win back interested visitors." },
          { icon: <DollarSign size={20} />, title: "Any budget", text: "Start small, scale up." },
          { icon: <BarChart3 size={20} />, title: "Measurable", text: "Track leads and sales." },
        ],
      }}
      tools={{
        title: "Ad formats we create",
        items: [
          { icon: <Image size={20} />, title: "Image ads", text: "Simple, clear and effective." },
          { icon: <Video size={20} />, title: "Video & Reels", text: "Short, vertical, attention-grabbing." },
          { icon: <LayoutGrid size={20} />, title: "Carousel", text: "Several products or benefits." },
          { icon: <Smartphone size={20} />, title: "Stories", text: "Full-screen, immersive ads." },
          { icon: <ShoppingBag size={20} />, title: "Dynamic product ads", text: "Personalized from your catalog." },
          { icon: <MessageCircle size={20} />, title: "Lead & message ads", text: "Forms and chats in the app." },
        ],
      }}
      checklist={{
        title: "What to have ready",
        items: [
          "Your Facebook Page and Instagram account",
          "Admin access to your Meta business portfolio, if you have one",
          "Your main goal: leads, sales, bookings or awareness",
          "Photos, videos and brand assets",
          "A monthly ad budget you're comfortable testing",
          "Access to your website to install tracking",
        ],
      }}
      faqs={[
        ["Are Facebook ads still worth it?", "For many businesses, yes. Facebook and Instagram remain among the largest advertising platforms, with detailed targeting and strong formats for visual products, local services and lead generation. Results depend heavily on creative, tracking and testing, which is where management helps most."],
        ["Do my ads run on both Facebook and Instagram?", "Usually, yes. Meta Ads can show across Facebook, Instagram, Messenger and partner apps. We often let Meta optimize placements automatically, then adjust if one placement performs better for your business."],
        ["What are the Meta Pixel and Conversions API?", "The Pixel is code on your website that reports actions like purchases and leads back to Meta. The Conversions API sends the same events from your server, which improves accuracy when browsers block tracking. Together, they help Meta find people more likely to convert."],
        ["How much should I spend on Meta Ads?", "You can start with a modest test budget, but campaigns need enough data to learn. We'll recommend a realistic starting budget based on your goals and the cost of a lead or sale in your industry."],
        ["Do you make the ad images and videos?", "Yes. We write the copy and design image and carousel ads, and can edit short videos from your footage or brief you on what to film. Strong, fresh creative is one of the biggest drivers of results on Meta."],
      ]}
      cta={{ title: "Turn scrollers into customers" }}
    >
      <Section tone="soft" title="Facebook vs. Instagram: where should your ads run?" subtitle="Both are managed from Meta Ads Manager. Here's how they typically differ.">
        <Reveal>
          <CompareTable
            columns={["", "Facebook", "Instagram", "Both (recommended)"]}
            rows={[
              ["Strongest formats", "Feed, video, groups, Marketplace", "Reels, Stories, visual feed", "All placements"],
              ["Great for", "Local services, lead ads, broad reach", "Visual products, lifestyle brands", "Most businesses"],
              ["Shopping features", true, true, true],
              ["Lead and message ads", true, true, true],
              ["Lets Meta find the cheapest results", false, false, true],
            ]}
            highlight={3}
          />
        </Reveal>
        <p className="mc-small">Audiences differ by age, interest and location, so we test placements and let the data decide where your budget goes.</p>
      </Section>

      <Section title="How we build your Meta Ads funnel" subtitle="Different messages for people at different stages.">
        <Timeline
          items={[
            { when: "Awareness", title: "Introduce", text: "Reach new people who match your best customers.", icon: <Eye size={18} /> },
            { when: "Consideration", title: "Engage", text: "Show benefits, reviews and video to the curious.", icon: <Sparkles size={18} /> },
            { when: "Conversion", title: "Convert", text: "Clear offers that drive leads and sales.", icon: <MousePointerClick size={18} /> },
            { when: "Retargeting", title: "Bring back", text: "Remind visitors and cart abandoners.", icon: <Repeat2 size={18} /> },
            { when: "Reporting", title: "Learn", text: "Monthly insights and next tests.", icon: <FileText size={18} /> },
          ]}
        />
      </Section>

      <Section id="mk-budget" tone="soft" title="Estimate what your budget could deliver" subtitle="See how budget, cost per click and conversion rate shape your results.">
        <BudgetEstimator channel="Meta Ads" budget={1200} cpc={1.25} conv={3} cpcMax={6} />
      </Section>
    </EcommercePage>
  );
}
