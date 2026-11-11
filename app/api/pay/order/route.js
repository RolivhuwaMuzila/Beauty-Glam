import { admin } from "@/lib/admin";
import { initPaystack, rand } from "@/lib/paystack";
export async function POST(req) {
  try {
    const { items, name, email, phone, address } = await req.json();
    const { data: prods } = await admin.from("products").select("*").in("id", items.map(i => i.id));
    let total = 0; const lines = [];
    for (const i of items) {
      const p = (prods || []).find(x => x.id === i.id);
      if (!p || i.qty < 1 || p.stock < i.qty) return Response.json({ error: `${p?.name || "An item"} is out of stock` }, { status: 400 });
      total += p.price_cents * i.qty;
      lines.push({ product_id: p.id, name: p.name, qty: i.qty, price_cents: p.price_cents });
    }
    const reference = rand("OR-");
    await admin.from("orders").insert({ customer_name: name, customer_email: email, customer_phone: phone,
      delivery_address: address, items: lines, total_cents: total, reference });
    const url = await initPaystack({ email, amount_cents: total, reference, metadata: { type: "order" }, path: "/thank-you" });
    return Response.json({ url });
  } catch (e) { return Response.json({ error: e.message }, { status: 500 }); }
}
