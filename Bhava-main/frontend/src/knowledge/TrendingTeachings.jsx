import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TrendingTeaching.module.css";

const teachings = [
  {
    id: 1,
    title: "Karma Yoga",
    sub: "Path of Action",
    teacher: "Swami Vivekananda",
    duration: "12 min",
    sessions: "8 sessions",
    image: "/Timeless%20Wisdom/Karma%20Yoga.png",
    route: "/knowledge/trending/karma-yoga",
  },
  {
    id: 2,
    title: "Bhakti Sutras",
    sub: "Science of Devotion",
    teacher: "Narada Muni",
    duration: "8 min",
    sessions: "6 sessions",
    image: "/Timeless%20Wisdom/Bhakti%20Sutra.png",
    route: "/knowledge/trending/bhakti-sutras",
  },
  {
    id: 3,
    title: "Yoga Philosophy",
    sub: "Patanjali's Path",
    teacher: "Maharishi Patanjali",
    duration: "15 min",
    sessions: "12 sessions",
    image: "/Timeless%20Wisdom/Yoga%20Philosophy.png",
    route: "/knowledge/trending/yoga-philosophy",
  },
  {
    id: 4,
    title: "Vedanta Basics",
    sub: "Ultimate Reality",
    teacher: "Adi Shankaracharya",
    duration: "10 min",
    sessions: "10 sessions",
    image: "/Timeless%20Wisdom/Vedanta%20Basics.png",
    route: "/knowledge/trending/vedanta-basics",
  },
  {
    id: 5,
    title: "Meditation Guide",
    sub: "Dhyana Practice",
    teacher: "Sri Ramana Maharshi",
    duration: "18 min",
    sessions: "14 sessions",
    image: "/Timeless%20Wisdom/Meditation%20Guide.png",
    route: "/knowledge/trending/meditation-guide",
  },
  {
    id: 6,
    title: "Dharma Ethics",
    sub: "Righteous Living",
    teacher: "Chanakya",
    duration: "14 min",
    sessions: "9 sessions",
    image: "/Timeless%20Wisdom/Dharma%20Ethics.png",
    route: "/knowledge/trending/dharma-ethics",
  },
  {
    id: 7,
    title: "Sankhya",
    sub: "Cosmic Enumeration",
    teacher: "Maharishi Kapila",
    duration: "20 min",
    sessions: "16 sessions",
    image: "/Timeless Wisdom/Samkhya.png",
    route: "/knowledge/trending/sankhya",
  },
  {
    id: 8,
    title: "Anointment Rituals",
    sub: "Sacred Consecration",
    teacher: "Temple Tradition",
    duration: "16 min",
    sessions: "7 sessions",
    image: "/Timeless%20Wisdom/Anoinment%20Rituals.png",
    route: "/knowledge/trending/anointment-rituals",
  },
];

function TrendingTeachings() {
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

  const scrollLeft = () =>
    trackRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  const scrollRight = () =>
    trackRef.current?.scrollBy({ left: 320, behavior: "smooth" });

  const atStart = scrollPos === 0;
  const atEnd = scrollPos >= 0.99;

  // Left arrow: only show when hovered AND user has scrolled right
  const showLeft = isHovered && !atStart;
  // Right arrow: only show when hovered AND not at end
  const showRight = isHovered && !atEnd;

  return (
    <section className={styles.trendingSection}>
      <div className={styles.trendingBg} />

      {/* Header */}
      <div className={styles.trendingHeader}>
        <div>
          <h2 className={styles.trendingHeading}>Timeless Wisdom</h2>
          <p className={styles.trendingSubheading}>
            Sacred philosophy for thoughtful reflection
          </p>
        </div>
      </div>

      {/* Hover zone wraps arrows + track */}
      <div
        className={styles.trendingWrapper}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left arrow */}
        <button
          className={`${styles.arrowBtn} ${showLeft ? styles.arrowVisible : styles.arrowHidden}`}
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          ‹
        </button>

        {/* Scrollable track */}
        <div
          className={styles.trendingTrack}
          ref={trackRef}
          onScroll={handleScroll}
        >
          {teachings.map((t) => (
            <div
              key={t.id}
              className={styles.teachingCard}
              onClick={() => navigate(t.route)}
            >
              <div className={styles.teachingThumb}>
                <img
                  src={t.image}
                  alt={t.title}
                  className={styles.thumbImage}
                />
                <div className={styles.thumbOverlay} />
                <span className={styles.thumbDuration}>{t.duration}</span>
              </div>

              <h4 className={styles.teachingTitle}>{t.title}</h4>
              <p className={styles.teachingSub}>{t.teacher}</p>
              <span className={styles.teachingDuration}>{t.sessions}</span>
            </div>
          ))}
        </div>

        {/* Right arrow */}
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

export default TrendingTeachings;