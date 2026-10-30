import { Link } from "react-router-dom";
import {
  PiArrowRightBold,
  PiCaretRightBold,
  PiCheckCircleFill,
  PiLockSimpleBold,
  PiShoppingCartSimpleBold,
} from "react-icons/pi";
import Button from "../common/Button";
import useInView from "../../hooks/useInView";
import { businesses, checkoutImg, paymentsBg } from "../../data/payments";
import "./PaymentFeature.css";
import { FaUsers } from "react-icons/fa";

export default function PaymentFeature() {
  const [ref, inView] = useInView();

  return (
    <section className="section">
      <div className="container">
        <div ref={ref} className={`pay ${inView ? "is-in" : ""}`}>
          {/* ---------- LEFT ---------- */}
          <div className="pay__text">
            <div className="pay__eyebrow" style={{ "--d": 0 }}>
              Payment solutions
            </div>
            <h2 style={{ "--d": 1 }}>
              A better way to <span className="g">accept payments.</span>
            </h2>
            <p style={{ "--d": 2 }}>
              Explore suitable providers, apply under your business identity,
              and connect your checkout with our guidance.
            </p>
            <div style={{ "--d": 3 }}>
              <Button variant="primary" size="lg" to="/payment-setup">
                Explore Payment Solutions <PiArrowRightBold />
              </Button>
            </div>
            <Link to="/payment-setup" className="pay__note" style={{ "--d": 4 }}>
              <span className="icon">
                {/* <PiUsersThreeBold size={26} /> */}
                <FaUsers size={26} />

              </span>
              <span className="pay__note-txt">
                <b>For platforms and marketplaces</b>
                <small>
                  Ask about provider-approved onboarding and payout integrations.
                </small>
              </span>
              <PiCaretRightBold className="pay__note-chev" />
            </Link>
          </div>

          {/* ---------- RIGHT : photo + cards ---------- */}
          <div className="pay__visual">
            <img className="pay__bg" src={paymentsBg} alt="" aria-hidden="true" />

            <div className="biz">
              <div className="biz__title">Your Businesses</div>
              {businesses.map((b, i) => (
                <div className="biz__row" key={b.name} style={{ "--i": i }}>
                  <img src={b.img} alt={b.name} loading="lazy" />
                  <div className="biz__info">
                    <div className="biz__name">{b.name}</div>
                    <div className="biz__ok">
                      <PiCheckCircleFill /> Account Connected
                    </div>
                  </div>
                  <PiCaretRightBold className="biz__chev" />
                </div>
              ))}
            </div>

            <div className="checkout">
              <div className="checkout__head">
                <PiShoppingCartSimpleBold /> Secure Checkout
              </div>
              <div className="checkout__prod">
                <img src={checkoutImg} alt="Product" loading="lazy" />
                <div className="checkout__skel">
                  <div className="sk" style={{ width: "100%" }} />
                  <div className="sk" style={{ width: "80%" }} />
                  <div className="sk" style={{ width: "55%" }} />
                </div>
              </div>
              <div className="field">Card Number</div>
              <div className="fields2">
                <div className="field">MM / YY</div>
                <div className="field">CVC</div>
              </div>
              <button type="button" className="checkout__btn">
                Pay Securely
              </button>
              <div className="checkout__note">
                <PiLockSimpleBold size={22} />
                <span>Secure checkout connected to your business account.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
