import React from "react";
import styles from "./SacredJourney.module.css";

function SacredJourney() {
  return (
    <section className={styles.sacredJourneySection}>
      <div className={styles.sacredContent}>
        <h1 className={styles.sacredTitle}>
          <span className={styles.titleBegin}>Begin Your </span>
          <span className={styles.titleSacred}>Sacred Journey</span>
        </h1>

        <p className={styles.sacredDescription}>
          Join 10K+ devotees who've already transformed their spiritual practice. Pre-order our launch
          collections now and lock in founding member pricing (30% discount). Limited slots available.
        </p>

        <div className={styles.sacredButtons}>
          <button className={styles.btnPreorder}>Pre-Order Now (₹1,299)</button>
        </div>
      </div>
    </section>
  );
}

export default SacredJourney;
