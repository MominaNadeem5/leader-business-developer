import {
  Landmark, FileText, ClipboardCheck, Search, Building2, Users, BadgeCheck, Banknote, ShieldCheck, Clock,
  FileSearch, Send, Rocket, Layers, Scale,
} from "lucide-react";
import { Section, Explorer } from "../../../components/service";
import MerchantPage from "../MerchantPage";
import { RiskMeter } from "../MerchantVisual";
import { MERCHANT_LINKS } from "../services";

export default function MerchantAccount() {
  return (
    <MerchantPage
      path="/merchant/merchant-account"
      title={{ text: "Merchant account services, from first question to first sale", short: "Merchant Account Services" }}
      subtitle={<>A merchant account lets your business accept card payments and receive the funds. We help you <strong>choose the right type, prepare a complete application and avoid the common delays</strong>.</>}
      primary={{ label: "Get help with my application", to: MERCHANT_LINKS.start("merchant-account") }}
      secondary={{ label: "See what you'll need", href: "#mc-process" }}
      visual={<RiskMeter />}
      services={{
        title: "What's included in our merchant account help",
        subtitle: "Practical support at every stage, so nothing slows your application down.",
        items: [
          { icon: <Search size={24} />, title: "Needs assessment", text: "We review how you sell, your average ticket and expected volume to identify suitable account types." },
          { icon: <FileText size={24} />, title: "Document preparation", text: "A tailored checklist for formation documents, ID, bank details and processing history." },
          { icon: <ClipboardCheck size={24} />, title: "Application review", text: "We check for gaps and inconsistencies that commonly trigger underwriting questions." },
          { icon: <Scale size={24} />, title: "Offer walkthrough", text: "Understand rates, fees, reserves and contract terms before you sign anything." },
          { icon: <Layers size={24} />, title: "Equipment & software fit", text: "Make sure your terminal, gateway or POS works with the account you choose." },
          { icon: <ShieldCheck size={24} />, title: "Compliance basics", text: "Plain-English guidance on PCI DSS and the policies providers expect to see." },
        ],
      }}
      options={{
        title: "Common account types",
        subtitle: "Each has trade-offs. We'll help you understand which fits your business.",
        items: [
          { icon: <Landmark size={22} />, name: "Dedicated merchant account", best: "Established businesses with steady volume", text: "An account set up in your business's name after full underwriting.", points: ["Pricing often negotiable", "Greater stability once approved", "More paperwork up front"] },
          { icon: <Users size={22} />, name: "Payment facilitator", badge: "Fast start", featured: true, best: "New and low-volume businesses", text: "You process under a provider's master account with a quick sign-up.", points: ["Quick onboarding", "Usually set, published pricing", "Account reviews can happen later"] },
          { icon: <Building2 size={22} />, name: "Specialized accounts", best: "High-risk, international or high-ticket sellers", text: "Accounts from providers that work with specific industries or regions.", points: ["Deeper underwriting", "May include reserves", "Tailored to your industry"] },
        ],
      }}
      benefits={{
        title: "Why preparation matters",
        subtitle: "Most delays come from missing or mismatched information.",
        items: [
          { icon: <Clock size={20} />, title: "Fewer back-and-forths", text: "Complete files reduce follow-up requests." },
          { icon: <BadgeCheck size={20} />, title: "Consistent details", text: "Names, addresses and EINs that match everywhere." },
          { icon: <FileSearch size={20} />, title: "No surprises", text: "Know about reserves and fees before signing." },
          { icon: <Banknote size={20} />, title: "Faster to first sale", text: "Equipment and setup planned in parallel." },
          { icon: <ShieldCheck size={20} />, title: "Policy ready", text: "Refund and privacy policies providers look for." },
          { icon: <Scale size={20} />, title: "Informed choice", text: "Compare offers on total cost, not headline rate." },
        ],
      }}
      helps={[
        "Recommend account types based on how you sell",
        "Build a document checklist and review it with you",
        "Flag common underwriting issues before you submit",
        "Explain offers, reserves and contract terms",
      ]}
      steps={{
        title: "From application to approval",
        subtitle: "What a typical merchant account process looks like.",
        items: [
          { icon: <Search size={22} />, title: "Assess", text: "We learn about your business model, volume and channels." },
          { icon: <FileText size={22} />, title: "Prepare", text: "Gather documents and policies using our checklist." },
          { icon: <Send size={22} />, title: "Submit", text: "You apply with your chosen provider, with our review first." },
          { icon: <Rocket size={22} />, title: "Activate", text: "Once the provider approves, set up equipment and test." },
        ],
      }}
      checklist={{
        title: "Documents providers commonly ask for",
        subtitle: "Requirements vary by provider. Tick off what you have ready.",
        items: [
          "Business formation documents (e.g. Articles of Organization)",
          "EIN confirmation letter (or SSN for sole proprietors)",
          "Government-issued photo ID for each owner",
          "Business bank account details or voided check",
          "Recent bank or processing statements (if available)",
          "Website with refund, privacy and shipping policies",
        ],
        note: "Some providers request more, such as financial statements or supplier invoices.",
      }}
      faqs={[
        ["What is a merchant account?", "It's a type of account that lets a business accept card payments. Funds from card sales are processed through it and then deposited into your business bank account."],
        ["How long does approval take?", "It depends on the provider, your industry and how complete your application is. Some payment facilitators onboard quickly; full underwriting can take longer. We can't promise a timeline."],
        ["Can I get a merchant account with a new business?", "Many providers work with new businesses, though they may ask for more information or start with lower limits. We help you present your business clearly."],
        ["What is a reserve?", "A reserve is a portion of your sales a provider holds for a period to cover potential chargebacks or refunds. It's more common for new or high-risk businesses."],
        ["Do I need an EIN?", "Most providers ask for an EIN for LLCs and corporations. Sole proprietors may be able to use an SSN. We can help you get an EIN if needed."],
      ]}
      cta={{ title: "Ready to prepare your merchant account application?" }}
      footnotes={["Approval decisions, pricing and timelines are set solely by the provider you apply with."]}
    >
      <Section tone="gray" title="What underwriters look at" subtitle="Understanding the review helps you prepare for it.">
        <Explorer
          items={[
            { id: "identity", icon: <BadgeCheck size={16} />, label: "Identity", text: "Providers verify who owns and controls the business.", points: ["Owner ID and ownership percentages", "Business registration and EIN", "Matching names and addresses"] },
            { id: "model", icon: <Building2 size={16} />, label: "Business model", text: "They want to understand what you sell and how you deliver it.", points: ["Products or services and pricing", "Delivery timelines and refund policy", "Website content and terms"] },
            { id: "history", icon: <FileSearch size={16} />, label: "Processing history", text: "Past processing shows how your business performs.", points: ["Recent statements", "Chargeback and refund ratios", "Average ticket and monthly volume"] },
            { id: "finance", icon: <Banknote size={16} />, label: "Financial health", text: "Some providers look at broader financial stability.", points: ["Bank statements", "Time in business", "Credit checks in some cases"] },
          ]}
        />
      </Section>
    </MerchantPage>
  );
}
