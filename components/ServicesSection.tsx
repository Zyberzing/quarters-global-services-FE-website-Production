'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

        {/* ================= LEFT CONTENT ================= */}
        <div>
          <p className="text-blue-600 font-medium mb-3">Our services</p>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            You Receive Personalized <br />
            Service and Secure Technology
          </h2>
        </div>

        {/* ================= RIGHT IMAGES ================= */}
        <div className="relative flex justify-center lg:justify-end">

          {/* BIG IMAGE */}
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative z-10 rounded-3xl overflow-hidden shadow-xl"
          >
            <Image
              src="/images/travel-main.jpg" // 🔁 replace with your big image
              alt="Travel Service"
              width={520}
              height={650}
              className="object-cover"
            />
          </motion.div>

          {/* SMALL FLOATING IMAGE */}
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute right-[-40px] bottom-16 z-20 rounded-2xl bg-white p-2 shadow-2xl"
          >
            <Image
              src="/images/passport-card.jpg" // 🔁 replace with small image
              alt="Passport"
              width={220}
              height={160}
              className="rounded-xl object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
