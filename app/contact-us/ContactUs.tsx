"use client";

import BannerLayout from "@/components/Banner/BannerLayout";
import SectionHeading from "@/components/SectionTitle/SectionHeading";
import SupportForm from "@/components/SupportForm";
import Image from "next/image";
import React from "react";

const ContectUs = () => {

  return (
    <div>
      <BannerLayout bg="/service.jpg">
        {/* Overlay Heading */}
        <h4 className="bg-black/40 py-2 px-3 sm:py-3 sm:px-4 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] m-auto rounded-lg text-white font-bold mb-4 text-center text-[clamp(1.5rem,2.5vw,2.75rem)] leading-snug">
          Contact Us
        </h4>
      </BannerLayout>

      <section className="mt-16">
        <SectionHeading
          label="Contact Us"
          titleLeft="Need Assistance?"
          titleRight="Let’s Connect."
          leftColor="text-gray-400"
          rightColor="text-black"
        />

        <div className="w-full md:max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 px-6 lg:px-16 py-12 bg-white rounded-2xl shadow-sm mt-8">
          {/* Left Form */}
          <SupportForm />

          {/* Right Map */}
          <div className="w-full lg:w-1/2 relative">
            <Image
              width={700}
              height={500}
              src="/map.png" // Place your image in /public folder
              alt="World Map"
              className="w-full rounded-2xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContectUs;
