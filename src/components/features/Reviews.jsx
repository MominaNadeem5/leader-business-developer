import { PiStarFill, PiQuotesFill, PiInfoBold } from "react-icons/pi";
import useInView from "../../hooks/useInView";
import "./Reviews.css";

/* Sample testimonials: placeholder copy and fictional names, shown for layout purposes only.
   Replace with real, permission-approved client reviews before launch. */
const reviews = [
  {
    name: "Taylor Brooks",
    role: "Founder, online retail startup",
    text: "Forming my LLC was far simpler than I expected. The process took less than a week, and the payment setup was seamless.",
    rating: 5
  },
  {
    name: "Daniel Reyes",
    role: "E-commerce seller",
    text: "I was unsure about business banking, but the guidance made it stress-free. I now have a professional setup and can focus on growing.",
    rating: 5,
    featured: true
  },
  {
    name: "Morgan Hayes",
    role: "Independent consultant",
    text: "The website setup was fast, professional and affordable. I'd recommend it to anyone starting their business journey.",
    rating: 5
  }
];

const initials = (name) => name.split(" ").map((p) => p[0]).join("");

export default function Reviews() {
  const [ref, inView] = useInView();

  return (
    <section className="section">
      <div className="container">
        <div ref={ref} className={`reviews-wrapper ${inView ? "is-in" : ""}`}>
          <div className="eyebrow">Client reviews</div>
          <h2>What our clients say</h2>
          <p className="sub">Trusted by entrepreneurs across the country</p>
          <span className="reviews-note">
            <PiInfoBold size={14} aria-hidden="true" />
            Sample testimonials shown for illustration
          </span>

          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <figure
                className={`review-card${review.featured ? " review-card--featured" : ""}`}
                key={review.name}
                style={{ "--i": index }}
              >
                <PiQuotesFill className="review-card__quote" size={44} aria-hidden="true" />
                <div className="review-card__rating" aria-label={`${review.rating} out of 5 stars`}>
                  {[...Array(review.rating)].map((_, i) => (
                    <PiStarFill key={i} size={16} />
                  ))}
                </div>
                <blockquote className="review-card__text">{review.text}</blockquote>
                <figcaption className="review-card__author">
                  <span className="review-card__avatar" aria-hidden="true">{initials(review.name)}</span>
                  <span className="review-card__who">
                    <span className="review-card__name">{review.name}</span>
                    <span className="review-card__role">{review.role}</span>
                  </span>
                  <span className="review-card__tag">Sample</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
