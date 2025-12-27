"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_QUARTUS_API_URL}/auth/forget-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push(`/verify-user?userId=${data.data.userId}`)
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Input */}
      <div>
        <label className="block mb-1 text-gray-700">Email Address</label>
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-black hover:bg-gray-900 text-white py-2 rounded-lg font-medium transition"
      >
       Reset Password
      </button>
    </form>
  );
};

export default ForgetPasswordForm;
