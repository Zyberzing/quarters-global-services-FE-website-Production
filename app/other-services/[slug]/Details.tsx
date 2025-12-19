"use client";

import BannerLayout from "@/components/Banner/BannerLayout";
import Button from "@/components/Buttons/Button";
import CommitmentSection from "@/components/CommitmentSection/CommitmentSection";
import WhyChoose from "@/components/WhyChoose/WhyChoose";
import TestimonialSlider from "@/components/TestimonialSlider ";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { serviceFaqs } from "@/app/data/serviceFaqs";
import FAQSections from "@/components/FAQSections";
import { vehicleList } from "@/lib/vehicleList";

const faqKeyMap: Record<string, string> = {
  "vehicle-booking": "vehicle-booking",
  "courier-and-document-delivery": "courier-document-delivery",
  "travel-insurance": "travel-insurance",
  "consultancy-service": "consultancy-service",
  "idp": "idp-international-driving-permit",
  "driver": "driver",
  "immigration-service": "immigration-service",
  "surrender-passport": "surrender-passport",
  "flight-charter": "flight-charter",
  "concert-wedding-private-tour-corporate-ground-transport": "concert-wedding-private-tour-corporate-ground-transport",
  "consultancy_service": "consultancy_service",
  "idp-international-driving-license)": "idp-international-driving-license",
  "indian-pan-card": "indian-pan-card",
  "fast-track-immigration-fti-ttp": "fast-track-immigration-fti-ttp",
  "consular-services": "consular-services",
  "tour-packages": "tour-packages",
  "step-enrollment-assistance": "step-enrollment-assistance",
  "global-entry-tsa-pre-check": "global-entry-tsa-pre-check",
  "fbi-fingerprinting-background-checks": "fbi-fingerprinting-background-checks",
  "concert-program-tickets": "concert-program-tickets",
};

 const ArrowRightIcon = () => (
  <span
    className="
      flex
      items-center
      justify-center
      w-6
      h-6
      rounded-full
      bg-red-600
      text-white
      transition-all
      duration-300
      group-hover:bg-black
    "
  >
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </span>
);


const Details = () => {
  const params = useParams();
  const slug = Array.isArray(params.slug)
    ? decodeURIComponent(params.slug.join("/"))
    : decodeURIComponent(params.slug ?? "");


  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // ✅ query id
  const faqKey = faqKeyMap[slug];
  const faqData = faqKey ? serviceFaqs[faqKey] : [];

  // 🚗 VEHICLE BOOKING PAGE
  if (slug === "vehicle-booking") {
    return (
  
      <div>
        <BannerLayout bg="/service.jpg">
          <h4 className="bg-black/40 py-3 px-4 w-[50%] m-auto rounded-lg 
            text-white text-4xl font-bold mb-4 capitalize text-center">
            Vehicle Booking
          </h4>

          <Button
            name="Book Now"
            icon={<ArrowRightIcon />}
            iconPosition="right"
            link={`/other-services/checkout?type=${slug}`}
          />
        </BannerLayout>

        {/* VEHICLE L
        IST */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-12 px-4">
          {vehicleList.map((v) => (
            <div
              key={v.id}
              className="border rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <Image
                width={400}
                height={250}
                src={v.image}
                alt={v.name}
                className="h-52 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg">{v.name}</h2>
              </div>
            </div>
          ))}
        </div>
      <WhyChoose />

        <CommitmentSection />

        {faqData?.length > 0 && (
          <FAQSections title="Vehicle Booking FAQs" data={faqData} />
        )}

        <TestimonialSlider />
      </div>

    );
  }

  // ⭐ DEFAULT SERVICE PAGE (driver, courier, insurance, etc.)
  return (
    <div>
      <BannerLayout bg="/service.jpg">
        <h4 className="bg-black/40 py-3 px-4 w-[50%] m-auto rounded-lg 
          text-white text-4xl font-bold mb-4 capitalize text-center">
          {slug.replaceAll("-", " ")}
        </h4>

        <Button
        
          iconPosition="right"
          link={`/other-services/checkout?type=${slug}&id=${id}`}
          name="Book Now"
          icon={<ArrowRightIcon/>}
        />
      </BannerLayout>

      <WhyChoose />
      <CommitmentSection />

      {faqData?.length > 0 && (
        <FAQSections
          title={`${slug.replaceAll("-", " ")} FAQs`}
          data={faqData}
        />
      )}

      <TestimonialSlider />
    </div>
  );
};

export default Details;
