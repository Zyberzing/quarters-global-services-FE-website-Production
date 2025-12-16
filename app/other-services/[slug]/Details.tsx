"use client";

import BannerLayout from "@/components/Banner/BannerLayout";
import Button from "@/components/Buttons/Button";
import CommitmentSection from "@/components/CommitmentSection/CommitmentSection";
import WhyChoose from "@/components/WhyChoose/WhyChoose";
import TestimonialSlider from "@/components/TestimonialSlider ";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { serviceFaqs } from "@/app/data/serviceFaqs";
import FAQSections from "@/components/FAQSections";

const faqKeyMap: Record<string, string> = {
  "vehicle-booking": "vehicle-booking",
  "courier-and-document-delivery": "courier-document-delivery",
  "travel-insurance": "travel-insurance",
  "consultancy-service": "consultancy-service",
  "idp": "idp-international-driving-permit",
  "driver": "driver",
  "immigration-service": "immigration-service",
  "surrender-passport": "surrender-passport",
  "flight-charter":"flight-charter",
  "concert-wedding-private-tour-corporate-ground-transport":"concert-wedding-private-tour-corporate-ground-transport",
  "consultancy_service":"consultancy_service",
  "idp-international-driving-license)":"idp-international-driving-license",
  "indian-pan-card":"indian-pan-card",
  "fast-track-immigration-fti-ttp":"fast-track-immigration-fti-ttp",
  "consular-services":"consular-services",
  "tour-packages":"tour-packages",
  "step-enrollment-assistance":"step-enrollment-assistance",
  "global-entry-tsa-pre-check":"global-entry-tsa-pre-check",
  "fbi-fingerprinting-background-checks":"fbi-fingerprinting-background-checks",
  "concert-program-tickets":"concert-program-tickets",  
};

const Details = () => {
  const params = useParams();
  const slug = Array.isArray(params.slug)
    ? decodeURIComponent(params.slug.join("/"))
    : decodeURIComponent(params.slug ?? "");

    console.log(slug,"slug")

  const [vehicles, setVehicles] = useState<any[]>([]);

  // 🚗 Fetch vehicles only for vehicle booking
  useEffect(() => {
    if (slug !== "vehicle-booking") return;

    const fetchVehicles = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_QUARTUS_API_URL}/vehicle/list`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setVehicles(data?.data || []);
      } catch (error) {
        console.error("Vehicle API Error:", error);
      }
    };

    fetchVehicles();
  }, [slug]);

  const faqKey = faqKeyMap[slug];
  console.log
  const faqData = faqKey ? serviceFaqs[faqKey] : [];
  console.log(faqData,"faqData")

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
            iconPosition="right"
            link={`/other-services/checkout?type=${slug}`}
            name="Book Now"
          />
        </BannerLayout>

        {/* VEHICLE LIST */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-12 px-4">
          {vehicles.map((v) => (
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
          link={`/other-services/checkout?type=${slug}`}
          name="Book Now"
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
