import { emptySplitApi } from "@/store/rtk/emptySplitApi.ts";

export const accountApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation<
      { message: string },
      { oldPassword: string; newPassword: string }
    >({
      query: (body) => ({
        url: "/account/change-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useChangePasswordMutation } = accountApi;
