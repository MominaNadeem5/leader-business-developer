/* Icon + title + text card.
   variant "card" = big tile with icon on top, "tile" = compact row. */
export default function IconCard({ icon, title, text, variant = "card", style }) {
  if (variant === "tile") {
    return (
      <div className="svc-tile" style={style}>
        <span className="svc-tile__icon">{icon}</span>
        <div><strong>{title}</strong><small>{text}</small></div>
      </div>
    );
  }
  return (
    <div className="svc-card" style={style}>
      <div className="svc-card__icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
