import React from "react";
import { Routes, Route } from "react-router-dom";
import DaysOfDevotion108 from "../knowledge/DaysOfDevotion108";
import BhagavadGitaJourney from "../knowledge/BhagavadGitaJourney";
import UpanishadWisdom from "../knowledge/UpanishadWisdom";
import YogaPhilosophy from "../knowledge/YogaPhilosophy";
import VedicChanting from "../knowledge/VedicChanting";
import DeityWisdom from "../knowledge/DeityWisdom";
import TantraShakti from "../knowledge/TantraShakti";
import PujaRituals from "../knowledge/PujaRituals";
import VedicScriptures from "../knowledge/VedicScriptures";
import TempleTraditions from "../knowledge/TempleTraditions";
import MantrasPrayers from "../knowledge/MantrasPrayers";
import MeditationPractices from "../knowledge/MeditationPractices";
import FestivalCelebrations from "../knowledge/FestivalCelebrations";
import TrendingDetail from "../knowledge/TrendingDetail";
import TigerEye108 from "../knowledge/TigerEye108";
import DhyanChallenge21 from "../knowledge/DhyanChallenge21";
import MantraSadhana108 from "../knowledge/MantraSadhana108";
import GitaWisdomPath40Day from "../knowledge/GitaWisdomPath40Day";
import DailyPuja from "../knowledge/DailyPuja";
import Meditation from "../knowledge/Meditation";
import JapaMala from "../knowledge/JapaMala";
import VedicHymns from "../knowledge/VedicHymns";
import MantraChanting from "../knowledge/MantraChanting";
import SuryaNamaskar from "../knowledge/SuryaNamaskar";
import GitaReading from "../knowledge/GitaReading";
import Aarti from "../knowledge/Aarti";
import KarmaDharma from "../knowledge/KarmaDharma";
import DivineGrace from "../knowledge/DivineGrace";
import InnerPeace from "../knowledge/InnerPeace";
import SacredTraditions from "../knowledge/SacredTraditions";
import PathOfUnion from "../knowledge/PathOfUnion";
import NonDualWisdom from "../knowledge/NonDualWisdom";

function KnowledgeRoutes() {
  return (
    <Routes>
      {/* Learning Path detail pages */}
      <Route path="/108-days-devotion"    element={<DaysOfDevotion108 />} />
      <Route path="/bhagavad-gita-journey" element={<BhagavadGitaJourney />} />
      <Route path="/upanishad-wisdom"     element={<UpanishadWisdom />} />
      <Route path="/yoga-philosophy"      element={<YogaPhilosophy />} />
      <Route path="/vedic-chanting"       element={<VedicChanting />} />
      <Route path="/deity-wisdom"         element={<DeityWisdom />} />
      <Route path="/tantra-shakti"        element={<TantraShakti />} />

      <Route path="/puja-rituals" element={<PujaRituals />} />
      <Route path="/vedic-scriptures" element={<VedicScriptures />} />
      <Route path="/temple-traditions" element={<TempleTraditions />} />
      <Route path="/mantras-prayers" element={<MantrasPrayers />} />
      <Route path="/meditation-practices" element={<MeditationPractices />} />
      <Route path="/festivals-celebrations" element={<FestivalCelebrations />} />
      <Route path="/trending/:slug" element={<TrendingDetail />} />
      <Route path="/tiger-eye" element={<TigerEye108 />} />
      <Route path="/21-day-dhyan" element={<DhyanChallenge21 />} />
      <Route path="/108-day-sadhana" element={<MantraSadhana108 />} />
      <Route path="/40-day-gita-wisdom" element={<GitaWisdomPath40Day />} />
      <Route path="/daily-puja" element={<DailyPuja />} />
      <Route path="/meditation" element={<Meditation />} />
      <Route path="/japa-mala" element={<JapaMala />} />
      <Route path="/vedic-hymns" element={<VedicHymns />} />
      <Route path="/mantra-chanting" element={<MantraChanting />} />
      <Route path="/surya-namaskar" element={<SuryaNamaskar />} />
      <Route path="/gita-reading" element={<GitaReading />} />
      <Route path="/aarti" element={<Aarti />} />
      <Route path="/karma-dharma" element={<KarmaDharma />} />
      <Route path="/divine-grace" element={<DivineGrace />} />
      <Route path="/inner-peace" element={<InnerPeace />} />
      <Route path="/sacred-traditions" element={<SacredTraditions />} />
      <Route path="/path-of-union" element={<PathOfUnion />} />
      <Route path="/non-dual-wisdom" element={<NonDualWisdom />} />
    </Routes>
  );
}

export default KnowledgeRoutes;