export async function initPaystack({ email, amount_cents, reference, metadata, path }) {
  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email, amount: amount_cents, currency: "ZAR", reference, metadata,
      callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}${path}` }),
  });
  const json = await res.json();
  if (!json.status) throw new Error(json.message);
  return json.data.authorization_url;
}
export const rand = (p) => p + require("crypto").randomBytes(6).toString("hex");
export const rands = (c) => "R" + (c / 100).toLocaleString("en-ZA", { minimumFractionDigits: 0 });
