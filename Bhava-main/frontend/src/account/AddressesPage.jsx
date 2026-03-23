import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AccountPage.module.css";
import { AccountSidebar } from "./ProfilePage";

export default function AddressesPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <AccountSidebar active="addresses" navigate={navigate} />
        <div className={styles.content}>
          <h1 className={styles.pageTitle}>Saved Addresses</h1>
          <div className={styles.card} style={{ textAlign: "center", padding: "48px 24px" }}>
            <svg viewBox="0 0 64 64" fill="none" style={{ width: 56, height: 56, margin: "0 auto 16px", display: "block", opacity: 0.4 }}>
              <path d="M32 6C21.5 6 13 14.5 13 25c0 14 19 33 19 33s19-19 19-33C51 14.5 42.5 6 32 6z" stroke="#888" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="32" cy="25" r="6" stroke="#888" strokeWidth="2"/>
            </svg>
            <p style={{ color: "#999", fontSize: "15px", margin: "0 0 20px" }}>No saved addresses yet.</p>
            <p style={{ color: "#bbb", fontSize: "13px" }}>Address management coming soon. Addresses will be saved during checkout.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
