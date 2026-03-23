import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MantraSadhana108.module.css";

const phases = [
  {
    id: 1,
    phase: "Foundation",
    dayRange: "Day 1–21",
    color: "#6E1B21",
    tagline: "Discipline Begins the Journey",
    purpose:
      "Build consistency, correct pronunciation, and mental focus. This phase is about habit formation — the mind may wander, but discipline is more important than depth.",
    universalMessage:
      "Every great sadhana begins with the courage to show up, even when the mind resists.",
    days: [
      { day: 1,   theme: "Setting the Sankalpa",             mantra: "Om Namah Shivaya",       duration: "14:00" },
      { day: 3,   theme: "Correct Pronunciation & Breath",   mantra: "Om Namo Narayanaya",     duration: "14:00" },
      { day: 7,   theme: "Building the Daily Habit",         mantra: "Om Gan Ganapataye",      duration: "14:00" },
      { day: 10,  theme: "Mind Wandering & Return",          mantra: "Mahamrityunjaya Mantra", duration: "14:00" },
      { day: 14,  theme: "Mala & Japa Practice",             mantra: "Om Namah Shivaya",       duration: "14:00" },
      { day: 17,  theme: "Silent Repetition Begins",         mantra: "So Hum",                 duration: "14:00" },
      { day: 21,  theme: "Foundation Complete",              mantra: "Om Shanti Shanti Shanti", duration: "14:00" },
    ],
  },
  {
    id: 2,
    phase: "Stabilization",
    dayRange: "Day 22–54",
    color: "#6E1B21",
    tagline: "Breath and Sound Become One",
    purpose:
      "Connect mantra with breath and deepen awareness. The mind starts settling. Chanting becomes rhythmic. Bring mantra into motion — walking, cooking, breathing.",
    universalMessage:
      "Discipline is the bridge between intention and transformation. Action without ego is the secret of peace.",
    days: [
      { day: 22,  theme: "Mantra-Breath Union",           mantra: "So Hum",                     duration: "14:00" },
      { day: 27,  theme: "Softening the Voice",           mantra: "Om Namo Bhagavate Vasudevaya", duration: "14:00" },
      { day: 33,  theme: "Mantra in Motion",              mantra: "Hare Krishna Maha-Mantra",    duration: "14:00" },
      { day: 40,  theme: "Rhythmic Consistency",          mantra: "Om Namah Shivaya",            duration: "14:00" },
      { day: 45,  theme: "Spontaneous Mantra Arising",    mantra: "Om Hreem Namah",              duration: "14:00" },
      { day: 50,  theme: "Gratitude & Bhakti Infuses",    mantra: "Om Sri Maha Lakshmyai Namah", duration: "14:00" },
      { day: 54,  theme: "Stabilization Complete",        mantra: "Om Tat Sat",                  duration: "14:00" },
    ],
  },
  {
    id: 3,
    phase: "Deepening",
    dayRange: "Day 55–81",
    color: "#6E1B21",
    tagline: "Mantra Enters the Heart",
    purpose:
      "Move from verbal chanting to internal repetition. This phase is about internalization — the mantra travels from lips to heart, becoming a living presence.",
    universalMessage:
      "The mantra is a living being. When you repeat it with sincerity, it repeats itself within you.",
    days: [
      { day: 55,  theme: "Inner Japa Begins",             mantra: "Om Namah Shivaya (silent)",   duration: "14:00" },
      { day: 60,  theme: "Heart-Center Awareness",        mantra: "Om Hreem Shreem Kleem",        duration: "14:00" },
      { day: 65,  theme: "Mantra Without Effort",         mantra: "So Hum (breath-synced)",       duration: "14:00" },
      { day: 70,  theme: "Extended Sitting",              mantra: "Om (25 min inner hold)",       duration: "14:00" },
      { day: 74,  theme: "Nada Yoga Awareness",           mantra: "AUM — Three Sounds as One",    duration: "14:00" },
      { day: 78,  theme: "Merging with the Mantra",       mantra: "Om Param Brahma Namah",        duration: "14:00" },
      { day: 81,  theme: "Deepening Complete",            mantra: "Om Shanti Om",                 duration: "14:00" },
    ],
  },
  {
    id: 4,
    phase: "Integration",
    dayRange: "Day 82–108",
    color: "#6E1B21",
    tagline: "Sound Becomes Stillness",
    purpose:
      "Integrate mantra into daily life. Chanting is no longer practice — it becomes presence. The sound dissolves and what remains is silence, devotion, and grace.",
    universalMessage:
      "When the chanting stops and the silence speaks, the sadhana is complete.",
    days: [
      { day: 82,  theme: "Living the Mantra",             mantra: "Om Namah Shivaya",            duration: "14:00" },
      { day: 88,  theme: "Detachment in Practice",        mantra: "Om Namo Narayanaya",          duration: "14:00" },
      { day: 93,  theme: "Mantra as Refuge",              mantra: "Mahamrityunjaya Mantra",      duration: "14:00" },
      { day: 99,  theme: "Witnessing the Silence",        mantra: "Silent inner OM",             duration: "14:00" },
      { day: 103, theme: "Surrender & Bhakti",            mantra: "Om Sri Gurubhyo Namah",       duration: "14:00" },
      { day: 106, theme: "Completing the Cycle",          mantra: "Om Purnamadah Purnamidam",    duration: "14:00" },
      { day: 108, theme: "Purnahuti — Final Offering",    mantra: "Om Shanti Shanti Shanti",     duration: "14:00" },
    ],
  },
];

