import { PiStarFill, PiQuotesBold } from "react-icons/pi";
import useInView from "../../hooks/useInView";
import "./Reviews.css";

const reviews = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    text: "Leader Business Developer made forming my LLC incredibly simple. The whole process took less than a week, and their payment solutions integration was seamless.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "E-commerce Entrepreneur",
    text: "I was hesitant about setting up business banking, but their guidance made it stress-free. Now I have a professional setup that helps me focus on growing my business.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Freelance Consultant",
    text: "The website setup service exceeded my expectations. Professional, fast, and affordable. Highly recommend for anyone starting their business journey.",
    rating: 5
  }
];

export default function Reviews() {
  const [ref, inView] = useInView();

  return (
    <section className="section">
      <div className="container">
        <div ref={ref} className={`reviews-wrapper ${inView ? "is-in" : ""}`}>
          <div className="eyebrow">Client reviews</div>
          <h2>What our clients say</h2>
          <p className="sub">Trusted by entrepreneurs across the country</p>

          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <div className="review-card" key={index} style={{ "--i": index }}>
                <div className="review-card__quote">
                  <PiQuotesBold size={32} />
                </div>
                <div className="review-card__rating">
                  {[...Array(review.rating)].map((_, i) => (
                    <PiStarFill key={i} size={16} />
                  ))}
                </div>
                <p className="review-card__text">{review.text}</p>
                <div className="review-card__author">
                  <div className="review-card__name">{review.name}</div>
                  <div className="review-card__role">{review.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
