import { emptySplitApi } from "@/store/rtk/emptySplitApi.ts";

// ✅ Define types
export type ValidateOtpPayload = {
  email: string;
  otp: string;
};

export type ValidateOtpResponse = {
  status: boolean;
  message: string;
  data?: any;
};

// ✅ Create API slice for Validate OTP
export const validateOtpApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    validateOtp: build.mutation<ValidateOtpResponse, ValidateOtpPayload>({
      query: (payload) => ({
        url: "/user/validate-otp",
        method: "POST",
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

// ✅ Export hook
export const { useValidateOtpMutation } = validateOtpApi;
