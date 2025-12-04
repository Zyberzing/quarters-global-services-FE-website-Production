import React from "react";

const TrustedSection: React.FC = () => {
  return (
    <section className="w-full bg-blue-200 py-8 flex items-center justify-center text-center">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
        Trusted by <span className="font-bold text-black">10,000+ clients</span>
      </h2>
    </section>
  );
};

export default TrustedSection;
