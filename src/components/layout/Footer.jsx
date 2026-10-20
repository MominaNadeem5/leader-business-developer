import { Link } from "react-router-dom";
import Button from "../common/Button";
import logo from "../../assets/logo.png";
import visa from "../../assets/visa.svg";
import mastercard from "../../assets/pay.svg";
import amex from "../../assets/american-express.svg";
import discover from "../../assets/discover.svg";
import paypal from "../../assets/paypal.svg";
import gpay from "../../assets/g-pay.svg";
import { MapPin, Phone, Mail, Lock, Check, CreditCard, Landmark, ArrowUp } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import "./Footer.css";

export default function Footer() {
  const companyLinks = [
    { label: "About Us", to: "/about" },
    { label: "Our Services", to: "/services" },
    { label: "Contact Us", to: "/contact" },
    { label: "FAQs", to: "/faqs" },
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
    { label: "Customer Care", to: "/support" },
    { label: "Help Center", to: "/help" },
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

  return (
    <footer className="footer">
      {/* Main Footer Section */}
      <div className="container footer__main">
        {/* Left Column - Logo & Description */}
        <div className="footer__col footer__col--brand">
          <div className="footer__logo-card">
            <img src={logo} alt="Leader Business Developer" className="footer__logo" />
          </div>
          <p className="footer__description">
            Leader Business Developer provides professional business-support, administrative, digital and technology services for entrepreneurs and growing businesses. We help clients organize important business requirements and build the systems needed to operate professionally.
          </p>
          <ul className="footer__points">
            {footerPoints.map((point, index) => (
              <li key={index}>
                <Check size={16} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="footer__social">
            <h4 className="footer__social-title">FOLLOW US</h4>
            <div className="footer__social-links">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.to} className="footer__social-link" aria-label={social.label}>
                  <social.Icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Columns - Links */}
        <div className="footer__col footer__col--links">
          <div className="footer__links-group">
            <h4 className="footer__heading">Company</h4>
            <ul className="footer__link-list">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__heading">Popular Services</h4>
            <ul className="footer__link-list">
              {popularServices.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__heading">Support & Legal</h4>
            <ul className="footer__link-list">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - Contact */}
        <div className="footer__col footer__col--contact">
          <h4 className="footer__heading">Contact Us</h4>
          <div className="footer__contact-item">
            <span className="footer__contact-icon"><MapPin size={18} /></span>
            <div>
              <strong>Business Address</strong>
              <span>1500 N Grant St #4438, Denver, CO 80203</span>
            </div>
          </div>
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

      {/* Payment Methods Section */}
      <div className="footer__payment">
        <div className="container footer__payment-content">
          <div className="footer__payment-info">
            <div className="footer__payment-header">
              <Lock size={20} />
              <h4>SECURE PAYMENTS</h4>
            </div>
            <p className="footer__payment-text">
              We Accept Major Payment Methods
            </p>
            <p className="footer__payment-desc">
              Pay conveniently using supported credit cards, debit cards, digital wallets, bank-based payment options and approved online payment methods. Availability may vary depending on the payment channel and transaction.
            </p>
          </div>
          <div className="footer__payment-methods">
            {paymentMethods.map((method, index) => (
              <div key={index} className="footer__payment-icon" title={method.name}>
                {method.icon ? <img src={method.icon} alt={method.name} /> : <method.Icon size={26} aria-label={method.name} />}
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