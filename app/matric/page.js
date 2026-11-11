import Link from "next/link";
import { supabase } from "@/lib/supabase";
export const dynamic = "force-dynamic";
export default async function Matric() {
  const { data } = await supabase.from("services").select("*").eq("category", "Matric dance").order("sort");
  return (<section><div className="wrap"><h2>Matric dance packages</h2>
    <p className="sub">Full glam and hair in one booking. Wigs must be customised.</p>
    {(data || []).map((m, i) => (
      <div className="pkc" key={m.id}><img src={`/matric-${i + 1}.jpg`} alt={`${m.name} look`} />
        <div className="bd"><h3>{m.name.replace("Matric ", "")}</h3>
          <div className="pr">R{(m.price_cents / 100).toLocaleString("en-ZA")}</div>
          <ul>{(m.description || "").split("|").map(x => <li key={x}>{x}</li>)}</ul>
          <small>{m.note}</small>
          <Link href={`/book?pkg=${m.id}`} className="btn dk">Book {m.name.replace("Matric ", "")}</Link></div></div>))}
  </div></section>);
}
