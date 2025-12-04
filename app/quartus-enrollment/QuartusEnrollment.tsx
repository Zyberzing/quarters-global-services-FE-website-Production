"use client";

import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

type FormState = {
  fullName: string;
  dob: string;
  phone: string;
  email: string;
  homeAddress: string;
  businessName: string;
  businessPhone: string;
  businessEmail: string;
  officeAddress: string;
  businessType: string[];
  ptin: string;
  efin: string;
  efinStatus: string;
  services: string[];
  experience: string;
  expectedVolume: string;
  preferredSoftware: string;
  additionalInfo: string;
  signature: string;
};

const initialState: FormState = {
  fullName: "",
  dob: "",
  phone: "",
  email: "",
  homeAddress: "",
  businessName: "",
  businessPhone: "",
  businessEmail: "",
  officeAddress: "",
  businessType: [],
  ptin: "",
  efin: "",
  efinStatus: "",
  services: [],
  experience: "",
  expectedVolume: "",
  preferredSoftware: "",
  additionalInfo: "",
  signature: "",
};

export default function QuartusEnrollmentPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  function handleChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  function toggleArrayField(field: keyof FormState, value: string) {
    const arr = (form[field] as unknown as string[]) || [];
    if (arr.includes(value)) {
      handleChange(field as any, arr.filter((x) => x !== value) as any);
    } else {
      handleChange(field as any, [...arr, value] as any);
    }
  }
  const searchParams = useSearchParams();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);

    const selectedPackage = searchParams.get("package");

    const payload = {
      firstName: form.fullName.split(" ")[0] || "",
      lastName: form.fullName.replace(form.fullName.split(" ")[0], "").trim() || "",
      dateOfBirth: form.dob,
      countryCode: "+1",
      phone: form.phone,
      email: form.email,
      homeAddress: form.homeAddress,

      businessName: form.businessName,
      businessPhone: form.businessPhone,
      businessEmail: form.businessEmail,
      officeAddress: form.officeAddress,
      businessType: form.businessType.join(", "),

      ptinNumber: form.ptin,
      efinNumber: form.efin,
      efinStatus: form.efinStatus,

      enrolledServices: form.services,
      experienceLevel: form.experience,
      expectedVolume: form.expectedVolume,
      softwarePreference: form.preferredSoftware,

      description: form.additionalInfo,

      agreementName: form.fullName,
      agreementSignature: form.signature,
      agreementDate: new Date().toISOString().slice(0, 10),

      selectedPackage: selectedPackage ?? "",
    };

    try {
      const base = process.env.NEXT_PUBLIC_QUARTUS_API_URL;
      const response = await fetch(`${base}/tax-bureau`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to submit");

      alert("Form submitted successfully!");
      setForm(initialState);
    } catch (err) {
      alert("Submit failed — please try again.");
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="rounded-lg overflow-hidden shadow">
          <div className="p-6 bg-[#E7000B] text-white">
            <h1 className="text-2xl font-semibold">Quartus Tax Service Bureau</h1>
            <p className="mt-1 text-sm opacity-90">Partner Enrollment & Interest Form</p>
          </div>
          <div className="p-6 bg-white">
            <p className="text-sm text-gray-700">
              Thank you for your interest in joining Quartus Tax Service Bureau. Please complete the
              form below so we can set up your software, bank products, and onboarding package.
            </p>
          </div>
        </header>

        <form onSubmit={onSubmit} className="mt-6 bg-white p-6 rounded-lg shadow-sm">
          {/* 1. Personal Information */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-800">1. Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <label className="block">
                <span className="text-sm text-gray-700">Full Name</span>
                <input
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-700">Date of Birth</span>
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-700">Phone Number</span>
                <input
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-700">Email Address</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm text-gray-700">Home Address</span>
                <input
                  value={form.homeAddress}
                  onChange={(e) => handleChange("homeAddress", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                />
              </label>
            </div>
          </section>

          {/* 2. Business Information */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-800">2. Business Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <label className="block md:col-span-2">
                <span className="text-sm text-gray-700">Business / Office Name</span>
                <input
                  value={form.businessName}
                  onChange={(e) => handleChange("businessName", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-700">Business Phone Number</span>
                <input
                  value={form.businessPhone}
                  onChange={(e) => handleChange("businessPhone", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-700">Business Email (if different)</span>
                <input
                  value={form.businessEmail}
                  onChange={(e) => handleChange("businessEmail", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm text-gray-700">Office Address</span>
                <input
                  value={form.officeAddress}
                  onChange={(e) => handleChange("officeAddress", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                />
              </label>

              <div className="md:col-span-2">
                <span className="text-sm text-gray-700">Business Type (check one)</span>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "New Tax Office",
                    "Existing Office Switching Bureaus",
                    "Insurance / Real Estate / Other Business Adding Tax Services",
                    "Independent Preparer (Home-Based)",
                  ].map((bt) => (
                    <label key={bt} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={form.businessType.includes(bt)}
                        onChange={() => toggleArrayField("businessType", bt)}
                        className="rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{bt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 3. Tax Credentials */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-800">3. Tax Credentials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <label className="block md:col-span-1">
                <span className="text-sm text-gray-700">PTIN Number (if available)</span>
                <input
                  value={form.ptin}
                  onChange={(e) => handleChange("ptin", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                />
              </label>

              <label className="block md:col-span-1">
                <span className="text-sm text-gray-700">EFIN Number (if available)</span>
                <input
                  value={form.efin}
                  onChange={(e) => handleChange("efin", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                />
              </label>

              <div className="md:col-span-1">
                <span className="text-sm text-gray-700">EFIN Status</span>
                <div className="mt-2 space-y-2">
                  {["Approved", "Pending", "Need Assistance with Application"].map((s) => (
                    <label key={s} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="efinStatus"
                        checked={form.efinStatus === s}
                        onChange={() => handleChange("efinStatus", s)}
                        className="rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{s}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 4. Services */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-800">4. Services You Want to Enroll In</h2>
            <p className="text-sm text-gray-500">(Check all that apply)</p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "Tax Software (Cloud/Desktop)",
                "Bank Products (Refund Transfer, Advances)",
                "Training & Certification",
                "Office Setup Assistance",
                "Pricing & Business Strategy",
                "Marketing Materials (Flyers, Cards, Social Media)",
                "Complete 'Start Your Own Tax Office' Program",
              ].map((s) => (
                <label key={s} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={form.services.includes(s)}
                    onChange={() => toggleArrayField("services", s)}
                    className="rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{s}</span>
                </label>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">*Bank products subject to approval.</p>
          </section>

          {/* 5. Experience Level */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-800">5. Experience Level</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {["No Experience - Need Full Training", "Beginner (1–2 years)", "Intermediate (3–5 years)", "Advanced (5+ years)", "CPA/Professional Accountant"].map((exp) => (
                <label key={exp} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="experience"
                    checked={form.experience === exp}
                    onChange={() => handleChange("experience", exp)}
                    className="rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{exp}</span>
                </label>
              ))}
            </div>
          </section>

          {/* 6. Expected Volume */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-800">6. Expected Volume</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {["0–50", "50–150", "150–300", "300+"].map((vol) => (
                <label key={vol} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="expectedVolume"
                    checked={form.expectedVolume === vol}
                    onChange={() => handleChange("expectedVolume", vol)}
                    className="rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{vol}</span>
                </label>
              ))}
            </div>
          </section>

          {/* 7. Preferred Software Type */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-800">7. Preferred Software Type</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {["Cloud-Based (Online)", "Desktop Software", "Not Sure - Need Recommendation"].map((s) => (
                <label key={s} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="preferredSoftware"
                    checked={form.preferredSoftware === s}
                    onChange={() => handleChange("preferredSoftware", s)}
                    className="rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{s}</span>
                </label>
              ))}
            </div>
          </section>

          {/* 8. Additional Information */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-800">8. Additional Information</h2>
            <p className="text-sm text-gray-500">Please describe your goals or questions:</p>
            <textarea
              value={form.additionalInfo}
              onChange={(e) => handleChange("additionalInfo", e.target.value)}
              rows={4}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
            />
          </section>

          {/* 9. Agreement & Signature */}
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-800">9. Agreement & Signature</h2>
            <p className="text-sm text-gray-700 mt-2">
              I certify that the information provided is accurate and I am requesting enrollment with
              Quartus Tax Service Bureau.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <label className="block md:col-span-1">
                <span className="text-sm text-gray-700">Name</span>
                <input
                  value={form.fullName || form.signature}
                  onChange={(e) => handleChange("signature", e.target.value)}
                  placeholder="Type your full name as signature"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                />
              </label>

              <label className="block md:col-span-1">
                <span className="text-sm text-gray-700">Signature</span>
                <input
                  value={form.signature}
                  onChange={(e) => handleChange("signature", e.target.value)}
                  placeholder="Signature"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                />
              </label>

              <label className="block md:col-span-1">
                <span className="text-sm text-gray-700">Date</span>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 rounded-lg bg-white hover:border-[#E7000B]/50 transition-all duration-200 focus:ring-2 focus:ring-[#E7000B]"
                />
              </label>
            </div>
          </section>

          {/* 10. Submit */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600">You may submit the completed form to:</p>
              <p className="text-sm mt-1">📧 info@quartusbusiness.com</p>
              <p className="text-sm">📞 +1 (832) 621-9671</p>
              <p className="text-sm">📍 2427 FM 1092 Rd, Unit A, Missouri City, TX 77459</p>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#E7000B] text-white px-5 py-2 rounded-md shadow hover:opacity-95 focus:ring-2 focus:ring-offset-2 focus:ring-[#E7000B]"
            >
              Submit Form
            </button>
          </div>

          {submitted && (
            <div className="mt-4 p-3 rounded bg-green-50 text-green-800 text-sm">
              Form prepared. Your default mail client should open to send the details. If it did not,
              copy the details and email to <strong>info@quartusbusiness.com</strong>.
            </div>
          )}
        </form>

        <footer className="mt-6 text-center text-xs text-gray-500">
          <p>Quartus Tax Service Bureau — Enrollment & Interest Form</p>
        </footer>
      </div>
    </div>
  );
}
