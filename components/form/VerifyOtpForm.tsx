"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const VerifyOtpForm = () => {
  const params = useSearchParams();
  const userId = params.get("userId") || "";
  const router= useRouter()

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (otp.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_QUARTUS_API_URL + "/auth/verify-user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, code: otp }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Invalid OTP");
        return;
      }

      toast.success("Account Verified Successfully!");
      // router.push("/reset-password?userId=userId&token=")
      window.location.href = "/auth/sign-in";
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleVerify} className="space-y-8">

      <label className="block mb-1 text-gray-700">Enter OTP</label>

      {/* ⭐ SMALL PERFECT SIZED OTP BOXES */}
      <div className="flex justify-start">
        <InputOTP
          maxLength={4}
          value={otp}
          onChange={setOtp}
          className="gap-3"
        >
          <InputOTPGroup className="flex gap-3">
            <InputOTPSlot
              index={0}
              className="w-10 h-12 text-lg rounded-md border-2"
            />
            <InputOTPSlot
              index={1}
              className="w-10 h-12 text-lg rounded-md border-2"
            />
          </InputOTPGroup>

          <InputOTPGroup className="flex gap-3">
            <InputOTPSlot
              index={2}
              className="w-10 h-12 text-lg rounded-md border-2"
            />
            <InputOTPSlot
              index={3}
              className="w-10 h-12 text-lg rounded-md border-2"
            />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button
        type="submit"
        className="w-full bg-black hover:bg-gray-900 text-white py-2 rounded-lg text-lg"
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </Button>
    </form>
  );
};

export default VerifyOtpForm;
