"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import Button from "@/components/Buttons/Button";

export default function VideoDemoSection() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // 👁️ Auto play on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.6 }
        );

        sectionRef.current && observer.observe(sectionRef.current);
        return () => sectionRef.current && observer.unobserve(sectionRef.current);
    }, []);

    useEffect(() => {
        if (!videoRef.current) return;
        if (isVisible) {
            videoRef.current.play().catch(() => { });
        } else {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [isVisible]);

    // 🖥️ Fullscreen handler
    const handleFullscreen = async () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.requestFullscreen) await video.requestFullscreen();
        video.muted = false;
        video.play();
    };

    return (
        <section
            ref={sectionRef}
            className="py-20 px-4 lg:px-28 bg-gradient-to-br from-[#02152f] via-[#022146] to-[#02152f]"
        >
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

                {/* LEFT CONTENT */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <p className="text-red-400 font-semibold mb-3">
                        Watch How Quartus Simplifies Your Application

                    </p>

                    <h2 className="text-white text-3xl md:text-4xl font-bold mb-5">
                        Just a smooth <br />
                        <span className="text-[#FFD2D6]">Guided application process.</span>
                    </h2>

                    <p className="text-white/80 mb-8 max-w-xl">
                        This demo shows how Quartus helps you complete your visa, passport, and documentation applications accurately, securely, and without stress.
                    </p>

                    <Button name="Start Your Application" link="/" />
                </motion.div>

                {/* RIGHT VIDEO */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">

                        <video
                            ref={videoRef}
                            className="w-full h-full"
                            poster="/video-preview.jpg"
                            muted
                            playsInline
                            preload="metadata"
                        >
                            <source src="/demo.mp4" type="video/mp4" />
                        </video>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

                        {/* 🎯 FLOATING FULLSCREEN ICON */}
                        <motion.button
                            onClick={handleFullscreen}
                            whileHover={{ scale: 1.15 }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 1.8 }}
                            className="absolute right-6 bottom-6 z-20
                w-16 h-16 rounded-full
                bg-gradient-to-br from-red-500 to-pink-500
                shadow-[0_0_40px_rgba(255,80,120,0.6)]
                flex items-center justify-center"
                        >
                            <Play className="text-white w-7 h-7 ml-1" />
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
