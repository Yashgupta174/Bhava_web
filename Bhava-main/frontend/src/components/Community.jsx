import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Community.module.css";

const INTERVAL = 4000;

const testimonials = [
  {
    text: "The quality is incomparable. I've been using Bhava: incense for my daily puja and the difference is extraordinary. It's like bringing the temple into my home.",
    author: "Priya Sharma, Mumbai",
  },
  {
    text: "Finally, a brand that respects the sanctity of our traditions while meeting luxury standards. This is spiritual commerce done right.",
    author: "Rajesh Iyer, Bangalore",
  },
  {
    text: "The storytelling, packaging, and authenticity—everything about Bhava: feels like a blessing. I've gifted it to all my family members abroad.",
    author: "Anjali Desai, London",
  },
];

const variants = {
  enter: (dir) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.22, 0.9, 0.32, 1] },
  },
  exit: (dir) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  }),
};

function Community() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const isPaused = useRef(false);

  const go = (next) => {
    setDir(next > current || (current === testimonials.length - 1 && next === 0) ? 1 : -1);
    setCurrent(next);
  };

  // Auto-advance like SacredCollection
  useEffect(() => {
    const timer = setInterval(() => {
      if (isPaused.current) return;
      setCurrent((c) => {
        setDir(1);
        return (c + 1) % testimonials.length;
      });
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.communitySection}>
      <div className={styles.communityHeader}>
        <h2 className={styles.communityTitle}>
          Community <span className={styles.highlight}>Stories</span>
        </h2>
      </div>

      <div className={styles.fullWidthSlider}>
        <div
          className={styles.sliderInner}
          onMouseEnter={() => { isPaused.current = true; }}
          onMouseLeave={() => { isPaused.current = false; }}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.article
              key={current}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className={styles.testimonialCardLarge}
              aria-live="polite"
            >
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testimonialTextLarge}>"{testimonials[current].text}"</p>
              <div className={styles.quoteDivider} />
              <p className={styles.testimonialAuthor}>— {testimonials[current].author}</p>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
            onClick={() => go(i)}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Community;