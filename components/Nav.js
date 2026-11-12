"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [["/", "Pricelist"], ["/matric", "Matric packages"], ["/shop", "Glueless wigs"], ["/book", "Book now"]];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]); // close the menu after choosing a page

  return (
    <header className="top"><div className="wrap"><nav>
      <Link href="/" className="brand"><img src="/logo-nav.jpg" alt="MakeUpBy_Koki" style={{ height: 52 }} /></Link>
      <button className={"burger " + (open ? "open" : "")} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /></button>
      <div className={"backdrop " + (open ? "open" : "")} onClick={() => setOpen(false)} />
      <div className={"links " + (open ? "open" : "")}>
        {links.map(([h, t]) => <Link key={h} href={h} className={path === h ? "on" : ""}>{t}</Link>)}
        <Link href="/book" className="menu-cta">Book your glam</Link>
      </div>
    </nav></div></header>
  );
}