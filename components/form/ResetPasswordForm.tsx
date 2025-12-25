"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { saveSession } from "@/lib/session";
import { UserTypeENUM } from "@/lib/Types";

/* ======================
   ONE-LINE PASSWORD RULE
   Min 8 chars, upper, lower,
   number & special char
====================== */
const isStrongPassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password);

const ResetPasswordForm = () => {
  const params = useSearchParams();
  const router = useRouter();

  const userIdFromURL = params.get("userId") || "";
  const codeFromURL = params.get("code") || "";
  const token = params.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isStrongPassword(newPassword)) {
      setError(
        "Password must be at least 8 characters with uppercase, lowercase, number & special character"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userIdFromURL,
            code: codeFromURL,
            newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Reset failed");
        return;
      }

      toast.success("Password reset successfully!");

      // ✅ Save session
      await saveSession(
        { id: data.userDataId, token },
        UserTypeENUM.ADMIN
      );

      toast.success("Login successfully");

      // ✅ Redirect
      setTimeout(() => {
        router.replace("/dashboard/applications");
      }, 1200);

    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* New Password */}
      <div>
        <label className="block mb-1 text-gray-700 font-semibold">
          New Password
        </label>

        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter new password"
            className="w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-red-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
          >
            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* One-line hint */}
        <p className="text-xs text-gray-500 mt-1">
          Min 8 chars with uppercase, lowercase, number & special character
        </p>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block mb-1 text-gray-700 font-semibold">
          Confirm Password
        </label>

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            className={`w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-red-500 ${
              error ? "border-red-500" : ""
            }`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm mt-[-10px]">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black hover:bg-gray-900 disabled:opacity-60 text-white py-2 rounded-lg font-semibold transition"
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>

    </form>
  );
};

export default ResetPasswordForm;
