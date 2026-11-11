import { admin } from "@/lib/admin";
import { initPaystack, rand } from "@/lib/paystack";
export async function POST(req) {
  try {
    const { service_id, date, time, name, email, phone } = await req.json();
    const { data: s } = await admin.from("services").select("*").eq("id", service_id).single();
    if (!s) return Response.json({ error: "Service not found" }, { status: 404 });
    const amount = Math.round(s.price_cents * s.deposit_percent / 100);
    const reference = rand("BK-");
    const { error } = await admin.from("bookings").insert({ service_id, booking_date: date, booking_time: time,
      customer_name: name, customer_email: email, customer_phone: phone, amount_cents: amount, reference });
    if (error) return Response.json({ error: "That slot was just taken. Please pick another time." }, { status: 409 });
    const url = await initPaystack({ email, amount_cents: amount, reference, metadata: { type: "booking" }, path: "/thank-you" });
    return Response.json({ url });
  } catch (e) { return Response.json({ error: e.message }, { status: 500 }); }
}
