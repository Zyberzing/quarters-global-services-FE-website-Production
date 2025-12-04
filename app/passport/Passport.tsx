"use client"
import BannerLayout from '@/components/Banner/BannerLayout'
 import CommitmentSection from '@/components/CommitmentSection/CommitmentSection';
import DropdownForm from '@/components/DropdownForm/DropdownForm';
import FAQSection from '@/components/FAQSection';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import TestimonialSlider from '@/components/TestimonialSlider ';
import WhyChoose from '@/components/WhyChoose/WhyChoose';
import React, { useState } from 'react'

const Passport = () => {
  const [activeTab, setActiveTab] = useState<"Services" | "apostille" |  "e-visa">("Services");
  return (
    <>
      <BannerLayout bg="/services/passport.png">
        {/* Overlay Heading */}
        <h4 className="bg-black/40 py-2 px-3 sm:py-3 sm:px-4 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] m-auto rounded-lg text-white font-bold mb-4 text-center text-[clamp(1.5rem,2.5vw,2.75rem)] leading-snug">
          Fast, Secure Passport Services
        </h4>

        {/* Main Heading */}
        <h1 className="font-bold mb-6 text-center text-[clamp(1.75rem,3.5vw,3rem)] sm:text-[clamp(2rem,4vw,3.5rem)] md:text-[clamp(2.25rem,4vw,3.75rem)] leading-snug">
          We Handle Everything
        </h1>

        {/* Dropdown Form */}
        <div className="px-4 sm:px-6 md:px-8">
          <DropdownForm setActiveTab={setActiveTab} activeTab={activeTab} />
        </div>
      </BannerLayout>
 
      <WhyChoose />
      <CommitmentSection />

      <div className="max-w-7xl mx-auto px-10 py-12  ">
        <SectionTitle
          subtitle="Our Testimonials"
          title="Real Stories. Real Success."
          highlight="Quartus"
          align="center"
        />
        <TestimonialSlider />
      </div>

      <FAQSection />

    </>
  )
}
export default Passport