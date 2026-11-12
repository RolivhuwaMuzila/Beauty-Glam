import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Pricelist from "@/components/Pricelist";
export const dynamic = "force-dynamic";
export default async function Home() {
  const { data } = await supabase.from("services").select("*").neq("category", "Matric dance").order("sort");
  return (<>
    <div className="hero"><div className="wrap">
      <div><h1 className="slogan"><span className="s1">Make up is</span><span className="s2">ART.</span><span className="s3">Beauty is Spirit!</span></h1>
        <p>Makeup, bridal and customised wigs by Koki in Roodepoort, Florida. Pick your slot, pay a deposit, and show up glowing.</p>
        <Link href="/book" className="btn">Book your glam</Link><Link href="/matric" className="btn line">Matric packages</Link></div>
      <div className="collage"><img className="a" src="/matric-2.jpg" alt="Client with a customised wig" />
        <img className="b" src="/matric-3.jpg" alt="Client with an up-do style" /></div>
    </div></div>
    <section><div className="wrap"><h2>The pricelist</h2>
      <p className="sub">Effective from 1 March 2026. A + means the price starts there.</p>
      <Pricelist services={data || []} /></div></section>
  </>);
}