import Link from "next/link";
export default function ThankYou() {
  return (<section><div className="wrap"><h2>Thank you, your payment is being confirmed.</h2>
    <p>You will hear from us on WhatsApp shortly. Keep your reference handy.</p><br /><Link href="/" className="btn">Back home</Link></div></section>);
}
