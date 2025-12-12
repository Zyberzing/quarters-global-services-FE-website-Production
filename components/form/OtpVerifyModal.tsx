"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const OtpVerifyModal = ({ open, setOpen, email, onSuccess }: any) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_QUARTUS_API_URL + "/auth/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Invalid OTP");
        return;
      }

      toast.success("OTP Verified Successfully!");
      setOpen(false);

      // Move to next step → login redirect
      onSuccess();
    } catch (err) {
      console.log(err)
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-lg">Verify OTP</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600 mb-4">
          We have sent an OTP to <strong>{email}</strong>
        </p>

        <Input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          className="text-center tracking-widest text-lg"
        />

        <Button
          className="w-full mt-4"
          disabled={loading}
          onClick={handleVerify}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default OtpVerifyModal;
