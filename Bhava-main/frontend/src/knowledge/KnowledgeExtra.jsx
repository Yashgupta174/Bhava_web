import React from "react";
import styles from "./KnowledgeExtra.module.css";
import GitaSlider from "./GitaSlider";
import SpiritualChallenges from "./SpiritualChallenges";
import TrendingTeachings from "./TrendingTeachings";
import MorningRoutines from "./MorningRoutines";
import PrayersForKids from "./PrayersForKids";
import SacredPathways from "./SacredPathways";
import NotSureWhereToStart from "./NotSureWhereToStart";
import CampaignsForYou from "./CampaignsForYou";
import LatestArticles from "./LatestArticles";
import DailyPractices from "./DailyPractices";
import LearningPaths from "./LearningPaths";
import ExploreByCategory from "./ExploreByCategory";
import NotSureStartBanner from "./NotSureStartBanner";
import LatestTeachings from "./LatestTeachings";
import MorningPracticesAndSeekers from "./MorningPracticesAndSeekers";
import CommunityVoicesAndAncientVerses from "./CommunityVoicesAndAncientVerses";
import WisdomJourneyCTA from "./WisdomJourneyCTA";

function KnowledgeExtra() {
  return (
    <>
      <section className={styles.tigerSummarySection}>
        <div className={styles.container}>
          <h2 className={styles.tigerSummaryHeading}>
            108 + Tiger Eye: Your Personal Dharmic Operating System
          </h2>
          <p className={styles.tigerSummaryText}>
            108 encodes cosmic order and completion, while Tiger Eye carries grounded courage and protection.
            Together they become a daily system that anchors modern life in Dharma.
          </p>
        </div>
      </section>

      <section className={styles.tigerKnowledgeSection}>
        <div className={styles.container}>
          <div className={styles.tigerKnowledgeGrid}>
            <div className={styles.tigerKnowledgeTextBlock}>
              <p className={styles.tigerKnowledgeEyebrow}>108 • TIGER EYE • MODERN DHARMA</p>
              <h2 className={styles.tigerKnowledgeTitle}>From Stones to Symbolic Infrastructure</h2>
              <p className={styles.tigerKnowledgeParagraph}>
                In Hindu civilization, 108 appears again and again as a signal of wholeness — in malas,
                temple canons, sacred name-garlands, and cosmic mappings.
              </p>
              <p className={styles.tigerKnowledgeParagraph}>
                108 (Order) + Tiger Eye (Power) becomes a daily dharmic operating system — how do I feel
                spiritually protected and aligned while navigating chaos, money, family, and ambition?
              </p>
            </div>
            <div className={styles.tigerKnowledgeCard}>
              <h3 className={styles.tigerKnowledgeCardTitle}>The 108 Tiger Path in Practice</h3>
              <ul className={styles.tigerKnowledgeList}>
                <li className={styles.tigerKnowledgeListItem}><span>Order (108):</span> structure, completion, and cosmic order.</li>
                <li className={styles.tigerKnowledgeListItem}><span>Power (Tiger Eye):</span> courage, protection, and grounded focus.</li>
                <li className={styles.tigerKnowledgeListItem}><span>Daily 108-Second Ritual:</span> stillness, breath, and touch of the anchor stone.</li>
                <li className={styles.tigerKnowledgeListItem}><span>Tribe and Movement:</span> a 108 Tribe that wears, counts, posts, and lives by 108.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <GitaSlider />
      {/* <SpiritualChallenges /> */}
      <TrendingTeachings />
      {/* <MorningRoutines /> */}
      {/* <PrayersForKids /> */}
      {/* <SacredPathways /> */}
      {/* <NotSureWhereToStart /> */}
      {/* <CampaignsForYou /> */}
      {/* <LatestArticles /> */}
      <DailyPractices />
      <LearningPaths />
      {/* <ExploreByCategory /> */}
      {/* <NotSureStartBanner /> */}
      <LatestTeachings />
      {/* <MorningPracticesAndSeekers /> */}
      {/* <CommunityVoicesAndAncientVerses /> */}
      {/* <WisdomJourneyCTA /> */}
    </>
  );
}

export default KnowledgeExtra;