import { useState } from "react";
import { Check } from "lucide-react";

/* Tabs that swap an animated panel.
   items: [{ id, icon, label, preview?, title?, text, points? }]
   preview is any JSX shown in the left box (animates in on every switch). */
export default function Explorer({ items, initial }) {
  const [id, setId] = useState(initial || items[0].id);
  const item = items.find((x) => x.id === id);

  return (
    <div className="svc-explorer">
      <div className="svc-explorer__tabs" role="tablist">
        {items.map((x) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={id === x.id}
            className={id === x.id ? "is-selected" : ""}
            onClick={() => setId(x.id)}
          >
            <span>{x.icon}</span>{x.label}
          </button>
        ))}
      </div>
      <div className={`svc-explorer__panel ${item.preview ? "" : "is-text"}`} key={item.id}>
        {item.preview && <div className="svc-explorer__preview">{item.preview}</div>}
        <div>
          <h3>{item.title || item.label}</h3>
          <p>{item.text}</p>
          {item.points?.length > 0 && (
            <ul>{item.points.map((p, i) => <li key={p} style={{ "--i": i }}><Check size={16} />{p}</li>)}</ul>
          )}
        </div>
      </div>
    </div>
  );
}
