import { emptySplitApi } from "@/store/rtk/emptySplitApi.ts";

// ✅ Define types
export type VerifyEmailPayload = {
  email: string; // or email + code, depending on backend
};

export type VerifyEmailResponse = {
  status: boolean;
  message: string;
};

// ✅ Create API slice for Verify Email
export const verifyEmailApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    verifyEmail: build.mutation<VerifyEmailResponse, VerifyEmailPayload>({
      query: (payload) => ({
        url: "/user/verify-email",
        method: "POST",
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

// ✅ Export hook
export const { useVerifyEmailMutation } = verifyEmailApi;
