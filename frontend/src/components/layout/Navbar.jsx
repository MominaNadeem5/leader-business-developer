import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Building2,
  CreditCard,
  Globe,
  Layers,
  Shield,
  FileText,
  Palette,
  Mail,
  Phone,
  Rocket,
  TrendingUp,
  Building,
  Scale,
  BookOpen,
  Zap,
  UserRound,
  MapPin,
} from "lucide-react";

import Button from "../common/Button";
import logo from "../../assets/logo.png";
import "./Navbar.css";

// Normal links (without dropdown)
const links = [];

// Dropdown menus
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
          {
            label: "Form a Corporation (C / S Corp)",
            to: "/business/corporation",
          },
          {
            label: "Register a Trade Name (DBA)",
            to: "/business/dba",
          },
          {
            label: "Go Solo: Sole Proprietor",
            to: "/business/sole-proprietor",
          },
          {
            label: "State & Federal Filing",
            to: "/business/federal-filing",
          },
        ],
      },
      {
        title: "Grow & Manage",
        icon: <TrendingUp />,
        viewAll: "/business/manage",
        items: [
          { label: "Compliance Shield", to: "/business/compliance" },
          {
            label: "Annual Report Filing",
            to: "/business/annual-report",
          },
          { label: "Licenses & Permits", to: "/business/licenses" },
          { label: "Get Your EIN & ITIN", to: "/business/ein" },
          {
            label: "Operating Agreement",
            to: "/business/operating-agreement",
          },
          {
            label: "Registered Agent Service",
            to: "/business/registered-agent",
          },
          {
            label: "Virtual Address",
            to: "/business/virtual-address",
          },
        ],
      },
      {
        title: "Safeguard Your Brand",
        icon: <Shield />,
        viewAll: "/business/protect",
        items: [
          {
            label: "Secure Your Trademark",
            to: "/business/trademark",
          },
          {
            label: "Deep Trademark Search",
            to: "/business/trademark-search",
          },
          {
            label: "Quick Free Name Check",
            to: "/business/free-name-check",
          },
          {
            label: "Brand Watch Alerts",
            to: "/business/brand-watch",
          },
          {
            label: "Patent-Pending Filing",
            to: "/business/provisional-patent",
          },
          {
            label: "Copyright Protection",
            to: "/business/copyright",
          },
        ],
      },
    ],
    hasProjectCTA: true,
  },

  {
    label: "Payment",
    match: ["/payment", "/banking", "/merchant", "/payment-integration"],
    columns: [
      {
        title: "Banking Solution",
        icon: <Building />,
        viewAll: "/banking",
        items: [
          {
            label: "Virtual Bank Account",
            to: "/banking/virtual-bank",
          },
          {
            label: "Physical Bank Account",
            to: "/banking/physical-bank",
          },
          {
            label: "Business Bank Account Guidance",
            to: "/banking/business-account-guidance",
          },
        ],
      },
      {
        title: "Merchant Solution",
        icon: <CreditCard />,
        viewAll: "/merchant",
        items: [
          {
            label: "Merchant Account Services",
            to: "/merchant/merchant-account",
          },
          {
            label: "POS Solutions",
            to: "/merchant/pos-terminal",
          },
          {
            label: "Virtual Terminal Solutions",
            to: "/merchant/virtual-terminal",
          },
        ],
      },
      {
        title: "Payment Integration",
        icon: <Layers />,
        viewAll: "/payment-integration",
        items: [
          {
            label: "Payment Gateway Customization",
            to: "/payment-integration/gateway",
          },
          {
            label: "Stripe, Square, PayPal Setup",
            to: "/payment-integration/stripe-square-paypal",
          },
          {
            label: "Shopify & WooCommerce Integration",
            to: "/payment-integration/shopify-woocommerce",
          },
          {
            label: "API Integration",
            to: "/payment-integration/api",
          },
        ],
      },
    ],
    hasProjectCTA: true,
  },

  {
    label: "Services",
    match: ["/ecommerce", "/website", "/branding", "/marketing"],
    columns: [
      {
        title: "Ecommerce Solution",
        icon: <Globe />,
        viewAll: "/ecommerce",
        items: [
          {
            label: "Product Listing & Catalog Setup",
            to: "/ecommerce/product-listing",
          },
          {
            label: "Shopping Cart & Checkout Setup",
            to: "/ecommerce/cart-checkout",
          },
          {
            label: "Inventory & Order Management",
            to: "/ecommerce/inventory-orders",
          },
          {
            label: "Shipping & Fulfillment Setup",
            to: "/ecommerce/shipping",
          },
          {
            label: "Marketplace Integration (eBay, Etsy, Walmart)",
            to: "/ecommerce/marketplaces",
          },
          {
            label: "Amazon Setup",
            to: "/ecommerce/amazon-setup",
          },
        ],
      },
      {
        title: "Website Setup",
        icon: <Building />,
        viewAll: "/website",
        items: [
          {
            label: "Domain & Hosting Setup",
            to: "/website/domain-hosting",
          },
          {
            label: "WordPress Setup",
            to: "/website/wordpress",
          },
          {
            label: "Shopify Setup",
            to: "/website/shopify",
          },
          {
            label: "E-commerce Setup",
            to: "/website/ecommerce-setup",
          },
          {
            label: "Website Maintenance",
            to: "/website/maintenance",
          },
        ],
      },
      {
        title: "Branding & Digital Identity",
        icon: <Palette />,
        viewAll: "/branding",
        items: [
          {
            label: "Profile Optimization",
            to: "/branding/profile-optimization",
          },
          {
            label: "Logo & Visual Design",
            to: "/branding/logo-design",
          },
          {
            label: "Business Email & Digital Cards",
            to: "/branding/email-digital-cards",
          },
        ],
      },
      {
        title: "Marketing Services",
        icon: <TrendingUp />,
        viewAll: "/marketing",
        items: [
          {
            label: "Google Ads",
            to: "/marketing/google-ads",
          },
          {
            label: "Twitter Ads",
            to: "/marketing/twitter-ads",
          },
          {
            label: "Meta Ads",
            to: "/marketing/meta-ads",
          },
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
        title: "Legal Form",
        icon: <FileText />,
        viewAll: "/forms/legal",
        items: [
          {
            label: "Business Contract ",
            to: "/forms/contract",
          },
          {
            label: "Partnership Agreement",
            to: "/forms/templates/partnership",
          },
          {
            label: "Non-Disclosure Agreement (NDA)",
            to: "/forms/templates/nda",
          },
          {
            label: "Service Agreement",
            to: "/forms/templates/service-agreement",
          },
          {
            label: "Invoice & Receipt",
            to: "/forms/invoice",
          },
        ],
      },
      {
        title: "Legal Forms",
        icon: <Scale />,
        viewAll: "/forms/legal",
        items: [
          {
            label: "Articles of Organization",
            to: "/forms/legal/articles-of-organization",
          },
          {
            label: "LLC Operating Agreement",
            to: "/forms/legal/operating-agreement",
          },
          {
            label: "DBA Registration Form",
            to: "/forms/legal/dba",
          },
          {
            label: "EIN Application (SS-4)",
            to: "/forms/legal/ein",
          },
          {
            label: "Annual Report Form",
            to: "/forms/legal/annual-report",
          },
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
          {
            label: "Starting Your First Business",
            to: "/resources/learn/start-business",
          },
          {
            label: "LLC or Corporation?",
            to: "/resources/learn/llc-vs-corporation",
          },
          {
            label: "Picking a Business Name",
            to: "/resources/learn/business-name",
          },
          {
            label: "Staying Compliant",
            to: "/resources/learn/compliance",
          },
        ],
      },
      {
        title: "Free Tools",
        icon: <Zap />,
        viewAll: "/resources/tools",
        items: [
          {
            label: "Business Name Generator",
            to: "/resources/tools/name-generator",
          },
          {
            label: "Name Availability Check",
            to: "/resources/tools/name-check",
          },
          {
            label: "Compliance Health Check",
            to: "/resources/tools/compliance-check",
          },
          {
            label: "Startup Cost Calculator",
            to: "/resources/tools/cost-calculator",
          },
        ],
      },
    ],
    hasProjectCTA: true,
  },
];

