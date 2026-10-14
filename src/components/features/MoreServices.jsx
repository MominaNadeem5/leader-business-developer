import { Link } from "react-router-dom";
import { PiCaretRightBold } from "react-icons/pi";
import useInView from "../../hooks/useInView";
import "./MoreServices.css";
import leafIcon from "../../assets/growth-hand-icon.svg";
export default function MoreServices() {
  const [ref, inView] = useInView();

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div ref={ref} className={`more-services-wrapper ${inView ? "is-in" : ""}`}>
          <Link to="/services" className="more-services">
<span className="icon">
   <b>
    <img src={leafIcon} alt="" aria-hidden="true" />
  </b>
</span>            <span>
              <span className="more-services__cap">More services on the way</span>
              <span className="more-services__txt">We're expanding carefully to support more of your business journey.</span>
            </span>
            <PiCaretRightBold className="more-services__chev" />
          </Link>
        </div>
      </div>
    </section>
  );
}
