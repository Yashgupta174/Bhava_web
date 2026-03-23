import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DhyanChallenge21.module.css";

const phases = [
  {
    name: "Foundation",
    dayRange: "Days 1–7",
    number: 1,
    color: "#2A1845",
    tagline: "Build the Seat, the Breath, the Intention",
    description:
      "Learn to sit still and observe without reacting. Establish the daily ritual and plant the seed of inner discipline.",
    universalMessage:
      "Every great practice begins with a single, honest moment of stillness.",
    days: [
      { day: 1,  theme: "Sankalpa — Sacred Intention",  mantra: "Om Tat Sat",                  duration: "15:00" },
      { day: 2,  theme: "Breath Awareness",              mantra: "So Hum",                      duration: "17:00" },
      { day: 3,  theme: "Posture & Stillness",           mantra: "Om Shanti Shanti Shanti",     duration: "15:00" },
      { day: 4,  theme: "Counting the Breath",           mantra: "Om",                          duration: "21:00" },
      { day: 5,  theme: "Introduction to Pranayama",     mantra: "Om Pranaya Namah",            duration: "15:00" },
      { day: 6,  theme: "Observing Thoughts",            mantra: "Om Sakshi Bhavaya Namah",     duration: "15:00" },
      { day: 7,  theme: "Silence Integration",           mantra: "Silent Meditation",           duration: "20:00" },
    ],
  },
  {
    name: "Deepening",
    dayRange: "Days 8–14",
    number: 2,
    color: "#2A1845",
    tagline: "Mantra, Chakra & Emotional Observation",
    description:
      "Introduce mantra and chakra awareness. Extend stillness to 20 minutes. Observe emotions without resistance.",
    universalMessage:
      "The mantra is a rope that leads the wandering mind back to the divine.",
    days: [
      { day: 8,  theme: "Mantra Introduction",           mantra: "Om Namah Shivaya",                 duration: "15:00" },
      { day: 9,  theme: "Chakra Awareness",              mantra: "Om Hreem Namah",                   duration: "20:00" },
      { day: 10, theme: "Extended Stillness",            mantra: "Mental OM Awareness",              duration: "20:00" },
      { day: 11, theme: "Trataka — Candle Gazing",       mantra: "Om Jyotir Namah",                  duration: "15:00" },
      { day: 12, theme: "Emotional Observation",         mantra: "Om Shreem",                        duration: "15:00" },
      { day: 13, theme: "Gratitude Awareness",           mantra: "Om Krutagyaya Namah",              duration: "20:00" },
      { day: 14, theme: "Deep Pranayama",                mantra: "Om Namo Bhagavate Vasudevaya",     duration: "20:00" },
    ],
  },
  {
    name: "Mastery",
    dayRange: "Days 15–21",
    number: 3,
    color: "#2A1845",
    tagline: "Self-Led Practice and Final Integration",
    description:
      "Longer silence, witness consciousness, and complete integration at 30 minutes. The practice becomes your own.",
    universalMessage:
      "When the student becomes still enough, the teacher within speaks.",
    days: [
      { day: 15, theme: "Longer Silence",                mantra: "Om (Long Chant)",             duration: "25:00" },
      { day: 16, theme: "Witness Consciousness",         mantra: "Om Sakshi",                   duration: "25:00" },
      { day: 17, theme: "Inner Sound Awareness",         mantra: "Silent Inner OM Listening",   duration: "25:00" },
      { day: 18, theme: "Kundalini Awareness",           mantra: "Om Aim Hreem Kleem",          duration: "25:00" },
      { day: 19, theme: "Non-Attachment Practice",       mantra: "Om Vairagyaya Namah",         duration: "25:00" },
      { day: 20, theme: "Extended Stillness (30 Min)",   mantra: "Om Param Shantaye Namah",     duration: "30:00" },
      { day: 21, theme: "Integration & Commitment",      mantra: "Om Purnamadah Purnamidam",    duration: "30:00" },
    ],
  },
];

const completionBenefits = [
  { title: "Strong Meditation Habit",  description: "A daily practice rooted in discipline, not motivation." },
  { title: "Improved Concentration",   description: "The mind trained to rest, not wander." },
  { title: "Emotional Balance",        description: "Feelings observed, not controlled by." },
  { title: "Breath Control",           description: "Pranayama as a daily tool for nervous system regulation." },
  { title: "Spiritual Grounding",      description: "A deeper, lived connection to your inner self." },
];

