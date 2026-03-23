import React, { useRef, useState } from "react";
import styles from "./ExploreByCategory.module.css";

const categories = [
  { title: "Seekers & Beginners",   sub: "Start your dharmic journey",  gradient: "linear-gradient(135deg, #3a1a5a 0%, #2a1a3a 100%)", titleColor: "#ffffff" },
  { title: "Saints & Sages",        sub: "Stories of enlightened beings", gradient: "linear-gradient(135deg, #1a3a3a 0%, #1a4a2a 100%)", titleColor: "#f59e42" },
  { title: "Bhagavad Gita Study",   sub: "Verse by verse wisdom",       gradient: "linear-gradient(135deg, #4a2a0a 0%, #3a1a0a 100%)", titleColor: "#ffffff" },
  { title: "Evening Contemplation", sub: "Night meditations & prayers", gradient: "linear-gradient(135deg, #1a1a4a 0%, #0a1a3a 100%)", titleColor: "#ffffff" },
  { title: "Devotional Music",      sub: "Bhajans & kirtans",           gradient: "linear-gradient(135deg, #4a0a2a 0%, #3a0a1a 100%)", titleColor: "#ffffff" },
  { title: "Vedic Astrology",       sub: "Jyotish & cosmic timing",     gradient: "linear-gradient(135deg, #1a3a1a 0%, #0a2a1a 100%)", titleColor: "#ffffff" },
];

function ExploreByCategory() {
  const trackRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollPos(max > 0 ? el.scrollLeft / max : 0);
  };

  return (
    <section className={styles.section}>
      <div className={styles.bg} />

      <div className={styles.header}>
        <div>
          <h2 className={styles.heading}>Explore by Category</h2>
          <p className={styles.subheading}>Find wisdom that resonates with you</p>
        </div>
        <div className={styles.nav}>
          <button className={styles.navBtn} onClick={() => trackRef.current?.scrollBy({ left: -300, behavior: "smooth" })}>‹</button>
          <button className={styles.navBtn} onClick={() => trackRef.current?.scrollBy({ left: 300, behavior: "smooth" })}>›</button>
        </div>
      </div>

      <div className={styles.track} ref={trackRef} onScroll={handleScroll}>
        {categories.map((c, i) => (
          <div key={i} className={styles.card} style={{ background: c.gradient }}>
            <div className={styles.cardBg} />
            <div className={styles.cardContent}>
              <h4 className={styles.cardTitle} style={{ color: c.titleColor }}>{c.title}</h4>
              <p className={styles.cardSub}>{c.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${Math.max(scrollPos * 100, 16)}%` }} />
      </div>
    </section>
  );
}

export default ExploreByCategory;