import { Link } from "react-router-dom";
import {
  Globe, Server, Lock, Mail, Network, ArrowRightLeft, Search, PenTool, Wrench, Rocket, ShieldCheck, Gauge, Clock,
  BadgeCheck, TrendingUp, Cloud, KeyRound,
} from "lucide-react";
import { Reveal, Section, CompareTable } from "../../components/service";
import EcommercePage from "../ecommerce/EcommercePage";
import { DomainVisual } from "./WebsiteVisual";
import { DomainChecker } from "./WebsiteWidgets";
import { WEBSITE_LINKS, WEBSITE_SECTION } from "./services";
import "./Website.css";

export default function DomainHosting() {
  return (
    <EcommercePage
      section={WEBSITE_SECTION}
      path="/website/domain-hosting"
      title={{ text: "Domain & hosting setup for a fast, secure and professional website", short: "Domain & Hosting Setup" }}
      subtitle={<>We help you <strong>choose and register the right domain, pick reliable hosting, and configure DNS, SSL and business email</strong>, so your website and inbox are built on solid foundations.</>}
      primary={{ label: "Set up my domain & hosting", to: WEBSITE_LINKS.start("domain-hosting") }}
      secondary={{ label: "Test a domain name", href: "#ws-domain" }}
      visual={<DomainVisual />}
      highlights={[
        { icon: <Globe size={16} />, text: "Domain registration" },
        { icon: <Server size={16} />, text: "Reliable hosting" },
        { icon: <Lock size={16} />, text: "SSL certificates" },
        { icon: <Mail size={16} />, text: "Business email" },
      ]}
      overview={{
        title: "The foundation every great website is built on",
        body: [
          <>Before anyone can visit your website, you need two things: a domain name (your address on the internet, like yourbusiness.com) and web hosting (the servers where your website lives). The choices you make here affect your brand, your site's speed and security, and how easily you can grow later. They're also where a lot of small businesses get stuck, between confusing hosting plans, DNS records and email settings.</>,
          <>Our domain and hosting setup service makes it simple. We help you choose a memorable, brandable domain and register it in your name, with privacy protection where available. We recommend hosting that matches your platform, traffic and budget, from managed WordPress hosting to cloud options. Then we handle the technical setup: DNS records, an SSL certificate so your site loads securely over https, redirects, and professional business email like you@yourbusiness.com that lands in inboxes, not spam folders.</>,
          <>Already have a domain or site somewhere else? We'll transfer or migrate it carefully to avoid downtime. With your foundations in place, you're ready for a <Link to="/website/wordpress">WordPress website</Link> or a <Link to="/website/shopify">Shopify store</Link>, and our <Link to="/website/maintenance">maintenance plans</Link> keep renewals, SSL and backups on track. Protecting your brand name too? See our <Link to="/business/trademark-search">trademark search</Link> service.</>,
        ],
        glance: {
          title: "What's included",
          items: [
            "Domain name advice and registration",
            "Hosting recommendation and setup",
            "DNS configuration and redirects",
            "SSL certificate (https) setup",
            "Business email with spam protection",
            "Domain transfers and site migrations",
          ],
        },
      }}
      services={{
        title: "Our domain & hosting services",
        subtitle: "Everything your website and email need behind the scenes.",
        items: [
          { icon: <Globe size={24} />, title: "Domain selection & registration", text: "Find a short, memorable domain, register it in your business's name and enable privacy protection." },
          { icon: <Server size={24} />, title: "Hosting setup", text: "Hosting matched to your platform, traffic and budget, configured for speed and reliability." },
          { icon: <Network size={24} />, title: "DNS configuration", text: "A, CNAME, MX and TXT records set up correctly, so your site and email just work." },
          { icon: <Lock size={24} />, title: "SSL certificates", text: "Secure https on every page, which visitors and search engines expect." },
          { icon: <Mail size={24} />, title: "Professional business email", text: "Email on your own domain, with SPF, DKIM and DMARC records to help it reach the inbox." },
          { icon: <ArrowRightLeft size={24} />, title: "Transfers & migrations", text: "Move your domain, hosting or email to a better provider with minimal downtime." },
        ],
      }}
      steps={{
        items: [
          { icon: <Search size={22} />, title: "Review", text: "Your brand, platform and current setup." },
          { icon: <PenTool size={22} />, title: "Recommend", text: "Domain, hosting and email options." },
          { icon: <Wrench size={22} />, title: "Configure", text: "Register, point DNS, add SSL and email." },
          { icon: <Rocket size={22} />, title: "Verify", text: "Test site, email and security." },
        ],
      }}
      benefits={{
        title: "Why the right setup matters",
        items: [
          { icon: <BadgeCheck size={20} />, title: "Brand credibility", text: "A professional address and email." },
          { icon: <Gauge size={20} />, title: "Faster website", text: "Quality hosting loads quicker." },
          { icon: <ShieldCheck size={20} />, title: "Better security", text: "SSL and safe configuration." },
          { icon: <Mail size={20} />, title: "Reliable email", text: "Messages that reach the inbox." },
          { icon: <TrendingUp size={20} />, title: "Room to grow", text: "Hosting that scales with you." },
          { icon: <Clock size={20} />, title: "No missed renewals", text: "Your domain stays yours." },
        ],
      }}
      tools={{
        title: "Services and tools we configure",
        items: [
          { icon: <Globe size={20} />, title: "Domain registrars", text: "Trusted, transparent registrars." },
          { icon: <Server size={20} />, title: "Managed hosting", text: "Optimized for your platform." },
          { icon: <Cloud size={20} />, title: "Cloud hosting & CDN", text: "Speed for visitors everywhere." },
          { icon: <Lock size={20} />, title: "SSL certificates", text: "Free and premium options." },
          { icon: <Mail size={20} />, title: "Email workspaces", text: "Popular business email suites." },
          { icon: <KeyRound size={20} />, title: "Email authentication", text: "SPF, DKIM and DMARC." },
        ],
      }}
      checklist={{
        title: "What to have ready",
        items: [
          "Your business name and a few domain ideas",
          "Login details for any existing domain or hosting",
          "The platform you plan to use (or want advice on)",
          "Who needs an email address",
          "Rough idea of expected website traffic",
          "A payment method for registration and hosting",
        ],
      }}
      faqs={[
        ["What's the difference between a domain and hosting?", "Your domain is your website's address, like yourbusiness.com. Hosting is the server space where your website's files live. You need both, and they can come from the same company or different ones."],
        ["Which domain extension should I choose?", ".com is the most recognized and usually the best choice. If it's taken, alternatives like .co or .net can work, or an industry extension such as .shop. Keep it short, easy to spell and free of hyphens and numbers."],
        ["Do I need an SSL certificate?", "Yes. SSL encrypts the connection between your site and visitors and shows the padlock in the browser. Browsers warn visitors about sites without it, and search engines favor secure sites. Many hosts include a free certificate."],
        ["How long does DNS take to update?", "DNS changes often take effect within a few hours, but can take up to 48 hours to reach everyone worldwide. We plan changes carefully to keep your site and email running during the switch."],
        ["Can you move my existing website to new hosting?", "Yes. We migrate your files, database and email, test everything on the new host, and then switch DNS to minimize downtime."],
      ]}
      cta={{ title: "Build your website on a solid foundation" }}
    >
      <Section id="ws-domain" title="Test your domain name idea" subtitle="See how your name stacks up against domain naming best practices.">
        <DomainChecker />
      </Section>

      <Section tone="soft" title="Which type of hosting do you need?" subtitle="A quick guide to the most common hosting types.">
        <Reveal>
          <CompareTable
            columns={["", "Shared hosting", "Managed WordPress", "Cloud / VPS", "Hosted platform (e.g. Shopify)"]}
            rows={[
              ["Best for", "Small, simple sites", "Business WordPress sites", "High traffic or custom apps", "Online stores"],
              ["Speed & performance", "Basic", "Optimized", "High", "Handled for you"],
              ["Updates & security handled", false, "Mostly", false, true],
              ["Technical skill needed", "Low", "Low", "High", "Lowest"],
              ["Scales with traffic", "Limited", true, true, true],
            ]}
            highlight={2}
          />
        </Reveal>
        <p className="mc-small">A general guide. Features vary by provider and plan. We recommend the option that fits your site, not the most expensive one, and backups are a must on any plan.</p>
      </Section>
    </EcommercePage>
  );
}
