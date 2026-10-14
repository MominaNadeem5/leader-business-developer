import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, ChevronDown, Building2, CreditCard, Globe, Briefcase, Layers, Shield, FileText, Palette, Mail, Phone, Rocket, Play, TrendingUp, Building, Scale, BookOpen, Zap, HelpCircle } from "lucide-react";
import Button from "../common/Button";
import logo from "../../assets/logo.png";
import "./Navbar.css";

// Normal links (bina dropdown)
const links = [];

// Dropdown menus (apni routes yahan set karein)
const menus = [
  {
    label: "Business",
    match: ["/business"],
    columns: [
      {
        title: "Business Information",
        icon: <Building2 />,
        viewAll: "/business",
        items: [
          { label: "Start an LLC", to: "/business/llc" },
          { label: "Form a Corporation (C / S Corp)", to: "/business/corporation" },
          { label: "Register a Trade Name (DBA)", to: "/business/dba" },
          { label: "Go Solo: Sole Proprietor", to: "/business/sole-proprietor" },
          { label: "State & Federal Filling", to: "/business/federal-filling" },
        ],
      },
      {
        title: "Grow & Manage",
        icon: <TrendingUp />,
        viewAll: "/business/manage",
        items: [
          { label: "Compliance Shield", to: "/business/compliance" },
          { label: "Annual Report Filing", to: "/business/annual-report" },
          { label: "Licenses & Permits", to: "/business/licenses" },
          { label: "Get Your EIN & ITN", to: "/business/ein" },
          { label: "Operating Agreement", to: "/business/operating-agreement" },
          { label: "Registered Agent Service", to: "/business/registered-agent" },
          { label: "Virtual Address", to: "/business/virtual-mailbox" },
        ],
      },
      {
        title: "Safeguard Your Brand",
        icon: <Shield />,
        viewAll: "/business/protect",
        items: [
          { label: "Secure Your Trademark", to: "/business/trademark" },
          { label: "Deep Trademark Search", to: "/business/trademark-search" },
          { label: "Quick Free Name Check", to: "/business/free-name-check" },
          { label: "Brand Watch Alerts", to: "/business/brand-watch" },
          { label: "Patent-Pending Filing", to: "/business/provisional-patent" },
          { label: "Copyright Protection", to: "/business/copyright" },
        ],
      },
    ],
    hasProjectCTA: true,
  },
  {
    label: "Payment",
    match: ["/payment", "/banking", "/merchant"],
    columns: [
      {
        title: "Banking Solution",
        icon: <Building />,
        viewAll: "/banking",
        items: [
          { label: "Virtual Bank Account", to: "/banking/virtual-bank" },
          { label: "Physical Bank Account", to: "/banking/physical-bank" },
          { label: "Business Bank Account Guidance", to: "/banking/physical-bank" },
        ],
      },
      {
        title: "Merchant Solution",
        icon: <CreditCard />,
        viewAll: "/merchant",
        items: [
          { label: "Merchant Account Services", to: "/merchant/merchant-account" },
          { label: "POS Solutions", to: "/merchant/pos-terminal" },
          { label: "Virtual Terminal Solutions", to: "/merchant/pos-terminal" },
        ],
      },
      {
        title: "Payment Integration",
        icon: <Layers />,
        viewAll: "/payment-integration",
        items: [
          { label: "Payment Gateway Customization", to: "/payment-integration/gateway" },
          { label: "Stripe, Square, PayPal Setup", to: "/payment-integration/stripe-square-paypal" },
          { label: "Shopify & WooCommerce Integration", to: "/payment-integration/shopify-woocommerce" },
          { label: "API Integration", to: "/payment-integration/api" },
        ],
      },
    ],
    hasProjectCTA: true,
  },
  {
    label: "Services",
    match: ["/ecommerce", "/website", "/branding"],
    columns: [
      {
        title: "Ecommerce Solution",
        icon: <Globe />,
        viewAll: "/ecommerce",
        items: [
          { label: "Product Listing & Catalog Setup", to: "/ecommerce/product-listing" },
          { label: "Shopping Cart & Checkout Setup", to: "/ecommerce/cart-checkout" },
          { label: "Inventory & Order Management", to: "/ecommerce/inventory-orders" },
          { label: "Shipping & Fulfillment Setup", to: "/ecommerce/shipping" },
          { label: "Marketplace Integration (eBay, Etsy, Walmart)", to: "/ecommerce/marketplaces" },
          { label: "Amazon Setup", to: "/website/amazon" },
        ],
      },
      {
        title: "Website Setup",
        icon: <Building />,
        viewAll: "/website",
        items: [
          { label: "Domain & Hosting Setup", to: "/website/domain-hosting" },
          { label: "WordPress Setup", to: "/website/wordpress" },
          { label: "Shopify Setup", to: "/website/shopify" },
          { label: "Website Maintaince", to: "/website/shopify" },
        ],
      },
      {
        title: "Branding & Digital Identity",
        icon: <Palette />,
        viewAll: "/branding",
        items: [
          { label: "Profile Optimization", to: "/branding/profile-optimization" },
          { label: "Logo & Visual Design", to: "/branding/logo-design" },
          { label: "Business Email & Digital Cards", to: "/branding/email-digital-cards" },
        ],
      },
      {
        title: "Marketing Section",
        icon: <TrendingUp />,
        viewAll: "/marketing",
        items: [
          { label: "Google ads", to: "/website/domain-hosting" },
          { label: "Twitter ads", to: "/website/wordpress" },
          { label: "Meta ads ", to: "/website/shopify" },
        ],
      },
    ],
    hasProjectCTA: true,
  },
  {
    label: "Forms",
    match: ["/forms"],
    columns: [
      {
        title: "Legal Form Templates",
        icon: <FileText />,
        viewAll: "/forms/templates",
        items: [
          { label: "Business Contract Template", to: "/forms/templates/contract" },
          { label: "Partnership Agreement", to: "/forms/templates/partnership" },
          { label: "Non-Disclosure Agreement (NDA)", to: "/forms/templates/nda" },
          { label: "Service Agreement", to: "/forms/templates/service-agreement" },
          { label: "Invoice & Receipt Template", to: "/forms/templates/invoice" },
        ],
      },
      {
        title: "Legal Forms",
        icon: <Scale />,
        viewAll: "/forms/legal",
        items: [
          { label: "Articles of Organization", to: "/forms/legal/articles-of-organization" },
          { label: "LLC Operating Agreement", to: "/forms/legal/operating-agreement" },
          { label: "DBA Registration Form", to: "/forms/legal/dba" },
          { label: "EIN Application (SS-4)", to: "/forms/legal/ein" },
          { label: "Annual Report Form", to: "/forms/legal/annual-report" },
        ],
      },
    ],
    hasProjectCTA: true,
  },
  {
    label: "Resources",
    match: ["/resources", "/contact"],
    columns: [
      {
        title: "Learn",
        icon: <BookOpen />,
        viewAll: "/resources/learn",
        items: [
          { label: "Starting Your First Business", to: "/resources/learn/start-business" },
          { label: "LLC or Corporation?", to: "/resources/learn/llc-vs-corporation" },
          { label: "Picking a Business Name", to: "/resources/learn/business-name" },
          { label: "Staying Compliant", to: "/resources/learn/compliance" },
        ],
      },
      {
        title: "Free Tools",
        icon: <Zap />,
        viewAll: "/resources/tools",
        items: [
          { label: "Business Name Generator", to: "/resources/tools/name-generator" },
          { label: "Name Availability Check", to: "/resources/tools/name-check" },
          { label: "Compliance Health Check", to: "/resources/tools/compliance-check" },
          { label: "Startup Cost Calculator", to: "/resources/tools/cost-calculator" },
        ],
      },
      {
        title: "Support",
        icon: <HelpCircle />,
        viewAll: "/resources/support",
        items: [
          { label: "Help Center", to: "/resources/support/help" },
          { label: "FAQs", to: "/resources/support/faqs" },
          { label: "Book a Consultation", to: "/get-started" },
          { label: "Contact Us", to: "/contact" },
        ],
      },
    ],
    hasProjectCTA: true,
  },
];

