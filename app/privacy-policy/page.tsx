"use client";
import React from "react";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-800 leading-relaxed">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-900 mb-8">
        Privacy Policy & Disclaimer
      </h1>

      {/* Section Wrapper */}
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Disclaimer</h2>
          <p>
            By proceeding with the application process, you authorize{" "}
            <strong>Quartus Global Services</strong> to act on your behalf in submitting your passport or visa application to the appropriate Consulate, Embassy, or Passport Agency.
          </p>
          <h3 className="font-semibold mt-4">Applicant Responsibilities</h3>
          <p>
            You are fully responsible for the <strong>accuracy and completeness</strong> of all information and documents submitted. By acknowledging this disclaimer, you confirm that you understand and agree to the terms outlined below.
          </p>

          <h3 className="font-semibold mt-4">Role of Quartus Global Services</h3>
          <p>
            Quartus Global Services serves solely as your limited agent for submission and facilitation of your application. We are not liable for delays, loss, or damage to documents caused by any party outside our control, including consulates or courier services.
          </p>

          <h3 className="font-semibold mt-4">Travel Document Processing</h3>
          <p>
            Quartus Global Services does not issue passports or visas but assists in their submission and retrieval once processed by the issuing authority. We cannot influence government decisions or requests for additional information.
          </p>

          <h3 className="font-semibold mt-4">Limitations & Service Refusal</h3>
          <p>
            You are responsible for the accuracy of all information submitted. Quartus Global Services reserves the right to refuse service for inaccurate or incomplete information. Liability is limited to the service fee paid.
          </p>

          <h3 className="font-semibold mt-4">Legal Jurisdiction</h3>
          <p>
            Any disputes shall be subject to the jurisdiction of courts in Fort Bend County, Texas, USA.
          </p>
        </section>

        {/* Data Privacy */}
        <section>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Our Commitment to Data Privacy</h2>
          <p>
            We are fully committed to protecting your personal information and operate under the principle of data minimization — collecting only what is necessary to deliver our services efficiently.
          </p>
          <h3 className="font-semibold mt-4">What We Mean by Personal Data</h3>
          <p>
            Personal data refers to any information that identifies you, such as your name, email address, phone number, or IP address.
          </p>

          <h3 className="font-semibold mt-4">Who We Share Data With</h3>
          <p>
            Data is shared only with essential personnel and service providers under strict confidentiality. We do not sell or rent personal data to anyone.
          </p>

          <h3 className="font-semibold mt-4">How Your Data Is Protected</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Access control with user-specific permissions</li>
            <li>SSL encryption for all transmitted data</li>
            <li>Dedicated server- and site-level security software</li>
            <li>Internal IT firewalls and data encryption</li>
            <li>Secure payment gateways (PCI compliant)</li>
          </ul>
        </section>

        {/* GDPR */}
        <section>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">GDPR Privacy Policy</h2>
          <p>
            Updated and effective October 4, 2021. Quartus LLC collects personal and technical data solely for processing and optimizing client services. We process data in compliance with global privacy regulations.
          </p>
          <h3 className="font-semibold mt-4">Information We Collect</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Identification details (name, address, DOB, etc.)</li>
            <li>Billing and contact information</li>
            <li>Device data (IP, browser, geolocation)</li>
          </ul>

          <h3 className="font-semibold mt-4">How We Use Information</h3>
          <p>
            We use data to improve services, prevent fraud, and communicate relevant updates. Data is shared only with trusted third parties under confidentiality agreements.
          </p>
        </section>

        {/* CCPA */}
        <section>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            Privacy Notice for California Residents (CCPA)
          </h2>
          <p>
            This notice supplements our Privacy Policy for California residents under the California Consumer Privacy Act (CCPA). You have rights to access, delete, or opt-out of data collection.
          </p>
          <p className="mt-2">
            Contact: <a href="mailto:info@quartusbusiness.com" className="text-blue-600 underline">info@quartusbusiness.com</a>  
            <br /> Phone: +1 713-534-1245  
            <br /> Address: 2427 FM 1092 RD, Unit A, Missouri City, Texas 77459, USA
          </p>
        </section>

        {/* Policies */}
        <section>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Cancellation & Payment Policies</h2>
          <p>
            Cancellations before 12:00 local time may receive a full refund minus a $35 fee. After submission to authorities, full service fees apply. Returned checks incur a $50 fee.
          </p>
        </section>

        {/* Shipping & Terms */}
        <section>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Shipping & Terms of Use</h2>
          <p>
            Documents should be sent via FedEx or UPS. Quartus LLC is not responsible for shipping errors, government delays, or denied applications. Service fees are non-refundable after submission.
          </p>
          <p className="mt-4">
            By using Quartus LLC services, you agree that liability is limited to the lesser of the service fees or $500 per traveler.
          </p>
        </section>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
