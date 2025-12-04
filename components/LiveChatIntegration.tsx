"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function LiveChatIntegration() {
  useEffect(() => {
    // 🧠 Keep watching the DOM for the LiveChat branding element
    const observer = new MutationObserver(() => {
      // All possible class combinations for the branding footer
      const branding = document.querySelector(
        ".lc-1d05umz-enter-done, .lc-1zs205, a[href*='livechat.com'], a[href*='livechatinc.com']"
      );
      if (branding) {
        branding.remove(); // ✅ Remove the element
      }
    });

    // Observe the body for added/changed elements
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Clean up when unmounted
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ✅ LiveChat Script */}
      <Script id="livechat-widget" strategy="afterInteractive">
        {`
          window.__lc = window.__lc || {};
          window.__lc.license = 19367463;
          window.__lc.integration_name = "manual_onboarding";
          window.__lc.product_name = "livechat";

          (function(n,t,c){
            function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}
            var e={
              _q:[],_h:null,_v:"2.0",
              on:function(){i(["on",c.call(arguments)])},
              once:function(){i(["once",c.call(arguments)])},
              off:function(){i(["off",c.call(arguments)])},
              get:function(){
                if(!e._h) throw new Error("[LiveChatWidget] You can't use getters before load.");
                return i(["get",c.call(arguments)])
              },
              call:function(){i(["call",c.call(arguments)])},
              init:function(){
                var n=t.createElement("script");
                n.async=!0;
                n.type="text/javascript";
                n.src="https://cdn.livechatinc.com/tracking.js";
                t.head.appendChild(n);
              }
            };
            !n.__lc.asyncInit && e.init();
            n.LiveChatWidget = n.LiveChatWidget || e;
          }(window,document,[].slice));
        `}
      </Script>
    </>
  );
}
