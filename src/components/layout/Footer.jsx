import { Link } from "react-router-dom";
import Button from "../common/Button";
import logo from "../../assets/logo.png";
import visa from "../../assets/visa.svg";
import mastercard from "../../assets/pay.svg";
import amex from "../../assets/american-express.svg";
import discover from "../../assets/discover.svg";
import paypal from "../../assets/paypal.svg";
import gpay from "../../assets/g-pay.svg";
import { Phone, Mail, Lock, Check, CreditCard, Landmark, ArrowUp } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import "./Footer.css";

export default function Footer() {
  const companyLinks = [
    { label: "About Us", to: "/about" },
    { label: "Our Services", to: "/services" },
    { label: "Contact Us", to: "/contact" },
    { label: "FAQs", to: "/resources/support/faqs" },
    { label: "Book a Consultation", to: "/consultation" },
    { label: "Request a Quote", to: "/get-started" },
  ];

  const popularServices = [
    { label: "LLC & Company Registration", to: "/business/llc" },
    { label: "EIN Assistance", to: "/business/ein" },
    { label: "Business Bank Guidance", to: "/banking" },
    { label: "Merchant Solutions", to: "/merchant" },
    { label: "WordPress Development", to: "/website/wordpress" },
    { label: "Shopify Development", to: "/website/shopify" },
    { label: "CRM Integration", to: "/integrations/crm" },
    { label: "Business Automation", to: "/integrations/automation" },
  ];

  const supportLinks = [
    { label: "Support Hub", to: "/resources/support" },
    { label: "Help Center", to: "/resources/support/help" },
    { label: "Order Status", to: "/order-status" },
    { label: "Security", to: "/security" },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms & Conditions", to: "/terms" },
    { label: "Refund Policy", to: "/refund" },
  ];

  const footerPoints = [
    "Business, digital and technology support",
    "Support for U.S. and international entrepreneurs",
    "Professional project communication and assistance",
  ];

  const socialLinks = [
    { Icon: FaFacebookF, to: "#", label: "Facebook" },
    { Icon: FaInstagram, to: "#", label: "Instagram" },
    { Icon: FaXTwitter, to: "#", label: "X (Twitter)" },
    { Icon: FaLinkedinIn, to: "#", label: "LinkedIn" },
  ];

  const paymentMethods = [
    { name: "Visa", icon: visa },
    { name: "Mastercard", icon: mastercard },
    { name: "American Express", icon: amex },
    { name: "Discover", icon: discover },
    { name: "PayPal", icon: paypal },
    { name: "Google Pay", icon: gpay },
    { name: "Credit & debit cards", Icon: CreditCard },
    { name: "Bank payments", Icon: Landmark },
  ];

  const linkGroups = [
    { title: "Company", links: companyLinks },
    { title: "Popular Services", links: popularServices },
    { title: "Support & Legal", links: supportLinks },
  ];

  return (
    <footer className="footer">
      {/* Main Footer Section */}
      <div className="container footer__main">
        {/* Brand */}
        <div className="footer__col footer__col--brand">
          <div className="footer__logo-card">
            <img src={logo} alt="Leader Business Developer" className="footer__logo" />
          </div>
          <p className="footer__description">
            Leader Business Developer helps entrepreneurs start and run U.S. businesses with confidence. From LLC and corporation formation to EIN assistance, state and federal filings, and ongoing compliance support, we handle the paperwork so you can focus on growth.
          </p>
          <ul className="footer__points">
            {footerPoints.map((point) => (
              <li key={point}>
                <span className="footer__point-icon"><Check size={13} strokeWidth={3} /></span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="footer__social">
            <h4 className="footer__social-title">Follow Us</h4>
            <div className="footer__social-links">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.to} className="footer__social-link" aria-label={social.label}>
                  <social.Icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="footer__col footer__col--links">
          {linkGroups.map((group) => (
            <div className="footer__links-group" key={group.title}>
              <h4 className="footer__heading">{group.title}</h4>
              <ul className="footer__link-list">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="footer__col footer__col--contact">
          <h4 className="footer__heading">Contact Us</h4>
          <div className="footer__contact-card">
            <div className="footer__contact-item">
              <span className="footer__contact-icon"><Phone size={18} /></span>
              <div>
                <strong>Phone</strong>
                <a href="tel:+18155668220">+1 (815) 566-8220</a>
              </div>
            </div>
            <div className="footer__contact-item">
              <span className="footer__contact-icon"><Mail size={18} /></span>
              <div>
                <strong>Email</strong>
                <a href="mailto:support@leaderbusinessdeveloper.com">support@leaderbusinessdeveloper.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="footer__payment">
        <div className="container footer__payment-content">
          <div className="footer__payment-info">
            <div className="footer__payment-header">
              <span className="footer__payment-lock"><Lock size={16} /></span>
              <div>
                <h4>SECURE PAYMENTS</h4>
                <p className="footer__payment-text">We Accept Major Payment Methods</p>
              </div>
            </div>
          </div>
          <div className="footer__payment-methods">
            {paymentMethods.map((method) => (
              <div key={method.name} className="footer__payment-icon" title={method.name}>
                {method.icon ? <img src={method.icon} alt={method.name} /> : <method.Icon size={24} aria-label={method.name} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer__copyright">
        <div className="container footer__copyright-content">
          <span>© {new Date().getFullYear()} Leader Business Developer. All Rights Reserved.</span>
          <div className="footer__copyright-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/refund">Refund Policy</Link>
            <Link to="/security">Security</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <button
            type="button"
            className="footer__top"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
