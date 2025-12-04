"use client"
import BannerLayout from '@/components/Banner/BannerLayout'
import Button from '@/components/Buttons/Button';
import CommitmentSection from '@/components/CommitmentSection/CommitmentSection';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import TestimonialSlider from '@/components/TestimonialSlider ';
import React from 'react'

const categories = [
  {
    title: "Personal Documents",
    items: [
      "Birth Certificates",
      "Marriage/Divorce Certificates",
      "FBI Background Checks",
      "Power of Attorney",
      "Affidavits",
    ],
  },
  {
    title: "Academic Documents",
    items: [
      "Diplomas & Degrees",
      "Transcripts",
      "Enrollment Verification",
    ],
  },
  {
    title: "Corporate Documents",
    items: [
      "Articles of Incorporation",
      "Board Resolutions",
      "Contracts & Invoices",
      "Certificates of Good Standing",
    ],
  },
];


const ApostilleAndLegalization = () => {
  return (
    <>
  <BannerLayout bg="/services/apostille.png">
  {/* Title */}
  <h4 className="bg-black/30 py-2 px-4 w-full sm:w-[70%] md:w-[50%] m-auto rounded-lg text-red-500 font-bold mb-3 text-center text-[clamp(1.25rem,2vw,2rem)] leading-tight tracking-wide">
    Fast, Secure Apostille & Document Legalization
  </h4>

  {/* Short Description */}
  <p className="text-center text-white text-[clamp(1rem,1.8vw,1.25rem)] font-medium leading-snug max-w-3xl mx-auto">
    We legalize your U.S. documents for international use — no stress, no delays.
  </p>

  {/* CTA Button */}
  <div className="flex justify-center py-5">
    <Button
      iconPosition="right"
      name="Start Legalization Process"
      link="/apostille-and-legalization/checkout"
      icon={
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12.5" r="12" fill="#D31021" />
          <path
            d="M7.33325 12.5H16.6666M16.6666 12.5L12.6666 8.5M16.6666 12.5L12.6666 16.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
    />
  </div>
</BannerLayout>



      <section className="py-16 bg-white px-4 sm:px-8 lg:px-16">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10">
          Documents We Can Apostille for International Use
        </h2>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all p-6"
            >
              <h3 className="bg-blue-900 text-white text-sm font-semibold px-4 py-2 rounded-md inline-block mb-4">
                {cat.title}
              </h3>
              <ul className="space-y-2 text-gray-700">
                {cat.items.map((item, j) => (
                  <li key={j} className="flex items-start">
                    <span className="text-blue-900 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        
      </section>

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


      {/* <FAQSection /> */}

    </>
  )
}
export default ApostilleAndLegalization