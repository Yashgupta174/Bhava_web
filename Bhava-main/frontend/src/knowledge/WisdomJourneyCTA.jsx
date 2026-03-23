import React, { useState, useEffect } from "react";
import styles from "./WisdomJourneyCTA.module.css";

const verses = [
  {
    quote: '"The Self cannot be known through study of the scriptures, nor through the intellect, nor through hearing discourses. It can be known only by those whom It chooses."',
    source: "KAṬHA UPANIṢAD 1.2.23",
  },
  {
    quote: '"You have the right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities."',
    source: "BHAGAVAD GĪTĀ 2.47",
  },
  {
    quote: '"Lead me from the unreal to the Real. Lead me from darkness to Light. Lead me from death to Immortality."',
    source: "BṚHADĀRAṆYAKA UPANIṢAD 1.3.28",
  },
  {
    quote: '"When the mind is silent, beyond weakness and distraction, then it can enter into a world which is far beyond the mind."',
    source: "MAITRI UPANIṢAD 6.34",
  },
];

function WisdomJourneyCTA() {
  const [verseIdx, setVerseIdx] = useState(0);
  const [fade, setFade] = useState(true);

  // Auto-rotate verse every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setVerseIdx((i) => (i + 1) % verses.length);
        setFade(true);
      }, 400);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleVerseChange = (i) => {
    setFade(false);
    setTimeout(() => {
      setVerseIdx(i);
      setFade(true);
    }, 300);
  };

  return (
    <section className={styles.section}>
      <div className={styles.bg} />
      <div className={styles.overlay} />

      <div className={styles.content}>
        {/* Main CTA */}
        <h2 className={styles.heading}>Start your wisdom journey today</h2>
        <p className={styles.subheading}>
          Join thousands exploring the depths of Sanātana Dharma through authentic
          teachings and daily practice.
        </p>

        <button className={styles.ctaBtn}>Begin Your Journey</button>

        {/* Verse Card */}
        <div className={`${styles.verseCard} ${fade ? styles.verseVisible : styles.verseHidden}`}>
          <div className={styles.verseCardBg} />
          <p className={styles.verseQuote}>{verses[verseIdx].quote}</p>
          <div className={styles.verseDivider} />
          <span className={styles.verseSource}>{verses[verseIdx].source}</span>
        </div>

        {/* Dots */}
        <div className={styles.dots}>
          {verses.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === verseIdx ? styles.dotActive : ""}`}
              onClick={() => handleVerseChange(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WisdomJourneyCTA;