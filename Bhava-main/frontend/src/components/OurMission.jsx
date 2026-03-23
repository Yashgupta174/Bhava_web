import styles from "./OurMission.module.css";

function OurMission() {
  return (
    <div className={styles.ourMissionSection}>
      <div className={styles.container}>
        <div className={styles.row}>
          {/* Left side - Text content */}
          <div className={styles.missionContent}>
            <h2 className={styles.missionTitle}>Our Sacred Mission</h2>
            <p className={styles.missionText}>
              <strong>Bhava</strong> is redefining the spiritual economy by honoring ancient wisdom through 
              premium, authentic products. We believe that spirituality deserves the same 
              craftsmanship and excellence as any luxury category.
            </p>
            <p className={styles.missionText}>
              Every product carries the energy of intention—sourced from temple 
              partnerships, blessed by traditional practitioners, and designed for modern 
              devotees who refuse to compromise on quality or authenticity.
            </p>
            <p className={styles.missionText}>
              We are building a movement where faith, commerce, and sustainability align—
              creating sacred spaces in every home, every heart, and every ritual.
            </p>
          </div>

          {/* Right side - Image */}
          <div className={styles.missionImage}>
            <img src="/Sacred Mission.png" alt="Sacred Mission" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurMission;
