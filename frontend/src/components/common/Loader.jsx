import "./Loader.css";

/**
 * Full-screen brand loader. Reusable: render it while something is loading,
 * and pass `leaving` to fade it out before unmounting.
 */
export default function Loader({ label = "Loading", leaving = false }) {
  return (
    <div
      className={`lbd-loader${leaving ? " is-leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="lbd-loader__mark" aria-hidden="true">
        <svg className="lbd-loader__ring" viewBox="0 0 120 120">
          <circle className="lbd-loader__track" cx="60" cy="60" r="54" />
          <circle className="lbd-loader__arc" cx="60" cy="60" r="54" />
        </svg>
        <div className="lbd-loader__bars">
          <span />
          <span />
          <span />
          <i className="lbd-loader__dot" />
        </div>
      </div>

      <p className="lbd-loader__label">
        {label}
        <span className="lbd-loader__ellipsis" aria-hidden="true">
          <i>.</i>
          <i>.</i>
          <i>.</i>
        </span>
      </p>
    </div>
  );
}
