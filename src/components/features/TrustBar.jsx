import {
  LuUsersRound,
  LuShieldCheck,
  LuUsers,
  LuBuilding2,
  LuHandshake,
} from "react-icons/lu";
import useInView from "../../hooks/useInView";
import "./TrustBar.css";

const items = [
  { Icon: LuUsersRound, title: "Trusted by Founders", sub: "& Entrepreneurs" },
  { Icon: LuShieldCheck, title: "Approved Vendor", sub: "& Registered Partner" },
  { Icon: LuUsers, title: "Association Member", sub: "& Industry Network" },
  { Icon: LuBuilding2, title: "Serving Clients", sub: "Across Multiple Branches" },
  { Icon: LuHandshake, title: "Partnered With", sub: "Leading Brands" },
];

export default function TrustBar() {
  const [ref, inView] = useInView();

  return (
    <section className="trust" aria-label="Why clients trust us">
       <div className="trust__div" ref={ref}>
      <ul className={`trust__list ${inView ? "is-in" : ""}`}>
        {items.map(({ Icon, title, sub }, index) => (
          <li className="trust__item" key={title} style={{ "--i": index }}>
            <span className="trust__icon">
              <Icon size={24} strokeWidth={2} />
            </span>
            <p className="trust__text">
              <b>{title}</b>
              <span>{sub}</span>
            </p>
          </li>
        ))}
      </ul>
       </div>
    </section>
  );
}