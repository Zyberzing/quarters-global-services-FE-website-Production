"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          new (
            options: {
              pageLanguage: string;
              includedLanguages?: string;
              layout?: unknown;
            },
            elementId: string
          ): void;
          InlineLayout: {
            SIMPLE: unknown;
          };
        };
      };
    };
    googleTranslateElementInit: () => void;
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,fr,de,es,zh",
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      };
    };

    addGoogleTranslateScript();
  }, []);

  return <div id="google_translate_element" className="mt-2" />;
}
