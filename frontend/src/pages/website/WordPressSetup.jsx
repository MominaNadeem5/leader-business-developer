import { Link } from "react-router-dom";
import {
  LayoutTemplate, Palette, Puzzle, Search, ShieldCheck, Gauge, HardDrive, PenTool, Wrench, Rocket, Smartphone,
  TrendingUp, Edit3, Layers, Users, Briefcase, Newspaper, Image, CalendarCheck, ShoppingCart, FileText, BarChart3,
  Mail, Lock,
} from "lucide-react";
import { Section, Explorer } from "../../components/service";
import EcommercePage from "../ecommerce/EcommercePage";
import { WordPressVisual } from "./WebsiteVisual";
import { WEBSITE_LINKS, WEBSITE_SECTION } from "./services";
import "./Website.css";

const siteTypes = [
  {
    id: "business", icon: <Briefcase size={18} />, label: "Business website",
    title: "A business or service website",
    text: "A professional site that explains what you do, builds trust and turns visitors into calls, emails and inquiries.",
    points: ["Home, About, Services and Contact pages", "Lead forms and click-to-call buttons", "Local SEO and Google Maps integration"],
  },
  {
    id: "blog", icon: <Newspaper size={18} />, label: "Blog or content site",
    title: "A blog or content-driven site",
    text: "WordPress started as a blogging platform and is still one of the best tools for publishing and organizing content.",
    points: ["Categories, tags and author pages", "SEO plugin and XML sitemaps", "Newsletter sign-up forms"],
  },
  {
    id: "portfolio", icon: <Image size={18} />, label: "Portfolio",
    title: "A portfolio or creative showcase",
    text: "Show off your work with beautiful galleries and case studies that load fast and look great on any screen.",
    points: ["Image galleries and case-study layouts", "Image compression for speed", "Inquiry and booking forms"],
  },
  {
    id: "booking", icon: <CalendarCheck size={18} />, label: "Bookings",
    title: "A site that takes bookings or appointments",
    text: "Let clients book, pay deposits and get reminders, all from your website.",
    points: ["Online booking calendar", "Payment or deposit collection", "Automatic confirmation emails"],
  },
  {
    id: "store", icon: <ShoppingCart size={18} />, label: "Online store",
    title: "A WordPress online store",
    text: "Add WooCommerce to sell products or services on WordPress while keeping full control over your site.",
    points: ["WooCommerce installed and configured", "Payments, taxes and shipping", "Product pages and checkout"],
  },
];

