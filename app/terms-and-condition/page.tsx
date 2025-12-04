import Head from "next/head";
import React, { FC } from "react";

const page: FC = () => {
    return (
        <>
            <Head>
                <title>Terms & Conditions | Quartus Global Services</title>
                <meta
                    name="description"
                    content="Terms & Conditions, Privacy Policy, and Disclaimer of Quartus Global Services"
                />
            </Head>

            <main className="max-w-5xl mx-auto p-6 md:p-12">
                <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

                <section className="mb-8">
                    <p className="mb-2">
                        By proceeding with the application process, you authorize <strong>Quartus Global Services</strong> to act on your behalf in submitting your passport or visa application to the appropriate Consulate, Embassy, or Passport Agency.
                    </p>
                    <p>
                        You are fully responsible for the accuracy and completeness of all information and documents submitted. By acknowledging this, you agree to these terms.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Role of Quartus Global Services</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Quartus serves as a limited agent for submission and retrieval of documents.</li>
                        <li>We are not responsible for delays, loss, or damage outside our control.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Travel Document Processing</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>We do not issue passports, visas, or other documents.</li>
                        <li>We assist only in submission and retrieval after processing.</li>
                        <li>Approval decisions are made solely by the authorities.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Privacy & Data Protection</h2>
                    <p className="mb-2">
                        Personal data is collected minimally and shared only with authorized personnel. All data is stored and transmitted securely following industry standards.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Cancellation & Payment</h2>
                    <p className="mb-2">
                        Refunds are subject to policy rules, including time of cancellation and type of service. Payment methods include credit cards, money orders, and checks.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                    <p>Email: <a className="text-blue-600 underline" href="mailto:info@quartusbusiness.com">info@quartusbusiness.com</a></p>
                    <p>Phone: +1 713-534-1245</p>
                    <p>Address: Quartus LLC USA, 2427 FM 1092 RD, Unit A, Missouri City, Texas 77459, USA</p>
                </section>
            </main>
        </>
    );
};

export default page;
