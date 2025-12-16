"use client";

import { useState } from "react";

interface FAQItem {
  title: string;
  description: string;
}

interface FAQProps {
  title?: string;
  data: FAQItem[];
}

const FAQSections = ({ title = "Frequently Asked Questions", data }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-4">

        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0B4A7B] mb-12">
          {title}
        </h2>

        <div className="space-y-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-semibold text-[#0B4A7B]">
                  {item.title}
                </span>
                <span className="text-xl text-gray-500">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSections;