export default function WordPressSetup() {
  return (
    <EcommercePage
      section={WEBSITE_SECTION}
      path="/website/wordpress"
      title={{ text: "WordPress website setup that's fast, secure and easy to update", short: "WordPress Setup" }}
      subtitle={<>We build <strong>professional WordPress websites</strong> with the right hosting, a custom-styled theme, essential plugins, SEO basics and security, so you get a site you're proud of and can edit yourself.</>}
      primary={{ label: "Build my WordPress site", to: WEBSITE_LINKS.start("wordpress") }}
      secondary={{ label: "What can you build?", href: "#ws-types" }}
      visual={<WordPressVisual />}
      highlights={[
        { icon: <Palette size={16} />, text: "Custom-styled theme" },
        { icon: <Puzzle size={16} />, text: "Essential plugins" },
        { icon: <Search size={16} />, text: "SEO-ready" },
        { icon: <ShieldCheck size={16} />, text: "Secure & backed up" },
      ]}
      overview={{
        title: "The world's most popular website platform, set up properly",
        body: [
          <>WordPress powers a large share of all websites on the internet, from small business sites and blogs to large publishers. It's popular for good reason: it's flexible, search-engine friendly, backed by a huge ecosystem of themes and plugins, and you own your site completely. But that flexibility also means there are many ways to set it up badly, with slow themes, too many plugins, weak security and no backups.</>,
          <>Our WordPress website setup gives you all the benefits without the pitfalls. We install WordPress on quality hosting, choose and customize a lightweight theme to match your brand, and build your core pages with an easy-to-use editor. We add only the plugins you need, for SEO, forms, security, backups, caching and analytics, and configure them properly. Your site will be mobile-friendly, fast-loading and ready for search engines from day one.</>,
          <>Before launch, we test everything on desktop and mobile, then show you how to update pages, posts and images yourself. Need the basics first? Start with <Link to="/website/domain-hosting">domain and hosting setup</Link>. Want to sell online? WordPress with WooCommerce is a great option, or compare it with a <Link to="/website/shopify">Shopify store</Link>. After launch, our <Link to="/website/maintenance">WordPress maintenance plans</Link> keep your site updated, secure and backed up.</>,
        ],
        glance: {
          title: "What's included",
          items: [
            "WordPress installed on quality hosting",
            "Theme selected and styled to your brand",
            "Core pages built and ready to edit",
            "Essential plugins configured",
            "SEO, speed and security basics",
            "Training and a quick-start guide",
          ],
        },
      }}
      services={{
        title: "Our WordPress setup services",
        subtitle: "Everything it takes to launch a WordPress site that performs.",
        items: [
          { icon: <LayoutTemplate size={24} />, title: "Installation & configuration", text: "WordPress installed, settings optimized, permalinks set and unnecessary clutter removed." },
          { icon: <Palette size={24} />, title: "Theme setup & styling", text: "A lightweight, well-supported theme customized with your logo, colors and fonts." },
          { icon: <FileText size={24} />, title: "Pages & content", text: "Core pages built with a visual editor, using your content or our guidance." },
          { icon: <Puzzle size={24} />, title: "Essential plugins", text: "Carefully chosen plugins for SEO, forms, caching, analytics and more, without bloat." },
          { icon: <Search size={24} />, title: "SEO foundations", text: "Titles, meta descriptions, sitemaps, schema basics and search console setup." },
          { icon: <Lock size={24} />, title: "Security & backups", text: "Login protection, security hardening and automatic off-site backups." },
        ],
      }}
      steps={{
        items: [
          { icon: <Search size={22} />, title: "Discover", text: "Goals, pages and features you need." },
          { icon: <PenTool size={22} />, title: "Design", text: "Theme, layout and brand styling." },
          { icon: <Wrench size={22} />, title: "Build", text: "Pages, plugins, SEO and security." },
          { icon: <Rocket size={22} />, title: "Launch & train", text: "Test, go live and learn to edit." },
        ],
      }}
      benefits={{
        title: "Why choose WordPress",
        items: [
          { icon: <Edit3 size={20} />, title: "Easy to update", text: "Edit pages without code." },
          { icon: <Layers size={20} />, title: "Flexible", text: "Add features as you grow." },
          { icon: <TrendingUp size={20} />, title: "SEO friendly", text: "Great tools for search." },
          { icon: <Users size={20} />, title: "Huge community", text: "Themes, plugins and help." },
          { icon: <Smartphone size={20} />, title: "Mobile ready", text: "Responsive by design." },
          { icon: <HardDrive size={20} />, title: "You own it", text: "Your site, your content." },
        ],
      }}
      tools={{
        title: "Tools we use for WordPress builds",
        items: [
          { icon: <LayoutTemplate size={20} />, title: "Block editor & builders", text: "Visual, easy page editing." },
          { icon: <Search size={20} />, title: "SEO plugins", text: "Titles, sitemaps and schema." },
          { icon: <Gauge size={20} />, title: "Caching & CDN", text: "Faster page loads." },
          { icon: <ShieldCheck size={20} />, title: "Security plugins", text: "Firewall and login protection." },
          { icon: <Mail size={20} />, title: "Form builders", text: "Contact and lead forms." },
          { icon: <BarChart3 size={20} />, title: "Analytics", text: "Traffic and conversion tracking." },
        ],
      }}
      checklist={{
        title: "What to have ready",
        items: [
          "Your logo and brand colors",
          "Text for your main pages (or notes we can work from)",
          "Photos of your team, work or products",
          "A few websites you like the look of",
          "Domain and hosting logins, if you have them",
          "A list of must-have features (forms, bookings, etc.)",
        ],
      }}
      faqs={[
        ["Is WordPress good for small business websites?", "Yes. WordPress is flexible, SEO-friendly and easy to update, which makes it a popular choice for small businesses, service providers and blogs. With the right setup, it's fast and secure too."],
        ["What's the difference between WordPress.com and WordPress.org?", "WordPress.org is the free, open-source software you install on your own hosting, giving you full control. WordPress.com is a hosted service with plans that handle hosting for you but can limit customization. We usually recommend self-hosted WordPress for businesses."],
        ["How many plugins should my site have?", "As few as you need. Every plugin adds code to maintain, so we choose well-supported, reputable plugins that cover your needs without slowing your site or adding security risk."],
        ["Can I edit my WordPress site myself?", "Yes. We build your pages with an easy visual editor and show you how to update text, images, pages and blog posts. You'll also get a short guide for reference."],
        ["Does WordPress need maintenance?", "Yes. WordPress, themes and plugins release regular updates for features and security. Keeping them updated, backed up and monitored is essential, which is what our maintenance plans cover."],
      ]}
      cta={{ title: "Launch a WordPress site you'll love to use" }}
    >
      <Section id="ws-types" title="What kind of WordPress site do you need?" subtitle="Pick a type to see what we typically build and set up.">
        <Explorer items={siteTypes} />
      </Section>
    </EcommercePage>
  );
}
