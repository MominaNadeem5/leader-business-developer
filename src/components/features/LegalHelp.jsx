import { Link } from "react-router-dom";
import { PiArrowRightBold, PiGavel, PiBank, PiBuildingOffice, PiBriefcase } from "react-icons/pi";
import Button from "../common/Button";
import useInView from "../../hooks/useInView";
import "./LegalHelp.css";

const legalServices = [
  { title: "LLC Formation", icon: PiBuildingOffice, desc: "Protect your personal assets" },
  { title: "Corporation", icon: PiBriefcase, desc: "Scale your business entity" },
  { title: "DBA Registration", icon: PiBank, desc: "Operate under your brand" },
  { title: "Legal Help", icon: PiGavel, desc: "Expert legal guidance" },
];

export default function LegalHelp() {
  const [ref, inView] = useInView();

  return (
    <section className="section">
      <div className="container legal-container">
        <div ref={ref} className={`legal-wrapper ${inView ? "is-in" : ""}`}>
          <div className="legal__grid">
            <div className="legal__content">
              <div className="eyebrow" style={{ "--d": 0 }}>Legal help for every part of your life</div>
              <h2 style={{ "--d": 1 }}>For your business</h2>
              <p style={{ "--d": 2 ,paddingBottom:"10px"}}>
                From formation to compliance, we provide comprehensive legal solutions
                to protect and grow your business with confidence.
              </p>
              <div style={{ "--d": 3 }}>
                <Button variant="primary" size="lg" to="/legal">
                  Start my business <PiArrowRightBold />
                </Button>
              </div>

              <div className="legal__services" style={{ "--d": 4 }}>
                {legalServices.map((service, index) => (
                  <Link key={index} to="#" className="legal__service">
                    <service.icon size={24} />
                    <span>{service.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="legal__visual">
              <div className="legal__video">
                <div className="legal__video-content">
                  <div className="legal__play">
                    <div className="legal__play-icon">▶</div>
                  </div>
                  <p>Watch how we help businesses succeed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
