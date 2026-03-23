import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LatestTeachings.module.css";

const teachings = [
  {
    title: "Karma & Dharma",
    category: "Philosophy",
    image: "/Latest%20Teachings/Karma%20Dharma.png",
    tagColor: "#3a2a6a",
    color: "#1a1a3a",
    route: "/knowledge/karma-dharma",
  },
  {
    title: "Divine Grace",
    category: "Devotion",
    image: "/Latest%20Teachings/Divine%20Grace.png",
    tagColor: "#6a2a3a",
    color: "#3a1a2a",
    route: "/knowledge/divine-grace",
  },
  {
    title: "Inner Peace",
    category: "Meditation",
    image: "/Latest%20Teachings/Inner%20Peace.png",
    tagColor: "#2a3a6a",
    color: "#1a2a3a",
    route: "/knowledge/inner-peace",
  },
  {
    title: "Sacred Traditions",
    category: "Rituals",
    image: "/Latest%20Teachings/Sacred%20Traditions.png",
    tagColor: "#5a3a0a",
    color: "#2a1a0a",
    route: "/knowledge/sacred-traditions",
  },
  {
    title: "Path of Union",
    category: "Yoga Sutras",
    image: "/Latest%20Teachings/Path%20of%20Union.png",
    tagColor: "#1a4a2a",
    color: "#0a2a1a",
    route: "/knowledge/path-of-union",
  },
  {
    title: "Non-Dual Wisdom",
    category: "Advaita",
    image: "/Latest%20Teachings/Non%20Dual%20Wisdom.png",
    tagColor: "#4a1a6a",
    color: "#2a0a3a",
    route: "/knowledge/non-dual-wisdom",
  },
];

function LatestTeachings() {
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

  const scrollLeft  = () => trackRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => trackRef.current?.scrollBy({ left: 300,  behavior: "smooth" });

  const atStart = scrollPos === 0;
  const atEnd   = scrollPos >= 0.99;

  const showLeft  = isHovered && !atStart;
  const showRight = isHovered && !atEnd;

  return (
    <section className={styles.section}>
      <div className={styles.bg} />

      <div className={styles.header}>
        <div>
          <h2 className={styles.heading}>Latest Teachings</h2>
          <p className={styles.subheading}>Fresh insights from ancient wisdom</p>
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
          {teachings.map((t, i) => (
            <div key={i} className={styles.card} onClick={() => navigate(t.route)} style={{ cursor: "pointer" }}>
              {/* Image / thumb area */}
              <div className={styles.cardThumb} style={{ backgroundImage: `url(${t.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className={styles.thumbBg} />
                <div className={styles.thumbOverlay} />
                <span className={styles.cardTag} style={{ color: t.tagColor }}>
                  {t.tag}
                </span>
              </div>

              <h4 className={styles.cardTitle}>{t.title}</h4>
              <p className={styles.cardCategory}>{t.category}</p>
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

export default LatestTeachings;
