import React from "react";
import styles from "./HomeMain.module.css";

function HomeMain() {
  return (
    <div className={styles.homeMainHero}>

      <img
        src="./temple(4).png"
        alt="Temple Background"
        className={styles.homeMainHeroBgImage}
      />

      <div className={styles.homeMainContainer}>
        <div className={styles.homeMainTextLeft}>

          <h1 className={styles.homeMainHeroTitle}>
            <span className={styles.homeMainElevateText}>Elevate Your</span>
            <span className={styles.homeMainHighlight}>Spiritual Practice</span>
          </h1>

          <p className={styles.homeMainHeroDescription}>
            Experience premium Hindu sacred products, wisdom platforms, and pilgrimage
            experiences—where ancient tradition meets contemporary luxury.
          </p>

          <div className={styles.homeMainHeroButtons}>
            <button className={styles.homeMainBtnPrimary}>Explore Products</button>
            <button className={styles.homeMainBtnSecondary}>Join Our Community</button>
          </div>

        </div>
      </div>

    </div>
  );
}

export default HomeMain;
