import { Fragment } from "react";
import {
  PiFileTextBold,
  PiUserRectangleBold,
  PiCheckCircleBold,
  PiArrowRightBold,
  PiPlayFill,
} from "react-icons/pi";
import useInView from "../../hooks/useInView";
import workspace from "../../assets/how-workspace.png"; // <- apne assets folder ke hisaab se path theek karein
import "./HowItWorks.css";

const steps = [
  {
    title: "Choose a Service",
    text: "Browse our services and select what you need.",
    Icon: PiFileTextBold,
  },
  {
    title: "Provide Your Details",
    text: "Fill out a simple form and upload your documents securely.",
    Icon: PiUserRectangleBold,
  },
  {
    title: "We Handle the Process",
    text: "Our experts take care of the rest and keep you updated every step of the way.",
    Icon: PiCheckCircleBold,
  },
];

export default function HowItWorks() {
  const [ref, inView] = useInView();

  return (
    <section className="section how" id="how-it-works">
      <div className="container">
        <div ref={ref} className={`how__panel ${inView ? "is-in" : ""}`}>
          {/* ---------- LEFT : image ---------- */}
          <div className="how__media">
            <img src={workspace} alt="Modern workspace with a laptop" />
          
            <button type="button" className="how__play" aria-label="Play video">
              <PiPlayFill size={26} />
            </button>
          </div>

          {/* ---------- RIGHT : content ---------- */}
          <div className="how__content">
            <div className="how__eyebrow">How it works</div>
            <h2>A Simple 3-Step Process</h2>
            <p className="how__lead">
              Getting your business started is easier than you think. Follow
              these simple steps and we&apos;ll handle the rest.
            </p>

            <div className="how__list">
              {steps.map(({ title, text, Icon }, i) => (
                <Fragment key={title}>
                  <div className="how__step" style={{ "--i": i }}>
                    <div className="how__badge">
                      <span className="how__num">{i + 1}</span>
                      <span className="how__icon">
                        <Icon size={30} />
                      </span>
                    </div>
                    <div className="how__body">
                      <h4>{title}</h4>
                      <p>{text}</p>
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <PiArrowRightBold
                      className="how__chev"
                      size={20}
                      style={{ "--i": i }}
                    />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}