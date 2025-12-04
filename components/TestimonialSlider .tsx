"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaQuoteLeft } from "react-icons/fa";

interface Testimonial {
  name: string;
  text: string;
  image: string;
}

interface TestimonialSliderProps {
  testimonials?: Testimonial[];
}

const defaultTestimonials = [
  {
    name: "Devon Lane",
    image: "/p1.jpg",
    text: "Excellent service for OCI application. Their team is responsive, and the portal makes everything easy and secure.",
  },
  {
    name: "Kathryn Murphy",
    image: "/p2.jpg",
    text: "The process was super smooth and fast. I applied for my US tourist visa, uploaded my documents, and tracked everything online. Highly recommend Quartus!",
  },
  {
    name: "Annette Black",
    image: "/p3.jpg",
    text: "Needed my documents apostilled quickly—Quartus handled it end-to-end with real-time updates. Very reliable.",
  },
  {
    name: "Guy Hawkins",
    image: "/p4.jpg",
    text: "A seamless experience from start to finish. Clear communication and fast turnaround times.",
  },
];

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  testimonials = defaultTestimonials,
}) => {
  const [currentSlide, setCurrentSlide] = useState(1);

  return (
    <div className="relative max-w-8xl mx-auto p-12">
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={false}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
        className="pb-12 h-[350px] "
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative bg-gradient-to-b h-[300px] from-yellow-50 to-white shadow-xl rounded-2xl p-8   flex flex-col justify-between text-center hover:shadow-2xl border border-yellow-100"
            >
              <FaQuoteLeft className="absolute top-5 left-5 text-[#E7000B] text-2xl opacity-50" />
              <div className="flex justify-center mb-4">
                <div className="relative w-20 h-20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="rounded-full border-4 text-[#E7000B]  object-cover shadow-md"
                  />
                </div>
              </div>
              <h4 className="font-semibold text-lg text-gray-800 mt-2">
                {item.name}
              </h4>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                {item.text}
              </p>
              <div className="mt-4 flex justify-center">
                <span className="inline-block w-10 h-1 rounded-full text-[#E7000B] "></span>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* --- Custom Navigation & Circular Indicator --- */}
      <div className="flex justify-center items-center gap-6 mt-4">
        <button  title="ss" className="swiper-button-prev-custom bg-[#E7000B] text-white p-3 rounded-full hover:bg-red-500 shadow-md transition">
          <FaArrowLeft className="w-5 h-5" />
        </button>

        {/* Circular Slide Indicator */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle
              cx="20"
              cy="20"
              r="18"
              stroke="#E7000B"
              strokeWidth="4"
              fill="none"
              opacity="0.3"
            />
            <motion.circle
              cx="20"
              cy="20"
              r="18"
              stroke="#E7000B"
              strokeWidth="4"
              fill="none"
              strokeDasharray="113"
              strokeDashoffset={
                113 - (113 / testimonials.length) * currentSlide
              }
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </svg>
          <span className="text-sm font-semibold text-gray-700">
            {currentSlide}/{testimonials.length}
          </span>
        </div>

        <button title="ss" className="swiper-button-next-custom bg-[#E7000B] text-white p-3 rounded-full hover:bg-red-500 shadow-md transition">
          <FaArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
