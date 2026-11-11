"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [["/", "Pricelist"], ["/matric", "Matric packages"], ["/shop", "Glueless wigs"], ["/book", "Book now"]];
export default function Nav() {
  const path = usePathname();
  return (
    <header className="top"><div className="wrap"><nav>
      <Link href="/" className="brand"><img src="/logo-nav.jpg" alt="MakeUpBy_Koki" style={{ height: 52 }} /></Link>
      <div>{links.map(([h, t]) => <Link key={h} href={h} className={path === h ? "on" : ""}>{t}</Link>)}</div>
    </nav></div></header>
  );
}