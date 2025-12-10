"use client";

import BannerLayout from "@/components/Banner/BannerLayout";
import PlanCard, { VisaPlan } from "@/components/Cards/PlanCard";
import CommitmentSection from "@/components/CommitmentSection/CommitmentSection";
import CurrencyAndTime from "@/components/CurrencyAndTime";
import FAQSection from "@/components/FAQSection";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import PlanCardSkeleton from "@/components/Skeletons/PlanCardSkeletons";
import StepFlow from "@/components/StepFlow";
import WeatherStripAxiosDirect from "@/components/WeatherStrip";
import { useGetPlatformServiceCategoryPackagesQuery } from "@/services/platformCategoryPackageApi";
import { useSearchParams } from "next/navigation";
import React from "react";
import TestimonialSlider from "@/components/TestimonialSlider ";
import { getVisaDetails } from "@/lib/getVisaDetails";





const PlanSelection = () => {
  const searchParams = useSearchParams();

  const toCountrySlug = searchParams.get("toCountrySlug") || "";
  const subCategorySlug =
    searchParams.get("subCategorySlug") ||
    searchParams.get("Slug") ||
    "visa";

  // ✅ Fetch data for cards
  const { data, error, isLoading } = useGetPlatformServiceCategoryPackagesQuery({
    platformServiceCategorySlug: subCategorySlug,
    toCountrySlug: toCountrySlug,
  });

  const packages = data?.data?.data || [];
console.log(subCategorySlug,"subCategorySlug")
  // ✅ Get banner details dynamically
  const bannerData = getVisaDetails(subCategorySlug, toCountrySlug);

  if (error) return <p>Something went wrong</p>;

  return (
    <>
      {/* ✅ Dynamic Banner */}
      <BannerLayout >
        <h4
          className="bg-black/40 py-2 px-4 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] 
             m-auto rounded-lg font-bold mb-4 text-center text-white 
             text-[clamp(1rem,1.8vw,2rem)] capitalize"
        >
          {bannerData.title}
        </h4>

        <h1
          className="font-bold mb-6 text-center text-white 
             text-[clamp(1.5rem,2.5vw,3rem)] leading-snug capitalize"
        >
          {bannerData.description}
        </h1>
      </BannerLayout>

      {/* ✅ Plans */}
      <div className="max-w-6xl mx-auto my-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              <PlanCardSkeleton />
              <PlanCardSkeleton />
              <PlanCardSkeleton />
            </>
          ) : (
            <>
              {packages.map((plan: VisaPlan, index: number) => (
                <div
                  key={index}
                  className={`${index % 2 === 1 ? "mt-4" : "mt-0"}`}
                >
                  <PlanCard plan={plan} type="visa" />
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* ✅ Other Sections */}
      <CommitmentSection />
      <StepFlow />
      <WeatherStripAxiosDirect className="max-w-5xl mx-auto mt-10" />
      <CurrencyAndTime />

      <div className="max-w-7xl mx-auto px-10 py-12">
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

export default PlanSelection;
