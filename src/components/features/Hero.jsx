import {
  ArrowRight,
  CalendarDays,
  Zap,
  UserRound,
  ShieldCheck,
  Check,
  TrendingUp,
} from "lucide-react";
import Button from "../common/Button";
import CaseCard from "./CaseCard";
import useInView from "../../hooks/useInView";
import heroWoman from "../../assets/hero-woman.jpg"; // <- apne assets folder ke hisaab se path theek karein
import "./Hero.css";
import growthIcon from "../../assets/growth-icon.png"; 

const checklist = [
  "LLC Formation",
  "EIN & ITIN",
  "Banking & Payments",
  "Website Setup",
  "And More...",
];

const features = [
  { text: "Fast & Simple", Icon: Zap },
  { text: "Expert Support", Icon: UserRound },
  { text: "Secure & Reliable", Icon: ShieldCheck },
];

export default function Hero() {
  const [ref, inView] = useInView();

  return (
    <section className="hero">
      <div className="container hero__grid" ref={ref}>
        {/* ---------- LEFT ---------- */}
        <div className={`hero__content ${inView ? "is-in" : ""}`}>
         <span className="hero__pill" style={{ "--d": 0 }}>
  <span className="hero__pill-icon">
    <img src={growthIcon} alt="" aria-hidden="true" />
  </span>
  Your digital partner in Business success
</span>

          {/* <h2 className="hero__title" style={{ "--d": 1 }}>
            A Digital System behind your Business{" "}
          
          </h2> */}
            <div className={`svc__intro ${inView ? "is-in" : ""}`}>
          <h2 style={{ "--d": 1 }}>
            A <em> Digital System</em>  behind your Business
          </h2>
         
          
        </div>

          <p style={{ "--d": 2 }}>
            From business formation to ongoing compliance, we provide the tools,
            guidance and support you need to launch, manage and grow your
            business — with confidence.
          </p>

          <div className="hero__btns" style={{ "--d": 3 }}>
            <Button to="/get-started">
              Start a Service <ArrowRight size={18} />
            </Button>
            <Button variant="outline" to="/consultation">
              <CalendarDays size={18} /> Schedule a Consultation
            </Button>
          </div>

          <ul className="hero__features" style={{ "--d": 4 }}>
            {features.map(({ text, Icon }) => (
              <li key={text}>
                <Icon size={20} strokeWidth={2.2} />
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- RIGHT ---------- */}
        <div className={`hero__visual ${inView ? "is-in" : ""}`}>
          <div className="hero__ring" />
          <div className="hero__arch">
            <img src={heroWoman} alt="Business owner working on a laptop" />
          </div>
          <div className="hero__dots" />

          {/* handwritten note */}
          <div className="hero__note" aria-hidden="true">
            <span>
              Your Business
              <br />
              Our Priority
            </span>
            <svg viewBox="0 0 60 50" fill="none">
              <path d="M52 4 C40 28 24 38 7 36" />
              <path d="M15 27 L6 36 L17 42" />
            </svg>
          </div>

          {/* checklist */}
          <ul className="hero__list">
            {checklist.map((item) => (
              <li key={item}>
                <span>
                  <Check size={11} strokeWidth={3.6} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* grow faster */}
          <div className="hero__grow">
            <b>
              <TrendingUp size={22} strokeWidth={2.4} />
            </b>
            <div>
              <strong>Grow Faster</strong>
              <span>With Expert Support</span>
            </div>
          </div>

          {/* case card (aap ka original animated card) */}
          <div className="hero__card">
            {/* <CaseCard /> */}
            <CaseCard active={inView} />
          </div>
        </div>
      </div>
    </section>
  );
}