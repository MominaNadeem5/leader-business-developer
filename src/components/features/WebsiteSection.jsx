import { Link } from "react-router-dom";
import {
  PiArrowRightBold,
  PiGlobeBold,
  PiLayoutBold,
  PiShoppingBagBold,
  PiWrenchBold,
  PiCheckCircleBold,
} from "react-icons/pi";
import Button from "../common/Button";
import useInView from "../../hooks/useInView";
import "./WebsiteSection.css";

const websiteServices = [
  { title: "Domain & Hosting", text: "Secure your name and reliable hosting.", Icon: PiGlobeBold, to: "/website/domain-hosting" },
  { title: "WordPress Setup", text: "Flexible, easy-to-manage business sites.", Icon: PiLayoutBold, to: "/website/wordpress" },
  { title: "Shopify Setup", text: "Launch an online store ready to sell.", Icon: PiShoppingBagBold, to: "/website/shopify" },
  { title: "Website Maintenance", text: "Updates, backups and ongoing care.", Icon: PiWrenchBold, to: "/website/maintenance" },
];

const points = ["Professional, mobile-friendly design", "Payments and business tools connected", "Support from setup to launch"];

export default function WebsiteSection() {
  const [ref, inView] = useInView();

  return (
    <section className="section">
      <div className="container web__layout" ref={ref}>
        <div className={`web__visual ${inView ? "is-in" : ""}`} aria-hidden="true">
          <div className="web__browser">
            <div className="web__bar">
              <i /><i /><i />
              <span>yourbusiness.com</span>
            </div>
            <div className="web__page">
              <div className="web__hero-bar" />
              <div className="web__line web__line--lg" />
              <div className="web__line" />
              <div className="web__cta" />
              <div className="web__tiles">
                <span /><span /><span />
              </div>
            </div>
          </div>
        </div>

        <div className={`web__content ${inView ? "is-in" : ""}`}>
          <div className="web__eyebrow" style={{ "--d": 0 }}>Website</div>
          <h2 style={{ "--d": 1 }}>
            A Professional Website for <em>Your Business</em>
          </h2>
          <p style={{ "--d": 2 }}>
            Get online with a website built to look credible, load fast and
            help customers find and trust you.
          </p>
          <ul className="web__points" style={{ "--d": 3 }}>
            {points.map((point) => (
              <li key={point}>
                <PiCheckCircleBold size={20} />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="web__grid" style={{ "--d": 4 }}>
            {websiteServices.map(({ title, text, Icon, to }) => (
              <Link key={title} to={to} className="web__card">
                <span className="web__icon"><Icon /></span>
                <div>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ "--d": 5 }}>
            <Button variant="primary" size="sm" to="/website">
              Explore Website Services <PiArrowRightBold />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
