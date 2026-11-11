import { admin } from "@/lib/admin";
import crypto from "crypto";
export async function POST(req) {
  const raw = await req.text();
  const hash = crypto.createHmac("sha512", process.env.PAYSTACK_SECRET_KEY).update(raw).digest("hex");
  if (hash !== req.headers.get("x-paystack-signature")) return new Response("Invalid signature", { status: 401 });
  const event = JSON.parse(raw);
  if (event.event === "charge.success") {
    const ref = event.data.reference;
    if (ref.startsWith("BK-")) await admin.from("bookings").update({ status: "confirmed" }).eq("reference", ref);
    if (ref.startsWith("OR-")) {
      const { data: order } = await admin.from("orders").update({ status: "paid" }).eq("reference", ref).eq("status", "pending").select().single();
      if (order) for (const l of order.items) {
        const { data: p } = await admin.from("products").select("stock").eq("id", l.product_id).single();
        await admin.from("products").update({ stock: Math.max(0, p.stock - l.qty) }).eq("id", l.product_id);
      }
    }
  }
  return new Response("ok");
}
