import React from "react";
import styles from "./FundRaiser.module.css";

function FundRaiser() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        {/* Left — 40% description */}
        <div className={styles.content}>
          <span className={styles.badge}>Fundraiser</span>

          <h2 className={styles.title}>
            Pray for Families affected in Middle East amid War
          </h2>

          <p className={styles.date}>Apr 01 – 10</p>

          <p className={styles.joined}>20K+ Joined</p>

          <div className={styles.buttons}>
            <button className={styles.btnJoin}>Join</button>
            <button className={styles.btnDetails}>Details</button>
          </div>
        </div>

        {/* Right — 60% image */}
        <div className={styles.imageWrapper}>
          <img
            src="./Fund Raiser.png"
            alt="Pray for Families affected in Middle East amid War"
            className={styles.image}
          />
          <div className={styles.imageOverlay} />
        </div>
      </div>
    </section>
  );
}

export default FundRaiser;
