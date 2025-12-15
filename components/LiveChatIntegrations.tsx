"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const LiveChatIntegrations = () => {
  const pathname = usePathname();

  // Update visitor page URL on route change
  useEffect(() => {
    if ((window as any).Tawk_API) {
      (window as any).Tawk_API.visitor = {
        pageUrl: window.location.href,
        pageTitle: document.title,
      };
    }
  }, [pathname]);

  return (
    <Script
      id="tawk-script"
      strategy="afterInteractive"
      src="https://embed.tawk.to/ae7c30f61942b746d8b873d4b016cdd6181168e3"
      onLoad={() => {
        (window as any).Tawk_API = (window as any).Tawk_API || {};
        (window as any).Tawk_LoadStart = new Date();
      }}
    />
  );
};

export default LiveChatIntegrations;
