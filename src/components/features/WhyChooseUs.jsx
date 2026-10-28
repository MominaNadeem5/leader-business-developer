import {
  PiUsersThreeBold,
  PiStackBold,
  PiClockCountdownBold,
  PiChatCircleDotsBold,
  PiShieldCheckBold,
  PiGlobeHemisphereWestBold,
} from "react-icons/pi";
import useInView from "../../hooks/useInView";
import "./WhyChooseUs.css";

const reasons = [
  { title: "Expert Support", text: "Real people guide you through every step of your project.", Icon: PiUsersThreeBold },
  { title: "One Place for Everything", text: "Formation, banking, payments and websites handled together.", Icon: PiStackBold },
  { title: "Save Time", text: "We handle the paperwork so you can focus on running your business.", Icon: PiClockCountdownBold },
  { title: "Clear Communication", text: "Straightforward updates so you always know where things stand.", Icon: PiChatCircleDotsBold },
  { title: "Secure & Confidential", text: "Your business information is handled with care.", Icon: PiShieldCheckBold },
  { title: "For Every Entrepreneur", text: "Support for U.S. and international business owners.", Icon: PiGlobeHemisphereWestBold },
];

export default function WhyChooseUs() {
  const [ref, inView] = useInView();

  return (
    <section className="section">
      <div className="container why" ref={ref}>
        <div className={`why__head ${inView ? "is-in" : ""}`}>
          <div className="why__eyebrow" style={{ "--d": 0 }}>Why Choose Us</div>
          <h2 style={{ "--d": 1 }}>
            Why Businesses <em>Choose Leader Business Developer</em>
          </h2>
          <p style={{ "--d": 2 }}>
            We make starting and growing a business simpler, with dependable
            support at every stage.
          </p>
        </div>

        <div className={`why__grid ${inView ? "is-in" : ""}`}>
          {reasons.map(({ title, text, Icon }, index) => (
            <div key={title} className="why__card" style={{ "--i": index }}>
              <span className="why__icon"><Icon /></span>
              <h4>{title}</h4>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
