import { Check, X } from "lucide-react";

/* columns: header labels (first column is the row label)
   rows: [label, ...cells]. A cell of true/false renders a check / cross.
   highlight: index of the column to emphasise (e.g. "us"). */
export default function CompareTable({ columns, rows, highlight }) {
  const cell = (v) => {
    if (v === true) return <Check size={18} className="svc-yes" aria-label="Yes" />;
    if (v === false) return <X size={18} className="svc-no" aria-label="No" />;
    return v;
  };

  return (
    <div className="svc-table-wrap">
      <table className="svc-table">
        <thead>
          <tr>{columns.map((c, i) => <th key={i} className={i === highlight ? "is-hl" : ""}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map(([label, ...cells]) => (
            <tr key={label}>
              <td><strong>{label}</strong></td>
              {cells.map((v, i) => <td key={i} className={i + 1 === highlight ? "is-hl" : ""}>{cell(v)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
