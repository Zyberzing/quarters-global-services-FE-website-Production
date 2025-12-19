"use client";

import { useEffect, useState } from "react";
import MultiStepForm from "@/components/StepForm/MultiStepForm";
import Link from "next/link";
// import MultiStepForm2 from "@/components/StepForm2/MultiStepForm2";

const getAllStoredApplications = () => {
  const raw = localStorage.getItem("applications");
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return parsed?.
      applications
      || [];
  } catch {
    return [];
  }
};

export default function CheckoutPage() {
  const [_, setType] = useState<string | null>(null);
  const [hasApplication, setHasApplication] = useState<boolean | null>(null);
  

  useEffect(() => {
    if (typeof window !== "undefined") {
      const formType = sessionStorage.getItem("formType");
      const application = getAllStoredApplications().length === 0 ? false : true;
      setHasApplication(!application);
      setType(formType);
      setHasApplication(!!application);
    }
  }, []);

  // If not found → show full screen attractive message
  if (hasApplication === false) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1a1a40] to-[#2a2a72] text-white text-center px-6">
        <h1 className="text-4xl font-bold mb-4">No Application Found</h1>
        <p className="text-lg text-gray-200 mb-6">
          {"You don’t have any active application yet. Please start a new one to continue."}
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-[#FF4D4D] rounded-xl text-white font-semibold hover:bg-[#ff6666] transition-all shadow-lg"
        >
          Start New Application
        </Link>
      </main>
    );
  }

  // While loading state (before we know if localStorage is available)
  if (hasApplication === null) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-700">
        <p className="animate-pulse text-lg font-medium">Loading...</p>
      </main>
    );
  }

  // If application found → show form
  return (
    <main className="min-h-screen bg-gray-50 py-10">
      {/* Example conditional if you have multiple forms */}
      {/* {type === "OCI" ? <MultiStepForm2 /> : <MultiStepForm />} */}
      <MultiStepForm />
    </main>
  );
}
