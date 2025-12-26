"use client";

import { useState } from "react";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import DashboardLayout from "@/layout/DashboardLayout";

const page = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    countryCode: "+1",
    phone: "",
    supportType: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const api = process.env.NEXT_PUBLIC_QUARTUS_API_URL;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async () => {
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await axios.post(`${api}/support/create-support`, {
        name: form.name,
        phone: form.phone,
        email: form.email,
        supportType: form.supportType,
        date: new Date().toISOString().split("T")[0],
      });

      setSuccess("Support request sent successfully!");
      setForm({
        name: "",
        email: "",
        countryCode: "+1",
        phone: "",
        supportType: "",
        message: "",
      });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Card */}
        <div className="bg-white rounded-2xl border p-8 space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Create Support Ticket
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Fill in the details and our team will get back to you.
            </p>
          </div>

          {/* Alerts */}
          {success && (
            <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className="mt-2 w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                className="mt-2 w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <PhoneInput
                international
                defaultCountry="IN"
                countryCallingCodeEditable={false}
                placeholder="Enter phone number"
                value={form.phone}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, phone: value || "" }))
                }
                className="mt-2 flex h-12 rounded-lg bg-gray-50 border border-gray-200 px-3 focus-within:ring-2 focus-within:ring-black"
                inputClass="bg-transparent outline-none w-full"
              />
            </div>

            {/* Support Type */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Support Type
              </label>
              <select
                name="supportType"
                value={form.supportType}
                onChange={handleChange}
                className="mt-2 w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-black focus:outline-none"
              >
                <option value="">Select an option</option>
                <option value="Support">Support</option>
                <option value="Sales">Sales</option>
                <option value="Visa">Visa</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              placeholder="Describe your issue..."
              value={form.message}
              onChange={handleChange}
              className="mt-2 w-full min-h-[120px] px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-black focus:outline-none resize-none"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              onClick={submitForm}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-xl bg-gradient-to-r from-black to-gray-800 text-white font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message →"}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default page;
