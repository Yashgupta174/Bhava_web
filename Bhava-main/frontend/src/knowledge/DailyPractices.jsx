import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DailyPractices.module.css";

const practices = [
  { img: "/Daily%20Practices/Daily%20Puja.png",      title: "Daily Puja",      sub: "Morning Worship",       detail: "15–28 min",       color: "#5a2a1a", route: "/knowledge/daily-puja" },
  { img: "/Daily%20Practices/Mantra%20Chanting.png", title: "Mantra Chanting", sub: "Sacred Sound",          detail: "108 repetitions", color: "#2a1a5a", route: "/knowledge/mantra-chanting" },
  { img: "/Daily%20Practices/Vedic%20Hymns.png",     title: "Vedic Hymns",     sub: "Ancient Wisdom",        detail: "7 min",           color: "#1a3a4a", route: "/knowledge/vedic-hymns" },
  { img: "/Daily%20Practices/Kurya%20Namaskar.png",  title: "Surya Namaskar",  sub: "Sun Salutation",        detail: "12 rounds",       color: "#5a1a2a", route: "/knowledge/surya-namaskar" },
  { img: "/Daily%20Practices/Gita%20Reading.png",    title: "Gita Reading",    sub: "Daily Verse",           detail: "5 min",           color: "#1a4a3a", route: "/knowledge/gita-reading" },
  { img: "/Daily%20Practices/Aarti.png",             title: "Aarti",           sub: "Evening Lamp Offering", detail: "10 min",          color: "#4a2a0a", route: "/knowledge/aarti" },
  { img: "/Daily%20Practices/Meditation.png",        title: "Meditation",      sub: "Dhyana Practice",       detail: "20 min",          color: "#2a1a4a", route: "/knowledge/meditation" },
  { img: "/Daily%20Practices/Japa%20Mala.png",       title: "Japa Mala",       sub: "Bead Meditation",       detail: "108 beads",       color: "#0a3a3a", route: "/knowledge/japa-mala" },
];

function DailyPractices() {
  const navigate = useNavigate();
  const trackRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollPos(max > 0 ? el.scrollLeft / max : 0);
  };

  const scrollLeft  = () => trackRef.current?.scrollBy({ left: -340, behavior: "smooth" });
  const scrollRight = () => trackRef.current?.scrollBy({ left: 340,  behavior: "smooth" });

  const atStart = scrollPos === 0;
  const atEnd   = scrollPos >= 0.99;

  const showLeft  = isHovered && !atStart;
  const showRight = isHovered && !atEnd;

  return (
    <section className={styles.section}>
      <div className={styles.bg} />

      <div className={styles.header}>
        <div>
          <h2 className={styles.heading}>Daily Practices</h2>
          <p className={styles.subheading}>Sacred routines for spiritual growth</p>
        </div>
      </div>

      <div
        className={styles.wrapper}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          className={`${styles.arrowBtn} ${showLeft ? styles.arrowVisible : styles.arrowHidden}`}
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          ‹
        </button>

        <div
          className={styles.track}
          ref={trackRef}
          onScroll={handleScroll}
        >
          {practices.map((p, i) => (
            <div
              key={i}
              className={styles.card}
              onClick={() => p.route && navigate(p.route)}
              style={{ cursor: p.route ? 'pointer' : 'default' }}
            >
              <div className={styles.cardThumb}>
                <img
                  src={p.img}
                  alt={p.title}
                  className={styles.thumbImg}
                />
                <div className={styles.thumbOverlay} />
              </div>

              <h4 className={styles.cardTitle}>{p.title}</h4>
              <p className={styles.cardSub}>{p.sub}</p>
            </div>
          ))}
        </div>

        <button
          className={`${styles.arrowBtn} ${showRight ? styles.arrowVisible : styles.arrowHidden}`}
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>

    </section>
  );
}

export default DailyPractices;
