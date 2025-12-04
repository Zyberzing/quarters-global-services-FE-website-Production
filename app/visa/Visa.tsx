"use client";
import BannerLayout from "@/components/Banner/BannerLayout";
import CommitmentSection from "@/components/CommitmentSection/CommitmentSection";
import DropdownForm from "@/components/DropdownForm/DropdownForm";
import FAQSection from "@/components/FAQSection";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import TestimonialSlider from "@/components/TestimonialSlider ";
import WhyChoose from "@/components/WhyChoose/WhyChoose";
 import React, {   useState } from "react";
 

const Visa = () => {
  const [activeTab, setActiveTab] = useState<"Services" | "apostille" | "e-visa">("Services");
 

  return (
    <>
      <BannerLayout bg="/services/visa.png">
        {/* Overlay Heading */}
        <h4 className="bg-black/40 py-2 px-3 sm:py-3 sm:px-4 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] m-auto rounded-lg text-white font-bold mb-4 text-center 
                 text-[clamp(1rem,1.8vw,2rem)]">
          Fast, Hassle-Free Visa Services
        </h4>

        {/* Main Heading */}
        <h1 className="font-bold mb-6 text-center 
                 text-[clamp(1.5rem,2.5vw,2.75rem)] 
                 sm:text-[clamp(1.75rem,2.5vw,3rem)] 
                 md:text-[clamp(2rem,2.2vw,3rem)] 
                 leading-snug">
          We help U.S. citizens apply for tourist, business, student, and
          <br className="hidden sm:inline" />
          work visas—accurately, securely, and on time.
        </h1>

        {/* Dropdown Form */}
           <DropdownForm setActiveTab={setActiveTab} activeTab={activeTab} />
         
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
  );
};
export default Visa;
