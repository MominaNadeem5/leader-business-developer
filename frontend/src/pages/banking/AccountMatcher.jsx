import { useState } from "react";
import { Store, Banknote, Wallet, Percent, Plug, Globe, HandCoins, Zap, Trophy } from "lucide-react";

/* Pick what matters and see which TYPE of provider tends to fit.
   Scores are general tendencies (0–3), not ratings of any specific bank. */
const PRIORITIES = [
  { id: "branches", icon: <Store size={16} />, label: "In-person branches" },
  { id: "cash", icon: <Banknote size={16} />, label: "Cash deposits" },
  { id: "fees", icon: <Wallet size={16} />, label: "Low monthly fees" },
  { id: "interest", icon: <Percent size={16} />, label: "Interest on balances" },
  { id: "integrations", icon: <Plug size={16} />, label: "Software integrations" },
  { id: "intl", icon: <Globe size={16} />, label: "International wires" },
  { id: "lending", icon: <HandCoins size={16} />, label: "Lending relationship" },
  { id: "setup", icon: <Zap size={16} />, label: "Fast online setup" },
];

const TYPES = [
  { name: "Traditional bank", note: "Branch networks, full services and lending under one roof.", s: { branches: 3, cash: 3, fees: 1, interest: 1, integrations: 2, intl: 3, lending: 3, setup: 1 } },
  { name: "Online bank", note: "Digital-first banks, usually with fewer fees and no branches.", s: { branches: 0, cash: 1, fees: 3, interest: 3, integrations: 2, intl: 1, lending: 1, setup: 3 } },
  { name: "Credit union", note: "Member-owned, often local, with a community focus.", s: { branches: 2, cash: 3, fees: 2, interest: 2, integrations: 1, intl: 1, lending: 2, setup: 1 } },
  { name: "Fintech platform", note: "Software-led accounts where deposits are held at partner banks.", s: { branches: 0, cash: 0, fees: 3, interest: 2, integrations: 3, intl: 2, lending: 1, setup: 3 } },
];

export default function AccountMatcher() {
  const [picked, setPicked] = useState(["fees", "integrations", "setup"]);
  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const results = TYPES.map((t) => ({
    ...t,
    score: picked.length ? Math.round((picked.reduce((sum, id) => sum + t.s[id], 0) / (picked.length * 3)) * 100) : 0,
  })).sort((a, b) => b.score - a.score);

  return (
    <div className="bk-matcher">
      <div className="bk-matcher__pick">
        <h3>What matters most to you?</h3>
        <p>Tap everything that applies.</p>
        <div className="bk-matcher__chips">
          {PRIORITIES.map((p) => (
            <button key={p.id} type="button" aria-pressed={picked.includes(p.id)} className={picked.includes(p.id) ? "is-on" : ""} onClick={() => toggle(p.id)}>
              {p.icon}{p.label}
            </button>
          ))}
        </div>
      </div>
      <div className="bk-matcher__results">
        {picked.length === 0 ? (
          <p className="bk-matcher__empty">Pick at least one priority to see your match.</p>
        ) : results.map((r, i) => (
          <div key={r.name} className={`bk-matcher__row ${i === 0 ? "is-top" : ""}`}>
            <div className="bk-matcher__label">
              <strong>{i === 0 && <Trophy size={15} />}{r.name}</strong>
              <small>{r.note}</small>
            </div>
            <div className="bk-matcher__bar"><b style={{ width: `${r.score}%` }} /></div>
            <em>{r.score}%</em>
          </div>
        ))}
        <p className="bk-matcher__note">General tendencies only. Individual products vary, so always check the account's own terms.</p>
      </div>
    </div>
  );
}
