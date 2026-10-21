import { Link } from "react-router-dom";
import {
  PiBuildingsBold,
  PiIdentificationBadgeBold,
  PiBankBold,
  PiMonitorBold,
  PiArrowRightBold,
} from "react-icons/pi";
import useInView from "../../hooks/useInView";
import "./ServicesGrid.css";

const services = [
  {
    title: "Company Formation",
    text: "Register your business and get up and running quickly.",
    Icon: PiBuildingsBold,
    to: "/get-started/llc",
  },
  {
    title: "EIN & ITIN",
    text: "Get your Employer Identification Number (EIN) and ITIN.",
    Icon: PiIdentificationBadgeBold,
    to: "/get-started?service=ein",
  },
  {
    title: "Banking & Payments",
    text: "Set up merchant accounts, payment gateways and more.",
    Icon: PiBankBold,
    to: "/get-started?service=merchant",
  },
  {
    title: "Website Setup",
    text: "Build your online presence with professional websites and tools.",
    Icon: PiMonitorBold,
    to: "/get-started?service=website",
  },
];

export default function ServicesGrid() {
  const [ref, inView] = useInView();

  return (
    <section className="section">
      <div className="container svc__layout" ref={ref}>
        {/* ---------- LEFT ---------- */}
        <div className={`svc__intro ${inView ? "is-in" : ""}`}>
          <div className="svc__eyebrow" style={{ "--d": 0 }}>Our Services</div>
          <h2 style={{ "--d": 1 }}>
            Comprehensive Business Solutions for <em>Your Success</em>
          </h2>
          <p style={{ "--d": 2 }}>
            Whether you&apos;re just getting started or looking to expand, our
            services are designed to meet your unique business needs.
          </p>
          <Link to="/services" className="svc__btn" style={{ "--d": 3 }}>
            Explore All Services <PiArrowRightBold size={16} />
          </Link>
        </div>

        {/* ---------- RIGHT ---------- */}
        <div className={`svc__grid ${inView ? "is-in" : ""}`}>
          {services.map(({ title, text, Icon, to }, index) => (
            <Link to={to} key={title} className="svc__card" style={{ "--i": index }}>
              <span className="svc__icon">
                <Icon />
              </span>
              <div className="svc__body">
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
              <PiArrowRightBold className="svc__arrow" size={16} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}