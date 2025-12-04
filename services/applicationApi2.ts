import { emptySplitApi } from "@/store/rtk/emptySplitApi.ts";

 
export type ApplicationPayload = {
  applications: any[]; // You can type this more strictly based on your schema
};

export type ApplicationResponse = {
  status: boolean;
  message: string;
  data?: any;
};

export const applicationApi2 = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    createApplication2: build.mutation<ApplicationResponse, ApplicationPayload>({
      query: (payload) => ({
        url: "/application/create-application",
        method: "POST",
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateApplication2Mutation } = applicationApi2;
