import { useEffect } from "react";

const SITE = (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");

/* Find or create a <meta>/<link> tag in <head> and set one attribute on it. */
function upsert(tag, key, keyValue, attr, value) {
  let el = document.head.querySelector(`${tag}[${key}="${keyValue}"]`);
  if (!el) {
    el = document.createElement(tag);
    el.setAttribute(key, keyValue);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/* Per-page SEO: title, description, keywords, canonical, Open Graph,
   plus optional FAQPage structured data. faqs: [question, answer][]
   robots: e.g. "noindex, nofollow"; removed again when the page unmounts. */
export default function Seo({ title, description, keywords = [], path, faqs, robots }) {
  useEffect(() => {
    if (!robots) return;
    upsert("meta", "name", "robots", "content", robots);
    return () => document.head.querySelector('meta[name="robots"]')?.remove();
  }, [robots]);

  useEffect(() => {
    document.title = title;
    upsert("meta", "name", "description", "content", description);
    if (keywords.length) upsert("meta", "name", "keywords", "content", keywords.join(", "));
    upsert("meta", "property", "og:title", "content", title);
    upsert("meta", "property", "og:description", "content", description);
    upsert("meta", "property", "og:type", "content", "website");
    if (SITE && path) {
      upsert("link", "rel", "canonical", "href", `${SITE}${path}`);
      upsert("meta", "property", "og:url", "content", `${SITE}${path}`);
    }
  }, [title, description, keywords, path]);

  if (!faqs?.length) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />;
}
