import { Link } from "react-router-dom";
import {
  Globe, LayoutTemplate, ShoppingBag, Wrench, Search, PenTool, Rocket, Gauge, ShieldCheck, Smartphone, TrendingUp,
  Clock, LifeBuoy, Server, Mail, Code2, BarChart3, ClipboardList, TestTube2, Palette,
} from "lucide-react";
import { Section, Timeline } from "../../components/service";
import EcommercePage from "../ecommerce/EcommercePage";
import { SiteBuildVisual } from "./WebsiteVisual";
import { PlatformPicker } from "./WebsiteWidgets";
import { WEBSITE_LINKS, WEBSITE_SECTION } from "./services";
import "./Website.css";

export default function WebsiteSetup() {
  return (
    <EcommercePage
      section={WEBSITE_SECTION}
      path="/website"
      title={{ text: "Website setup services that get your business online the right way", short: "Website Setup" }}
      subtitle={<>From choosing your domain to launching a WordPress site or Shopify store, and keeping it healthy afterward, we <strong>handle every step of your website setup</strong> so you can focus on running your business.</>}
      primary={{ label: "Start my website", to: WEBSITE_LINKS.start("website") }}
      secondary={{ label: "WordPress or Shopify?", href: "#ws-picker" }}
      visual={<SiteBuildVisual />}
      highlights={[
        { icon: <Globe size={16} />, text: "Domain & hosting" },
        { icon: <LayoutTemplate size={16} />, text: "WordPress" },
        { icon: <ShoppingBag size={16} />, text: "Shopify" },
        { icon: <Wrench size={16} />, text: "Ongoing maintenance" },
      ]}
      overview={{
        title: "A professional website, without the technical headaches",
        body: [
          <>Your website is often the first impression customers have of your business. It needs to look professional, load quickly, work perfectly on phones, show up in search results and stay secure. But getting there involves a long list of technical decisions: which domain to buy, where to host it, which platform to build on, how to configure email, SSL and backups, and who will keep it all updated.</>,
          <>Our website setup services take care of those decisions for you. We start with the foundations, <Link to="/website/domain-hosting">domain registration, hosting, SSL and business email</Link>, then build your site on the platform that fits your goals. For service businesses, blogs and content-rich sites, that's usually a <Link to="/website/wordpress">WordPress website</Link>. For businesses focused on selling products, it's often a <Link to="/website/shopify">Shopify store</Link>. Either way, you get a mobile-friendly, search-ready site that's easy for you to update.</>,
          <>Launch day is just the beginning. Websites need regular updates, backups and security monitoring to stay fast and safe, so our <Link to="/website/maintenance">website maintenance plans</Link> keep everything running smoothly. Selling online? Pair your site with our <Link to="/ecommerce">ecommerce solutions</Link> for product listings, checkout, shipping and marketplaces.</>,
        ],
        glance: {
          title: "Why work with us",
          items: [
            "One team from domain to launch and beyond",
            "Platform advice based on your goals, not ours",
            "Mobile-friendly, fast and search-ready builds",
            "Training so you can update your own site",
            "Ongoing maintenance and support available",
          ],
        },
      }}
      services={{
        title: "Our website setup services",
        subtitle: "Choose the service you need, or combine them for a complete website launch.",
        cols: 2,
        items: [
          { icon: <Globe size={24} />, title: "Domain & Hosting Setup", text: "The right domain name, reliable hosting, DNS, SSL certificates and professional business email.", to: "/website/domain-hosting" },
          { icon: <LayoutTemplate size={24} />, title: "WordPress Setup", text: "A fast, secure WordPress website with a custom-styled theme, essential plugins and SEO basics.", to: "/website/wordpress" },
          { icon: <ShoppingBag size={24} />, title: "Shopify Setup", text: "A ready-to-sell Shopify store with theme, products, payments, shipping and taxes configured.", to: "/website/shopify" },
          { icon: <Wrench size={24} />, title: "Website Maintenance", text: "Updates, backups, security monitoring, uptime checks and small content edits every month.", to: "/website/maintenance" },
        ],
      }}
      steps={{
        subtitle: "A simple, transparent process from first call to launch day.",
        items: [
          { icon: <Search size={22} />, title: "Discover", text: "Your business, audience and goals." },
          { icon: <PenTool size={22} />, title: "Plan", text: "Platform, pages, design and content." },
          { icon: <Wrench size={22} />, title: "Build", text: "Set up, design and configure your site." },
          { icon: <Rocket size={22} />, title: "Launch & support", text: "Test, go live, then keep it healthy." },
        ],
      }}
      benefits={{
        title: "What a professionally set up website gives you",
        items: [
          { icon: <ShieldCheck size={20} />, title: "Credibility", text: "A site customers trust." },
          { icon: <Smartphone size={20} />, title: "Mobile-friendly", text: "Looks great on every screen." },
          { icon: <Gauge size={20} />, title: "Fast loading", text: "Visitors don't wait around." },
          { icon: <TrendingUp size={20} />, title: "Search ready", text: "SEO basics built in." },
          { icon: <Clock size={20} />, title: "Time saved", text: "No learning curve for you." },
          { icon: <LifeBuoy size={20} />, title: "Ongoing support", text: "Help when you need it." },
        ],
      }}
      tools={{
        title: "Platforms and tools we work with",
        items: [
          { icon: <LayoutTemplate size={20} />, title: "WordPress", text: "Flexible, content-friendly sites." },
          { icon: <ShoppingBag size={20} />, title: "Shopify", text: "All-in-one online stores." },
          { icon: <Code2 size={20} />, title: "WooCommerce", text: "Stores built on WordPress." },
          { icon: <Server size={20} />, title: "Domains & hosting", text: "Trusted registrars and hosts." },
          { icon: <Mail size={20} />, title: "Business email", text: "Professional email workspaces." },
          { icon: <BarChart3 size={20} />, title: "Analytics & search", text: "Traffic and search insights." },
        ],
      }}
      faqs={[
        ["What's included in website setup?", "Depending on your needs, website setup can include domain registration, hosting, SSL, business email, platform installation, theme design, core pages, contact forms, SEO basics, analytics and launch testing. We tailor the package to your business."],
        ["Should I use WordPress or Shopify?", "Shopify is usually best when selling products is your main goal, because payments, inventory and shipping are built in and hosting is handled for you. WordPress is often better for service businesses, blogs and sites that need flexible content or custom features. Try our quick picker above."],
        ["How long does it take to set up a website?", "A simple business website can be ready relatively quickly once we have your content, while larger sites and online stores take longer. Most delays come from waiting on content like text and photos, so we'll give you a clear checklist upfront."],
        ["Will I be able to update my website myself?", "Yes. Both WordPress and Shopify let you edit text, images and products without coding. We'll show you how and provide a short guide after launch."],
        ["Do I own my website and domain?", "Yes. We register your domain and accounts in your business's name, so you keep full ownership and control, even if you stop working with us."],
      ]}
      cta={{ title: "Ready to launch a website that works for your business?" }}
    >
      <Section id="ws-picker" tone="soft" title="WordPress or Shopify? Find your fit" subtitle="Tick what matters to you and see which platform suits your business best.">
        <PlatformPicker />
      </Section>

      <Section title="What a typical website project looks like" subtitle="Timelines depend on size and content. Here's the usual shape of the work.">
        <Timeline
          items={[
            { when: "Step 1", title: "Discovery call", text: "Goals, audience, pages and must-have features.", icon: <ClipboardList size={18} /> },
            { when: "Step 2", title: "Foundations", text: "Domain, hosting, SSL and business email.", icon: <Globe size={18} /> },
            { when: "Step 3", title: "Design & build", text: "Theme, pages, content and features.", icon: <Palette size={18} /> },
            { when: "Step 4", title: "Test", text: "Mobile, speed, forms and SEO checks.", icon: <TestTube2 size={18} /> },
            { when: "Step 5", title: "Launch & train", text: "Go live and learn to edit your site.", icon: <Rocket size={18} /> },
          ]}
        />
      </Section>
    </EcommercePage>
  );
}
