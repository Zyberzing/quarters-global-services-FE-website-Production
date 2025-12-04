"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useValidateOtpMutation } from "@/services/validateOtpApi";
import { toast } from "sonner";

type EmailVerifyDialogProps = {
  email: string;
  handleSubmite: () => void;
  onResend?: () => void;
  onClose?: () => void;
  emailOtpVerify: boolean; // ✅ added missing prop
};

export default function EmailVerifyDialog({
  email,
  handleSubmite,
  onResend,
  onClose,
  emailOtpVerify,
}: EmailVerifyDialogProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [validateOtp, { isLoading }] = useValidateOtpMutation();

  const handleChange = (value: string, index: number) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    const nextInput = document.getElementById(`otp-${index + 1}`);
    if (value && nextInput) (nextInput as HTMLInputElement).focus();
  };

  const handleVerify = async () => {
    const code = otp.join("");
    try {
      const res = await validateOtp({ email, otp: code }).unwrap();

      if (res?.status) {
        toast.success(res?.message || "Email verified!");
        handleSubmite();
        onClose?.(); // ✅ close on success
      } else {
        toast.error(res?.message || "Invalid OTP");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Verification failed");
    }
  };

  return (
    <Dialog
      open={emailOtpVerify} // ✅ controlled by parent
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose?.(); // ✅ close on ❌ or outside click
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Email Verification</DialogTitle>
          <DialogDescription>
            We’ve sent a 6-digit code to your email. Enter it below to verify your account.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center gap-3 my-6">
          {otp.map((digit, i) => (
            <Input
              key={i}
              id={`otp-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              className="w-12 h-12 text-center text-lg font-bold"
            />
          ))}
        </div>

        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onResend} disabled={isLoading}>
            Resend
          </Button>
          <Button onClick={handleVerify} disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