const completionBenefits = [
  {
    title: "Unshakeable Discipline",
    description:
      "108 days of consistent practice forges a daily sadhana that becomes second nature.",
  },
  {
    title: "Mental Clarity",
    description:
      "The mind becomes clearer, sharper, and no longer controlled by scattered thoughts.",
  },
  {
    title: "Emotional Mastery",
    description:
      "Reactions soften. You observe feelings instead of being overtaken by them.",
  },
  {
    title: "Spiritual Identity",
    description:
      "Mantra becomes part of who you are — a living, breathing devotion within.",
  },
  {
    title: "Inner Stillness",
    description:
      "Sound becomes silence. Practice becomes presence. Stillness deepens permanently.",
  },
];

const sacredFacts = [
  {
    label: "Mala & Japa Practice",
    heading: "108 Beads, One Complete Round",
    description:
      "A traditional Japa Mala has 108 beads. When chanting any mantra, you complete 108 repetitions — one full round. The 109th bead, the Sumeru or Guru bead, is never crossed. You reverse direction instead, honoring the infinite cycle of devotion.",
  },
  {
    label: "Astronomy & Cosmos",
    heading: "The Universe Encoded in a Number",
    description:
      "The Sun's diameter is approximately 108 times the Earth's diameter. The distance from Earth to the Sun is approximately 108 times the Sun's diameter. The distance from Earth to the Moon is approximately 108 times the Moon's diameter. Ancient Vedic sages calculated this thousands of years ago.",
  },
  {
    label: "Human Body & Chakras",
    heading: "108 Channels of Vital Energy",
    description:
      "There are 108 nadis — energy channels — that converge at the heart chakra, Anahata. There are 108 marma points, vital pressure points in the body similar to acupressure. The Atman, the soul, is said to pass through 108 stages on its spiritual journey.",
  },
  {
    label: "Sanskrit & Sacred Texts",
    heading: "The Language of the Divine",
    description:
      "Sanskrit has 54 letters, each with masculine (Shiva) and feminine (Shakti) forms — 54 multiplied by 2 equals 108. The Rigveda is divided into 10,800 stanzas. There are 108 Upanishads and 108 names each for Vishnu, Shiva, Lakshmi, and Ganesha.",
  },
  {
    label: "Tantra & Yoga",
    heading: "Sacred Sites, Sacred Motion",
    description:
      "There are 108 sacred sites — Shakti Peethas — across India. Bharatanatyam, classical Indian dance, contains 108 forms of movement as listed in the Natya Shastra. In yoga, 108 Sun Salutations are performed on special occasions such as solstices and equinoxes.",
  },
  {
    label: "Time & Astrology",
    heading: "Written in the Stars",
    description:
      "In Vedic astrology, there are 12 zodiac signs and 9 planets — 12 multiplied by 9 equals 108. There are 27 Nakshatras, the lunar mansions, each divided into 4 Padas — 27 multiplied by 4 equals 108.",
  },
  {
    label: "Across Traditions",
    heading: "A Universal Sacred Number",
    description:
      "Beyond Hinduism, the significance of 108 resonates widely. In Buddhism, 108 bells are rung to mark the New Year. In Sikhism, 108 divine names are honored. In Jainism, 108 virtues are recognized as the path to liberation.",
  },
];

