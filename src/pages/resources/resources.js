import {
  Rocket, Scale, Type, ShieldCheck, Sparkles, SearchCheck, HeartPulse, Calculator, LifeBuoy, MessageCircleQuestion,
  CalendarClock, Mail,
} from "lucide-react";

/* Pages in the navbar's Resources menu (routes match Navbar.jsx). */
export const LEARN_GUIDES = [
  { path: "/resources/learn/start-business", title: "Starting Your First Business", icon: Rocket, minutes: 9, level: "Beginner", short: "A step-by-step roadmap from idea to open for business." },
  { path: "/resources/learn/llc-vs-corporation", title: "LLC or Corporation?", icon: Scale, minutes: 8, level: "Beginner", short: "Compare liability, taxes and paperwork to choose your structure." },
  { path: "/resources/learn/business-name", title: "Picking a Business Name", icon: Type, minutes: 7, level: "Beginner", short: "Create a memorable name that's legally clear and easy to find." },
  { path: "/resources/learn/compliance", title: "Staying Compliant", icon: ShieldCheck, minutes: 8, level: "Intermediate", short: "The filings, deadlines and records that keep you in good standing." },
];

export const FREE_TOOLS = [
  { path: "/resources/tools/name-generator", title: "Business Name Generator", icon: Sparkles, short: "Generate dozens of brandable name ideas from a few keywords.", time: "1 min" },
  { path: "/resources/tools/name-check", title: "Name Availability Check", icon: SearchCheck, short: "Check your name across state records, trademarks, domains and social.", time: "5 min" },
  { path: "/resources/tools/compliance-check", title: "Compliance Health Check", icon: HeartPulse, short: "Answer a few questions and get a compliance score and action plan.", time: "3 min" },
  { path: "/resources/tools/cost-calculator", title: "Startup Cost Calculator", icon: Calculator, short: "Estimate one-time costs, monthly expenses and how much runway you need.", time: "4 min" },
];

export const SUPPORT_LINKS = [
  { path: "/resources/support/help", title: "Help Center", icon: LifeBuoy, short: "Step-by-step answers for orders, filings, documents and accounts." },
  { path: "/resources/support/faqs", title: "FAQs", icon: MessageCircleQuestion, short: "Quick answers to the questions we hear most often." },
  { path: "/consultation", title: "Book a Consultation", icon: CalendarClock, short: "Request a free call with a business specialist at a time that suits you." },
  { path: "/contact", title: "Contact Us", icon: Mail, short: "Call, email or send us a message. We're happy to help." },
];

export const HUBS = {
  learn: { path: "/resources/learn", label: "Learn" },
  tools: { path: "/resources/tools", label: "Free Tools" },
  support: { path: "/resources/support", label: "Support" },
};

