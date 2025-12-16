"use client";

import React, { useMemo, useEffect, useState } from "react";

interface BannerLayoutProps {
  bg?: string;
  videoSrc?: string;
  children: React.ReactNode;
}

const bannerImages: Record<string, string> = {
  "e-visa": "/services/e-visa.png",
  visa: "/services/visa.png",
  passport: "/services/passport.png",
  apostille: "/services/apostille.png",
  default: "/services/default-banner.jpg",
};

const BannerLayout: React.FC<BannerLayoutProps> = ({
  bg,
  videoSrc,
  children,
}) => {
  const [storedService, setStoredService] = useState<string | null>(null);

  // ✅ Load main_service_type from sessionStorage only
  useEffect(() => {
    const saved = sessionStorage.getItem("main_service_type");
    if (saved) {
      setStoredService(saved.toLowerCase());
    } else {
      setStoredService(null);
    }
  }, []);

  const effectiveService = (storedService || "").toLowerCase();

  // ✅ Pick banner background based on stored value
  const autoBackground = useMemo(() => {
    if (bg) return bg;

    for (const key in bannerImages) {
      if (effectiveService.includes(key)) {
        return bannerImages[key];
      }
    }

    return bannerImages.default;
  }, [bg, effectiveService]);

  const isImage =
    autoBackground?.startsWith("http") || autoBackground?.startsWith("/");
  const isTailwindClass = autoBackground && !isImage;

  // Debug log (optional)
  useEffect(() => {
    console.log("🔹 Session stored main_service_type:", storedService);
    console.log("🔹 Final banner:", autoBackground);
  }, [storedService, autoBackground]);

  // Wait until session value loads
 
  return (
  <section
      className="
        relative w-full 
        h-[100vh]          /* ✅ Mobile: 80% of viewport height */
        sm:h-[500px] 
        md:h-[600px]
        px-4 flex items-center justify-center text-white overflow-hidden
      "
    >      {/* 🖼 Background Image */}
      {isImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-all duration-700"
          style={{ backgroundImage: `url(${autoBackground})` }}
        />
      )}

      {/* 🎨 Tailwind Background */}
      {isTailwindClass && <div className={`${autoBackground} absolute inset-0 z-0`} />}

      {/* 🎥 Video Background */}
      {videoSrc && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* 🌈 Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* 🌟 Foreground Content */}
      <div className="relative z-10 max-w-screen-xl w-full text-center">
        {children}
      </div>
    </section>
  );
};

export default BannerLayout;
