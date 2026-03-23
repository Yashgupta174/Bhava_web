import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Knowledge.module.css";
import KnowledgeExtra from "../knowledge/KnowledgeExtra";
import { motion } from "framer-motion";

const WISDOM_VISIBLE = 4;
const WISDOM_STEP = 2;
const WISDOM_GAP = 20;

function WisdomFlipCard({ category, width, navigate }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={styles.wisdomCardOuter}
      style={width ? { flex: `0 0 ${width}px`, width } : {}}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className={styles.wisdomCardInner}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Back — image visible by default */}
        <div className={styles.wisdomCardBack}>
          <img src={category.image} alt={category.title} className={styles.wisdomCardBackImg} />
          <div className={styles.wisdomCardBackOverlay}>
            <h3 className={styles.wisdomCardBackTitle}>{category.title}</h3>
          </div>
        </div>

        {/* Front — details revealed on hover */}
        <div className={styles.wisdomCardFront}>
          <div className={styles.wisdomCardFrontContent}>
            <h3 className={styles.wisdomFrontTitle}>{category.title}</h3>
            <p className={styles.wisdomFrontDesc}>{category.description}</p>
            <button
              className={styles.wisdomFrontBtn}
              onClick={() => navigate(category.route)}
            >
              Explore More
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Knowledge() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [commitHovered, setCommitHovered] = useState(false);
  const [wisdomIndex, setWisdomIndex] = useState(0);
  const [wisdomCardW, setWisdomCardW] = useState(0);
  const wisdomRef = useRef(null);

  const knowledgeCategories = [
    {
      id: 1,
      title: "Puja Rituals",
      description: "Learn the sacred art of worship, traditional puja vidhi, and daily ritual practices.",
      route: "/knowledge/puja-rituals",
      image: "./Explore Sacred Wisdom/Puja Rituals.png",
    },
    {
      id: 2,
      title: "Vedic Scriptures",
      description: "Dive deep into the Vedas, Upanishads, and Puranas with expert commentary and translations.",
      route: "/knowledge/vedic-scriptures",
      image: "./Explore Sacred Wisdom/Vedic Scriptures.png",
    },
    {
      id: 3,
      title: "Temple Traditions",
      description: "Learn the sacred rituals, architectural significance, and spiritual practices of ancient temples.",
      route: "/knowledge/temple-traditions",
      image: "./Explore Sacred Wisdom/Temple Traditions.png",
    },
    {
      id: 4,
      title: "Mantras & Prayers",
      description: "Discover the power of sacred mantras with proper pronunciation, meanings, and benefits.",
      route: "/knowledge/mantras-prayers",
      image: "./Explore Sacred Wisdom/Mantras & Prayers.png",
    },
    {
      id: 5,
      title: "Meditation Practices",
      description: "Master ancient meditation techniques from yoga traditions and spiritual lineages.",
      route: "/knowledge/meditation-practices",
      image: "./Explore Sacred Wisdom/Meditation Practices.png",
    },
    {
      id: 6,
      title: "Festivals & Celebrations",
      description: "Understand the spiritual significance and traditional observances of Hindu festivals.",
      route: "/knowledge/festivals-celebrations",
      image: "./Explore Sacred Wisdom/Festivals & Celebrations.png",
    },
  ];

  const commitments = [
    {
      title: "108-Day Mantra Sādhana",
      // subtitle: "Starts in 7 days",
      // devotees: "106,000 Devotees",
      // description: "Commit to daily mantra and deepen your inner stillness. Chant sacred mantras for 108 consecutive days and experience profound inner transformation through sound and devotion.",
      highlights: ["Daily guided chanting", "Sacred mantra teachings", "Community support"],
      color: "#470017",
      image: "/Sacred%20Commitments%20for%20the%20Disciplined%20Soul/108-Day%20Mantra%20Sadhana.png",
      route: "/knowledge/108-day-sadhana",
    },
    {
      title: "40-Day Gita Wisdom Path",
      // subtitle: "Starts in 2 days",
      // devotees: "75,000 Devotees",
      // description: "Study one verse each day with guided reflection. Walk the timeless path of the Bhagavad Gita and let ancient wisdom illuminate your dharma.",
      highlights: ["Chapter-by-chapter study", "Expert satsang sessions", "Daily reflection prompts"],
      color: "#2B6291",
      image: "/Sacred%20Commitments%20for%20the%20Disciplined%20Soul/40%20Day%20Gita%20Wisdom%20Path.png",
      route: "/knowledge/40-day-gita-wisdom",
    },
    {
      title: "21-Day Dhyān Challenge",
      highlights: ["Guided dhyan sessions", "Breathwork & pranayama", "Silent sitting practice"],
      color: "#351751",
      image: "/Sacred%20Commitments%20for%20the%20Disciplined%20Soul/21%20Dhyan%20Challenge.png",
      route: "/knowledge/21-day-dhyan",
    },
  ];

  const trackOuterRef = useRef(null);
  const [outerWidth, setOuterWidth] = useState(0);

  useEffect(() => {
    const el = trackOuterRef.current;
    if (!el) return;
    setOuterWidth(el.clientWidth);
    const ro = new ResizeObserver(() => setOuterWidth(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const PEEK = 88;
  const GAP = 16;
  const cardWidth = outerWidth ? outerWidth - PEEK - GAP : 0;
  const step = cardWidth + GAP;

  const prevSlide = () => setActiveSlide((p) => Math.max(0, p - 1));
  const nextSlide = () => setActiveSlide((p) => Math.min(commitments.length - 1, p + 1));

  useLayoutEffect(() => {
    const el = wisdomRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      if (w > 0) setWisdomCardW((w - WISDOM_GAP * (WISDOM_VISIBLE - 1)) / WISDOM_VISIBLE);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const prevWisdom = () => setWisdomIndex((p) => Math.max(0, p - WISDOM_STEP));
  const nextWisdom = () => setWisdomIndex((p) => Math.min(knowledgeCategories.length - WISDOM_VISIBLE, p + WISDOM_STEP));

  return (
    <div className={styles.knowledgePagesWrapper}>

      {/* ── Hero Section ── */}
      <div className={styles.knowledgeHeroesSection}>
        <div className={styles.heroesLeft}>
          <h1 className={styles.knowledgeMainTitles}>
            Enter the Path of
            <br />
            <span style={{ color: "#E07B39" }}>Inner Illumination</span>
          </h1>
          <div className={styles.heroBtns}>
            <button className={styles.btnPrimary}>Begin Your Journey</button>
          </div>
        </div>
        <div className={styles.heroesRight}>
          <img src="/Bhakti .png" alt="Bhakti" className={styles.heroesBhaktiImg} />
        </div>
      </div>

      {/* ── Sacred Commitments — Full Width Slider ── */}
      <section className={styles.commitmentsSection}>
        <div className={styles.commitmentsHeader}>
          <h2 className={styles.commitmentsHeading}>
            Sacred Commitments for the Disciplined Soul
          </h2>
        </div>

        {/* Peek carousel track */}
        <div
          className={styles.commitTrackWrapper}
          onMouseEnter={() => setCommitHovered(true)}
          onMouseLeave={() => setCommitHovered(false)}
        >
          <div className={styles.commitTrackOuter} ref={trackOuterRef}>
            <div
              className={styles.commitTrack}
              style={{ transform: `translateX(${-activeSlide * step}px)` }}
            >
              {commitments.map((item, idx) => (
              <div
                key={idx}
                className={styles.commitmentCard}
                style={{ "--card-color": item.color, width: cardWidth || undefined }}
              >
                {/* Left — text content */}
                <div className={styles.commitCardLeft} style={{ background: item.color }}>
                  <div className={styles.commitCardLeftInner}>
                    <span className={styles.commitSubtitle}>{item.subtitle}</span>
                    <span className={styles.commitDevotees}>{item.devotees}</span>
                    <h3 className={styles.commitTitle}>{item.title}</h3>
                    <p className={styles.commitDescription}>{item.description}</p>
                    <ul className={styles.commitHighlights}>
                      {item.highlights.map((h, i) => (
                        <li key={i}>
                          <span className={styles.commitDot} />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <button
                      className={styles.btnJoinChallenge}
                      onClick={() => item.route && navigate(item.route)}
                    >
                      Join Challenge
                    </button>
                  </div>
                </div>

                {/* Right — image */}
                <div className={styles.commitCardRight} style={{ backgroundColor: item.color }}>
                  <img src={item.image} alt={item.title} className={styles.commitCardImage} />
                  <div
                    className={styles.commitCardImageOverlay}
                    style={{ background: `linear-gradient(to right, ${item.color} 0%, ${item.color}99 18%, transparent 50%)` }}
                  />
                </div>
              </div>
            ))}
            </div>
          </div>

          {/* Prev arrow — left edge, vertically centered, on hover */}
          <button
            className={`${styles.commitEdgeArrow} ${styles.commitEdgeArrowLeft} ${
              commitHovered && activeSlide > 0
                ? styles.commitEdgeArrowVisible
                : styles.commitEdgeArrowHidden
            }`}
            onClick={prevSlide}
            aria-label="Previous"
          >‹</button>

          {/* Next arrow — right edge, vertically centered, on hover */}
          <button
            className={`${styles.commitEdgeArrow} ${
              commitHovered && activeSlide < commitments.length - 1
                ? styles.commitEdgeArrowVisible
                : styles.commitEdgeArrowHidden
            }`}
            onClick={nextSlide}
            aria-label="Next"
          >›</button>
        </div>

        {/* Nav: dots only */}
        <div className={styles.commitNavRow}>
          <div className={styles.commitDots}>
            {commitments.map((_, i) => (
              <button
                key={i}
                className={`${styles.commitDot2} ${i === activeSlide ? styles.commitDotActive : ""}`}
                onClick={() => setActiveSlide(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Sacred Wisdom Cards ── */}
      <div className={styles.sacredCollectionSection}>
        <div className={styles.container}>
          <div className={styles.sectionGoldDivider} />
          <h1 className={styles.sectionTitle}>
            Explore <span className={styles.highlight}>Sacred Wisdom</span>
          </h1>
        </div>

        <div className={styles.wisdomSliderWrapper}>
            <div className={styles.wisdomTrackOuter} ref={wisdomRef}>
              <motion.div
                className={styles.wisdomTrack}
                animate={{ x: -wisdomIndex * (wisdomCardW + WISDOM_GAP) }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                {knowledgeCategories.map((category) => (
                  <WisdomFlipCard
                    key={category.id}
                    category={category}
                    width={wisdomCardW}
                    navigate={navigate}
                  />
                ))}
              </motion.div>
            </div>

            <button
              className={`${styles.wisdomArrow} ${styles.wisdomArrowLeft}`}
              onClick={prevWisdom}
              disabled={wisdomIndex === 0}
              aria-label="Previous"
            >‹</button>

            <button
              className={`${styles.wisdomArrow} ${styles.wisdomArrowRight}`}
              onClick={nextWisdom}
              disabled={wisdomIndex >= knowledgeCategories.length - WISDOM_VISIBLE}
              aria-label="Next"
            >›</button>
          </div>
      </div>

      {/* ── 108 & Tiger Eye — Featured Section ── */}
      <section className={styles.tigerSummarySection}>
        <div className={styles.container}>
          <div className={styles.sectionGoldDivider} />
          <h2 className={styles.tigerSummaryHeading}>
            The Civilizational Code:&nbsp;
            <span style={{ fontWeight: 800, fontSize: "inherit", color: "#C6A14A" }}>108 &amp; Tiger Eye</span>
          </h2>
          <p className={styles.tigerSummaryText}>
            108 is not just a number — it is the universe's blueprint encoded in sacred geometry, planetary cycles,
            and ancient yogic science. Tiger Eye is not just a stone — it is concentrated discipline, a crystallized
            force that sharpens the mind, steadies the nervous system, and aligns action with dharma.
            Together they form the sacred system that powers The Spiritual Company's vision of civilizational renewal.
          </p>
        </div>
      </section>

      <section className={styles.tigerKnowledgeSection}>
        <div className={styles.container}>
          <div className={styles.tigerKnowledgeGrid}>
            <div className={styles.tigerKnowledgeTextBlock}>
              <p className={styles.tigerKnowledgeEyebrow}>Sacred Strategy</p>
              <h2
                className={styles.tigerKnowledgeTitle}
                style={{ fontWeight: 800, fontSize: "2.2rem", color: "#1E3A2F" }}
              >
                Why 108 and Tiger Eye Are the Ultimate Spiritual Power Pair
              </h2>
              <p className={styles.tigerKnowledgeParagraph}>
                <strong>108</strong> appears in the distance between the Earth and Sun (108× the Sun's diameter),
                in the 108 Upanishads, 108 sacred sites, 108 beads of the mala — it is the universe's ordering
                frequency. When you work with 108, you align yourself with the cosmic rhythm.
              </p>
              <p className={styles.tigerKnowledgeParagraph}>
                <strong>Tiger Eye</strong> is the stone of the disciplined warrior. Ancient Roman soldiers carried
                it into battle for protection. In Vedic tradition it harmonises the solar plexus and root chakras,
                building the unshakeable stability needed for long-term sadhana. It transforms fear into focused
                action and scattered energy into laser-precision.
              </p>
              <p className={styles.tigerKnowledgeParagraph}>
                Combined, they are the <em>108-Tiger Eye System</em> — a daily ritual protocol of just
                108 seconds that regulates the nervous system, anchors intention, and creates the inner
                stillness from which all great devotion flows.
              </p>
              <button
                className={styles.btnPrimary}
                onClick={() => navigate("/knowledge/tiger-eye")}
                style={{ marginTop: "8px" }}
              >
                Explore the Full System →
              </button>
            </div>

            <div className={styles.tigerKnowledgeCard}>
              <p className={styles.tigerKnowledgeCardTitle}>Sacred Facts at a Glance</p>
              <ul className={styles.tigerKnowledgeList}>
                <li className={styles.tigerKnowledgeListItem}>
                  <span>108 Upanishads</span> — The complete library of Vedantic wisdom
                </li>
                <li className={styles.tigerKnowledgeListItem}>
                  <span>108 × Sun Diameter</span> — Earth–Sun distance, cosmic proof
                </li>
                <li className={styles.tigerKnowledgeListItem}>
                  <span>Tiger Eye Chakras</span> — Solar plexus + Root, power & grounding
                </li>
                <li className={styles.tigerKnowledgeListItem}>
                  <span>108-Second Ritual</span> — Nervous system reset protocol
                </li>
                <li className={styles.tigerKnowledgeListItem}>
                  <span>Godin's Tribe</span> — 10,000+ devoted seekers, not mass marketing
                </li>
                <li className={styles.tigerKnowledgeListItem}>
                  <span>6 Pillars</span> — Kotler · Godin · Ries · Trout strategic core
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <KnowledgeExtra />
    </div>
  );
}

export default Knowledge;