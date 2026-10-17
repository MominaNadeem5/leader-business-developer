import { Link } from "react-router-dom";
import {
  Mail, PenTool, QrCode, KeyRound, Users, Search, Wrench, Rocket, BadgeCheck, ShieldCheck, Share2, Leaf, RefreshCw,
  Inbox, Smartphone, Nfc, Calendar, BarChart3, Globe, Link2,
} from "lucide-react";
import { Reveal, Section, CompareTable } from "../../components/service";
import EcommercePage from "../ecommerce/EcommercePage";
import { EmailCardVisual } from "./BrandingVisual";
import { SignatureBuilder } from "./BrandingWidgets";
import { BRANDING_LINKS, BRANDING_SECTION } from "./services";
import "../website/Website.css";
import "./Branding.css";

export default function EmailDigitalCards() {
  return (
    <EcommercePage
      section={BRANDING_SECTION}
      path="/branding/email-digital-cards"
      title={{ text: "Business email & digital business cards that make every contact count", short: "Business Email & Digital Cards" }}
      subtitle={<>We set up <strong>professional email on your own domain, branded email signatures and digital business cards</strong> you can share with a tap, a link or a QR code.</>}
      primary={{ label: "Set up my email & cards", to: BRANDING_LINKS.start("email-digital-cards") }}
      secondary={{ label: "Preview a signature", href: "#br-signature" }}
      visual={<EmailCardVisual />}
      highlights={[
        { icon: <Mail size={16} />, text: "Email on your domain" },
        { icon: <PenTool size={16} />, text: "Branded signatures" },
        { icon: <QrCode size={16} />, text: "Digital business cards" },
        { icon: <ShieldCheck size={16} />, text: "Inbox-ready setup" },
      ]}
      overview={{
        title: "Look professional in every inbox and every introduction",
        body: [
          <>An email address like you@yourbusiness.com tells customers you're a real, established business. A free email address can make the same business look small or temporary, and some customers won't trust it at all. The same goes for how you share your details: a polished signature and an easy way to save your contact make a strong first impression.</>,
          <>Our business email service sets up professional email accounts on your own domain with a reputable email provider. We configure the technical records, SPF, DKIM and DMARC, that help your messages land in inboxes instead of spam, set up shared addresses like hello@ or support@, and move your existing emails and contacts across. Then we design a branded email signature for your team that looks right in popular email apps.</>,
          <>To round it off, we create digital business cards: a mobile-friendly card with your photo, contact details, links and a QR code. Share it from your phone, add it to your signature, or tap it with an NFC card at events, and update it anytime without reprinting. Don't have a domain yet? Start with our <Link to="/website/domain-hosting">domain and hosting setup</Link>. For a matching look, add <Link to="/branding/logo-design">logo and visual design</Link>.</>,
        ],
        glance: {
          title: "What's included",
          items: [
            "Business email accounts on your domain",
            "SPF, DKIM and DMARC configured",
            "Shared inboxes and aliases",
            "Email and contact migration",
            "Branded email signatures",
            "Digital business cards with QR codes",
          ],
        },
      }}
      services={{
        title: "Our business email & digital card services",
        subtitle: "Professional communication tools, set up properly from day one.",
        items: [
          { icon: <Mail size={24} />, title: "Business email setup", text: "Email accounts on your own domain with a trusted provider, configured on all your devices." },
          { icon: <KeyRound size={24} />, title: "Email authentication", text: "SPF, DKIM and DMARC records that improve deliverability and help prevent spoofing." },
          { icon: <Users size={24} />, title: "Shared inboxes & aliases", text: "Addresses like hello@, sales@ and support@, routed to the right people." },
          { icon: <RefreshCw size={24} />, title: "Migration", text: "Move existing emails, contacts and calendars from your old account without losing anything." },
          { icon: <PenTool size={24} />, title: "Email signatures", text: "Branded signatures with your logo, links and contact details for your whole team." },
          { icon: <QrCode size={24} />, title: "Digital business cards", text: "Shareable cards with a link and QR code, and optional NFC cards for tap-to-share." },
        ],
      }}
      steps={{
        items: [
          { icon: <Search size={22} />, title: "Review", text: "Domain, team and current email." },
          { icon: <Wrench size={22} />, title: "Set up", text: "Accounts, records and devices." },
          { icon: <PenTool size={22} />, title: "Design", text: "Signatures and digital cards." },
          { icon: <Rocket size={22} />, title: "Go live", text: "Migrate, test and hand over." },
        ],
      }}
      benefits={{
        title: "Why it's worth doing properly",
        items: [
          { icon: <BadgeCheck size={20} />, title: "Credibility", text: "A professional address." },
          { icon: <Inbox size={20} />, title: "Deliverability", text: "Emails that reach the inbox." },
          { icon: <ShieldCheck size={20} />, title: "Security", text: "Protection from spoofing." },
          { icon: <Share2 size={20} />, title: "Easy sharing", text: "Tap, scan or send a link." },
          { icon: <RefreshCw size={20} />, title: "Always current", text: "Update cards without reprinting." },
          { icon: <Leaf size={20} />, title: "Less waste", text: "Fewer printed cards." },
        ],
      }}
      tools={{
        title: "What your digital card can include",
        items: [
          { icon: <Smartphone size={20} />, title: "Save to contacts", text: "One tap adds you to their phone." },
          { icon: <QrCode size={20} />, title: "QR code", text: "Scan from print, slides or screens." },
          { icon: <Nfc size={20} />, title: "NFC tap", text: "Optional tap-to-share cards." },
          { icon: <Link2 size={20} />, title: "Links", text: "Website, social and reviews." },
          { icon: <Calendar size={20} />, title: "Booking link", text: "Let contacts schedule a call." },
          { icon: <BarChart3 size={20} />, title: "Views & saves", text: "See who's engaging (where supported)." },
        ],
      }}
      checklist={{
        title: "What to have ready",
        items: [
          "Your domain name and registrar login",
          "A list of people who need email addresses",
          "Any shared addresses you want (hello@, sales@)",
          "Login for your current email, if migrating",
          "Your logo, and team photos for cards",
          "Links to include: website, social, booking",
        ],
      }}
      faqs={[
        ["Why do I need email on my own domain?", "It looks more professional, builds trust with customers, keeps your brand in front of everyone you email, and means you own the address. If you change providers later, your email address stays the same."],
        ["What are SPF, DKIM and DMARC?", "They're DNS records that prove your emails really come from your business. Major email providers increasingly expect them, and setting them up properly improves deliverability and helps stop scammers from sending email that pretends to be you."],
        ["Can you move my existing emails?", "Yes. We migrate your existing emails, contacts and calendars from your old account where the provider allows it, and plan the switch to avoid missing messages."],
        ["What is a digital business card?", "It's a mobile-friendly page with your contact details, photo, links and a button to save your contact. You can share it with a link, a QR code or an NFC card, and update it anytime."],
        ["Will my email signature work in every email app?", "We build signatures to display well in popular email apps on desktop and mobile. Some apps handle images differently, so we test across common ones and keep the design simple and reliable."],
      ]}
      cta={{ title: "Make every email and introduction look professional" }}
    >
      <Section id="br-signature" tone="soft" title="Preview your branded email signature" subtitle="Try your details and a color theme to see how a professional signature looks.">
        <SignatureBuilder />
      </Section>

      <Section title="Free email vs. business email" subtitle="Why a domain-based address is worth it.">
        <Reveal>
          <CompareTable
            columns={["", "Free email address", "Business email on your domain"]}
            rows={[
              ["Example", "brightleafbakery@freemail.com", "jordan@brightleaf.com"],
              ["Looks professional", false, true],
              ["Promotes your brand", false, true],
              ["You own the address", false, true],
              ["Shared inboxes and aliases", "Limited", true],
              ["Team accounts managed centrally", false, true],
            ]}
            highlight={2}
          />
        </Reveal>
        <p className="mc-small"><Globe size={13} style={{ verticalAlign: "-2px" }} /> Example addresses are illustrative. Business email requires a domain and a paid plan with an email provider.</p>
      </Section>
    </EcommercePage>
  );
}
