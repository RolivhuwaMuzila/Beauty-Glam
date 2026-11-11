
import "./globals.css";
import Nav from "@/components/Nav";
import Link from "next/link";
import { Playfair_Display, Figtree } from "next/font/google";

const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal", "italic"],
  variable: "--serif",
  display: "swap",
});

const sans = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--sans",
  display: "swap",
});

export const metadata = {
  title: "MakeUpBy_Koki",
  description:
    "Makeup, bridal, hair and customised wigs in Roodepoort, Florida. Book and pay online.",
};

const PHONE = "27794629524";
const FACEBOOK = "https://www.facebook.com/makeupby_koki";
const INSTAGRAM = "https://www.instagram.com/makeupby_koki";

const icon = (bg) => ({
  width: 36,
  height: 36,
  borderRadius: "50%",
  background: bg,
  color: "#fff",
  display: "grid",
  placeItems: "center",
  boxShadow: "0 3px 8px rgba(0,0,0,.2)",
  textDecoration: "none",
  flexShrink: 0,
});

const svg = {
  width: 19,
  height: 19,
};

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export default function RootLayout({ children }) {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP || PHONE;

  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable}`}>
        <Nav />

        {children}

        {/* COMPACT FOOTER */}
        <footer
          style={{
            padding: "12px 0",
            minHeight: "auto",
          }}
        >
          <div
            className="wrap"
            style={{
              textAlign: "center",
              paddingTop: 4,
              paddingBottom: 4,
            }}
          >
            {/* HORIZONTAL LOGO - NO CIRCLE */}
            <Link
              href="/"
              aria-label="MakeUpBy_Koki Home"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto 8px",
                textDecoration: "none",
              }}
            >
              <img
                src="/logo-nav.jpg"
                alt="MakeUpBy_Koki Logo"
                style={{
                  width: 180,
                  maxWidth: "80%",
                  height: "auto",
                  objectFit: "contain",
                  border: "none",
                  borderRadius: 0,
                  boxShadow: "none",
                }}
              />
            </Link>

            {/* BUSINESS SLOGAN */}
            <p
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "1rem",
                color: "#fff",
                margin: "4px 0",
              }}
            >
              Make up is ART. Beauty is SPIRIT!
            </p>

            {/* LOCATION */}
            <p
              style={{
                margin: "4px 0 10px",
                fontSize: "0.85rem",
              }}
            >
              Makeup Artist · Roodepoort, Florida
            </p>

            {/* SOCIAL MEDIA ICONS */}
            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {/* WHATSAPP */}
              <a
                href={`https://wa.me/${wa}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                style={icon("#25D366")}
              >
                <svg
                  viewBox="0 0 24 24"
                  style={svg}
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>

              {/* PHONE */}
              <a
                href={`tel:+${PHONE}`}
                aria-label="Call 079 462 9524"
                style={icon("#1fb5ad")}
              >
                <svg viewBox="0 0 24 24" style={svg} {...line}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 1 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>

              {/* FACEBOOK */}
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={icon("#1877f2")}
              >
                <svg viewBox="0 0 24 24" style={svg} {...line}>
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              {/* INSTAGRAM */}
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={icon("#e8497f")}
              >
                <svg viewBox="0 0 24 24" style={svg} {...line}>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
            </div>

            {/* CONTACT DETAILS */}
            <p
              style={{
                margin: "8px 0 0",
                fontSize: "0.8rem",
              }}
            >
              079 462 9524 · @makeupby_koki
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
