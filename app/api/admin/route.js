import { admin } from "@/lib/admin";
const ok = (req) => req.headers.get("x-admin-key") === process.env.ADMIN_PASSWORD && !!process.env.ADMIN_PASSWORD;
export async function GET(req) {
  if (!ok(req)) return Response.json({ error: "Wrong password" }, { status: 401 });
  const [b, o, p, s] = await Promise.all([
    admin.from("bookings").select("*, services(name)").neq("status", "pending").order("booking_date", { ascending: false }).limit(100),
    admin.from("orders").select("*").neq("status", "pending").order("created_at", { ascending: false }).limit(100),
    admin.from("products").select("*").order("name"), admin.from("services").select("*").order("name")]);
  return Response.json({ bookings: b.data, orders: o.data, products: p.data, services: s.data });
}
export async function POST(req) {
  if (!ok(req)) return Response.json({ error: "Wrong password" }, { status: 401 });
  const { action, id, data } = await req.json();
  const t = { booking: "bookings", order: "orders", product: "products", service: "services" }[data?.table];
  if (action === "update" && t) await admin.from(t).update(data.values).eq("id", id);
  if (action === "insert" && t) await admin.from(t).insert(data.values);
  return Response.json({ ok: true });
}
