"use client"
import BannerLayout from '@/components/Banner/BannerLayout'
import Image from 'next/image'
import React from 'react'
import { motion } from "framer-motion";
import { Clock, Eye, Globe2, Layers, Linkedin, Mail, Shield, UserCheck } from 'lucide-react';
import TestimonialSlider from '@/components/TestimonialSlider ';
import WhyChoose from '@/components/WhyChoose/WhyChoose';

const teamMembers = [
  
  {
    name: "Aarav Patel",
    role: "Founder & CEO",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    linkedin: "#",
    email: "#",
  },
  {
    name: "Neha Sharma",
    role: "Operations Head",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    linkedin: "#",
    email: "#",
  },
  {
    name: "Rohan Mehta",
    role: "Client Relations Manager",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    linkedin: "#",
    email: "#",
  },
  {
    name: "Priya Desai",
    role: "Visa Consultant",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    linkedin: "#",
    email: "#",
  },
  {
    name: "Vikram Singh",
    role: "Legal Documentation Expert",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    linkedin: "#",
    email: "#",
  },
  {
    name: "Simran Kaur",
    role: "Customer Support Lead",
    image: "https://randomuser.me/api/portraits/women/31.jpg",
    linkedin: "#",
    email: "#",
  },
];

const AboutUs = () => {
  return (
    <div>
      {/* Banner */}
      <BannerLayout bg="/img.jpg">
        <h4 className="bg-black/40 py-2 px-3 sm:py-3 sm:px-4 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] m-auto rounded-lg text-white font-bold mb-4 text-center text-[clamp(1.5rem,2.5vw,2.75rem)] leading-snug">
          Your Trusted Travel Document Partner
        </h4>
        <p className="font-bold mb-6 text-center  text-sm   leading-snug">
          For over a decade, we’ve helped thousands of U.S. customers get passports, visas, and legalized documents—quickly, securely, and with a human touch.
        </p>
      </BannerLayout>

      {/* About Content */}
      <section className="bg-white py-12 px-4 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* ===== Left Image Section ===== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/about.jpg" // 👈 replace with your actual image path
                alt="Travel Documentation Support"
                width={600}
                height={400}
                className="w-full h-[340px] object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute bottom-[-25px] right-[-25px] bg-white shadow-xl rounded-xl p-4 border border-gray-100 max-w-[250px]">
              <h4 className="text-sm font-semibold text-gray-700">Trusted By</h4>
              <p className="text-gray-500 text-xs">
                Universities, Corporates & Legal Clients worldwide
              </p>
            </div>
          </motion.div>

          {/* ===== Right Text Section ===== */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-600 font-semibold uppercase text-sm tracking-wide">
              Our Mission
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mt-2">
              We Make{" "}
              <span className="text-blue-600">Travel Documentation</span> Simple
            </h2>

            <p className="text-gray-600 mt-4 leading-relaxed">
              We are a leading name in international documentation and travel
              support, trusted globally and locally for simplifying complex travel
              formalities.
            </p>

            <div className="mt-6 space-y-3">
              <h3 className="font-semibold text-gray-800 text-lg">
                Who We Serve?
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✅</span> Students studying
                  abroad
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✅</span> Families traveling
                  internationally
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✅</span> Corporations managing
                  business travel
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✅</span> Legal & government
                  clients
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✅</span> Universities handling
                  academic mobility
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-blue-50 via-white to-pink-50 py-16 px-4 md:px-12">
        <div className="max-w-6xl mx-auto text-center md:text-left">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="text-blue-600 font-semibold uppercase text-sm tracking-wide">
              What we Offer?
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
              What Sets Us Apart
            </h2>
            <p className="text-gray-600 max-w-3xl mt-3">
              At <strong>Gurukul Global Services</strong>, we provide end-to-end
              visa, passport, and document authentication solutions designed to
              simplify global mobility for individuals, families, and businesses.
              Our platform combines advanced technology with expert guidance to
              deliver a seamless, secure, and stress-free experience — whether
              you’re traveling for leisure, studying abroad, relocating for work,
              or expanding your business internationally.
            </p>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <FeatureCard
                icon={<Globe2 className="w-5 h-5 text-blue-600" />}
                title="Nationwide Support"
                desc="Families traveling internationally"
              />
              <FeatureCard
                icon={<Clock className="w-5 h-5 text-blue-600" />}
                title="Fast Turnaround"
                desc="Expedited service options available"
              />
              <FeatureCard
                icon={<UserCheck className="w-5 h-5 text-blue-600" />}
                title="Real Experts"
                desc="No bots, just helpful, knowledgeable humans"
              />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <FeatureCard
                icon={<Shield className="w-5 h-5 text-pink-600" />}
                title="Secure Document Handling"
                desc="Your information is safe with us"
              />
              <FeatureCard
                icon={<Layers className="w-5 h-5 text-pink-600" />}
                title="All-In-One Services"
                desc="Passports, visas, apostilles, and more"
              />
              <FeatureCard
                icon={<Eye className="w-5 h-5 text-pink-600" />}
                title="Trackable Process"
                desc="Transparent updates at every stage"
              />
            </div>
          </div>
        </div>
      </section>

    
      <WhyChoose />

      <TestimonialSlider />

    </div>
  )
}

export default AboutUs



function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="bg-white shadow-md rounded-xl p-4 flex items-start gap-3 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="bg-blue-50 p-2 rounded-lg">{icon}</div>
      <div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </motion.div>
  );
}