import {
  CalendarCheck, MessageSquare, ClipboardList, Target, FileCheck, Map, Video, Clock, UserCheck,
  Compass, ListChecks, ShieldCheck, Lightbulb, Send, Coffee, ScrollText, HelpCircle,
} from "lucide-react";
import { Section, Timeline } from "../../components/service";
import BankingPage from "./BankingPage";
import BankVisual from "./BankVisual";
import { BANKING_LINKS } from "./services";

const agenda = [
  { when: "Before", title: "Short questionnaire", text: "Tell us about your business so the session starts with context, not paperwork.", icon: <ClipboardList size={18} /> },
  { when: "Part 1", title: "Your situation", text: "Structure, location, how money moves and what's not working today.", icon: <MessageSquare size={18} /> },
  { when: "Part 2", title: "Options explained", text: "Suitable account types, payment tools and trade-offs in plain language.", icon: <Compass size={18} /> },
  { when: "After", title: "Your action plan", text: "A written summary with next steps and a document checklist.", icon: <ScrollText size={18} /> },
];

export default function BankingConsultation() {
  return (
    <BankingPage
      path="/banking/consultation"
      title={{ text: "Talk it through with a business banking specialist", short: "Banking Consultation" }}
      subtitle={<>Not sure which account you need, why an application stalled or how to set up payments? Book a one-on-one session and leave with clear answers and a practical plan.</>}
      primary={{ label: "Book a consultation", to: BANKING_LINKS.start("banking-consultation") }}
      secondary={{ label: "What to expect", href: "#bk-agenda" }}
      visual={<BankVisual variant="calendar" chips={[
        { icon: <Video size={13} />, label: "Video or phone" },
        { icon: <UserCheck size={13} />, label: "1-on-1 specialist" },
        { icon: <FileCheck size={13} />, label: "Action plan included" },
      ]} />}
      services={{
        title: "What we can cover together",
        subtitle: "Bring your questions. Here are the topics owners ask about most.",
        items: [
          { icon: <Target size={24} />, title: "Choosing an account", text: "Which type of account and provider fits your business right now." },
          { icon: <HelpCircle size={24} />, title: "Stalled or declined applications", text: "Review what may have gone wrong and how to approach your next application." },
          { icon: <Map size={24} />, title: "Account structure", text: "How many accounts to have and what each one should be for." },
          { icon: <Send size={24} />, title: "Payments setup", text: "Getting paid, paying suppliers and reducing payment costs." },
          { icon: <ShieldCheck size={24} />, title: "Non-resident and international", text: "Options for owners abroad and cross-border businesses." },
          { icon: <Lightbulb size={24} />, title: "Planning for growth", text: "Preparing your banking for hiring, funding or expansion." },
        ],
      }}
      benefits={{
        title: "Why book a consultation",
        subtitle: "An hour of the right advice can save weeks of trial and error.",
        items: [
          { icon: <Clock size={22} />, title: "Answers in one session", text: "Get your questions answered without waiting on email threads." },
          { icon: <UserCheck size={22} />, title: "Focused on you", text: "Advice built around your business, not a script." },
          { icon: <ListChecks size={22} />, title: "Clear next steps", text: "Leave knowing exactly what to do next." },
          { icon: <FileCheck size={22} />, title: "Document checklist", text: "Know which documents to gather before you apply." },
          { icon: <Compass size={22} />, title: "Unbiased guidance", text: "We don't have bank partnerships pushing us toward one provider." },
          { icon: <Coffee size={22} />, title: "No jargon", text: "Banking terms explained in everyday language." },
        ],
      }}
      helps={["Listen to your situation and goals", "Explain options and trade-offs clearly", "Give you a written action plan", "Point you to the right next service"]}
      steps={{
        title: "How booking works",
        subtitle: "Three easy steps to your session.",
        items: [
          { icon: <CalendarCheck size={20} />, title: "Pick a time", text: "Choose a slot that suits you for a video or phone call." },
          { icon: <ClipboardList size={20} />, title: "Share a few details", text: "A short questionnaire helps us prepare." },
          { icon: <MessageSquare size={20} />, title: "Meet your specialist", text: "Talk it through and receive your action plan afterwards." },
        ],
      }}
      faqs={[
        ["Who will I speak with?", "A member of our business banking support team who works with business owners on account setup, payments and banking options."],
        ["Is this financial or legal advice?", "No. We provide general guidance about banking options and processes. For legal, tax or investment advice, speak with a licensed professional."],
        ["Do you work with specific banks?", "We don't have bank partnerships. That lets us talk openly about the trade-offs between different types of providers."],
        ["What should I prepare?", "Basic details about your business, any documents you already have, and your questions. If an application was declined, bring any messages you received."],
        ["Can you contact the bank for me?", "We don't act as your representative with banks, but we'll help you understand what to say and what to send."],
      ]}
      cta={{ title: "Ready to get clear answers about your banking?" }}
      related={["/banking/account-assistance", "/banking/compare", "/banking/non-residents"]}
    >
      <Section id="bk-agenda" tone="gray" title="What to expect from your session" subtitle="A focused conversation with a clear outcome.">
        <Timeline items={agenda} />
      </Section>
    </BankingPage>
  );
}
