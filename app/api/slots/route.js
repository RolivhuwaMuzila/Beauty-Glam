import { admin } from "@/lib/admin";
const HOURS = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"];
export async function GET(req) {
  const date = new URL(req.url).searchParams.get("date");
  // free slots held by unpaid bookings older than 15 minutes
  const cutoff = new Date(Date.now() - 15 * 60 * 1000).toISOString();
  await admin.from("bookings").delete().eq("status", "pending").lt("created_at", cutoff);
  const { data } = await admin.from("bookings").select("booking_time").eq("booking_date", date).in("status", ["pending","confirmed"]);
  const taken = (data || []).map(b => b.booking_time);
  return Response.json(HOURS.filter(h => !taken.includes(h)));
}
