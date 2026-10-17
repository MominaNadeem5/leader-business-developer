import { Link } from "react-router-dom";
import {
  MapPin, Users, Share2, Building2, Star, Search, PenTool, Wrench, Rocket, BadgeCheck, Image, MessageSquare, Repeat,
  TrendingUp, Phone, Eye, Clock, FileText, BarChart3, Camera,
} from "lucide-react";
import { Section, Explorer } from "../../components/service";
import EcommercePage from "../ecommerce/EcommercePage";
import { ProfileVisual } from "./BrandingVisual";
import { BRANDING_LINKS, BRANDING_SECTION } from "./services";
import "../website/Website.css";
import "./Branding.css";

const platforms = [
  {
    id: "google", icon: <MapPin size={18} />, label: "Google Business Profile",
    title: "Google Business Profile",
    text: "Your listing on Google Search and Maps is often the first thing local customers see. A complete, active profile helps you show up for nearby searches and turns lookers into calls and visits.",
    points: ["Accurate categories, hours, service area and attributes", "Keyword-rich description, products and services", "Fresh photos, posts and review responses"],
  },
  {
    id: "linkedin", icon: <Users size={18} />, label: "LinkedIn",
    title: "LinkedIn company & founder pages",
    text: "For B2B and professional services, LinkedIn is where clients, partners and hires check you out. We make your company page and founder profile clear, credible and searchable.",
    points: ["Branded banner, logo and tagline", "About section and specialties written for search", "Founder headline and featured work"],
  },
  {
    id: "social", icon: <Share2 size={18} />, label: "Social media",
    title: "Facebook, Instagram, X and more",
    text: "Customers expect to find you on social media, and they notice when profiles are half-finished or out of date. We make every profile look like part of the same brand.",
    points: ["Profile photos and covers sized for each platform", "Consistent bios, links and contact buttons", "Handles secured and linked from your website"],
  },
  {
    id: "directories", icon: <Building2 size={18} />, label: "Directories",
    title: "Directory & review site listings",
    text: "Listings on maps apps, review sites and industry directories reinforce your business details across the web, which supports local search visibility and trust.",
    points: ["Name, address and phone matched exactly (NAP)", "Duplicate and outdated listings cleaned up", "Key industry and review directories claimed"],
  },
];

