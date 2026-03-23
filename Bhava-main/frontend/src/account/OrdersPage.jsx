import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AccountPage.module.css";
import { AccountSidebar } from "./ProfilePage";

const BASE = import.meta.env.VITE_API_URL || "";

const STATUS_COLORS = {
  pending:   { bg: "#fff8e6", color: "#b87a00" },
  confirmed: { bg: "#e8f5ee", color: "#2e7d52" },
  shipped:   { bg: "#e8f0ff", color: "#3a5fcf" },
  delivered: { bg: "#e8f5ee", color: "#2e7d52" },
  cancelled: { bg: "#ffeaea", color: "#c0392b" },
};

export default function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("bhava_token");
    if (!token) { navigate("/auth"); return; }

    (async () => {
      try {
        const res = await fetch(`${BASE}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setOrders(data.orders);
        else setError(data.message || "Failed to load orders.");
      } catch {
        setError("Unable to connect. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <AccountSidebar active="orders" navigate={navigate} />

        <div className={styles.content}>
          <h1 className={styles.pageTitle}>My Orders</h1>

          {loading && <p className={styles.loadingText}>Loading your orders...</p>}
          {error   && <p className={styles.errorMsg}>{error}</p>}

          {!loading && !error && orders.length === 0 && (
            <div className={styles.emptyOrders}>
              <svg viewBox="0 0 64 64" fill="none" className={styles.emptyOrdersIcon}>
                <circle cx="32" cy="32" r="30" stroke="#c9b99a" strokeWidth="2"/>
                <path d="M22 20h20l-3 22H25L22 20Z" stroke="#c9b99a" strokeWidth="2" strokeLinejoin="round"/>
                <circle cx="28" cy="48" r="2" fill="#c9b99a"/>
                <circle cx="38" cy="48" r="2" fill="#c9b99a"/>
              </svg>
              <h3 className={styles.emptyOrdersTitle}>No orders yet</h3>
              <p className={styles.emptyOrdersText}>Your sacred collection awaits. Start shopping to see your orders here.</p>
              <button className={styles.shopBtn} onClick={() => navigate("/products")}>
                Browse Products
              </button>
            </div>
          )}

          {!loading && orders.length > 0 && (
            <div className={styles.ordersList}>
              {orders.map(order => {
                const colors = STATUS_COLORS[order.status] || STATUS_COLORS.pending;
                const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric",
                });
                return (
                  <div key={order._id} className={styles.orderCard}>
                    {/* Order header */}
                    <div className={styles.orderCardHeader}>
                      <div>
                        <p className={styles.orderId}>Order #{String(order._id).slice(-8).toUpperCase()}</p>
                        <p className={styles.orderDate}>{date}</p>
                      </div>
                      <span
                        className={styles.statusBadge}
                        style={{ background: colors.bg, color: colors.color }}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>

                    {/* Items */}
                    <div className={styles.orderItems}>
                      {order.items.map((item, i) => (
                        <div key={i} className={styles.orderItem}>
                          <div className={styles.orderItemImg}>
                            {item.image
                              ? <img src={item.image} alt={item.title} />
                              : <span>🪔</span>
                            }
                          </div>
                          <div className={styles.orderItemInfo}>
                            <p className={styles.orderItemCategory}>{item.category}</p>
                            <p className={styles.orderItemTitle}>{item.title}</p>
                            <p className={styles.orderItemMeta}>Qty: {item.quantity} · {item.price}</p>
                          </div>
                          <p className={styles.orderItemTotal}>
                            ₹{(parseInt(String(item.price).replace(/[₹,]/g,""),10) * item.quantity).toLocaleString("en-IN")}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className={styles.orderCardFooter}>
                      <span className={styles.orderType}>
                        {order.type === "preorder" ? "Pre-Order" : "Order"}
                      </span>
                      <span className={styles.orderTotal}>
                        Total: <strong>₹{order.amount.toLocaleString("en-IN")}</strong>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
