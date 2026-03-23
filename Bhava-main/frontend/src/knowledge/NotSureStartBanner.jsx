import React, { useState } from "react";
import styles from "./NotSureStartBanner.module.css";

const plans = [
  {
    joined: "287K joined",
    title: "14 Days of Sacred Practice",
    desc: "Begin your spiritual journey with guided daily practices, mantra chanting, and Vedic wisdom.",
    gradient: "linear-gradient(100deg, #2a1a5a 0%, #5a1a4a 55%, #7a1a3a 100%)",
  },
  {
    joined: "156K joined",
    title: "21-Day Mantra Initiation",
    desc: "Awaken sacred sound within. Commit to 108 daily repetitions and unlock the power of Vedic mantras.",
    gradient: "linear-gradient(100deg, #1a3a2a 0%, #2a4a1a 55%, #1a2a0a 100%)",
  },
  {
    joined: "412K joined",
    title: "7-Day Dharma Reset",
    desc: "Realign your life with ancient Dharmic principles. Simple, powerful, life-changing practices.",
    gradient: "linear-gradient(100deg, #3a1a0a 0%, #5a2a0a 55%, #4a1a2a 100%)",
  },
];

function NotSureStartBanner() {
  const [current, setCurrent] = useState(0);
  const plan = plans[current];

  const goNext = () => setCurrent((p) => (p + 1) % plans.length);
  const goPrev = () => setCurrent((p) => (p - 1 + plans.length) % plans.length);

  return (
    <section className={styles.section}>
      <div className={styles.bg} />

      <div className={styles.headerRow}>
        <h2 className={styles.heading}>Not sure where to start?</h2>
      </div>

      <div className={styles.bannerWrap}>
        {/* Main banner */}
        <div className={styles.banner} style={{ background: plan.gradient }}>
          <div className={styles.bannerTexture} />

          <div className={styles.bannerLeft}>
            <div className={styles.joinedRow}>
              {/* sparkle icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
              </svg>
              <span className={styles.joinedText}>{plan.joined}</span>
            </div>

            <h3 className={styles.bannerTitle}>{plan.title}</h3>
            <p className={styles.bannerDesc}>{plan.desc}</p>

            <div className={styles.bannerBtns}>
              <button className={styles.btnStart}>Start Plan</button>
              <button className={styles.btnDetails}>Details</button>
            </div>
          </div>

          {/* Right decorative gradient panels — matching screenshot */}
          <div className={styles.bannerRight}>
            <div className={styles.rightPanel1} />
            <div className={styles.rightPanel2} />
          </div>

          {/* Next arrow */}
          <button className={styles.nextArrow} onClick={goNext}>→</button>
        </div>

        {/* Dots */}
        <div className={styles.dots}>
          {plans.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default NotSureStartBanner;