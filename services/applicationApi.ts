 import { ApplicationPayload } from "@/lib/Types";
import { emptySplitApi } from "@/store/rtk/emptySplitApi.ts";
 

export const applicationApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    createApplication: build.mutation<any, ApplicationPayload>({
      query: (payload) => ({
        url: "/application/create-application",
        method: "POST",
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateApplicationMutation } = applicationApi;
