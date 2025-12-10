"use client";

import VerifyOtpForm from "@/components/form/VerifyOtpForm";
import React from "react";

const VerifyUserPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col md:flex-row bg-gray-50">
      
      {/* Left Side — Form Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 sm:px-10 py-10 bg-white">
        <div className="w-full max-w-md text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
            Verify Your Account
          </h1>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">
            Enter the OTP sent to your email to verify your account.
          </p>

          <VerifyOtpForm />
        </div>
      </div>

      {/* Right Side — Image Section */}
      <div className="w-full md:w-1/2 h-64 md:h-auto bg-[url('/logion.jpg')] bg-cover bg-center" />
    </div>
  );
};

export default VerifyUserPage;
