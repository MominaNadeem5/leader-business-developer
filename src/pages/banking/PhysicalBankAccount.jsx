import {
  MapPin, CalendarCheck, FileCheck, UserCheck, PenLine, CreditCard, Banknote, HandCoins, Landmark,
  Users, ShieldCheck, Vault, MessageSquare, ClipboardCheck, Send, Handshake, Clock,
} from "lucide-react";
import { Section, Timeline } from "../../components/service";
import BankingPage from "./BankingPage";
import BankVisual from "./BankVisual";
import { BANKING_LINKS } from "./services";

const visit = [
  { when: "Before", title: "Book an appointment", text: "Many branches ask business customers to book ahead, so a banker is free to help.", icon: <CalendarCheck size={18} /> },
  { when: "Bring", title: "Your documents", text: "Formation documents, EIN letter and ID for every owner and signer who attends.", icon: <FileCheck size={18} /> },
  { when: "At the branch", title: "Meet a banker", text: "They review your documents, verify identities and set up the account.", icon: <UserCheck size={18} /> },
  { when: "Sign", title: "Sign and fund", text: "Signers complete the signature card and you make any opening deposit required.", icon: <PenLine size={18} /> },
  { when: "After", title: "Cards and online access", text: "Debit cards and checks arrive later. Set up online banking right away.", icon: <CreditCard size={18} /> },
];

export default function PhysicalBankAccount() {
  return (
    <BankingPage
      path="/banking/physical-bank"
      title={{ text: "A physical business bank account with a real branch behind it", short: "Physical Bank Account" }}
      subtitle={<>Prefer face-to-face service, regular cash deposits or a local lending relationship? A branch-based account may be the right fit. We help you choose a branch bank, prepare for your visit and walk in with everything you need.</>}
      primary={{ label: "Get branch account help", to: BANKING_LINKS.start("physical-bank-account") }}
      secondary={{ label: "Plan your branch visit", href: "#bk-visit" }}
      visual={<BankVisual
        variant="calendar"
        heading="Book a branch visit"
        agenda={["Bring formation documents", "Bring EIN letter", "IDs for every signer", "Opening deposit, if required"]}
        chips={[
          { icon: <MapPin size={13} />, label: "Local branch" },
          { icon: <Banknote size={13} />, label: "Cash deposits" },
          { icon: <Handshake size={13} />, label: "Face-to-face service" },
        ]}
      />}
      services={{
        title: "How we help with branch accounts",
        subtitle: "Walk into the branch prepared, and walk out with an account.",
        items: [
          { icon: <MapPin size={24} />, title: "Choosing a branch bank", text: "Consider branch locations, opening hours and services that matter for your business." },
          { icon: <FileCheck size={24} />, title: "Visit preparation", text: "A clear list of documents and people who need to attend the appointment." },
          { icon: <Users size={24} />, title: "Signers and authority", text: "Decide who signs, who gets cards and what each person can do." },
          { icon: <Banknote size={24} />, title: "Cash handling setup", text: "Understand deposit options, cash limits and any fees for counting coins and notes." },
          { icon: <HandCoins size={24} />, title: "Lending relationship", text: "Learn how a branch relationship can help when you need a loan or line of credit." },
          { icon: <MessageSquare size={24} />, title: "Questions to ask", text: "Know what to ask the banker about fees, minimums and services before you sign." },
        ],
      }}
      benefits={{
        title: "Why choose a physical bank account",
        subtitle: "Some things are still easier in person.",
        items: [
          { icon: <Banknote size={22} />, title: "Easy cash deposits", text: "Deposit cash and coins at the counter or a night drop." },
          { icon: <Handshake size={22} />, title: "A banker who knows you", text: "A local relationship can help when questions or needs come up." },
          { icon: <HandCoins size={22} />, title: "Lending conversations", text: "Existing customers are often well placed to discuss credit." },
          { icon: <Vault size={22} />, title: "Branch services", text: "Cashier's checks, coin orders and other services, in one visit." },
          { icon: <ShieldCheck size={22} />, title: "In-person problem solving", text: "Sort out issues face to face when something goes wrong." },
          { icon: <Landmark size={22} />, title: "Online banking too", text: "Most branch banks also offer apps and online banking." },
        ],
      }}
      helps={["Help you choose a suitable branch bank", "Prepare your documents and signers for the visit", "Explain cash handling and branch services", "Give you questions to ask the banker"]}
      steps={{
        subtitle: "From choosing a branch to holding your new debit card.",
        items: [
          { icon: <MessageSquare size={20} />, title: "Tell us your needs", text: "Cash volume, location, services you need and who will sign on the account." },
          { icon: <ClipboardCheck size={20} />, title: "Prepare for the visit", text: "We build your document list and help you choose which branches to visit." },
          { icon: <Send size={20} />, title: "Open at the branch", text: "You meet the banker with everything ready. We're here for any follow-up." },
        ],
      }}
      compare={{
        title: "Branch account vs. virtual account",
        subtitle: "General tendencies. Individual banks differ.",
        columns: ["", "Branch account", "Virtual account"],
        rows: [
          ["In-person service", true, false],
          ["Cash and coin deposits", true, "Limited or via partners"],
          ["Branch services (cashier's checks, coin)", true, false],
          ["Lending relationship", "Often stronger", "Limited"],
          ["Monthly fees", "Often, with waivers", "Often low or none"],
          ["Open without a visit", "Sometimes", "Usually"],
        ],
        highlight: 1,
      }}
      checklist={{
        title: "What to bring to the branch",
        subtitle: "Branches commonly ask for these. Tick off what's in your folder.",
        side: "Your branch folder",
        items: [
          "Formation documents (Articles of Organization or Incorporation)",
          "EIN confirmation letter",
          "Operating agreement, bylaws or a resolution naming signers",
          "Government-issued photo ID for every signer attending",
          "Details of every owner with 25% or more",
          "Opening deposit, if the bank requires one",
        ],
        note: "Call the branch before you go. Requirements and whether all signers must attend vary between banks.",
      }}
      faqs={[
        ["Do I need to visit a branch to open a physical bank account?", "Often, yes. Some banks let you start online and finish in a branch, and some require all signers to attend in person. Ask the branch before your visit."],
        ["Is there a minimum opening deposit?", "Some business accounts require one, and some don't. The amount depends on the bank and the account type."],
        ["Can I still bank online with a branch account?", "Yes. Most branch-based banks offer online banking and mobile apps alongside their branches."],
        ["Are branch accounts more expensive?", "They sometimes have monthly fees, though many can be waived by keeping a minimum balance or meeting activity requirements. Compare the fee schedules before you choose."],
        ["Is my money insured?", "At FDIC-insured banks, eligible deposits are insured up to $250,000 per depositor, per bank, per ownership category. Credit unions are covered by the NCUA in a similar way."],
      ]}
      cta={{ title: "Ready to open an account at a branch?" }}
      related={["/banking/virtual-bank", "/banking/small-business", "/banking/business-account-guidance"]}
    >
      <Section id="bk-visit" tone="gray" title="What to expect at your branch visit" subtitle="A typical account-opening appointment, step by step.">
        <Timeline items={visit} />
        <p className="bk-small"><Clock size={13} style={{ verticalAlign: "-2px" }} /> Appointments go faster when your documents are ready. Times vary by bank and branch.</p>
      </Section>
    </BankingPage>
  );
}
