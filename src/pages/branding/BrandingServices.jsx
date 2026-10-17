import { Link } from "react-router-dom";
import {
  UserRoundCheck, PenTool, Mail, Search, Palette, Wrench, Rocket, BadgeCheck, Eye, Repeat, Users, TrendingUp, Clock,
  MapPin, Share2, QrCode, Type, ClipboardList, Sparkles,
} from "lucide-react";
import { Section, Timeline } from "../../components/service";
import EcommercePage from "../ecommerce/EcommercePage";
import { BrandKitVisual } from "./BrandingVisual";
import { BrandCheck } from "./BrandingWidgets";
import { BRANDING_LINKS, BRANDING_SECTION } from "./services";
import "../website/Website.css";
import "./Branding.css";

export default function BrandingServices() {
  return (
    <EcommercePage
      section={BRANDING_SECTION}
      path="/branding"
      title={{ text: "Branding & digital identity services that make your business look established", short: "Branding & Digital Identity" }}
      subtitle={<>From your logo and colors to your Google profile, business email and digital business card, we <strong>build a consistent, professional brand</strong> everywhere customers find you.</>}
      primary={{ label: "Build my brand", to: BRANDING_LINKS.start("branding") }}
      secondary={{ label: "Check my brand", href: "#br-check" }}
      visual={<BrandKitVisual />}
      highlights={[
        { icon: <PenTool size={16} />, text: "Logo & visual design" },
        { icon: <UserRoundCheck size={16} />, text: "Profile optimization" },
        { icon: <Mail size={16} />, text: "Business email" },
        { icon: <QrCode size={16} />, text: "Digital business cards" },
      ]}
      overview={{
        title: "A brand customers recognize and trust",
        body: [
          <>Before a customer calls, visits or buys, they've usually already formed an opinion. They've seen your logo, looked you up on Google, checked your social profiles and noticed whether your email ends in your own domain or a free address. When those touchpoints look polished and consistent, your business feels established and trustworthy. When they don't match, customers hesitate.</>,
          <>Our branding and digital identity services give you a complete, consistent identity without the agency price tag. We start with your look: a <Link to="/branding/logo-design">custom logo, color palette and typography</Link> captured in a simple style guide. Then we carry it everywhere that matters, <Link to="/branding/profile-optimization">optimizing your Google Business Profile, LinkedIn and social profiles</Link> so they're complete, accurate and easy to find, and setting up <Link to="/branding/email-digital-cards">professional business email, branded signatures and digital business cards</Link>.</>,
          <>A strong identity also makes everything else work harder. Your <Link to="/website">website</Link> looks more credible, your <Link to="/marketing">ads</Link> get recognized, and your brand is ready to protect with a <Link to="/business/trademark">trademark registration</Link>.</>,
        ],
        glance: {
          title: "Why work with us",
          items: [
            "One team for your logo, profiles and email",
            "Consistent look across every platform",
            "Practical, affordable packages for small businesses",
            "You own every file, account and design",
            "Simple style guide so others stay on-brand",
          ],
        },
      }}
      services={{
        title: "Our branding & digital identity services",
        subtitle: "Start with what you need most, or combine them for a complete brand refresh.",
        items: [
          { icon: <UserRoundCheck size={24} />, title: "Profile Optimization", text: "Google Business Profile, LinkedIn, social and directory listings completed, consistent and keyword-rich.", to: "/branding/profile-optimization" },
          { icon: <PenTool size={24} />, title: "Logo & Visual Design", text: "Original logo concepts, a brand color palette, typography and a style guide, in every file format.", to: "/branding/logo-design" },
          { icon: <Mail size={24} />, title: "Business Email & Digital Cards", text: "Email on your domain, branded signatures and shareable digital business cards with QR codes.", to: "/branding/email-digital-cards" },
        ],
      }}
      steps={{
        subtitle: "A clear, collaborative process from first conversation to finished brand.",
        items: [
          { icon: <Search size={22} />, title: "Discover", text: "Your business, audience and competitors." },
          { icon: <Palette size={22} />, title: "Design", text: "Logo, colors and type concepts." },
          { icon: <Wrench size={22} />, title: "Apply", text: "Profiles, email and cards set up." },
          { icon: <Rocket size={22} />, title: "Launch", text: "Hand over files and a style guide." },
        ],
      }}
      benefits={{
        title: "What a consistent brand gives you",
        items: [
          { icon: <BadgeCheck size={20} />, title: "Instant credibility", text: "Look established from day one." },
          { icon: <Eye size={20} />, title: "Recognition", text: "Customers remember you." },
          { icon: <MapPin size={20} />, title: "Easier to find", text: "Better local search visibility." },
          { icon: <Repeat size={20} />, title: "Consistency", text: "Same look on every channel." },
          { icon: <TrendingUp size={20} />, title: "Better marketing", text: "Ads and posts that stand out." },
          { icon: <Clock size={20} />, title: "Time saved", text: "Templates ready to reuse." },
        ],
      }}
      tools={{
        title: "Where we build your identity",
        items: [
          { icon: <MapPin size={20} />, title: "Google Business Profile", text: "Search and Maps listings." },
          { icon: <Users size={20} />, title: "LinkedIn", text: "Company and founder pages." },
          { icon: <Share2 size={20} />, title: "Social platforms", text: "Facebook, Instagram, X and more." },
          { icon: <Palette size={20} />, title: "Design tools", text: "Professional vector design." },
          { icon: <Mail size={20} />, title: "Email workspaces", text: "Popular business email suites." },
          { icon: <QrCode size={20} />, title: "Digital cards", text: "Shareable links and QR codes." },
        ],
      }}
      faqs={[
        ["What's included in a branding package?", "It depends on where you're starting. A typical package includes a logo with color and font choices, a short style guide, optimized Google and social profiles, business email on your domain, a branded email signature and a digital business card. We tailor it to what you already have."],
        ["Do I need a logo before optimizing my profiles?", "Not necessarily, but it helps. Your logo and cover images appear on almost every profile, so many clients start with logo design and then roll the new look out across their profiles in one go."],
        ["How long does branding take?", "Profile optimization and email setup can often be done quickly once we have access. Logo design takes longer because it includes concepts and revision rounds. We'll give you a clear timeline before we start."],
        ["Will I own my logo and accounts?", "Yes. You receive full rights to your final logo files, and every profile and email account is set up in your business's name, so you stay in control."],
        ["Can you work with my existing logo?", "Absolutely. If you're happy with your logo, we can refine it, build out a color palette and style guide around it, and apply it consistently across your profiles and email."],
      ]}
      cta={{ title: "Ready for a brand that matches the quality of your work?" }}
    >
      <Section id="br-check" tone="soft" title="Quick brand consistency check" subtitle="Tick what you have today to see where your brand stands and what to fix first.">
        <BrandCheck />
      </Section>

      <Section title="What a typical branding project looks like" subtitle="Every business is different, but most projects follow this path.">
        <Timeline
          items={[
            { when: "Step 1", title: "Brand questionnaire", text: "Your story, audience and style preferences.", icon: <ClipboardList size={18} /> },
            { when: "Step 2", title: "Logo concepts", text: "Original options with revision rounds.", icon: <PenTool size={18} /> },
            { when: "Step 3", title: "Style guide", text: "Colors, fonts and logo usage rules.", icon: <Type size={18} /> },
            { when: "Step 4", title: "Roll-out", text: "Profiles, email and cards updated.", icon: <Share2 size={18} /> },
            { when: "Step 5", title: "Handover", text: "All files and logins delivered to you.", icon: <Sparkles size={18} /> },
          ]}
        />
      </Section>
    </EcommercePage>
  );
}
