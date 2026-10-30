import { Link } from "react-router-dom";
import {
  RefreshCw, HardDrive, ShieldCheck, Activity, Gauge, Edit3, Search, PenTool, Wrench, Rocket, Clock, TrendingUp,
  Lock, LifeBuoy, BarChart3, Server, Zap, Star,
} from "lucide-react";
import { Section } from "../../components/service";
import { OptionCards } from "../merchant/MerchantPage";
import EcommercePage from "../ecommerce/EcommercePage";
import { MaintenanceVisual } from "./WebsiteVisual";
import { HealthCheck } from "./WebsiteWidgets";
import { WEBSITE_LINKS, WEBSITE_SECTION } from "./services";
import "./Website.css";

export default function WebsiteMaintenance() {
  return (
    <EcommercePage
      section={WEBSITE_SECTION}
      path="/website/maintenance"
      title={{ text: "Website maintenance that keeps your site fast, secure and up to date", short: "Website Maintenance" }}
      subtitle={<>We handle the <strong>updates, backups, security monitoring, uptime checks and small edits</strong> your website needs every month, so you can stop worrying about it and focus on your business.</>}
      primary={{ label: "Get a maintenance plan", to: WEBSITE_LINKS.start("maintenance") }}
      secondary={{ label: "Check your site's health", href: "#ws-health" }}
      visual={<MaintenanceVisual />}
      highlights={[
        { icon: <RefreshCw size={16} />, text: "Regular updates" },
        { icon: <HardDrive size={16} />, text: "Off-site backups" },
        { icon: <ShieldCheck size={16} />, text: "Security monitoring" },
        { icon: <Activity size={16} />, text: "Uptime checks" },
      ]}
      overview={{
        title: "Your website needs care after launch, and we've got it covered",
        body: [
          <>A website isn't a one-time project. Content management systems like WordPress, along with themes and plugins, release frequent updates to fix bugs and close security holes. Skip them and your site becomes slower, buggier and an easy target for hackers. Without backups, a single bad update or attack can wipe out years of work. And if your site goes down, you may not find out until customers tell you.</>,
          <>Our website maintenance services take that weight off your shoulders. Every month, we safely update your software, run automatic off-site backups, scan for malware and suspicious activity, and monitor your site around the clock for downtime. We keep an eye on speed, renew SSL certificates, fix broken links and make small content updates when you need them. You get a simple monthly report showing what we did and how your site is performing.</>,
          <>Maintenance works best on a solid foundation, so we can also review your <Link to="/website/domain-hosting">domain and hosting setup</Link>. We maintain <Link to="/website/wordpress">WordPress websites</Link>, WooCommerce stores and <Link to="/website/shopify">Shopify stores</Link>, where we focus on apps, theme updates and content. Running an online store? Our <Link to="/ecommerce">ecommerce solutions</Link> help you grow beyond the website.</>,
        ],
        glance: {
          title: "What's included",
          items: [
            "Core, theme and plugin updates",
            "Automatic off-site backups",
            "Malware scanning and security hardening",
            "24/7 uptime monitoring and alerts",
            "Speed checks and optimization",
            "Content edits and a monthly report",
          ],
        },
      }}
      services={{
        title: "Our website maintenance services",
        subtitle: "Everything your website needs to stay healthy, month after month.",
        items: [
          { icon: <RefreshCw size={24} />, title: "Software updates", text: "Core, theme and plugin updates tested and applied safely, with a backup taken first." },
          { icon: <HardDrive size={24} />, title: "Backups & restores", text: "Automatic backups stored off-site, with fast restores if anything goes wrong." },
          { icon: <ShieldCheck size={24} />, title: "Security monitoring", text: "Malware scans, firewall rules and login protection to keep attackers out." },
          { icon: <Activity size={24} />, title: "Uptime monitoring", text: "Round-the-clock checks with alerts, so we know about downtime before your customers do." },
          { icon: <Gauge size={24} />, title: "Performance tuning", text: "Speed checks, image optimization and caching to keep pages loading quickly." },
          { icon: <Edit3 size={24} />, title: "Content updates", text: "Small edits to text, images, prices or pages, without waiting or learning code." },
        ],
      }}
      steps={{
        items: [
          { icon: <Search size={22} />, title: "Audit", text: "Health, security and speed review." },
          { icon: <PenTool size={22} />, title: "Fix", text: "Resolve urgent issues first." },
          { icon: <Wrench size={22} />, title: "Maintain", text: "Monthly updates, backups and checks." },
          { icon: <Rocket size={22} />, title: "Report", text: "Clear monthly summary for you." },
        ],
      }}
      benefits={{
        title: "Why regular maintenance matters",
        items: [
          { icon: <Lock size={20} />, title: "Stronger security", text: "Fewer vulnerabilities." },
          { icon: <Zap size={20} />, title: "Faster site", text: "Better experience and SEO." },
          { icon: <HardDrive size={20} />, title: "Peace of mind", text: "Backups if anything breaks." },
          { icon: <Clock size={20} />, title: "Time saved", text: "No more DIY updates." },
          { icon: <TrendingUp size={20} />, title: "Protected rankings", text: "Healthy sites rank better." },
          { icon: <LifeBuoy size={20} />, title: "Expert on call", text: "Help when you need it." },
        ],
      }}
      tools={{
        title: "Tools we use to look after your site",
        items: [
          { icon: <Activity size={20} />, title: "Uptime monitors", text: "24/7 availability checks." },
          { icon: <HardDrive size={20} />, title: "Backup systems", text: "Off-site, versioned backups." },
          { icon: <ShieldCheck size={20} />, title: "Security scanners", text: "Malware and vulnerability scans." },
          { icon: <Gauge size={20} />, title: "Speed testing", text: "Performance and Core Web Vitals." },
          { icon: <Server size={20} />, title: "Staging sites", text: "Test updates before going live." },
          { icon: <BarChart3 size={20} />, title: "Reporting", text: "Monthly health summaries." },
        ],
      }}
      faqs={[
        ["What does website maintenance include?", "Typically software updates, backups, security scans, uptime monitoring, performance checks and small content edits. Our plans also include a monthly report so you can see exactly what was done."],
        ["How often should a website be updated?", "Software updates are released often, so most sites benefit from checks at least weekly, with security updates applied as soon as they're tested. Content should be reviewed regularly so information stays accurate."],
        ["What happens if my site gets hacked?", "With regular off-site backups and monitoring, we can usually detect problems quickly, clean up the site and restore a safe version. We then close the security gap that allowed the attack."],
        ["Do you maintain websites you didn't build?", "Yes. We start with an audit of your current site to understand its setup, fix any urgent issues, and then bring it onto a regular maintenance schedule."],
        ["Do Shopify stores need maintenance?", "Shopify handles hosting and core security, but stores still benefit from theme updates, app reviews, broken link checks, speed tuning and content updates. Our plans adapt to your platform."],
      ]}
      cta={{ title: "Stop worrying about your website" }}
    >
      <Section id="ws-health" title="How healthy is your website?" subtitle="Take this one-minute check to see where your site stands.">
        <HealthCheck />
      </Section>

      <Section tone="gray" title="Maintenance plans for every stage" subtitle="Pick the level of care that fits your site. We'll tailor the details and pricing to you.">
        <OptionCards
          ctaTo={WEBSITE_LINKS.start("maintenance")}
          ctaLabel="Choose this plan"
          items={[
            { name: "Essential", icon: <ShieldCheck size={22} />, best: "Simple brochure websites", text: "The core care every website needs to stay safe.", points: ["Monthly updates", "Weekly off-site backups", "Uptime monitoring", "Monthly report"] },
            { name: "Growth", icon: <TrendingUp size={22} />, badge: "Most popular", featured: true, best: "Active business websites", text: "More frequent care plus time for content updates.", points: ["Weekly updates", "Daily off-site backups", "Security scanning & firewall", "Content edit time each month"] },
            { name: "Priority", icon: <Star size={22} />, best: "Online stores and busy sites", text: "Our highest level of care with faster response.", points: ["Updates tested on staging", "Real-time backups where supported", "Priority support response", "Speed optimization reviews"] },
          ]}
        />
        <p className="mc-small">Every plan starts with a site audit, and plans adapt to WordPress, WooCommerce and Shopify.</p>
      </Section>
    </EcommercePage>
  );
}