function DhyanChallenge21() {
  const navigate = useNavigate();
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [playingDay, setPlayingDay] = useState(null);

  const togglePhase = (idx) => {
    setExpandedPhase(expandedPhase === idx ? null : idx);
  };

  const togglePlay = (dayKey, e) => {
    e.stopPropagation();
    setPlayingDay(playingDay === dayKey ? null : dayKey);
  };

  return (
    <div className={styles.page}>

      {/* ── Two-Panel Layout ── */}
      <div className={styles.layout}>

        {/* Left Panel */}
        <div className={styles.leftPanel}>
          <h1 className={styles.title}>21-Day Dhyān Challenge</h1>

          <div className={styles.imageCard}>
            <div className={styles.progressRow}>
              <span className={styles.progressLabel}>Progress</span>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} />
              </div>
            </div>
            <img
              src="../21 Dhyan Challenge.png"
              alt="21-Day Dhyān Challenge"
              className={styles.heroImg}
            />
            <div className={styles.controls}>
              <button className={styles.controlBtn}>
                <span className="material-symbols-outlined">play_arrow</span>
                <span className={styles.controlLabel}>Play</span>
              </button>
              <button className={styles.controlBtn}>
                <span className="material-symbols-outlined">add_circle</span>
                <span className={styles.controlLabel}>Save</span>
              </button>
              <button className={styles.controlBtn}>
                <span className="material-symbols-outlined">share</span>
                <span className={styles.controlLabel}>Share</span>
              </button>
            </div>
          </div>

          <p className={styles.description}>
            Twenty-one days of guided meditation to transform your consciousness
            and cultivate lasting stillness. Sit, breathe, and return — every
            morning.
          </p>
        </div>

        {/* Right Side */}
        <div className={styles.rightWrapper}>
          <p className={styles.sessionsCount}>3 Phases · 21 Days</p>

          <div className={styles.rightPanel}>
            {phases.map((phase, idx) => (
              <div key={phase.name} className={styles.sessionBlock}>

                {/* Phase Header — clickable */}
                <button
                  className={styles.stageHeader}
                  onClick={() => togglePhase(idx)}
                >
                  <span
                    className={styles.stageBadge}
                    style={{ background: phase.color }}
                  >
                    Phase {phase.number}
                  </span>
                  <div className={styles.stageHeaderInfo}>
                    <span className={styles.stageHeaderName}>{phase.name}</span>
                    <span className={styles.stageHeaderDays}>{phase.dayRange}</span>
                  </div>
                  <span className={styles.stageHeaderTagline}>
                    "{phase.tagline}"
                  </span>
                  <span className={styles.chevron}>
                    {expandedPhase === idx ? "▲" : "▼"}
                  </span>
                </button>

                {/* Expanded Day-wise Audio List */}
                {expandedPhase === idx && (
                  <div className={styles.dayListWrapper}>
                    <p className={styles.stagePurposeInline}>{phase.description}</p>

                    <div className={styles.dayList}>
                      {phase.days.map((d) => {
                        const key = `${phase.number}-${d.day}`;
                        const isPlaying = playingDay === key;
                        return (
                          <div
                            key={d.day}
                            className={`${styles.dayRow} ${isPlaying ? styles.dayRowActive : ""}`}
                          >
                            <span className={styles.dayBadge}>Day {d.day}</span>

                            <div className={styles.dayInfo}>
                              <p className={styles.dayTheme}>{d.theme}</p>
                              <p className={styles.dayVerse}>{d.mantra}</p>
                            </div>

                            <div className={styles.audioRight}>
                              {isPlaying && (
                                <div className={styles.waveBar}>
                                  <span /><span /><span /><span /><span />
                                </div>
                              )}
                              <span className={styles.dayDuration}>{d.duration}</span>
                              <button
                                className={`${styles.playCircleDay} ${isPlaying ? styles.playCircleDayActive : ""}`}
                                onClick={(e) => togglePlay(key, e)}
                              >
                                <span className="material-symbols-outlined">
                                  {isPlaying ? "pause" : "play_arrow"}
                                </span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <p className={styles.universalMsgInline}>
                      "{phase.universalMessage}"
                    </p>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Completion Benefits ── */}
      <section className={styles.completionSection}>
        <div className={styles.container}>
          <p className={styles.eyebrowCenter}>What You Gain</p>
          <h2 className={styles.sectionTitle}>
            After <span className={styles.accent}>21 Days</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            After completing this 21-Day Dhyan Challenge, you will have established a strong
            meditation habit, improved concentration, emotional balance, breath control,
            and deeper spiritual grounding.
          </p>
          <div className={styles.benefitsGrid}>
            {completionBenefits.map((b, i) => (
              <div key={i} className={styles.benefitCard}>
                <h3 className={styles.benefitTitle}>{b.title}</h3>
                <p className={styles.benefitDesc}>{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Begin Your 21-Day Dhyān Practice</h2>
            <p className={styles.ctaSubtext}>
              Commit to 21 mornings. Sit. Breathe. Return.
              <br />The practice will do the rest.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.btnPrimary}>Join the Challenge</button>
              <button className={styles.btnSecondary} onClick={() => navigate("/knowledge")}>
                Back to Knowledge
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default DhyanChallenge21;
