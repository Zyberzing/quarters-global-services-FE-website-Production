import { emptySplitApi } from "@/store/rtk/emptySplitApi.ts";
import { ApplicationPayload } from "./applicationApi2";
 

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
