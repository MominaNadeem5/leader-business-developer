import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Search, SearchX, Star, X, Phone, Rocket } from "lucide-react";
import Seo from "../../components/common/Seo";
import { CATEGORIES, SERVICES } from "./servicesData";
import "./Services.css";

const PATH = "/services";
const SEO = {
  title: "All Services | Leader Business Developer",
  description:
    "Browse every Leader Business Developer service: company formation, compliance, banking, payments, ecommerce, websites, branding, marketing and legal forms.",
  keywords: ["business services", "LLC formation", "business banking", "merchant account", "legal forms", "ecommerce setup"],
};

const matches = (s, term) =>
  !term || `${s.title} ${s.short} ${s.categoryLabel}`.toLowerCase().includes(term);

export default function Services() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const active = params.get("category") || "all";
  const popularOnly = params.get("popular") === "1";
  const term = q.trim().toLowerCase();

  const update = (changes) => {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    setParams(next, { replace: true });
  };

  // Counts reflect the search term + popular toggle, so the chips always tell the truth.
  const base = useMemo(
    () => SERVICES.filter((s) => matches(s, term) && (!popularOnly || s.popular)),
    [term, popularOnly]
  );
  const counts = useMemo(() => {
    const c = {};
    base.forEach((s) => (c[s.category] = (c[s.category] || 0) + 1));
    return c;
  }, [base]);

  const groups = CATEGORIES.filter((c) => (active === "all" || c.id === active) && counts[c.id]).map((c) => ({
    ...c,
    list: base.filter((s) => s.category === c.id),
  }));
  const total = groups.reduce((n, g) => n + g.list.length, 0);
  const filtered = Boolean(term) || active !== "all" || popularOnly;
  const reset = () => setParams({}, { replace: true });

  return (
    <div className="sv-page">
      <Seo {...SEO} path={PATH} />

      {/* ---------- Hero ---------- */}
      <section className="sv-hero">
        <div className="container sv-hero__inner">
          <span className="sv-eyebrow">All Services</span>
          <h1>Everything your business needs, <em>in one place</em></h1>
          <p>
            From forming your company to getting paid, selling online and growing, browse {SERVICES.length} services
            across {CATEGORIES.length} categories and start with the one that fits.
          </p>

          <label className="sv-search">
            <Search size={20} aria-hidden="true" />
            <input
              type="search"
              value={q}
              onChange={(e) => update({ q: e.target.value })}
              placeholder="Search services, e.g. LLC, EIN, Shopify, trademark"
              aria-label="Search services"
            />
            {q && (
              <button type="button" aria-label="Clear search" onClick={() => update({ q: "" })}>
                <X size={16} />
              </button>
            )}
          </label>
        </div>
      </section>

      {/* ---------- Filters ---------- */}
      <div className="sv-filters">
        <div className="container sv-filters__inner">
          <div className="sv-chips" role="group" aria-label="Filter by category">
            <button
              type="button"
              className={`sv-chip ${active === "all" ? "is-on" : ""}`}
              aria-pressed={active === "all"}
              onClick={() => update({ category: "" })}
            >
              All <span>{base.length}</span>
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`sv-chip ${active === c.id ? "is-on" : ""}`}
                aria-pressed={active === c.id}
                disabled={!counts[c.id] && active !== c.id}
                onClick={() => update({ category: c.id })}
              >
                <c.icon size={15} aria-hidden="true" /> {c.label} <span>{counts[c.id] || 0}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className={`sv-pop ${popularOnly ? "is-on" : ""}`}
            aria-pressed={popularOnly}
            onClick={() => update({ popular: popularOnly ? "" : "1" })}
          >
            <Star size={15} aria-hidden="true" /> Popular only
          </button>
        </div>
      </div>

      {/* ---------- Results ---------- */}
      <section className="sv-results">
        <div className="container">
          <div className="sv-count" aria-live="polite">
            <span>
              Showing <b>{total}</b> of {SERVICES.length} services
              {term && <> for “{q.trim()}”</>}
            </span>
            {filtered && (
              <button type="button" onClick={reset}>
                <X size={14} /> Clear filters
              </button>
            )}
          </div>

          {groups.map((g) => (
            <div key={g.id} className="sv-group" id={`sv-${g.id}`}>
              <header className="sv-group__head">
                <span className="sv-group__icon"><g.icon size={22} /></span>
                <div>
                  <h2>{g.label}</h2>
                  <p>{g.blurb}</p>
                </div>
                {g.hub && (
                  <Link to={g.hub} className="sv-group__all">
                    Overview <ArrowRight size={15} />
                  </Link>
                )}
              </header>

              <div className="sv-grid">
                {g.list.map((s) => (
                  <Link to={s.path} key={s.path} className="sv-card">
                    <div className="sv-card__top">
                      <span className="sv-card__icon"><s.icon size={22} /></span>
                      {s.popular && <span className="sv-tag sv-tag--pop"><Star size={11} /> Popular</span>}
                      {s.free && <span className="sv-tag sv-tag--free">Free{s.time ? ` · ${s.time}` : ""}</span>}
                    </div>
                    <h3>{s.title}</h3>
                    <p>{s.short}</p>
                    <span className="sv-card__go">
                      Learn more <ArrowRight size={15} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {!total && (
            <div className="sv-empty">
              <SearchX size={40} aria-hidden="true" />
              <h2>No services match your search</h2>
              <p>Try a different keyword, or clear your filters to see everything.</p>
              <button type="button" className="sv-btn" onClick={reset}>Show all services</button>
            </div>
          )}
        </div>
      </section>

      {/* ---------- Help band ---------- */}
      <section className="sv-help">
        <div className="container sv-help__inner">
          <div>
            <h2>Not sure where to start?</h2>
            <p>Tell us about your business and we&apos;ll recommend the right services, or talk to a specialist for free.</p>
          </div>
          <div className="sv-help__actions">
            <Link to="/get-started" className="sv-btn sv-btn--light">
              <Rocket size={17} /> Get Started <ArrowRight size={16} />
            </Link>
            <Link to="/consultation" className="sv-btn sv-btn--ghost">
              <Phone size={16} /> Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