/* SEO metadata (title ≤ 60 chars, description ≤ 155 chars). */
export const RES_SEO = {
  "/resources/learn": {
    title: "Small Business Guides: Learn the Basics | Leader",
    description: "Free small business guides: starting your first business, LLC vs. corporation, picking a business name and staying compliant, in plain English.",
    keywords: ["small business guides", "how to start a business", "business basics", "entrepreneur resources", "business glossary"],
  },
  "/resources/learn/start-business": {
    title: "How to Start a Business: Step-by-Step Roadmap",
    description: "Starting your first business? Follow our step-by-step roadmap to validate your idea, choose a structure, register, get an EIN and launch with confidence.",
    keywords: ["how to start a business", "starting a small business", "business startup checklist", "steps to start a business", "first business"],
  },
  "/resources/learn/llc-vs-corporation": {
    title: "LLC vs. Corporation: Which Is Right for You?",
    description: "LLC or corporation? Compare liability protection, taxes, S corp elections, paperwork and investor appeal, then take our quick quiz to find your fit.",
    keywords: ["LLC vs corporation", "LLC or corporation", "S corp vs LLC", "C corporation taxes", "business structure comparison"],
  },
  "/resources/learn/business-name": {
    title: "How to Pick a Business Name (With Free Scorer)",
    description: "How to pick a business name that's memorable, available and legally safe. Naming styles, a free name scorer and the checks to run before you commit.",
    keywords: ["how to pick a business name", "business name ideas", "choosing a business name", "business naming tips", "trademark business name"],
  },
  "/resources/learn/compliance": {
    title: "Small Business Compliance Guide & Calendar",
    description: "Stay compliant all year: a month-by-month small business compliance calendar, key state and federal obligations, and what happens if you miss them.",
    keywords: ["small business compliance", "business compliance checklist", "tax calendar small business", "LLC compliance", "good standing"],
  },
  "/resources/tools": {
    title: "Free Business Tools: Names, Costs & Compliance",
    description: "Free small business tools: name generator, name availability checker, compliance health check and startup cost calculator. No sign-up required.",
    keywords: ["free business tools", "small business calculators", "business name tools", "startup tools", "compliance checker"],
  },
  "/resources/tools/name-generator": {
    title: "Free Business Name Generator | Leader Business",
    description: "Generate brandable business name ideas in seconds. Add keywords, pick your industry and style, save favorites and check availability. 100% free.",
    keywords: ["business name generator", "company name ideas", "brand name generator", "LLC name generator", "free name generator"],
  },
  "/resources/tools/name-check": {
    title: "Business Name Availability Check (Free Tool)",
    description: "Check if your business name is available: state records, federal trademarks, domain names and social handles, with direct links and a clear verdict.",
    keywords: ["business name availability", "check business name", "LLC name search", "trademark name check", "domain name check"],
  },
  "/resources/tools/compliance-check": {
    title: "Free Business Compliance Health Check",
    description: "Is your business compliant? Answer a few questions to get a compliance health score and a personalized action plan for state, tax and records duties.",
    keywords: ["compliance health check", "business compliance checklist", "LLC compliance check", "good standing check", "small business compliance"],
  },
  "/resources/tools/cost-calculator": {
    title: "Startup Cost Calculator: Estimate Your Budget",
    description: "Estimate how much it costs to start your business. Add one-time and monthly costs, pick a runway and see your total budget. Download as a spreadsheet.",
    keywords: ["startup cost calculator", "business startup costs", "how much to start a business", "startup budget", "small business costs"],
  },
  "/resources/support": {
    title: "Customer Support | Leader Business Developer",
    description: "Get help fast: browse the help center and FAQs, book a free consultation, or contact our team by phone or email. We're here to help your business.",
    keywords: ["customer support", "business help", "contact support", "consultation", "help center"],
  },
  "/resources/support/help": {
    title: "Help Center: Guides & Answers | Leader Business",
    description: "Search our help center for step-by-step answers on orders, LLC filings, EINs, registered agents, documents and your account. Get unstuck in minutes.",
    keywords: ["help center", "how to guides", "order status", "LLC filing help", "account help"],
  },
  "/resources/support/faqs": {
    title: "Frequently Asked Questions | Leader Business",
    description: "Answers to common questions about forming a business, EINs, compliance, banking, orders and working with Leader Business Developer.",
    keywords: ["business formation FAQs", "LLC questions", "EIN questions", "compliance FAQs", "frequently asked questions"],
  },
  "/consultation": {
    title: "Book a Free Business Consultation | Leader",
    description: "Book a free consultation with a business specialist. Pick a topic and a time that works for you, and get clear next steps for your business.",
    keywords: ["free business consultation", "book a consultation", "business advice call", "talk to a business specialist", "get started"],
  },
  "/contact": {
    title: "Contact Us | Leader Business Developer",
    description: "Contact Leader Business Developer by phone, email or message. Get help with business formation, compliance, banking, branding and more.",
    keywords: ["contact us", "contact leader business developer", "business support phone", "customer service", "send a message"],
  },
};


/* Read and write per-viewer conveniences (favorites, checklist progress). Fails silently. */
export const store = {
  get(key, fallback) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ } },
};

/* Download text as a file. */
export function downloadText(filename, text, type = "text/plain") {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