export default function ProfileOptimization() {
  return (
    <EcommercePage
      section={BRANDING_SECTION}
      path="/branding/profile-optimization"
      title={{ text: "Profile optimization that helps customers find, trust and choose you", short: "Profile Optimization" }}
      subtitle={<>We <strong>complete and optimize your Google Business Profile, LinkedIn, social media and directory listings</strong> so they're accurate, consistent and working to bring in customers.</>}
      primary={{ label: "Optimize my profiles", to: BRANDING_LINKS.start("profile-optimization") }}
      secondary={{ label: "Which profiles matter?", href: "#br-platforms" }}
      visual={<ProfileVisual />}
      highlights={[
        { icon: <MapPin size={16} />, text: "Google Business Profile" },
        { icon: <Users size={16} />, text: "LinkedIn" },
        { icon: <Share2 size={16} />, text: "Social media" },
        { icon: <Building2 size={16} />, text: "Directory listings" },
      ]}
      overview={{
        title: "Your profiles are your storefront online",
        body: [
          <>When someone searches for your business, or for the service you offer nearby, they usually see your profiles before your website. Your Google Business Profile shows your rating, hours, photos and a button to call. Your LinkedIn and social pages show whether you're active and professional. If those profiles are incomplete, inconsistent or out of date, customers move on to a competitor that looks more established.</>,
          <>Our profile optimization service makes every profile complete and consistent. We claim or verify your listings, choose the right categories, write clear descriptions using the words customers actually search for, and add photos, products and services. We make sure your business name, address and phone number match exactly everywhere, which helps search engines trust your details, and we clean up duplicate or outdated listings that confuse customers.</>,
          <>We'll also set you up to keep profiles fresh, with a simple plan for posts, photos and review responses. Want your profiles to look their best? Pair this with <Link to="/branding/logo-design">logo and visual design</Link> for matching photos and covers, and a <Link to="/branding/email-digital-cards">professional business email</Link> for your contact details. To bring in even more visitors, explore our <Link to="/marketing/google-ads">Google Ads</Link> service.</>,
        ],
        glance: {
          title: "What's included",
          items: [
            "Profile audit across key platforms",
            "Google Business Profile setup and optimization",
            "LinkedIn company and founder pages",
            "Social profile branding and bios",
            "Directory listings and NAP clean-up",
            "Review response templates and guidance",
          ],
        },
      }}
      services={{
        title: "Our profile optimization services",
        subtitle: "Everything it takes to make your profiles complete, consistent and findable.",
        items: [
          { icon: <Search size={24} />, title: "Profile audit", text: "We review your current profiles and listings, and spot gaps, errors and missed opportunities." },
          { icon: <MapPin size={24} />, title: "Google Business Profile", text: "Categories, hours, services, products, photos and a keyword-rich description, set up properly." },
          { icon: <Users size={24} />, title: "LinkedIn pages", text: "A branded company page and founder profile that build credibility with clients and partners." },
          { icon: <Share2 size={24} />, title: "Social profile branding", text: "Matching photos, covers, bios and links across Facebook, Instagram, X and others." },
          { icon: <Building2 size={24} />, title: "Directories & citations", text: "Consistent name, address and phone on key directories, with duplicates cleaned up." },
          { icon: <Star size={24} />, title: "Reviews strategy", text: "A simple way to ask for reviews, plus templates for replying to good and bad ones." },
        ],
      }}
      steps={{
        items: [
          { icon: <Search size={22} />, title: "Audit", text: "Find every profile and listing." },
          { icon: <PenTool size={22} />, title: "Plan", text: "Keywords, wording and visuals." },
          { icon: <Wrench size={22} />, title: "Optimize", text: "Update, verify and clean up." },
          { icon: <Rocket size={22} />, title: "Maintain", text: "Posting and review routine." },
        ],
      }}
      benefits={{
        title: "Why optimized profiles matter",
        items: [
          { icon: <Eye size={20} />, title: "More visibility", text: "Show up in local searches." },
          { icon: <BadgeCheck size={20} />, title: "More trust", text: "Complete profiles look credible." },
          { icon: <Phone size={20} />, title: "More calls", text: "One-tap contact and directions." },
          { icon: <Repeat size={20} />, title: "Consistency", text: "Same details everywhere." },
          { icon: <Star size={20} />, title: "Better reviews", text: "A process to earn more." },
          { icon: <TrendingUp size={20} />, title: "Insight", text: "See how customers find you." },
        ],
      }}
      tools={{
        title: "What we optimize on every profile",
        items: [
          { icon: <FileText size={20} />, title: "Descriptions", text: "Clear, keyword-rich copy." },
          { icon: <Camera size={20} />, title: "Photos & covers", text: "Sized and on-brand." },
          { icon: <Clock size={20} />, title: "Hours & details", text: "Accurate and up to date." },
          { icon: <Image size={20} />, title: "Products & services", text: "Showcased with prices or ranges." },
          { icon: <MessageSquare size={20} />, title: "Reviews & Q&A", text: "Answered professionally." },
          { icon: <BarChart3 size={20} />, title: "Insights", text: "Views, calls and clicks tracked." },
        ],
      }}
      checklist={{
        title: "What to have ready",
        items: [
          "Your exact business name, address and phone number",
          "Business hours and service area",
          "Logins for any profiles you already have",
          "Your logo and a few good photos",
          "A list of your main products or services",
          "Your website and social media links",
        ],
      }}
      faqs={[
        ["What is profile optimization?", "It's the process of making your online profiles, like your Google Business Profile, LinkedIn and social pages, complete, accurate, consistent and written so the right customers can find them. It also covers cleaning up outdated or duplicate listings."],
        ["Does profile optimization help local SEO?", "Yes. A complete, active Google Business Profile with accurate details, relevant categories and reviews is one of the most important factors for appearing in local search and Maps results. Consistent details across directories also help."],
        ["Can you verify my Google Business Profile?", "We'll guide you through verification and handle everything we can. Google controls the verification method and timing, which can involve a video, phone, email or postcard, so you may need to complete one step yourself."],
        ["Do I need to be on every social platform?", "No. It's better to have a few complete, active profiles where your customers actually spend time than many empty ones. We'll help you choose, and secure your name on others so nobody else takes it."],
        ["How do I keep my profiles optimized?", "We give you a simple routine: add new photos, post updates, keep hours current and respond to reviews. If you prefer, we can help with ongoing updates too."],
      ]}
      cta={{ title: "Make your profiles work as hard as you do" }}
    >
      <Section id="br-platforms" title="Which profiles do we optimize?" subtitle="Pick a platform to see what we set up and improve.">
        <Explorer items={platforms} />
      </Section>
    </EcommercePage>
  );
}