function MantraSadhana108() {
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
          <h1 className={styles.title}>108-Day Mantra Sādhana</h1>

          <div className={styles.imageCard}>
            <div className={styles.progressRow}>
              <span className={styles.progressLabel}>Progress</span>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} />
              </div>
            </div>
            <img
              src="../108-Day Mantra Sadhana.png"
              alt="108-Day Mantra Sādhana"
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
            Commit to daily mantra and deepen your inner stillness. Chant sacred
            mantras for 108 consecutive days and experience profound inner
            transformation through sound and devotion.
          </p>
        </div>

        {/* Right Side */}
        <div className={styles.rightWrapper}>
          <p className={styles.sessionsCount}>4 Phases · 108 Days</p>

          <div className={styles.rightPanel}>
            {phases.map((item, idx) => (
              <div key={item.id} className={styles.sessionBlock}>

                {/* Phase Header — clickable */}
                <button
                  className={styles.stageHeader}
                  onClick={() => togglePhase(idx)}
                >
                  <span
                    className={styles.stageBadge}
                    style={{ background: item.color }}
                  >
                    Phase {item.id}
                  </span>
                  <div className={styles.stageHeaderInfo}>
                    <span className={styles.stageHeaderName}>{item.phase}</span>
                    <span className={styles.stageHeaderDays}>{item.dayRange}</span>
                  </div>
                  <span className={styles.stageHeaderTagline}>
                    "{item.tagline}"
                  </span>
                  <span className={styles.chevron}>
                    {expandedPhase === idx ? "▲" : "▼"}
                  </span>
                </button>

                {/* Expanded Day-wise Audio List */}
                {expandedPhase === idx && (
                  <div className={styles.dayListWrapper}>
                    <p className={styles.stagePurposeInline}>{item.purpose}</p>

                    <div className={styles.dayList}>
                      {item.days.map((d) => {
                        const key = `${item.id}-${d.day}`;
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
                      "{item.universalMessage}"
                    </p>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Why 108 is Sacred ── */}
      <section className={styles.sacredSection}>
        <div className={styles.sacredContainer}>
          <h2 className={styles.sacredTitle}>Why 108 is Sacred in Hinduism</h2>
          <p className={styles.sacredSubtitle}>
            108 represents the wholeness of existence — the connection between
            the individual soul and universal consciousness. It is not merely a
            number. In Hindu philosophy, 108 is the numerical representation of
            the universe itself.
          </p>
          <div className={styles.sacredGrid}>
            {sacredFacts.map((fact, i) => (
              <div key={i} className={styles.sacredCard}>
                <p className={styles.sacredLabel}>{fact.label}</p>
                <h3 className={styles.sacredHeading}>{fact.heading}</h3>
                <p className={styles.sacredDesc}>{fact.description}</p>
              </div>
            ))}
          </div>
          <div className={styles.sacredSummary}>
            <p className={styles.sacredSummaryText}>
              108 bridges cosmos, body, sound, and time. Every strand of Vedic
              knowledge — from astronomy to anatomy, from scripture to sacred
              geography — converges on this single number, affirming that the
              universe is not chaotic but ordered, and that the devotee who
              chants 108 times participates consciously in that order.
            </p>
          </div>
        </div>
      </section>

      {/* ── After 108 Days — Benefits ── */}
      <section className={styles.benefitsSection}>
        <div className={styles.benefitsContainer}>
          <h2 className={styles.benefitsTitle}>
            After <span className={styles.maroon}>108 Days</span>
          </h2>
          <p className={styles.benefitsSubtitle}>
            After completing the 108-Day Mantra Sādhana, you will have undergone
            a complete inner transformation — from discipline to stillness, from
            sound to silence.
          </p>
          <div className={styles.benefitsGrid}>
            {completionBenefits.map((b, i) => (
              <div key={i} className={styles.benefitCard}>
                <h3 className={styles.benefitCardTitle}>{b.title}</h3>
                <p className={styles.benefitDesc}>{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default MantraSadhana108;
