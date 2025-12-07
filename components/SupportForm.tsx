"use client";

import { useState } from "react";
import axios from "axios";

const SupportForm = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submitForm = async () => {
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await axios.post(`${api}/support/create-support`, {
        name: form.name,
        phone: `${form.countryCode}${form.phone}`,
        email: form.email,
        supportType: form.supportType,
        date: new Date().toISOString().split("T")[0],
      });

      setSuccess("Message sent successfully!");
      setForm({
        name: "",
        email: "",
        countryCode: "+1",
        phone: "",
        supportType: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="w-full lg:w-1/2 space-y-4">

      {/* Success / Error */}
      {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Name */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="bg-[#F9F9F9] w-full h-[64px] px-[24px] py-[17px] rounded-[7px] opacity-100"
        />
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-2 space-x-2">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="bg-[#F9F9F9] w-full h-[64px] px-[24px] py-[17px] rounded-[7px] opacity-100"
          />
        </div>

        <div className="flex gap-2">
          <select
            name="countryCode"
            value={form.countryCode}
            onChange={handleChange}
            className="bg-[#F9F9F9] w-[90px] h-[64px] px-[16px] py-[17px] rounded-[7px]"
          >
            <option value="+1">+1</option>
            <option value="+91">+91</option>
            <option value="+49">+49</option>
          </select>

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="bg-[#F9F9F9] w-full flex-1 h-[64px] px-[24px] py-[17px] rounded-[7px] opacity-100"
          />
        </div>
      </div>

      {/* Dropdown - Support Type */}
      <div>
        <select
          name="supportType"
          value={form.supportType}
          onChange={handleChange}
          className="bg-[#F9F9F9] w-full h-[64px] px-[24px] py-[17px] rounded-[7px] opacity-100"
        >
          <option value="">How can we help you</option>
          <option value="Support">Support</option>
          <option value="Sales">Sales</option>
          <option value="Visa">Visa</option>
        </select>
      </div>

      {/* Message */}
      <textarea
        name="message"
        placeholder="Message"
        value={form.message}
        onChange={handleChange}
        className="bg-[#F9F9F9] w-full h-[120px] px-[24px] py-[17px] rounded-[7px] opacity-100"
      />

      {/* Submit Button */}
      <button
        onClick={submitForm}
        disabled={loading}
        className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition"
      >
        {loading ? "Sending..." : "Send Message →"}
      </button>
    </div>
  );
};

export default SupportForm;
