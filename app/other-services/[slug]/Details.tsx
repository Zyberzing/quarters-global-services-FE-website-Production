"use client";

import BannerLayout from '@/components/Banner/BannerLayout'
import Button from '@/components/Buttons/Button'
import CommitmentSection from '@/components/CommitmentSection/CommitmentSection'
import FAQSection from '@/components/FAQSection'
import WhyChoose from '@/components/WhyChoose/WhyChoose'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import TestimonialSlider from '@/components/TestimonialSlider ';

const Details = () => {
  const params = useParams();
  let slug = "";

  if (params.slug) {
    if (Array.isArray(params.slug)) slug = decodeURIComponent(params.slug.join("/"));
    else slug = decodeURIComponent(params.slug);
  }

  // 🆕 STATE
  const [vehicles, setVehicles] = useState([]);

  // 🆕 Fetch Vehicle List From API
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_QUARTUS_API_URL}/vehicle/list`,
          { cache: "no-store" }
        );

        const data = await res.json();
        setVehicles(data?.data || []); // ← Depends on API structure
      } catch (error) {
        console.error("Vehicle API Error:", error);
      }
    };

    fetchVehicles();
  }, []);

  // 🚗 Vehicle Booking Page
  if (slug === "vehicle-booking") {
    return (
      <div>
        <BannerLayout bg="/service.jpg">
          <h4 className="bg-black/40 py-3 pb-5 px-4 w-[50%] m-auto rounded-lg 
          text-4xl font-bold mb-4 capitalize">
            {slug.replaceAll("-", " ")}
          </h4>

          <Button
            iconPosition="right"
            link={`/other-services/checkout?type=${params.slug}`}
            name={"Book Now"}
          />
        </BannerLayout>

        {/* 🚗 VEHICLE CARD LIST FROM API */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-12 px-4">
          {vehicles.map(v => (
            <div key={v.id} className="border rounded-xl shadow hover:shadow-lg transition overflow-hidden">
              <Image width={150} height={150} src={v.image} alt={v.name}
                className="h-52 w-full object-cover"
              />

              <div className="p-4 space-y-3">
                <h2 className="font-semibold text-lg">{v.name}</h2>
              </div>
            </div>
          ))}
        </div>

        <CommitmentSection />
        <FAQSection />
        <TestimonialSlider />
      </div>
    );
  }

  // ⭐ DEFAULT PAGE
  return (
    <div>
      <BannerLayout bg="/service.jpg">
        <h4 className="bg-black/40 py-3 pb-5 px-4 w-[50%] m-auto rounded-lg 
        text-4xl font-bold mb-4 capitalize">
          {slug.replaceAll("-", " ")}
        </h4>

        <Button
          iconPosition="right"
          link={`/other-services/checkout?type=${params.slug}`}
          name={"Book Now"}
        />
      </BannerLayout>

      <WhyChoose />
      <CommitmentSection />
      <FAQSection />
      <TestimonialSlider />
    </div>
  );
};

export default Details;
