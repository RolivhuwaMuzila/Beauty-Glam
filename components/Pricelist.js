"use client";
import { useState } from "react";
const R = (c) => "R" + (c / 100).toLocaleString("en-ZA");
export default function Pricelist({ services }) {
  const tabs = ["Makeup", "Bridal", "Hair"];
  const [tab, setTab] = useState("Makeup");
  return (<>
    <div className="pills">{tabs.map(t => <button key={t} className={"pill " + (t === tab ? "on" : "")} onClick={() => setTab(t)}>{t}</button>)}</div>
    <div className="list">{services.filter(s => s.category === tab).map(s => (
      <div className="it" key={s.id}><span>{s.name}</span><b>{R(s.price_cents)}{s.price_from ? "+" : ""}</b></div>))}</div>
  </>);
}
