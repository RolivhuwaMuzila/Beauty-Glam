
"use client";

import { useState } from "react";

export default function Admin() {
  const [key, setKey] = useState("");
  const [d, setD] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const [np, setNp] = useState({
    name: "",
    description: "",
    image_url: "",
    price: "",
    stock: "",
    closure: "",
    length: ""
  });

  // Load admin dashboard data
  async function load(k = key) {
    setLoading(true);
    setErr("");

    try {
      const r = await fetch("/api/admin", {
        headers: {
          "x-admin-key": k
        },
        cache: "no-store"
      });

      const j = await r.json();

      if (!r.ok || j.error) {
        setErr(j.error || "Failed to load admin data");
        return;
      }

      setD({
        ...j,
        bookings: Array.isArray(j.bookings) ? j.bookings : [],
        orders: Array.isArray(j.orders) ? j.orders : [],
        products: Array.isArray(j.products) ? j.products : []
      });

    } catch (error) {
      console.error("Admin loading error:", error);
      setErr("Unable to connect to the admin API.");
    } finally {
      setLoading(false);
    }
  }

  // Insert or update records
  async function act(table, id, values) {
    setErr("");

    try {
      const r = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "x-admin-key": key,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: id ? "update" : "insert",
          id,
          data: {
            table,
            values
          }
        })
      });

      const j = await r.json();

      if (!r.ok || j.error) {
        setErr(j.error || "Failed to save changes");
        return false;
      }

      await load();
      return true;

    } catch (error) {
      console.error("Admin action error:", error);
      setErr("Something went wrong while saving.");
      return false;
    }
  }

  // Admin login
  if (!d) {
    return (
      <section>
        <div className="wrap">
          <h2>Owner Login</h2>

          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              load();
            }}
          >
            <input
              type="password"
              placeholder="Admin password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
            />

            {err && <p className="err">{err}</p>}

            <button
              className="btn dk"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="wrap">

        <h1>MakeUpBy_Koki Admin Dashboard</h1>

        {err && <p className="err">{err}</p>}

        <button
          className="btn dk"
          onClick={() => load()}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh Dashboard"}
        </button>

        {/* BOOKINGS */}
        <h2>Bookings</h2>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Client</th>
              <th>Service</th>
              <th>Paid</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {(d?.bookings ?? []).length === 0 ? (
              <tr>
                <td colSpan="6">No bookings available.</td>
              </tr>
            ) : (
              (d?.bookings ?? []).map((b) => (
                <tr key={b.id}>
                  <td>
                    {b.booking_date} {b.booking_time}
                  </td>

                  <td>
                    {b.customer_name}
                    <br />
                    {b.customer_phone}
                  </td>

                  <td>{b.services?.name ?? "N/A"}</td>

                  <td>
                    R{((b.amount_cents ?? 0) / 100).toFixed(2)}
                  </td>

                  <td>
                    <span className="tag">
                      {b.status}
                    </span>
                  </td>

                  <td>
                    {b.status === "confirmed" && (
                      <button
                        onClick={() =>
                          act("booking", b.id, {
                            status: "completed"
                          })
                        }
                      >
                        Mark Done
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* HAIR ORDERS */}
        <h2>Hair Orders</h2>

        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {(d?.orders ?? []).length === 0 ? (
              <tr>
                <td colSpan="5">No hair orders available.</td>
              </tr>
            ) : (
              (d?.orders ?? []).map((o) => (
                <tr key={o.id}>
                  <td>
                    {o.customer_name}
                    <br />
                    {o.customer_phone}
                    <br />
                    {o.delivery_address}
                  </td>

                  <td>
                    {(Array.isArray(o.items) ? o.items : [])
                      .map(
                        (i) =>
                          `${i.name} × ${i.qty}`
                      )
                      .join(", ")}
                  </td>

                  <td>
                    R{((o.total_cents ?? 0) / 100).toFixed(2)}
                  </td>

                  <td>
                    <span className="tag">
                      {o.status}
                    </span>
                  </td>

                  <td>
                    {o.status === "paid" && (
                      <button
                        onClick={() =>
                          act("order", o.id, {
                            status: "shipped"
                          })
                        }
                      >
                        Mark Shipped
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* HAIR STOCK */}
        <h2>Hair Stock</h2>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {(d?.products ?? []).length === 0 ? (
              <tr>
                <td colSpan="4">No products available.</td>
              </tr>
            ) : (
              (d?.products ?? []).map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>

                  <td>
                    R{((p.price_cents ?? 0) / 100).toFixed(2)}
                  </td>

                  <td>
                    <input
                      type="number"
                      min="0"
                      defaultValue={p.stock ?? 0}
                      style={{ width: 80 }}
                      onBlur={(e) => {
                        const newStock = Number(e.target.value);

                        if (
                          Number.isInteger(newStock) &&
                          newStock >= 0 &&
                          newStock !== p.stock
                        ) {
                          act("product", p.id, {
                            stock: newStock
                          });
                        }
                      }}
                    />
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        act("product", p.id, {
                          active: !p.active
                        })
                      }
                    >
                      {p.active ? "Hide" : "Show"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* ADD NEW PRODUCT */}
        <h3>Add a Product</h3>

        <form
          className="form"
          onSubmit={async (e) => {
            e.preventDefault();

            const success = await act("product", null, {
              name: np.name,
              description: np.description,
              image_url: np.image_url,
              price_cents: Math.round(Number(np.price) * 100),
              stock: Number(np.stock),
              closure: np.closure || null,
              length_in: np.length
                ? Number(np.length)
                : null
            });

            if (success) {
              setNp({
                name: "",
                description: "",
                image_url: "",
                price: "",
                stock: "",
                closure: "",
                length: ""
              });
            }
          }}
        >
          <input
            required
            placeholder="Product Name"
            value={np.name}
            onChange={(e) =>
              setNp({ ...np, name: e.target.value })
            }
          />

          <input
            placeholder="Description"
            value={np.description}
            onChange={(e) =>
              setNp({ ...np, description: e.target.value })
            }
          />

          <input
            placeholder="Image URL"
            value={np.image_url}
            onChange={(e) =>
              setNp({ ...np, image_url: e.target.value })
            }
          />

          <input
            required
            type="number"
            min="0"
            step="0.01"
            placeholder="Price in Rands"
            value={np.price}
            onChange={(e) =>
              setNp({ ...np, price: e.target.value })
            }
          />

          <input
            required
            type="number"
            min="0"
            step="1"
            placeholder="Stock Quantity"
            value={np.stock}
            onChange={(e) =>
              setNp({ ...np, stock: e.target.value })
            }
          />

          <input
            placeholder="Closure (e.g. 4x4)"
            value={np.closure}
            onChange={(e) =>
              setNp({ ...np, closure: e.target.value })
            }
          />

          <input
            type="number"
            min="0"
            placeholder="Length in Inches"
            value={np.length}
            onChange={(e) =>
              setNp({ ...np, length: e.target.value })
            }
          />

          <button className="btn dk" type="submit">
            Add Product
          </button>
        </form>

      </div>
    </section>
  );
}
