"use client";

import Link from "next/link";
import { FiHome, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ThankYouCard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <motion.article
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="max-w-xl w-full bg-white shadow-2xl rounded-2xl p-10 md:p-14 border border-black/5 text-center"
        style={{ ['--accent' as any]: 'oklch(57.7% 0.245 27.325)' }}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div
            className="rounded-full p-4 shadow-md"
            style={{ background: 'var(--accent)' }}
            aria-hidden
          >
            <FiCheckCircle className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-black">
            Thank You!
          </h1>
          <p className="mt-3 text-black/80 text-lg leading-relaxed max-w-md">
            Your form has been successfully submitted! 🎉<br />
            We appreciate your time and effort.
          </p>
        </div>

        <div className="mt-10 flex items-center justify-center">
          <Link href="/" className="group">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium shadow-md border border-black/5 focus:outline-none focus:ring-4"
              style={{ background: 'var(--accent)', color: 'white' }}
              aria-label="Go to home"
            >
              <FiHome className="w-5 h-5 text-white" />
              <span>Go to Home</span>
            </motion.button>
          </Link>
        </div>

        <footer className="mt-8 text-sm text-black/60">
          We’ll review your submission and contact you soon.
        </footer>
      </motion.article>

      <style jsx>{`
        @keyframes pop {
          0% { transform: scale(0.9); opacity: 0.6 }
          50% { transform: scale(1.06); opacity: 1 }
          100% { transform: scale(1); opacity: 1 }
        }

        .rounded-full[aria-hidden] {
          animation: pop 700ms cubic-bezier(.2,.9,.3,1);
        }

        @supports not (color: oklch(50% 0.2 30)) {
          :root { --accent: #e9c46a; }
        }
      `}</style>
    </div>
  );
}