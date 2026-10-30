import {
  Globe, IdCard, MapPin, FileCheck, Building2, Landmark, ShieldCheck, Clock, Search, Scale,
  MessageSquare, ClipboardCheck, Send, Hash, Receipt, Wifi, BadgeCheck, CalendarClock,
} from "lucide-react";
import { Section, Timeline } from "../../components/service";
import BankingPage from "./BankingPage";
import BankVisual from "./BankVisual";
import { BANKING_LINKS } from "./services";

const path = [
  { when: "Step 1", title: "Form your U.S. company", text: "Most non-resident founders choose an LLC or a corporation in a U.S. state.", icon: <Building2 size={18} /> },
  { when: "Step 2", title: "Get an EIN", text: "Owners without an SSN or ITIN can still apply, usually by fax or mail using Form SS-4.", icon: <Hash size={18} /> },
  { when: "Step 3", title: "Set up a U.S. address", text: "Banks need a business address. Many don't accept P.O. boxes or some virtual addresses.", icon: <MapPin size={18} /> },
  { when: "Step 4", title: "Apply to the right provider", text: "Some providers serve non-residents remotely; others need a branch visit.", icon: <Landmark size={18} /> },
  { when: "Ongoing", title: "Stay compliant", text: "Keep filings current. Foreign-owned single-member LLCs often have extra IRS reporting.", icon: <CalendarClock size={18} /> },
];

export default function NonResidentBanking() {
  return (
    <BankingPage
      path="/banking/non-residents"
      title={{ text: "U.S. business banking for owners who live abroad", short: "Banking for Non-Residents" }}
      subtitle={<>Running a U.S. company from outside the U.S. is common, but banks apply extra identity and address checks. We help you understand the path, prepare the right documents and focus on providers that serve non-residents.</>}
      primary={{ label: "Get non-resident help", to: BANKING_LINKS.start("non-resident-banking") }}
      secondary={{ label: "See the path", href: "#bk-path" }}
      visual={<BankVisual
        variant="checklist"
        title="Non-resident application"
        steps={["U.S. company details", "EIN confirmation", "Passport verification", "Proof of foreign address", "Ready for bank review"]}
        docs={["Passport", "EIN letter", "Address proof"]}
        chips={[
          { icon: <Globe size={13} />, label: "Owner abroad" },
          { icon: <IdCard size={13} />, label: "Passport checked" },
          { icon: <Wifi size={13} />, label: "Remote-friendly" },
        ]}
      />}
      services={{
        title: "Non-resident banking support",
        subtitle: "Focused help for founders and owners who live outside the U.S.",
        items: [
          { icon: <Search size={24} />, title: "Provider research", text: "Understand which kinds of banks and platforms typically accept non-resident owners." },
          { icon: <IdCard size={24} />, title: "Identity documents", text: "Prepare passport, proof of address and any translations banks may require." },
          { icon: <Hash size={24} />, title: "EIN without an SSN", text: "Guidance on getting your EIN as a foreign owner, if you don't have one yet." },
          { icon: <MapPin size={24} />, title: "U.S. address options", text: "Understand which address types banks usually accept for your company." },
          { icon: <FileCheck size={24} />, title: "Application review", text: "We check your file for the inconsistencies that most often cause delays." },
          { icon: <Receipt size={24} />, title: "Compliance reminders", text: "Awareness of ongoing U.S. filings that come with owning a U.S. company." },
        ],
      }}
      benefits={{
        title: "Why a U.S. business account matters",
        subtitle: "It opens doors for customers, platforms and payment providers.",
        items: [
          { icon: <Landmark size={22} />, title: "Get paid in USD", text: "Receive U.S. customer payments without costly conversions." },
          { icon: <BadgeCheck size={22} />, title: "Platform access", text: "Many marketplaces and payment processors require a U.S. bank account." },
          { icon: <ShieldCheck size={22} />, title: "Proper separation", text: "Keep your U.S. company's money apart from personal funds." },
          { icon: <Clock size={22} />, title: "Faster U.S. payments", text: "Pay U.S. suppliers and contractors domestically." },
          { icon: <Scale size={22} />, title: "Cleaner compliance", text: "Clear records make U.S. tax filings easier." },
          { icon: <Globe size={22} />, title: "Global reach", text: "Combine a U.S. account with international options as you grow." },
        ],
      }}
      helps={["Explain which provider types serve non-residents", "Prepare passport, address and company documents", "Guide you on EIN and address requirements", "Review your application for consistency"]}
      steps={{
        subtitle: "A clearer route to a U.S. business account from abroad.",
        items: [
          { icon: <MessageSquare size={20} />, title: "Assess your situation", text: "Your country, company type, documents and how you plan to use the account." },
          { icon: <ClipboardCheck size={20} />, title: "Prepare your file", text: "We build your checklist and review your documents for gaps." },
          { icon: <Send size={20} />, title: "Apply with confidence", text: "You apply to providers that fit your situation. We help with follow-ups." },
        ],
      }}
      checklist={{
        title: "Documents non-residents usually need",
        subtitle: "Tick off what you have ready.",
        side: "Your documents",
        items: [
          "Valid passport for each owner and signer",
          "Proof of your foreign residential address (e.g. utility bill)",
          "U.S. company formation documents",
          "EIN confirmation letter",
          "U.S. business address",
          "Description of your business and expected account activity",
        ],
        note: "Some banks also ask for a second form of ID, a U.S. phone number or an in-person visit. Eligibility depends on your country of residence, business activity and each provider's policies, which can change.",
      }}
      faqs={[
        ["Can a non-resident open a U.S. business bank account?", "Often yes, but options are narrower than for U.S. residents. Some banks require an in-person visit, while some providers accept non-resident owners remotely, depending on the country and business type."],
        ["Do I need an SSN or ITIN?", "Not to get an EIN for your company. Some banks ask owners for an SSN or ITIN, while others accept a passport. It depends on the provider."],
        ["Do I need to visit the U.S.?", "Not always. Some providers offer fully remote applications for eligible owners and countries. Others require a branch visit to verify identity."],
        ["Why was my application declined?", "Common reasons include the owner's country of residence, the type of business, inconsistent documents or an unacceptable address. Providers don't always share their reasons."],
        ["Are there extra tax filings for foreign-owned LLCs?", "Often. For example, a foreign-owned single-member LLC generally has to file IRS Form 5472 with a pro forma Form 1120. Talk to a U.S. tax professional about your situation."],
      ]}
      cta={{ title: "Ready to bank your U.S. company from anywhere?" }}
      related={["/banking/llc", "/banking/international", "/banking/account-assistance"]}
    >
      <Section id="bk-path" tone="gray" title="The non-resident banking path" subtitle="The usual order of steps for owners outside the U.S.">
        <Timeline items={path} />
      </Section>
    </BankingPage>
  );
}
