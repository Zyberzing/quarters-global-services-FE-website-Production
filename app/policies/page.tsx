"use client";
import React from "react";

const PoliciesPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 sm:px-10 lg:px-24 text-gray-800">
      <section className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl border border-gray-200 p-8 sm:p-12 space-y-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 text-center">
          Company Policies
        </h1>
        <p className="text-center text-gray-600">
          Please review our company’s legal and operational policies carefully before using our services.
        </p>

        {/* Refund Policy */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-3">Refund Policy</h2>
          <p>
            All service fees paid to <strong>Quartus Global Services</strong> are <strong>non-refundable</strong> once processing has started. Refunds may only be issued if your application has not yet been submitted to the appropriate authority.
          </p>
          <p className="mt-2">
            Refund requests must be made in writing to{" "}
            <a href="mailto:info@quartusbusiness.com" className="text-blue-600 hover:underline">
              info@quartusbusiness.com
            </a>{" "}
            within 24 hours of payment. Refunds, if approved, will be processed within 7 business days.
          </p>
        </section>

        {/* Terms of Service */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-3">Terms of Service</h2>
          <p>
            By using our services, you agree to comply with all applicable laws and regulations. Quartus Global Services reserves the right to decline service to any individual or organization at our discretion.
          </p>
          <p className="mt-2">
            Users must ensure that all information provided is true and accurate. We are not responsible for delays or rejections caused by incomplete or false information.
          </p>
        </section>

        {/* Privacy & Data Usage */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-3">Privacy & Data Usage</h2>
          <p>
            We value your privacy and are committed to protecting your personal information. All collected data is used solely for the purpose of processing your request and improving our services.
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Your data will never be sold or shared with unauthorized parties.</li>
            <li>We use secure servers, encryption, and strict access control to safeguard data.</li>
            <li>Cookies may be used for user experience optimization and analytics.</li>
          </ul>
          <p className="mt-3">
            For more details, please refer to our{" "}
            <a href="/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>.
          </p>
        </section>

        {/* User Responsibilities */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-3">User Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate and complete documentation when using our services.</li>
            <li>Respect our staff and adhere to ethical communication practices.</li>
            <li>Do not misuse or attempt to access restricted areas of our systems.</li>
          </ul>
          <p className="mt-2">
            Violation of these terms may result in termination of service and potential legal action.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-3">Limitation of Liability</h2>
          <p>
            Quartus Global Services is not responsible for loss, damage, or delay caused by any third party,
            including courier services, consulates, or governmental agencies. Our liability is strictly
            limited to the amount paid for our service fees.
          </p>
        </section>

        {/* Updates to Policies */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-3">Policy Updates</h2>
          <p>
            We may update these policies periodically to reflect changes in our practices or legal
            requirements. Updated versions will be posted on this page with a revised “Last Updated” date.
          </p>
        </section>

        {/* Contact */}
        <section className="border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">Contact Us</h2>
          <p>
            If you have any questions or concerns regarding our policies, feel free to contact us:
          </p>
          <ul className="mt-2 space-y-1">
            <li>Email:{" "}
              <a href="mailto:info@quartusbusiness.com" className="text-blue-600 hover:underline">
                info@quartusbusiness.com
              </a>
            </li>
            <li>Phone: +1 (713) 534-1245</li>
            <li>Address: 2427 FM 1092 RD, Unit A, Missouri City, Texas 77459, USA</li>
          </ul>
        </section>
      </section>
    </main>
  );
};

export default PoliciesPage;
