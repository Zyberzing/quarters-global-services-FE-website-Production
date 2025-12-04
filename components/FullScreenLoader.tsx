"use client";
import React from "react";
import { motion } from "framer-motion";
import { ImSpinner8 } from "react-icons/im";

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-black overflow-hidden">
      {/* Soft animated glow ring */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-black/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "easeInOut",
        }}
      />

      {/* Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
        className="relative"
      >
        <ImSpinner8
          className="text-black"
          style={{
            fontSize: "5rem",
            filter:
              "drop-shadow(0 0 10px rgba(0,0,0,0.25)) drop-shadow(0 0 25px rgba(0,0,0,0.15))",
          }}
        />
      </motion.div>

      {/* Modern crafted text */}
      <motion.p
        className="mt-8 text-base sm:text-lg tracking-wide font-medium text-gray-600"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Please wait — crafting data experience...
      </motion.p>
    </div>
  );
};

export default FullScreenLoader;
