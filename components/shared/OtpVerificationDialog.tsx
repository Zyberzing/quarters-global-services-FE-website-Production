'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Loader2, Clock } from 'lucide-react';

interface OtpVerificationDialogProps {
  userId: string;
  email?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onVerify?: (userId: string, otp: string) => Promise<void> | void;
  loading?: boolean;
}

export const OtpVerificationDialog: React.FC<OtpVerificationDialogProps> = ({
  userId,
  email,
  open,
  setOpen,
  onVerify,
  loading = false,
}) => {
  const [otp, setOtp] = React.useState('');

  const handleVerify = async () => {
    if (!otp || otp.length < 4) return;
    if (onVerify) await onVerify(userId, otp);
  };

  const handleClose = () => {
    setOtp('');
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="max-w-sm"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">OTP Verification</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center text-center space-y-4">
          {/* Message */}
          <p className="text-sm text-muted-foreground max-w-xs">
            We’ve sent a 4-digit verification code to your registered email
            <span className="font-medium text-foreground"> {email}</span>. Please enter it below to
            verify your account.
          </p>

          {/* OTP Input */}
          <InputOTP maxLength={4} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>

          {/* Static Expiry Info */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <Clock className="w-4 h-4" />
            <span>OTP expires in 15 minutes</span>
          </div>
        </div>

        <DialogFooter>
          <div className="flex items-center justify-center gap-2  mx-auto">
            <Button disabled={loading || otp.length < 4} onClick={handleVerify}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...
                </>
              ) : (
                'Verify OTP'
              )}
            </Button>

            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};