"use client";

import HomeSection from "./components/HomeSection";
import CandidateSection from "./components/CandidateSection";
import Calendar from "./components/Calendar";
import WordCloudSection from "./components/WordCloudSection";
import PolicySection from "./components/PolicySection";
import AboutSection from "./components/AboutSection";
import QuestionSection from "./components/QuestionSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <div>
      <HomeSection />
      <CandidateSection />
      <Calendar />
      <WordCloudSection />
      <PolicySection />
      <AboutSection />
      <QuestionSection />
      <ContactSection />
    </div>
  );
}