function isActive(link, { pathname, hash }) {
  if (link.hash) {
    return pathname === link.to && hash === link.hash;
  }

  if (link.to === "/") {
    return pathname === "/" && hash === "";
  }

  return pathname.startsWith(link.to);
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const location = useLocation();
  const listRef = useRef(null);

  const closeAll = () => {
    setOpen(false);
    setOpenMenu(null);
  };

  // Lock page scroll behind the full-height mobile menu.
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Close dropdown on outside click or Escape.
  useEffect(() => {
    const onClick = (event) => {
      if (
        listRef.current &&
        !listRef.current.contains(event.target)
      ) {
        setOpenMenu(null);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeAll();
      }
    };

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // Close menus when route changes.
  useEffect(() => {
    closeAll();
  }, [location.pathname, location.hash]);

  return (
    <header className="nav">
      <div className="container nav__row">
        <Link
          to="/"
          onClick={() => {
            closeAll();
            // Already on the landing page: the route won't change, so scroll up ourselves.
            if (location.pathname === "/" && !location.hash) {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <img
            src={logo}
            alt="Leader Business Developer"
            className="nav__logo"
          />
        </Link>

        <ul
          ref={listRef}
          className={`nav__links ${open ? "is-open" : ""}`}
        >
          {menus.map((menu) => {
            const isOpen = openMenu === menu.label;

            // While a dropdown is open, only that menu is highlighted;
            // otherwise highlight the menu for the current page's section.
            const active = openMenu
              ? isOpen
              : menu.match.some(
                  (path) =>
                    location.pathname === path ||
                    location.pathname.startsWith(`${path}/`)
                );

            return (
              <li key={menu.label}>
                <button
                  type="button"
                  className={`nav__link nav__trigger ${
                    active ? "is-active" : ""
                  }`}
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenMenu(isOpen ? null : menu.label)
                  }
                >
                  {menu.label}

                  <ChevronDown
                    size={16}
                    className={`nav__chevron ${
                      isOpen ? "is-flipped" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="nav__mega">
                    <div className="container nav__mega-grid">
                      {menu.columns.map((column) => (
                        <section
                          key={column.title}
                          className="nav__mega-col"
                        >
                          <h3 className="nav__mega-title">
                            {column.icon && (
                              <span className="nav__mega-icon">
                                {column.icon}
                              </span>
                            )}

                            {column.title}
                          </h3>

                          <ul>
                            {column.items.map((item) => (
                              <li key={item.label}>
                                <Link
                                  to={item.to}
                                  className="nav__mega-link"
                                  onClick={closeAll}
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>

                          <hr className="nav__mega-divider" />

                          <Link
                            to={column.viewAll}
                            className="nav__mega-all"
                            onClick={closeAll}
                          >
                            View All
                          </Link>
                        </section>
                      ))}

                      {menu.hasProjectCTA && (
                        <section className="nav__mega-cta">
                          <div className="nav__mega-cta-icon">
                            <Rocket size={32} />
                          </div>

                          <h3 className="nav__mega-cta-title">
                            Start Your Project
                          </h3>

                          <p className="nav__mega-cta-text">
                            Need a custom business solution? Tell us
                            what you're building. Our team can combine
                            formation, payments, websites, APIs,
                            automation and business support into one
                            tailored solution.
                          </p>

                          <Button
                            to="/get-started"
                            onClick={closeAll}
                          >
                            Start a Project
                            <ArrowRight size={18} />
                          </Button>

                          <div className="nav__mega-cta-contact">
                            <div className="nav__mega-cta-contact-item">
                              <Phone size={16} />
                              <span>+1 (815) 566-8220</span>
                            </div>

                            <div className="nav__mega-cta-contact-item">
                              <Mail size={16} />
                              <span>
                                support@leaderbusinessdeveloper.com
                              </span>
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

          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={
                  link.hash
                    ? {
                        pathname: link.to,
                        hash: link.hash,
                      }
                    : link.to
                }
                className={`nav__link ${
                  isActive(link, location) ? "is-active" : ""
                }`}
                onClick={closeAll}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Mobile only: contact details */}
          <li className="nav__mobile-contact">
            <a href="tel:+18155668220">
              <Phone size={18} />
              <span>+1 (815) 566-8220</span>
            </a>
            <a href="mailto:support@leaderbusinessdeveloper.com">
              <Mail size={18} />
              <span>support@leaderbusinessdeveloper.com</span>
            </a>
            <p>
              <MapPin size={18} />
              <span>1500 N Grant St #4438, Denver, CO 80203</span>
            </p>
          </li>

          {/* Mobile only: the header buttons are hidden below 900px, so they live in the opened menu */}
          <li className="nav__mobile-actions">
            <Button variant="outline" to="/login" onClick={closeAll}>
              <UserRound size={18} />
              Sign In
            </Button>

            <Button to="/get-started" onClick={closeAll}>
              Get Started
              <ArrowRight size={18} />
            </Button>
          </li>
        </ul>

        <div className="nav__actions">
          <Button variant="outline" to="/login">
            Sign In
          </Button>

          <Button to="/get-started">
            Get Started
            <ArrowRight size={18} />
          </Button>
        </div>

        <Link
          to="/login"
          className="nav__user"
          aria-label="Sign in"
          onClick={closeAll}
        >
          <UserRound size={18} />
        </Link>

        <button
          type="button"
          className="nav__toggle"
          onClick={() => {
            setOpen((previous) => !previous);
            setOpenMenu(null);
          }}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}