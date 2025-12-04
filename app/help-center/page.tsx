"use client";
import React from "react";

const HelpCenterPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 sm:px-10 lg:px-24 text-gray-800">
      <section className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl border border-gray-200 p-8 sm:p-12 space-y-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 text-center">
          Help Center
        </h1>
        <p className="text-center text-gray-600">
          Get support, read our disclaimer, and understand our policies and data privacy commitments.
        </p>

        {/* Disclaimer */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-3">Disclaimer</h2>
          <p>
            By proceeding with the application process, you authorize <strong>Quartus Global Services</strong> to act on your behalf in submitting your passport or visa application to the appropriate Consulate, Embassy, or Passport Agency.
          </p>
        </section>

        {/* Applicant Responsibilities */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-3">Applicant Responsibilities</h2>
          <p>
            You are fully responsible for the <strong>accuracy and completeness</strong> of all information and documents submitted. By acknowledging this disclaimer, you confirm that you understand and agree to the terms outlined below.
          </p>
        </section>

        {/* Role of Quartus Global Services */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-3">Role of Quartus Global Services</h2>
          <p>
            Quartus Global Services serves solely as your <strong>limited agent</strong>, for the purpose of submitting and facilitating your application through a courier or third-party agent. We are not liable for delays, loss, or damage to documents caused by any party outside our direct control.
          </p>
        </section>

        {/* Travel Document Processing */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-3">Travel Document Processing</h2>
          <p>
            Quartus Global Services <strong>does not issue</strong> passports, visas, or travel documents. We assist only in the submission and retrieval process. We have no control over approval or denial decisions made by government agencies.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-3">Limitation of Liability</h2>
          <p>
            Our <strong>maximum liability</strong> is limited to the total service fee collected. No other warranties, express or implied, are provided. We are not liable for any direct, indirect, or consequential damages.
          </p>
        </section>

        {/* Data Privacy Commitment */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-3">Our Commitment to Data Privacy</h2>
          <p>
            We are fully committed to protecting any data provided to us, including personally identifiable information. We operate under the principles of data minimization, collecting only what is necessary to provide our services effectively.
          </p>
        </section>

        {/* Data Sharing */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-3">Who We Share Data With</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Employees of Quartus Global Services (sales, marketing, or support).</li>
            <li>Web hosting providers (servers located in the USA).</li>
            <li>Third-party contractors for development and marketing under strict agreements.</li>
          </ul>
          <p className="mt-3">
            We never rent, trade, or sell your data. Transfers to external processors are conducted only under written agreements ensuring confidentiality.
          </p>
        </section>

        {/* How Data Is Protected */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-3">How Your Data Is Protected</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access control using secure, individual user accounts.</li>
            <li>SSL encryption for all website traffic.</li>
            <li>Dedicated security software to block unauthorized access.</li>
            <li>Firewall, encryption, and strict user access policies.</li>
            <li>Content Delivery Network (CDN) for speed and security.</li>
          </ul>
        </section>

        {/* Legal Jurisdiction */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-3">Legal Jurisdiction</h2>
          <p>
            All parties agree that any legal action or dispute arising from the use of Quartus Global Services shall be subject to the exclusive jurisdiction of the courts in Fort Bend County, Texas, USA.
          </p>
        </section>

        {/* Contact */}
        <section className="border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">Contact Support</h2>
          <p>
            Have questions or need help? Our team is here to assist you.
          </p>
          <ul className="mt-2">
            <li>Email: <a href="mailto:info@quartusbusiness.com" className="text-blue-600 hover:underline">info@quartusbusiness.com</a></li>
            <li>Phone: +1 (713) 534-1245</li>
            <li>Address: 2427 FM 1092 RD, Unit A, Missouri City, Texas 77459, USA</li>
          </ul>
        </section>
      </section>
    </main>
  );
};

export default HelpCenterPage;
