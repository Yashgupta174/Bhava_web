import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./TrendingDetail.module.css";

const teachingDetails = {
  "karma-yoga": {
    title: "Karma Yoga",
    sub: "Path of Action",
    teacher: "Swami Vivekananda",
    duration: "12 min",
    sessions: "8 sessions",
    image: "/karmaYoga.jpeg",
    description:
      "Karma Yoga is the path of selfless action — doing your duty without attachment to the fruits of your work. Rooted in the Bhagavad Gita, it teaches that every action performed with pure intention becomes a form of worship, purifying the mind and dissolving the ego.",
    lessons: [
      { num: 1, title: "The Nature of Action", duration: "10 min" },
      { num: 2, title: "Selfless Service & Seva", duration: "12 min" },
      { num: 3, title: "Detachment from Results", duration: "14 min" },
      { num: 4, title: "Offering Work to the Divine", duration: "11 min" },
      { num: 5, title: "Karma & Dharma", duration: "13 min" },
      { num: 6, title: "Daily Practice of Karma Yoga", duration: "9 min" },
      { num: 7, title: "Purification Through Action", duration: "15 min" },
      { num: 8, title: "Integration & Living the Path", duration: "12 min" },
    ],
  },
  "bhakti-sutras": {
    title: "Bhakti Sutras",
    sub: "Science of Devotion",
    teacher: "Narada Muni",
    duration: "8 min",
    sessions: "6 sessions",
    image: "/bhakti.png",
    description:
      "The Narada Bhakti Sutras are 84 aphorisms on the nature of divine love. Bhakti is not mere sentiment — it is the highest science of the heart, transforming ordinary human love into unconditional devotion to the Divine. This path dissolves the sense of separation between the devotee and the Beloved.",
    lessons: [
      { num: 1, title: "What is Bhakti?", duration: "8 min" },
      { num: 2, title: "Forms of Devotion", duration: "10 min" },
      { num: 3, title: "Navavidha Bhakti — Nine Forms", duration: "12 min" },
      { num: 4, title: "Surrender & Sharanagati", duration: "9 min" },
      { num: 5, title: "The Devotee's Daily Life", duration: "11 min" },
      { num: 6, title: "Para Bhakti — Supreme Love", duration: "14 min" },
    ],
  },
  "yoga-philosophy": {
    title: "Yoga Philosophy",
    sub: "Patanjali's Path",
    teacher: "Maharishi Patanjali",
    duration: "15 min",
    sessions: "12 sessions",
    image: "/yogaPhilosophy.jpeg",
    description:
      "The Yoga Sutras of Patanjali are 196 terse aphorisms defining the complete science of yoga. Far beyond physical postures, yoga is the cessation of the fluctuations of the mind — Chitta Vritti Nirodha. This series explores all eight limbs, from ethical foundations to the highest states of samadhi.",
    lessons: [
      { num: 1, title: "Samadhi Pada — On Contemplation", duration: "15 min" },
      { num: 2, title: "The Eight Limbs of Yoga", duration: "18 min" },
      { num: 3, title: "Yama — Ethical Restraints", duration: "12 min" },
      { num: 4, title: "Niyama — Personal Observances", duration: "13 min" },
      { num: 5, title: "Asana & Pranayama", duration: "14 min" },
      { num: 6, title: "Pratyahara — Withdrawal", duration: "11 min" },
      { num: 7, title: "Dharana & Dhyana", duration: "16 min" },
      { num: 8, title: "Samadhi — The Goal", duration: "20 min" },
      { num: 9, title: "Vibhuti Pada — Powers", duration: "15 min" },
      { num: 10, title: "Kaivalya Pada — Liberation", duration: "17 min" },
      { num: 11, title: "Obstacles on the Path", duration: "12 min" },
      { num: 12, title: "Integration & Practice", duration: "13 min" },
    ],
  },
  "vedanta-basics": {
    title: "Vedanta Basics",
    sub: "Ultimate Reality",
    teacher: "Adi Shankaracharya",
    duration: "10 min",
    sessions: "10 sessions",
    image: "/vedantaBasic.jpeg",
    description:
      "Advaita Vedanta proclaims the radical non-dual truth: Brahman alone is real, the world is appearance, and the individual self is none other than the Supreme. This foundational series introduces Viveka (discrimination), Vairagya (detachment), and the Mahavakyas — the great sayings of the Upanishads.",
    lessons: [
      { num: 1, title: "What is Vedanta?", duration: "10 min" },
      { num: 2, title: "Brahman — Ultimate Reality", duration: "12 min" },
      { num: 3, title: "Maya & the Apparent World", duration: "14 min" },
      { num: 4, title: "Atman — The Inner Self", duration: "11 min" },
      { num: 5, title: "The Mahavakyas", duration: "13 min" },
      { num: 6, title: "Viveka & Vairagya", duration: "10 min" },
      { num: 7, title: "Neti Neti — Not This", duration: "12 min" },
      { num: 8, title: "Self-Enquiry Practice", duration: "15 min" },
      { num: 9, title: "The Three Bodies", duration: "11 min" },
      { num: 10, title: "Liberation — Moksha", duration: "18 min" },
    ],
  },
  "meditation-guide": {
    title: "Meditation Guide",
    sub: "Dhyana Practice",
    teacher: "Sri Ramana Maharshi",
    duration: "18 min",
    sessions: "14 sessions",
    image: "/meditationGuide.jpeg",
    description:
      "Dhyana is the seventh limb of Yoga — the unbroken flow of attention toward the Divine. This comprehensive guide moves from breath awareness through mantra meditation to the deepest state of thoughtless awareness. Rooted in ancient Indian tradition, each session builds a sustainable daily practice.",
    lessons: [
      { num: 1, title: "Why Meditate?", duration: "8 min" },
      { num: 2, title: "Preparing Body & Space", duration: "10 min" },
      { num: 3, title: "Breath Awareness", duration: "18 min" },
      { num: 4, title: "Mantra Meditation", duration: "20 min" },
      { num: 5, title: "Trataka — Candle Gazing", duration: "15 min" },
      { num: 6, title: "So Hum Practice", duration: "18 min" },
      { num: 7, title: "Body Scan & Pratyahara", duration: "22 min" },
      { num: 8, title: "Working with Thoughts", duration: "16 min" },
      { num: 9, title: "Deep Stillness Practice", duration: "25 min" },
      { num: 10, title: "Nada Yoga — Sound Meditation", duration: "19 min" },
      { num: 11, title: "Chakra Dhyana", duration: "21 min" },
      { num: 12, title: "Open Awareness", duration: "18 min" },
      { num: 13, title: "Building a Daily Habit", duration: "12 min" },
      { num: 14, title: "Integration & Going Deeper", duration: "15 min" },
    ],
  },
  "dharma-ethics": {
    title: "Dharma Ethics",
    sub: "Righteous Living",
    teacher: "Chanakya",
    duration: "14 min",
    sessions: "9 sessions",
    image: "/dharmaEthics.jpeg",
    description:
      "Dharma is the cosmic law that sustains life — the right way of living in harmony with nature, family, society, and the Divine. This series draws from the Manusmriti, Arthashastra, and Bhagavad Gita to present a practical framework for ethical decision-making in modern life.",
    lessons: [
      { num: 1, title: "What is Dharma?", duration: "12 min" },
      { num: 2, title: "Svadharma — Your Own Duty", duration: "14 min" },
      { num: 3, title: "The Four Purusharthas", duration: "16 min" },
      { num: 4, title: "Family Dharma", duration: "13 min" },
      { num: 5, title: "Social & Civic Duty", duration: "15 min" },
      { num: 6, title: "Dharma in Business", duration: "14 min" },
      { num: 7, title: "Adharma & Its Consequences", duration: "12 min" },
      { num: 8, title: "Resolving Ethical Conflicts", duration: "18 min" },
      { num: 9, title: "Living a Dharmic Life Daily", duration: "14 min" },
    ],
  },
  "sankhya": {
    title: "Sankhya",
    sub: "Cosmic Enumeration",
    teacher: "Maharishi Kapila",
    duration: "20 min",
    sessions: "16 sessions",
    image: "/sankhaya.jpeg",
    description:
      "Sankhya is India's oldest systematic philosophy, teaching that reality consists of two principles: Purusha (pure consciousness) and Prakriti (nature). All of creation — from the cosmic to the personal — can be mapped through 25 tattvas. This series offers a complete map of existence.",
    lessons: [
      { num: 1, title: "Introduction to Sankhya", duration: "18 min" },
      { num: 2, title: "Purusha & Prakriti", duration: "20 min" },
      { num: 3, title: "The Three Gunas", duration: "22 min" },
      { num: 4, title: "Mahat — Cosmic Intelligence", duration: "19 min" },
      { num: 5, title: "The Five Tanmatras", duration: "21 min" },
      { num: 6, title: "The Five Elements", duration: "18 min" },
      { num: 7, title: "The Five Sense Organs", duration: "17 min" },
      { num: 8, title: "Ahamkara — The Ego Principle", duration: "20 min" },
      { num: 9, title: "Buddhi — Higher Intellect", duration: "22 min" },
      { num: 10, title: "Manas — The Mind", duration: "19 min" },
      { num: 11, title: "The Subtle Body", duration: "20 min" },
      { num: 12, title: "Bondage & Liberation", duration: "21 min" },
      { num: 13, title: "Sankhya & Yoga", duration: "18 min" },
      { num: 14, title: "Sankhya & Vedanta", duration: "20 min" },
      { num: 15, title: "Practical Applications", duration: "16 min" },
      { num: 16, title: "The 25 Tattvas — Summary", duration: "25 min" },
    ],
  },
  "anointment-rituals": {
    title: "Anointment Rituals",
    sub: "Sacred Consecration",
    teacher: "Temple Tradition",
    duration: "16 min",
    sessions: "7 sessions",
    image: "/anionting.jpeg",
    description:
      "Abhisheka — the sacred anointing of the deity — is one of the most powerful and intimate forms of temple worship. Through water, milk, honey, ghee, and rose water, the devotee consecrates the divine image, connecting directly with the sacred presence. This series teaches the complete ritual with meaning.",
    lessons: [
      { num: 1, title: "What is Abhisheka?", duration: "14 min" },
      { num: 2, title: "Sacred Substances & Their Meaning", duration: "16 min" },
      { num: 3, title: "Panchamrita Abhisheka", duration: "20 min" },
      { num: 4, title: "Mantras During Anointing", duration: "18 min" },
      { num: 5, title: "Home Abhisheka Practice", duration: "16 min" },
      { num: 6, title: "Special Festival Abhishekas", duration: "14 min" },
      { num: 7, title: "Inner Meaning of Consecration", duration: "19 min" },
    ],
  },
};

function TrendingDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const teaching = teachingDetails[slug];

  if (!teaching) {
    return (
      <div className={styles.notFound}>
        <p>Teaching not found.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className={styles.detailPage}>

      {/* ── Hero ── */}
      <div className={styles.detailHero}>
        <div className={styles.heroImageWrap}>
          <img src={teaching.image} alt={teaching.title} className={styles.heroImage} />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContent}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            ← Back
          </button>
          <p className={styles.heroSub}>{teaching.sub}</p>
          <h1 className={styles.heroTitle}>{teaching.title}</h1>
          <p className={styles.heroTeacher}>{teaching.teacher}</p>
          <div className={styles.heroMeta}>
            <span>{teaching.sessions}</span>
            <span className={styles.dot}>·</span>
            <span>{teaching.duration} per session</span>
          </div>
          <button className={styles.startBtn}>Begin This Path</button>
        </div>
      </div>

      {/* ── Description ── */}
      <div className={styles.detailBody}>
        <div className={styles.detailContainer}>
          <p className={styles.detailDescription}>{teaching.description}</p>

          <h2 className={styles.lessonsHeading}>Sessions</h2>
          <div className={styles.lessonsList}>
            {teaching.lessons.map((lesson) => (
              <div key={lesson.num} className={styles.lessonItem}>
                <span className={styles.lessonNum}>{String(lesson.num).padStart(2, "0")}</span>
                <span className={styles.lessonTitle}>{lesson.title}</span>
                <span className={styles.lessonDuration}>{lesson.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default TrendingDetail;