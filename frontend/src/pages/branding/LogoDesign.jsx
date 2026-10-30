import { Link } from "react-router-dom";
import {
  PenTool, Palette, Type, FileText, Layers, Search, Wrench, Rocket, Eye, BadgeCheck, Sparkles, Repeat, Maximize2,
  Award, Image, Printer, Monitor, Smartphone, Shapes, ClipboardList, RefreshCw,
} from "lucide-react";
import { Reveal, Section, CompareTable, Timeline } from "../../components/service";
import EcommercePage from "../ecommerce/EcommercePage";
import { LogoVisual } from "./BrandingVisual";
import { BRANDING_LINKS, BRANDING_SECTION } from "./services";
import "../website/Website.css";
import "./Branding.css";

export default function LogoDesign() {
  return (
    <EcommercePage
      section={BRANDING_SECTION}
      path="/branding/logo-design"
      title={{ text: "Logo & visual design that makes your brand memorable", short: "Logo & Visual Design" }}
      subtitle={<>We design <strong>an original logo, color palette and typography</strong> that capture what makes your business different, and deliver them in every file format you'll need.</>}
      primary={{ label: "Design my logo", to: BRANDING_LINKS.start("logo-design") }}
      secondary={{ label: "Types of logos", href: "#br-types" }}
      visual={<LogoVisual />}
      highlights={[
        { icon: <PenTool size={16} />, text: "Original logo concepts" },
        { icon: <Palette size={16} />, text: "Color palette" },
        { icon: <Type size={16} />, text: "Typography" },
        { icon: <FileText size={16} />, text: "Brand style guide" },
      ]}
      overview={{
        title: "More than a logo: a visual identity you can use everywhere",
        body: [
          <>Your logo is the face of your business. It appears on your website, social profiles, invoices, packaging, signage and every ad you run. A strong logo is simple, distinctive and works just as well as a tiny social icon as it does on a storefront sign. A weak one, or one made from a generic template, makes even a great business look temporary.</>,
          <>Our logo and visual design service starts with understanding your business, audience and competitors. We create original logo concepts, refine your favorite through revision rounds, and build a complete visual identity around it: a color palette, font pairings and simple rules for using your logo correctly. You'll get everything in a short brand style guide, so anyone creating materials for you stays on-brand.</>,
          <>We deliver your logo in full-color, one-color and reversed versions, in vector and web-ready formats, sized for print, web and social media. Next, put it to work with <Link to="/branding/profile-optimization">optimized online profiles</Link> and <Link to="/branding/email-digital-cards">branded email signatures and digital cards</Link>. Planning to protect it? Our <Link to="/business/trademark">trademark registration</Link> service can help.</>,
        ],
        glance: {
          title: "What's included",
          items: [
            "Discovery questionnaire and research",
            "Original logo concepts",
            "Revision rounds on your chosen design",
            "Color palette and font pairings",
            "Brand style guide (PDF)",
            "Full file package for print and web",
          ],
        },
      }}
      services={{
        title: "Our logo & visual design services",
        subtitle: "Everything you need for a polished, consistent look.",
        items: [
          { icon: <PenTool size={24} />, title: "Custom logo design", text: "Original concepts designed from scratch for your business, never templates or stock icons." },
          { icon: <RefreshCw size={24} />, title: "Logo refresh", text: "Modernize an existing logo while keeping the recognition you've already built." },
          { icon: <Palette size={24} />, title: "Color palette", text: "Primary and supporting colors with exact codes for print and screen." },
          { icon: <Type size={24} />, title: "Typography", text: "Heading and body font pairings that suit your brand and are easy to read." },
          { icon: <FileText size={24} />, title: "Brand style guide", text: "A simple reference for logo use, colors, fonts and spacing." },
          { icon: <Image size={24} />, title: "Brand assets", text: "Social profile images, covers, favicons and templates in your new look." },
        ],
      }}
      steps={{
        items: [
          { icon: <Search size={22} />, title: "Discover", text: "Your story, audience and style." },
          { icon: <PenTool size={22} />, title: "Concept", text: "Original logo directions." },
          { icon: <Wrench size={22} />, title: "Refine", text: "Revisions on your favorite." },
          { icon: <Rocket size={22} />, title: "Deliver", text: "Files and style guide." },
        ],
      }}
      benefits={{
        title: "What good design does for your business",
        items: [
          { icon: <Eye size={20} />, title: "Memorable", text: "Customers recognize you." },
          { icon: <BadgeCheck size={20} />, title: "Professional", text: "Look established instantly." },
          { icon: <Sparkles size={20} />, title: "Distinctive", text: "Stand out from competitors." },
          { icon: <Repeat size={20} />, title: "Consistent", text: "Same look on every channel." },
          { icon: <Maximize2 size={20} />, title: "Scalable", text: "Sharp from favicon to sign." },
          { icon: <Award size={20} />, title: "Yours", text: "Full rights to final files." },
        ],
      }}
      tools={{
        title: "File formats you'll receive",
        items: [
          { icon: <Layers size={20} />, title: "Vector (SVG, EPS, PDF)", text: "Scales to any size." },
          { icon: <Image size={20} />, title: "PNG with transparency", text: "For web and documents." },
          { icon: <Printer size={20} />, title: "Print-ready (CMYK)", text: "For cards, signs and packaging." },
          { icon: <Monitor size={20} />, title: "Web-ready (RGB)", text: "For websites and email." },
          { icon: <Smartphone size={20} />, title: "Social sizes", text: "Profile icons and covers." },
          { icon: <Shapes size={20} />, title: "Logo variations", text: "Full color, one color, reversed." },
        ],
      }}
      checklist={{
        title: "What to have ready",
        items: [
          "Your business name and any tagline",
          "A short description of what you do and who for",
          "Three words you want your brand to feel like",
          "A few logos or brands you like (and dislike)",
          "Colors you love or want to avoid",
          "Where your logo will be used most",
        ],
      }}
      faqs={[
        ["How many logo concepts will I get?", "Packages typically include several original concepts to choose from, followed by revision rounds on your favorite. We'll confirm exactly what's included before we start."],
        ["Do I own the rights to my logo?", "Yes. Once the project is complete and paid, you receive full rights to your final logo files. We create original artwork rather than using templates or stock icons, which matters if you plan to trademark it."],
        ["What's a brand style guide?", "It's a short document that explains how to use your logo, which colors and fonts to use, and how much space to leave around the logo. It keeps your brand consistent, no matter who creates your materials."],
        ["Can you redesign my existing logo?", "Yes. A logo refresh modernizes your design while keeping the elements customers already recognize, which is often a better choice than starting over."],
        ["Should I trademark my logo?", "If your logo is important to your business, it's worth considering. We recommend a trademark search before finalizing, and our trademark team can handle registration once the design is ready."],
      ]}
      cta={{ title: "Get a logo you'll be proud to put everywhere" }}
    >
      <Section id="br-types" tone="soft" title="Which type of logo suits your business?" subtitle="A quick guide to the most common logo styles. We'll recommend the best fit for you.">
        <Reveal>
          <CompareTable
            columns={["", "Wordmark", "Symbol + name", "Emblem", "Monogram"]}
            rows={[
              ["What it is", "Your name in custom type", "An icon beside your name", "Name inside a badge or shape", "Your initials, stylized"],
              ["Best for", "Short, distinctive names", "Most small businesses", "Traditional or local brands", "Long names, professional firms"],
              ["Works at small sizes", "Sometimes", true, false, true],
              ["Icon for social profiles", false, true, "Sometimes", true],
              ["Builds name recognition", true, true, true, false],
            ]}
            highlight={2}
          />
        </Reveal>
        <p className="mc-small">A general guide. Many brands use a combination, for example a full logo plus a simpler icon for small spaces, and we design both where it helps.</p>
      </Section>

      <Section title="How a logo project unfolds" subtitle="A typical path from first questionnaire to final files.">
        <Timeline
          items={[
            { when: "Step 1", title: "Brief", text: "Questionnaire and competitor research.", icon: <ClipboardList size={18} /> },
            { when: "Step 2", title: "Concepts", text: "Original directions presented.", icon: <PenTool size={18} /> },
            { when: "Step 3", title: "Revisions", text: "Refine your chosen concept.", icon: <RefreshCw size={18} /> },
            { when: "Step 4", title: "Identity", text: "Colors, fonts and style guide.", icon: <Palette size={18} /> },
            { when: "Step 5", title: "Delivery", text: "Every file format, ready to use.", icon: <Layers size={18} /> },
          ]}
        />
      </Section>
    </EcommercePage>
  );
}
