"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
const R = (c) => "R" + (c / 100).toLocaleString("en-ZA");
const TABS = ["Makeup", "Bridal", "Hair", "Matric dance"];
export default function Book() {
  const [services, setServices] = useState([]); const [tab, setTab] = useState("Makeup");
  const [sel, setSel] = useState(null); const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]); const [time, setTime] = useState("");
  const [f, setF] = useState({ name: "", email: "", phone: "" });
  const [busy, setBusy] = useState(false); const [err, setErr] = useState("");
  useEffect(() => {
    supabase.from("services").select("*").order("sort").then(({ data }) => {
      setServices(data || []);
      const id = new URLSearchParams(window.location.search).get("pkg");
      const s = (data || []).find(x => x.id === id);
      if (s) { setSel(s); setTab(s.category); }
    });
  }, []);
  useEffect(() => {
    if (date) fetch(`/api/slots?date=${date}`).then(r => r.json()).then(s => { setSlots(s); setTime(""); });
  }, [date]);
  const deposit = sel ? Math.round(sel.price_cents * sel.deposit_percent / 100) : 0;
  async function pay() {
    if (!sel || !date || !time || !f.name || !f.email || !f.phone) return setErr("Please complete all three steps.");
    setBusy(true); setErr("");
    const res = await fetch("/api/pay/booking", { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service_id: sel.id, date, time, ...f }) });
    const j = await res.json();
    if (j.url) window.location.href = j.url; else { setErr(j.error || "Something went wrong"); setBusy(false); }
  }
  return (<section><div className="wrap"><h2>Book your glam</h2>
    <p className="sub">Pay a deposit to lock in your slot. The balance is paid at your appointment.</p>
    <div className="bk"><div>
      <div className="step"><h3><span>1</span>Choose your service</h3>
        <div className="pills">{TABS.map(t => <button key={t} className={"pill " + (t === tab ? "on" : "")} onClick={() => setTab(t)}>{t}</button>)}</div>
        <div className="tiles">{services.filter(s => s.category === tab).map(s => (
          <button key={s.id} className={"tile " + (sel?.id === s.id ? "on" : "")} onClick={() => setSel(s)}>{s.name}<b>{R(s.price_cents)}{s.price_from ? "+" : ""}</b></button>))}</div></div>
      <div className="step"><h3><span>2</span>Pick a date and time</h3>
        <input type="date" min={new Date().toISOString().split("T")[0]} onChange={e => setDate(e.target.value)} />
        <div className="pills">{date && slots.length === 0 && <span className="note">No free slots on this date.</span>}
          {slots.map(t => <button key={t} className={"pill " + (t === time ? "on" : "")} onClick={() => setTime(t)}>{t}</button>)}</div></div>
      <div className="step"><h3><span>3</span>Your details</h3>
        <input placeholder="Full name" onChange={e => setF({ ...f, name: e.target.value })} />
        <input type="email" placeholder="Email" onChange={e => setF({ ...f, email: e.target.value })} />
        <input placeholder="WhatsApp number" onChange={e => setF({ ...f, phone: e.target.value })} /></div>
    </div>
    <aside className="sum"><h3>Your booking</h3>
      <div className="row"><span>Service</span><span>{sel ? sel.name : "Not chosen"}</span></div>
      <div className="row"><span>When</span><span>{date ? date + (time ? " at " + time : "") : "Not chosen"}</span></div>
      <div className="row"><span>Total</span><span>{R(sel ? sel.price_cents : 0)}</span></div>
      <div className="note" style={{ marginTop: 12 }}>Deposit due now</div><div className="big">{R(deposit)}</div>
      {err && <p className="note" style={{ marginBottom: 10 }}>{err}</p>}
      <button className="btn" disabled={busy} onClick={pay}>{busy ? "One moment..." : "Pay deposit securely"}</button></aside>
    </div></div></section>);
}
