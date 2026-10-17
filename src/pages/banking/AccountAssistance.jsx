import {
  FileCheck, ClipboardCheck, IdCard, Search, FolderCheck, MessageSquare, ShieldCheck, Clock, RefreshCw,
  Target, UserCheck, ListChecks, Send, AlertTriangle, Building2, Fingerprint, MapPin, FileWarning,
} from "lucide-react";
import { Reveal, Section } from "../../components/service";
import BankingPage from "./BankingPage";
import BankVisual from "./BankVisual";
import { BANKING_LINKS } from "./services";

const pitfalls = [
  { icon: <FileWarning size={20} />, title: "Names that don't match", text: "Your legal name must match exactly across formation documents, EIN letter and the application." },
  { icon: <MapPin size={20} />, title: "Address problems", text: "Many banks won't accept a P.O. box or some virtual addresses as the business address." },
  { icon: <Fingerprint size={20} />, title: "Missing owner details", text: "Banks must identify owners of 25% or more and a person who controls the business." },
  { icon: <AlertTriangle size={20} />, title: "Unclear business activity", text: "A vague description of what you do can trigger extra review or questions." },
];

export default function AccountAssistance() {
  return (
    <BankingPage
      path="/banking/account-assistance"
      title={{ text: "Open your business bank account without the guesswork", short: "Bank Account Assistance" }}
      subtitle={<>Banks ask for specific documents, ownership details and identity checks. We help you get every piece ready and consistent, so you can apply once and apply right.</>}
      primary={{ label: "Get account help", to: BANKING_LINKS.start("account-assistance") }}
      secondary={{ label: "See the checklist", href: "#bk-checklist" }}
      visual={<BankVisual variant="checklist" chips={[
        { icon: <IdCard size={13} />, label: "ID verified" },
        { icon: <FolderCheck size={13} />, label: "Docs organized" },
        { icon: <ShieldCheck size={13} />, label: "Ownership listed" },
      ]} />}
      services={{
        title: "What account assistance includes",
        subtitle: "Practical help with the parts of the process that trip most people up.",
        items: [
          { icon: <ClipboardCheck size={24} />, title: "Personal document checklist", text: "A checklist built for your business type, structure and owners, not a generic list." },
          { icon: <Search size={24} />, title: "Consistency review", text: "We check that names, addresses and numbers match across every document." },
          { icon: <Building2 size={24} />, title: "Provider shortlisting", text: "We explain which types of providers tend to suit your situation, and why." },
          { icon: <UserCheck size={24} />, title: "Ownership preparation", text: "We help you list beneficial owners and control persons the way banks expect." },
          { icon: <ListChecks size={24} />, title: "Application walkthrough", text: "We go through the questions you'll be asked, so nothing surprises you." },
          { icon: <MessageSquare size={24} />, title: "Follow-up support", text: "If the bank asks for more information, we help you understand and respond." },
        ],
      }}
      benefits={{
        title: "Why get help opening an account?",
        subtitle: "A prepared application is a smoother application.",
        items: [
          { icon: <Clock size={22} />, title: "Save time", text: "Skip the trial and error of finding out requirements one rejection at a time." },
          { icon: <RefreshCw size={22} />, title: "Avoid repeat requests", text: "Complete, consistent paperwork means fewer follow-up questions." },
          { icon: <Target size={22} />, title: "Apply to the right fit", text: "Focus on providers that actually serve businesses like yours." },
          { icon: <ShieldCheck size={22} />, title: "Know your obligations", text: "Understand what banks verify and why, so you can answer confidently." },
          { icon: <FileCheck size={22} />, title: "Organized records", text: "Keep a tidy set of documents you'll reuse for future accounts and services." },
          { icon: <MessageSquare size={22} />, title: "A real person to ask", text: "Questions answered in plain language, whenever you get stuck." },
        ],
      }}
      helps={["Build your document checklist", "Review your documents for consistency", "Explain what banks will verify", "Help you answer follow-up requests"]}
      steps={{
        subtitle: "From scattered paperwork to a complete application.",
        items: [
          { icon: <MessageSquare size={20} />, title: "Quick intake", text: "Tell us your structure, owners, location and what the account is for." },
          { icon: <FolderCheck size={20} />, title: "Prepare and review", text: "Upload your documents. We flag gaps and inconsistencies to fix first." },
          { icon: <Send size={20} />, title: "Apply with your bank", text: "You submit to the provider you choose, with us on hand for questions." },
        ],
      }}
      checklist={{
        title: "Business account document checklist",
        subtitle: "Most banks ask for some version of these. Tick off what you already have.",
        side: "Your documents",
        items: [
          "EIN confirmation letter from the IRS",
          "Formation documents (e.g. Articles of Organization or Incorporation)",
          "Operating agreement or bylaws, if you have one",
          "Government-issued photo ID for each owner and signer",
          "Details of owners with 25% or more, and a control person",
          "Business address and contact details",
          "A short description of what your business does",
        ],
        note: "Requirements differ between banks and business types. Some may ask for licenses, a business plan or an initial deposit.",
      }}
      faqs={[
        ["Do you open the account for me?", "No. Accounts are opened directly between you and the bank or provider. We prepare you for the process and support you through it."],
        ["Can I open an account before I have an EIN?", "Some sole proprietors can use their SSN, but most banks require an EIN for LLCs and corporations. Getting your EIN first usually makes things simpler."],
        ["Why does the bank need owner information?", "U.S. rules require banks to identify the people who own 25% or more of a business and at least one person who controls it, as part of anti-money-laundering checks."],
        ["Can I open an account online?", "Many banks and platforms offer online applications. Some still require a branch visit, especially for certain business types or owners outside the U.S."],
        ["What if my application is declined?", "Banks don't always explain why. We can help you review your documents for common issues and think about which providers may be a better fit."],
        ["How long does it take?", "It depends on the provider and how complete your application is. Simple online applications can be quick, while some reviews take longer."],
      ]}
      cta={{ title: "Ready to apply once and apply right?" }}
      related={["/banking/llc", "/banking/compare", "/banking/checking-savings"]}
    >
      <Section tone="gray" title="Common reasons applications stall" subtitle="Most delays come from small, avoidable issues. We check for these first.">
        <Reveal className="svc-grid svc-grid-4">
          {pitfalls.map((p, i) => (
            <div key={p.title} className="svc-card" style={{ "--i": i }}>
              <div className="svc-card__icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </Reveal>
      </Section>
    </BankingPage>
  );
}
