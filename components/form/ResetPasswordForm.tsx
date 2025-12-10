"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const ResetPasswordForm = () => {
  const params = useSearchParams();
  const userIdFromURL = params.get("userId") || "";
  const codeFromURL = params.get("code") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ❌ Client-side validation
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userIdFromURL,
          code: codeFromURL,
          newPassword: newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Password reset successfully! Redirecting...");

        setTimeout(() => {
          window.location.href = "/auth/sign-in";
        }, 1200);
      } else {
        toast.error(data.message || "Reset failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* New Password */}
      <div>
        <label className="block mb-1 text-gray-700">New Password</label>
        <input
          type="password"
          required
          placeholder="Enter new password"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block mb-1 text-gray-700">Confirm Password</label>
        <input
          type="password"
          required
          placeholder="Confirm new password"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 ${
            error ? "border-red-500" : ""
          }`}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm mt-[-10px]">{error}</p>}

      {/* Submit Button — BLACK */}
      <button
        type="submit"
        className="w-full bg-black hover:bg-gray-900 text-white py-2 rounded-lg font-medium transition"
      >
        Reset Password
      </button>
    </form>
  );
};

export default ResetPasswordForm;