function isActive(link, { pathname, hash }) {
  if (link.hash) return pathname === link.to && hash === link.hash;
  if (link.to === "/") return pathname === "/" && hash === "";
  return pathname.startsWith(link.to);
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // "Business" | "Payment" | null
  const location = useLocation();
  const listRef = useRef(null);

  const closeAll = () => {
    setOpen(false);
    setOpenMenu(null);
  };

  // bahar click ya Escape par dropdown band
  useEffect(() => {
    const onClick = (e) => {
      if (listRef.current && !listRef.current.contains(e.target)) setOpenMenu(null);
    };
    const onKey = (e) => e.key === "Escape" && setOpenMenu(null);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="nav">
      <div className="container nav__row">
        <Link to="/" onClick={closeAll}>
          <img src={logo} alt="Leader Business Developer" className="nav__logo" />
        </Link>

        <ul ref={listRef} className={`nav__links ${open ? "is-open" : ""}`}>
          {menus.map((m) => {
            const isOpen = openMenu === m.label;
            const active = isOpen || m.match.some((p) => location.pathname.startsWith(p));
            return (
              <li key={m.label}>
                <button
                  type="button"
                  className={`nav__link nav__trigger ${active ? "is-active" : ""}`}
                  aria-expanded={isOpen}
                  onClick={() => setOpenMenu(isOpen ? null : m.label)}
                >
                  {m.label}
                  <ChevronDown size={16} className={`nav__chevron ${isOpen ? "is-flipped" : ""}`} />
                </button>

                {isOpen && (
                  <div className="nav__mega">
                    <div className="container nav__mega-grid">
                      {m.columns.map((col) => (
                        <section key={col.title} className="nav__mega-col">
                          <h3 className="nav__mega-title">
                            {col.icon && <span className="nav__mega-icon">{col.icon}</span>}
                            {col.title}
                          </h3>
                          <ul>
                            {col.items.map((item) => (
                              <li key={item.label}>
                                <Link to={item.to} className="nav__mega-link" onClick={closeAll}>
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <hr className="nav__mega-divider" />
                          <Link to={col.viewAll} className="nav__mega-all" onClick={closeAll}>
                            View All
                          </Link>
                        </section>
                      ))}

                      {m.hasProjectCTA && (
                        <section className="nav__mega-cta">
                          <div className="nav__mega-cta-icon">
                            <Rocket size={32} />
                          </div>
                          <h3 className="nav__mega-cta-title">Start Your Project</h3>
                          <p className="nav__mega-cta-text">
                            Need a custom business solution? Tell us what you're building. Our team can combine formation, payments, websites, APIs, automation and business support into one tailored solution.
                          </p>
                          <Button to="/get-started" onClick={closeAll}>
                            Start a Project <ArrowRight size={18} />
                          </Button>
                          <div className="nav__mega-cta-contact">
                            <div className="nav__mega-cta-contact-item">
                              <Phone size={16} />
                              <span>+1 (815) 566-8220</span>
                            </div>
                            <div className="nav__mega-cta-contact-item">
                              <Mail size={16} />
                              <span>support@leaderbusinessdeveloper.com</span>
                            </div>
                          </div>
                        </section>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}

          {links.map((l) => (
            <li key={l.label}>
              <Link
                to={l.hash ? { pathname: l.to, hash: l.hash } : l.to}
                className={`nav__link ${isActive(l, location) ? "is-active" : ""}`}
                onClick={closeAll}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav__actions">
          <Button variant="outline" to="/sign-in">Sign In</Button>
          <Button to="/get-started">Get Started <ArrowRight size={18} /></Button>
        </div>

        <button className="nav__toggle" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}