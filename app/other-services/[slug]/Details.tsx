"use client";

import BannerLayout from "@/components/Banner/BannerLayout";
import Button from "@/components/Buttons/Button";
import CommitmentSection from "@/components/CommitmentSection/CommitmentSection";
import WhyChoose from "@/components/WhyChoose/WhyChoose";
import TestimonialSlider from "@/components/TestimonialSlider ";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { serviceFaqs } from "@/app/data/serviceFaqs";
import FAQSections from "@/components/FAQSections";
import { vehicleList } from "@/lib/vehicleList";
import { useState } from "react";

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

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // ✅ query id
  const faqKey = faqKeyMap[slug];
  const faqData = faqKey ? serviceFaqs[faqKey] : [];

  // 🚗 VEHICLE BOOKING PAGE
  if (slug === "vehicle-booking") {
    return (

      <div>
        <BannerLayout bg="/service.jpg">
          <div className="bg-black/40 backdrop-blur-sm px-5 py-4 max-w-xl mx-auto rounded-xl text-center text-white space-y-3">

            {/* Title */}
            <h4 className="text-2xl sm:text-3xl font-semibold capitalize">
              {slug.includes("driver")
                ? "Driver Registration"
                : slug.replaceAll("-", " ")}

            </h4>

            {/* Driver / Vehicle Tabs (only for driver) */}
            {/* @ts-ignore */}
            { (slug === "driver" || slug === "vehicle-booking") && <div className="flex justify-center gap-4 mt-4">


                <button
                  onClick={() =>
                    router.push("/other-services/vehicle-booking?id=68e96938e7bd0d0296560113")
                  }
                  className={`px-6 py-2 rounded-full font-semibold transition
      ${slug === "vehicle-booking"
                      ? "bg-white text-black"
                      : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                >
                  Vehicle
                </button>

                <button
                  onClick={() =>
                    router.push("/other-services/driver?id=692c9e0469b78087c79f7f4a")
                  }
                  //@ts-ignore
                  className={`px-6 py-2 rounded-full font-semibold transition ${slug === "driver"
                    ? "bg-white text-black"
                    : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                >
                  Driver
                </button>
              </div>
            }



            {/* CTA */}
            <div className="flex justify-center pt-1">
              <Button
                name="Book Now"
                icon={<ArrowRightIcon />}
                iconPosition="right"
                link={`/other-services/checkout?type=${slug}&id=${id}`}
              />
            </div>
          </div>
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

  return (
    <div>
      <BannerLayout bg="/service.jpg">
        <div className="bg-black/40 backdrop-blur-sm px-5 py-4 max-w-xl mx-auto rounded-xl text-center text-white space-y-3">

          {/* Title */}
          <h4 className="text-2xl sm:text-3xl font-semibold capitalize">
            {slug.includes("driver")
              ? "Driver Registration"
              : slug.replaceAll("-", " ")}

          </h4>

          {/* Driver / Vehicle Tabs (only for driver) */}

          {
           (slug === "driver" || slug === "vehicle-booking")&& <div className="flex justify-center gap-4 mt-4">


              <button
                onClick={() =>
                  router.push("/other-services/vehicle-booking?id=68e96938e7bd0d0296560113")
                }
                className={`px-6 py-2 rounded-full font-semibold transition
      ${slug === "vehicle-booking"
                    ? "bg-white text-black"
                    : "bg-white/20 text-white hover:bg-white/30"
                  }`}
              >
                Vehicle
              </button>

              <button
                onClick={() =>
                  router.push("/other-services/driver?id=692c9e0469b78087c79f7f4a")
                }
                //@ts-ignore
                className={`px-6 py-2 rounded-full font-semibold transition ${slug === "driver"
                  ? "bg-white text-black"
                  : "bg-white/20 text-white hover:bg-white/30"
                  }`}
              >
                Driver
              </button>
            </div>
          }

          {/* CTA */}
          <div className="flex justify-center pt-1">
            <Button
              name="Book Now"
              icon={<ArrowRightIcon />}
              iconPosition="right"
              link={`/other-services/checkout?type=${slug}&id=${id}`}
            />
          </div>
        </div>
      </BannerLayout>


      <WhyChoose />
      <CommitmentSection />

      {faqData?.length > 0 && (
        <FAQSections
          title={`FAQs`}
          data={faqData}
        />
      )}

      <TestimonialSlider />
    </div>
  );
};

export default Details;
