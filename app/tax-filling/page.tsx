"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useGetPlatformServiceSubCategoriesQuery } from "@/services/platformSubCategorysApi";

export default function TaxFilingPage() {

  const router = useRouter();

  const { data, isLoading } = useGetPlatformServiceSubCategoriesQuery({platformServiceSlug: "tax-filling", toCountrySlug: ""});
  console.log(data, "tax-filing-data");

  const handleSelectPackage = (pkg: string) => {
    router.push(`/quartus-enrollment?package=${pkg}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

      {/* HERO SECTION */}
      <section className="bg-black text-white py-28 px-6 text-center shadow-2xl rounded-b-[45px] relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm scale-150 opacity-20"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            Tax Filing & Accounting Services
          </h1>
          <p className="text-lg opacity-90">
            Accurate. Fast. Professional.
          </p>
        </div>
      </section>

      {/* PAGE CONTENT */}
      <div className="max-w-6xl mx-auto py-20 px-6 space-y-20">

        {/* ⭐ PRICING SECTION (Added) */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-12">🔥 Our Pricing</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Card 1 */}
            <div className="bg-white/70 backdrop-blur shadow-xl border rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-1 transition">
              <h3 className="text-2xl font-bold mb-3">Personal Tax Filing</h3>
              <p className="text-5xl font-extrabold text-black mb-5">$150</p>
              <ul className="space-y-2 text-gray-700 mb-7">
                <li>✔ Form 1040 Filing</li>
                <li>✔ Federal + 1 State Return</li>
                <li>✔ E-file Refund Deposit</li>
              </ul>
              <button
                onClick={() => handleSelectPackage("personal_tax_filing")}
                className="w-full py-3 text-lg font-medium bg-black text-white rounded-xl hover:bg-gray-800 transition"
              >
                Book Now
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-black text-white shadow-2xl border rounded-2xl p-8 scale-105 hover:scale-110 transition">
              <h3 className="text-2xl font-bold mb-3">Business Tax Filing</h3>
              <p className="text-5xl font-extrabold mb-5">$250</p>
              <ul className="space-y-2 opacity-90 mb-7">
                <li>✔ 1065 / 1120 / 1120S Filing</li>
                <li>✔ Profit & Loss Review</li>
                <li>✔ E-file + Business Refund Deposit</li>
              </ul>
              <button
                onClick={() => handleSelectPackage("business_tax_filing")}
                className="w-full py-3 text-lg font-medium bg-white text-black rounded-xl hover:bg-gray-100 transition"
              >
                Book Now
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-white/70 backdrop-blur shadow-xl border rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-1 transition">
              <h3 className="text-2xl font-bold mb-3">Licensing & Certification</h3>
              <p className="text-5xl font-extrabold text-black mb-5">$1000</p>
              <ul className="space-y-2 text-gray-700 mb-7">
                <li>✔ Business Licensing Setup</li>
                <li>✔ Compliance & Documentation</li>
                <li>✔ IRS + State Registration Support</li>
              </ul>
              <button
                onClick={() => handleSelectPackage("licensing_and_certification")}
                className="w-full py-3 text-lg font-medium bg-black text-white rounded-xl hover:bg-gray-800 transition"
              >
                Book Now
              </button>
            </div>

          </div>
        </section>

        {/* INTRO */}
        <p className="text-gray-700 text-lg leading-relaxed text-center max-w-3xl mx-auto">
          At Quartus Tax Service Bureau, we provide reliable tax filing and year-round accounting
          services for individuals, families, and small businesses. Our goal is simple — maximize
          your refund, minimize your stress, and keep your finances organized and compliant.
        </p>



        <hr className="border-gray-300" />

        {/* TAX FILING */}
        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">💼 Tax Filing Services</h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-4 text-gray-700">
            <li>Personal Tax Returns (1040)</li>
            <li>Self-Employed & Contractor Taxes</li>
            <li>Business Returns (1065, 1120, 1120S)</li>
            <li>Multi-State Filings</li>
            <li>Amendments & Prior-Year Returns</li>
            <li>ITIN Application & Renewal</li>
            <li>E-File with Direct Deposit Refund</li>
          </ul>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <p className="bg-white p-3 rounded-xl shadow border">✔ Accurate filing</p>
            <p className="bg-white p-3 rounded-xl shadow border">✔ Faster processing</p>
            <p className="bg-white p-3 rounded-xl shadow border">✔ IRS-compliant documentation</p>
          </div>
        </section>

        <hr className="border-gray-300" />

        {/* ACCOUNTING */}
        <section>
          <h2 className="text-3xl font-bold mb-6">📘 Accounting & Bookkeeping</h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-4 text-gray-700">
            <li>Monthly & Quarterly Bookkeeping</li>
            <li>Profit & Loss & Balance Sheet Reports</li>
            <li>Bank Reconciliation</li>
            <li>Payroll Management</li>
            <li>Sales Tax & Franchise Tax Filing</li>
            <li>Year-End Financial Statements</li>
          </ul>

          <p className="mt-6 text-gray-700">
            We help you stay compliant, manage cash flow, and make informed business decisions.
          </p>
        </section>

        <hr className="border-gray-300" />

        {/* BUSINESS SUPPORT */}
        <section>
          <h2 className="text-3xl font-bold mb-6">🛠 Business Support Services</h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-4 text-gray-700">
            <li>EIN & Business Formation (LLC / Corp / DBA)</li>
            <li>Record-keeping setup</li>
            <li>Tax planning & advisory</li>
            <li>Audit assistance & IRS letters review</li>
          </ul>
        </section>



      </div>
    </div>
  );
}
