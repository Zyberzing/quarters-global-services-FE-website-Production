"use client";
import React from "react";
import { ShieldCheck, FileText, Scale, Info } from "lucide-react";

const LegalPage = () => {
  const sections = [
    {
      id: 1,
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      title: "Terms of Service",
      desc: "By accessing or using our platform, you agree to comply with our Terms of Service. Please read them carefully before using our services.",
    },
    {
      id: 2,
      icon: <FileText className="w-8 h-8 text-green-600" />,
      title: "Privacy Policy",
      desc: "We value your privacy. Learn how we collect, use, and safeguard your personal information while ensuring transparency and compliance.",
    },
    {
      id: 3,
      icon: <Scale className="w-8 h-8 text-purple-600" />,
      title: "Disclaimer",
      desc: "All information on this platform is provided for general purposes only. We are not liable for any direct or indirect damages arising from its use.",
    },
    {
      id: 4,
      icon: <Info className="w-8 h-8 text-orange-600" />,
      title: "User Rights",
      desc: "You have the right to access, modify, or delete your data. Reach out to our support team for data-related requests or concerns.",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12 lg:px-20">
      {/* Header */}
      <section className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-3">
          Legal Information
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Transparency and trust are core to what we do. Review our terms, policies, and legal statements below.
        </p>
      </section>

      {/* Legal Sections */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {sections.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex flex-col items-start space-y-3">
              <div className="bg-gray-100 p-3 rounded-xl">{item.icon}</div>
              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700">
                {item.title}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

       
    </main>
  );
};

export default LegalPage;
