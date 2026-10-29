import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Check } from "lucide-react";
import { Reveal, Section } from "../../components/service";

/* "What to do next" article shown on the free-tool pages. It explains how the tool fits into forming an LLC
   and links to the LLC services and the how-to guide. `tool` picks the copy; every variant shares the layout. */
const COPY = {
  hub: {
    title: "From a free tool to a registered LLC",
    lead: "The tools help you make good early decisions. Once you have a name, a budget and a clear picture of what you need to stay compliant, the next step is making the business official.",
    body: "Many founders choose an LLC because, in most states, it separates personal and business finances while staying simple to run. Forming it takes a few filings, and you can do them yourself or with help.",
  },
  "name-generator": {
    title: "Found a name you like? Here's what comes next",
    lead: "A good name is only the first step. Before you commit to it, check that it's available in your state and that it doesn't clash with an existing brand.",
    body: "When you form an LLC, the name is registered with the state as part of your formation filing. Most states also expect the name to include “LLC” or a similar ending.",
  },
  "name-check": {
    title: "Your name looks clear. Now make it official",
    lead: "Availability can change until a name is actually filed, so a clear result is the right moment to move forward.",
    body: "Filing your formation documents is what registers the name with the state. Forming an LLC is the most common way to do that while keeping your personal assets separate from the business.",
  },
  "compliance-check": {
    title: "Start compliant, stay compliant",
    lead: "Most of what the check asks about, such as a registered agent, an EIN, an operating agreement and annual reports, is easiest to set up while you form the company.",
    body: "Getting those pieces in place at the start means fewer surprises later. If your business is already running, the same steps still help you close the gaps.",
  },
  "cost-calculator": {
    title: "Budgeting for an LLC? Know what to expect",
    lead: "Formation costs usually include a state filing fee, which varies by state, plus optional extras such as a registered agent or document preparation.",
    body: "An EIN is free to get directly from the IRS. Our LLC page shows the available packages and what each one includes, so you can plan before you spend.",
  },
};

const STEPS = [
  ["Choose and check your name", "Make sure it's available in your state."],
  ["File your formation documents", "Usually called Articles of Organization or a Certificate of Formation."],
  ["Get your EIN and open a business account", "Keep business money separate from day one."],
];

export default function NextStepLlc({ tool = "hub" }) {
  const c = COPY[tool] || COPY.hub;
  return (
    <Section tone="soft" className="rs-next-sec">
      <Reveal className="rs-next">
        <article className="rs-next__article">
          <span className="rs-next__eyebrow">Your next step</span>
          <h2>{c.title}</h2>
          <p>{c.lead}</p>
          <p>{c.body}</p>
          <div className="rs-next__actions">
            <Link to="/business/llc" className="btn btn--primary btn--md">Explore LLC Formation Services <ArrowRight size={18} /></Link>
            <Link to="/resources/learn/start-business" className="svc-ghost-btn"><BookOpen size={16} /> Learn how to start an LLC</Link>
          </div>
          <Link to="/resources/learn/llc-vs-corporation" className="rs-next__more">Not sure an LLC is right? Compare LLC vs. corporation <ArrowRight size={14} /></Link>
        </article>

        <aside className="rs-next__panel" aria-label="The path to a registered LLC">
          <h3>The path to a registered LLC</h3>
          <ol>
            {STEPS.map(([t, d], i) => (
              <li key={t} style={{ "--i": i }}>
                <span aria-hidden="true">{i + 1}</span>
                <div><b>{t}</b><small>{d}</small></div>
              </li>
            ))}
          </ol>
          <p className="rs-next__note"><Check size={14} /> General information, not legal or tax advice.</p>
        </aside>
      </Reveal>
    </Section>
  );
}
