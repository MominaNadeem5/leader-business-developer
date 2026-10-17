import {
  Code2, Webhook, Repeat, Database, Workflow, KeyRound, Search, PenTool, Rocket, ShieldCheck,
  Gauge, Layers, FileText, Bell, Lock, Server, Boxes,
} from "lucide-react";
import { Section } from "../../components/service";
import IntegrationPage from "./IntegrationPage";
import { ApiVisual } from "./IntegrationVisual";
import { ApiPlayground } from "./IntegrationWidgets";
import { MethodGrid } from "../merchant/MerchantWidgets";
import { INTEGRATION_LINKS } from "./services";

export default function ApiIntegration() {
  return (
    <IntegrationPage
      path="/payment-integration/api"
      title={{ text: "Payment API integration for custom apps, platforms and workflows", short: "API Integration" }}
      subtitle={<>When plugins aren't enough, we help you <strong>plan and build a direct integration</strong> with your payment provider's API, from checkout and subscriptions to webhooks and back-office connections.</>}
      primary={{ label: "Scope my API project", to: INTEGRATION_LINKS.start("api-integration") }}
      secondary={{ label: "See an example", href: "#pi-playground" }}
      visual={<ApiVisual />}
      highlights={[
        { icon: <Code2 size={16} />, text: "Server-side payments" },
        { icon: <Webhook size={16} />, text: "Reliable webhooks" },
        { icon: <Repeat size={16} />, text: "Subscriptions & billing" },
        { icon: <Lock size={16} />, text: "Security best practices" },
      ]}
      services={{
        title: "What we can build",
        items: [
          { icon: <Code2 size={24} />, title: "Custom payment flows", text: "Checkout, deposits, split payments or usage-based charges designed around your product." },
          { icon: <Repeat size={24} />, title: "Subscriptions & billing", text: "Plans, trials, upgrades, proration and failed-payment handling." },
          { icon: <Webhook size={24} />, title: "Webhooks & events", text: "Verified, retry-safe event handling so your system always knows what happened." },
          { icon: <Database size={24} />, title: "Back-office sync", text: "Connect payments to your CRM, accounting, ERP or internal dashboards." },
          { icon: <Boxes size={24} />, title: "Marketplaces & platforms", text: "Onboard sellers and route payouts using your provider's platform tools." },
          { icon: <KeyRound size={24} />, title: "Security review", text: "API key handling, idempotency, logging and access controls checked." },
        ],
      }}
      benefits={{
        title: "Why a well-built API integration matters",
        items: [
          { icon: <ShieldCheck size={20} />, title: "Secure", text: "Keys and card data protected." },
          { icon: <Gauge size={20} />, title: "Reliable", text: "No double charges on retries." },
          { icon: <Layers size={20} />, title: "Flexible", text: "Built around your product." },
          { icon: <Workflow size={20} />, title: "Automated", text: "Events drive your workflows." },
          { icon: <FileText size={20} />, title: "Documented", text: "Easy for your team to maintain." },
          { icon: <Bell size={20} />, title: "Observable", text: "Logs and alerts when things fail." },
        ],
      }}
      helps={[
        "Turn your business needs into a clear technical plan",
        "Build or review server-side payment code",
        "Set up webhooks, retries and monitoring",
        "Document the integration and hand it over to your team",
      ]}
      steps={{
        items: [
          { icon: <Search size={22} />, title: "Scope", text: "Flows, systems and edge cases." },
          { icon: <PenTool size={22} />, title: "Design", text: "Architecture, events and data model." },
          { icon: <Code2 size={22} />, title: "Build", text: "In your provider's test mode first." },
          { icon: <Rocket size={22} />, title: "Test & launch", text: "Full test run, then go live." },
        ],
      }}
      checklist={{
        title: "What helps us scope your project",
        side: "Project brief",
        items: [
          "Which payment provider you use (or are considering)",
          "Your tech stack and where your app is hosted",
          "The payment flows you need, step by step",
          "Systems the payments should connect to",
          "Access to a test or sandbox account",
          "Who will maintain the code after launch",
        ],
      }}
      faqs={[
        ["When do I need an API integration instead of a plugin?", "When you run your own app or platform, need a custom payment flow, or want payments to drive other systems automatically. Standard stores are often well served by official plugins."],
        ["Do you work with my existing developers?", "Yes. We can build the integration ourselves, pair with your team, or review code they've written."],
        ["How do you keep card data secure?", "We use your provider's secure components and tokens, so raw card numbers don't touch your servers. Secret API keys stay server-side and are never exposed in the browser."],
        ["What are webhooks and why do they matter?", "Webhooks are messages your provider sends when something happens, such as a successful payment or a dispute. Handling them properly keeps your records accurate even if a customer closes their browser."],
        ["What does it cost?", "It depends on scope. After a short discovery call we'll give you a clear estimate before any work begins."],
      ]}
      cta={{ title: "Build a payment integration you can rely on" }}
    >
      <Section id="pi-playground" tone="gray" title="See how an integration works" subtitle="Switch between common tasks and run a sample to see the response.">
        <ApiPlayground />
      </Section>

      <Section title="Systems we connect payments to" subtitle="Payments are most useful when the rest of your business knows about them.">
        <MethodGrid
          items={[
            { icon: <Server size={20} />, title: "Your app or website", text: "Web, mobile or SaaS backends." },
            { icon: <Database size={20} />, title: "CRM", text: "Customer and deal records." },
            { icon: <FileText size={20} />, title: "Accounting", text: "Sales, fees and payouts." },
            { icon: <Boxes size={20} />, title: "ERP & inventory", text: "Orders and stock levels." },
            { icon: <Bell size={20} />, title: "Alerts & chat", text: "Team notifications." },
            { icon: <Workflow size={20} />, title: "Automation tools", text: "Event-driven workflows." },
          ]}
        />
      </Section>
    </IntegrationPage>
  );
}
