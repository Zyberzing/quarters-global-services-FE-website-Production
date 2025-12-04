'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SectionTitle from '@/components/SectionTitle/SectionTitle';

const features = [
  {
    title: 'End-to-End Digital Process',
    description:
      'Skip paperwork by processing your documents in a hassle-free, secure, and intuitive environment.',
    image: '/services/apostille.png',
    slug: 'end-to-end-digital-process',
  },
  {
    title: 'Real-Time Application Tracking',
    description:
      'Stay informed at every stage. Get real-time updates as your application moves forward.',
    image: '/services/e-visa.png',
    slug: 'real-time-application-tracking',
  },
  {
    title: 'Expert Guidance & Support',
    description:
      'Access professional advisors for questions and clarifications — timely, informed, and efficient support.',
    image: '/services/passport.png',
    slug: 'expert-guidance-support',
  },
  {
    title: 'Data Security You Can Trust',
    description:
      'We use bank-level encryption to protect your personal data and document uploads.',
    image: '/services/visa.png',
    slug: 'data-security-you-can-trust',
  },
  {
    title: 'Seamless Access: 20+ Countries',
    description:
      'Apply for services across 20+ countries through one single portal, no matter where you are.',
    image: '/services/apostille.png',
    slug: 'seamless-access-20-countries',
  },
  {
    title: 'One Portal. All Services.',
    description:
      'Apply, upload, track, and get support — all through one central dashboard.',
    image: '/services/visa.png',
    slug: 'one-portal-all-services',
  },
];

const WhyChoose = () => {
  const router = useRouter();

  return (
    <section className="bg-[linear-gradient(180deg,_#DEEBFF_0%,_#FFE3E3_100%)] md:p-20 p-4 flex flex-col items-center justify-center">
      {/* Section Title */}
      <SectionTitle
        subtitle="Our services"
        title="Why Choose Quartus Global Service"
        highlight="Quartus"
        align="center"
      />

      {/* Features Grid */}
      <div className="max-w-7xl w-full mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.slug}
              onClick={() => router.push(`/blogs/${feature.slug}`)}
              className="cursor-pointer bg-white shadow-md rounded-xl overflow-hidden transition hover:shadow-lg"
            >
              <Image
                src={feature.image}
                alt={feature.title}
                width={150}
                height={150}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explore All Blogs Button */}
       
    </section>
  );
};

export default WhyChoose;
