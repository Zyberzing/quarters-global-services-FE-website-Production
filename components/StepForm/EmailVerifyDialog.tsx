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
  emailOtpVerify: boolean;
};

export default function EmailVerifyDialog({
  email,
  handleSubmite,
  onResend,
  onClose,
  emailOtpVerify,
}: EmailVerifyDialogProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [validateOtp, { isLoading }] = useValidateOtpMutation();

  /* ======================
     INPUT CHANGE
  ====================== */
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const next = document.getElementById(`otp-${index + 1}`);
      (next as HTMLInputElement)?.focus();
    }
  };

  /* ======================
     PASTE HANDLER
  ====================== */
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => (newOtp[i] = char));
    setOtp(newOtp);

    const lastIndex = pasted.length - 1;
    const lastInput = document.getElementById(`otp-${lastIndex}`);
    (lastInput as HTMLInputElement)?.focus();
  };

  /* ======================
     BACKSPACE HANDLER ✅
  ====================== */
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key !== "Backspace") return;

    const newOtp = [...otp];

    if (otp[index]) {
      // Clear current box
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    // Move to previous box
    if (index > 0) {
      newOtp[index - 1] = "";
      setOtp(newOtp);

      const prev = document.getElementById(`otp-${index - 1}`);
      (prev as HTMLInputElement)?.focus();
    }
  };

  /* ======================
     VERIFY OTP
  ====================== */
  const handleVerify = async () => {
    const code = otp.join("");

    if (code.length < 6) {
      toast.error("Please enter complete OTP");
      return;
    }

    try {
      const res = await validateOtp({ email, otp: code }).unwrap();
      if (res?.status) {
        toast.success(res?.message || "Email verified!");
        handleSubmite();
        onClose?.();
      } else {
        toast.error(res?.message || "Invalid OTP");
      }
    } catch (err: any) {
      console.log
      toast.error("Invalid OTP");
    }
  };

  return (
    <Dialog open={emailOtpVerify} onOpenChange={(o) => !o && onClose?.()}>
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
              onKeyDown={(e) => handleKeyDown(e, i)}   // ✅ backspace fix
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-lg font-bold"
              autoComplete="one-time-code"
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
