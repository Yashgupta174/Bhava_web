import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import styles from "./SacredCollection.module.css";
import { useCart } from "../context/CartContext";

const GAP = 12;

const CARDS = [
  {
    id: 0,
    category: "INCENSE",
    title: "Vedic Incense Series",
    price: "₹1,299",
    description: "Hand-rolled using 16th-century temple recipes, infused with Himalayan herbs and sacred mantras.",
    image: "./incense.jpeg",
  },
  {
    id: 1,
    category: "SAMBRANI",
    title: "Sacred Sambrani Cups",
    price: "₹899",
    description: "Purified resin sambrani with aromatic woods, perfect for daily pujas and sacred rituals.",
    image: "./incense.jpeg",
  },
  {
    id: 2,
    category: "DHOOP",
    title: "Temple Dhoop Sticks",
    price: "₹749",
    description: "Crafted from 108 medicinal herbs, each stick carries the blessing of traditional temple practitioners.",
    image: "./incense.jpeg",
  },
  {
    id: 3,
    category: "WELLNESS",
    title: "Sacred Anointing Oil",
    price: "₹1,599",
    description: "Ayurvedic blend of coconut and sacred herbs, traditionally used for temple abhishekam.",
    image: "./anionting.jpeg",
  },
  {
    id: 4,
    category: "MEDITATION",
    title: "Meditation Ritual Kit",
    price: "₹2,499",
    description: "Complete set for daily sadhana with premium incense, oil, and guided dharma cards.",
    image: "./anionting.jpeg",
  },
  {
    id: 5,
    category: "ULTRA PREMIUM",
    title: "Platinum Devotion Box",
    price: "₹4,999",
    description: "Limited edition curated selection—offerings from 12 sacred temples across India.",
    image: "./anionting.jpeg",
  },
];

// Duplicate for seamless infinite loop
const LOOPED = [...CARDS, ...CARDS];

function getVisibleCount() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth <= 640) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

// ── Individual flip card ──────────────────────────────────────────────────
function FlipCard({ card, width, onAddToCart }) {
  const [flipped, setFlipped] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(card);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      className={styles.cardOuter}
      style={width ? { flex: `0 0 ${width}px`, width } : {}}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className={styles.cardInner}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* BACK — image face (default) */}
        <div className={styles.cardBack}>
          <img
            src={card.image}
            alt={card.title}
            className={styles.cardBackImg}
          />
          <div className={styles.cardBackOverlay}>
            <span className={styles.cardBackCategory}>{card.category}</span>
            <p className={styles.cardBackTitle}>{card.title}</p>
          </div>
        </div>

        {/* FRONT — details face (revealed on hover flip) */}
        <div className={styles.cardFront}>
          <div className={styles.cardFrontContent}>
            <div className={styles.frontTop}>
              <span className={styles.frontCategory}>{card.category}</span>
              <h3 className={styles.frontTitle}>{card.title}</h3>
              <p className={styles.frontPrice}>{card.price}</p>
            </div>
            <div className={styles.frontBottom}>
              <p className={styles.frontDescription}>{card.description}</p>
              <button
                className={`${styles.frontBtn} ${added ? styles.frontBtnAdded : ""}`}
                onClick={handleAdd}
              >
                {added ? "✓ Added!" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Chevron SVGs ──────────────────────────────────────────────────────────
const ChevronLeft = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRight = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ── Main component ────────────────────────────────────────────────────────
function SacredCollection() {
  const { addToCart } = useCart();
  const [cardWidth, setCardWidth] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const cardWidthRef = useRef(0);
  const rawIndexRef = useRef(0);
  const isPausedRef = useRef(false);
  const isSnappingRef = useRef(false);
  const wrapperRef = useRef(null);

  const x = useMotionValue(0);

  const computeX = useCallback(
    (idx) => -(idx * (cardWidthRef.current + GAP)),
    []
  );

  const springTo = useCallback(
    (idx) => {
      animate(x, computeX(idx), {
        type: "spring",
        stiffness: 260,
        damping: 36,
        mass: 1.1,
      });
    },
    [x, computeX]
  );

  const instantTo = useCallback(
    (idx) => {
      x.set(computeX(idx));
    },
    [x, computeX]
  );

  const next = useCallback(() => {
    if (isSnappingRef.current) return;
    rawIndexRef.current += 1;
    springTo(rawIndexRef.current);

    if (rawIndexRef.current >= CARDS.length) {
      isSnappingRef.current = true;
      setTimeout(() => {
        rawIndexRef.current -= CARDS.length;
        instantTo(rawIndexRef.current);
        isSnappingRef.current = false;
      }, 900);
    }
  }, [springTo, instantTo]);

  const prev = useCallback(() => {
    if (isSnappingRef.current) return;
    if (rawIndexRef.current <= 0) {
      isSnappingRef.current = true;
      rawIndexRef.current = CARDS.length;
      instantTo(rawIndexRef.current);
      setTimeout(() => {
        rawIndexRef.current -= 1;
        springTo(rawIndexRef.current);
        setTimeout(() => { isSnappingRef.current = false; }, 900);
      }, 20);
    } else {
      rawIndexRef.current -= 1;
      springTo(rawIndexRef.current);
    }
  }, [springTo, instantTo]);

  // Measure card width from wrapper
  useEffect(() => {
    const measure = () => {
      if (!wrapperRef.current) return;
      const w = wrapperRef.current.clientWidth;
      const v = getVisibleCount();
      const cw = (w - GAP * (v - 1)) / v;
      cardWidthRef.current = cw;
      setCardWidth(cw);
      instantTo(rawIndexRef.current);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [instantTo]);

  // Auto-advance
  useEffect(() => {
    if (!cardWidth) return;
    const timer = setInterval(() => {
      if (!isPausedRef.current) next();
    }, 3500);
    return () => clearInterval(timer);
  }, [cardWidth, next]);

  return (
    <div className={styles.sacredCollectionSection}>
      <div className={styles.container}>
        <h1 className={styles.sectionTitle}>
          Our Sacred <span className={styles.highlight}>Collections</span>
        </h1>

        <div
          className={styles.sliderContainer}
          onMouseEnter={() => { setIsHovering(true); isPausedRef.current = true; }}
          onMouseLeave={() => { setIsHovering(false); isPausedRef.current = false; }}
        >
          {/* Left arrow */}
          <button
            className={`${styles.arrow} ${styles.arrowLeft} ${isHovering ? styles.arrowVisible : ""}`}
            onClick={prev}
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>

          <div className={styles.sliderWrapper} ref={wrapperRef}>
            <motion.div className={styles.sliderTrack} style={{ x }}>
              {LOOPED.map((card, idx) => (
                <FlipCard
                  key={`${card.id}-${idx}`}
                  card={card}
                  width={cardWidth}
                  onAddToCart={(c) =>
                    addToCart({
                      productId: `home-${c.id}`,
                      title: c.title,
                      price: c.price,
                      image: c.image,
                      category: c.category,
                      quantity: 1,
                    })
                  }
                />
              ))}
            </motion.div>
          </div>

          {/* Right arrow */}
          <button
            className={`${styles.arrow} ${styles.arrowRight} ${isHovering ? styles.arrowVisible : ""}`}
            onClick={next}
            aria-label="Next"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SacredCollection;
