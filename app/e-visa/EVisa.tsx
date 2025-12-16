"use client";
import BannerLayout from "@/components/Banner/BannerLayout";
import CommitmentSection from "@/components/CommitmentSection/CommitmentSection";
import DropdownForm from "@/components/DropdownForm/DropdownForm";
import FAQSection from "@/components/FAQSection";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import TestimonialSlider from "@/components/TestimonialSlider ";
import WhyChoose from "@/components/WhyChoose/WhyChoose";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import React, { useState } from "react";



const destinations = [
  { name: "India", slug: "india", image: "/1.jpg" },
  { name: "Brazil", slug: "brazil", image: "/2.jpg" },
  { name: "Kenya", slug: "kenya", image: "/3.jpg" },
  { name: "Tanzania", slug: "tanzania", image: "/4.jpg" },
  { name: "Turkey", slug: "turkey", image: "/5.jpg" },
  { name: "Vietnam", slug: "vietnam", image: "/6.jpg" },
];

const eVisaCountries = [
  "Australia",
  "Azerbaijan",
  "Bahrain",
  "Benin",
  "Brazil",
  "Cambodia",
  "Cote d'Ivoire",
  "Egypt",
  "Ethiopia",
  "India",

  "Iraq",
  "Japan",
  "Jordan",
  "Kenya",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Morocco",
  "Mozambique",
  "Myanmar",

  "Namibia",
  "New Zealand",
  "Nigeria",
  "Oman",
  "Pakistan",
  "Rwanda",
  "Saudi Arabia",
  "South Korea",
  "Sri Lanka",
  "Tajikistan",

  "Tanzania",
  "Thailand",
  "Turkey",
  "Uganda",
  "United Arab Emirates",
  "United Kingdom",
  "Uzbekistan",
  "Vietnam",
  "Zambia",
];


const toSlug = (name: string) =>
  name.toLowerCase().replace(/\s+/g, "-");



const EVisa = () => {
  const searchParams = useSearchParams();
  const country = searchParams.get("toCountrySlug") || "united-states";
  const [activeTab, setActiveTab] = useState<"Services" | "apostille" | "e-visa">("e-visa");

  const router = useRouter();

  const handleRedirect = (slug: string) => {
    router.push(`/category?toCountrySlug=${slug}&fromCountrySlug=india&Slug=e-visa`);
  };

  return (
    <>
      <BannerLayout bg="/services/visa.png">
        {/* Overlay Heading */}
        <h4 className="bg-black/40 py-2 px-3 sm:py-3 sm:px-4 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] m-auto rounded-lg text-white font-bold mb-4 text-center 
                 text-[clamp(1rem,1.8vw,2rem)]">
          Fast, Hassle-Free {country} E-Visa Services
        </h4>

        {/* Main Heading */}
        <h1 className="font-bold mb-6 text-center 
                 text-[clamp(1.5rem,2.5vw,2.75rem)] 
                 sm:text-[clamp(1.75rem,2.5vw,3rem)] 
                 md:text-[clamp(2rem,2.2vw,3.25rem)] 
                 leading-snug">
          We help U.S. citizens apply for tourist, business, student, and
          <br className="hidden sm:inline" />
          work E-visa, securely, and on time.
        </h1>

        {/* Dropdown Form */}

      </BannerLayout>

      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Popular <span className="text-red-600">Destination</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-12 lg:px-20">
          {destinations.map((dest) => (
            <div
              key={dest.name}
              onClick={() => handleRedirect(dest.slug)}

              className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
            >
              <div className="relative w-full h-56 md:h-60 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="bg-white py-3">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                  {dest.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section className="py-20 bg-gradient-to-b from-[#F8FAFC] to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          {/* Title */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B4A7B]">
              e-Visa Supported Countries
            </h2>
            <p className="mt-3 text-gray-600 text-sm md:text-base">
              Apply online for e-Visa services in the following countries
            </p>
          </div>

          {/* Country List Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-4 gap-x-8">
              {eVisaCountries.map((country) => (
                <button
                  key={country}
                  onClick={() =>
                    router.push(
                      `/category?toCountrySlug=${toSlug(country)}&fromCountrySlug=india&Slug=e-visa`
                    )
                  }
                  className="
              group flex items-center justify-between
              text-left font-medium text-[#0B4A7B]
              hover:text-red-600 transition-all duration-300
            "
                >
                  <span className="relative">
                    {country}
                    {/* underline animation */}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-600 group-hover:w-full transition-all duration-300"></span>
                  </span>

                  {/* arrow */}
                  <span className="ml-2 text-gray-400 group-hover:text-red-600 transform group-hover:translate-x-1 transition-all duration-300">
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>



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

    </>
  );
};
export default EVisa;
