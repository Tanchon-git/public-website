"use client";

import HomeSection from "@/app/components/HomeSection";
import CandidateSection from "@/app/components/CandidateSection";
import Calendar from "@/app/components/Calendar";
import WordCloudSection from "@/app/components/WordCloudSection";
import PolicySection from "@/app/components/PolicySection";
import AboutSection from "@/app/components/AboutSection";
import QuestionSection from "@/app/components/QuestionSection";
import ContactSection from "@/app/components/ContactSection";

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
