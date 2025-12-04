// rtk/platformNavbarApi.ts

import { emptySplitApi } from "@/store/rtk/emptySplitApi.ts";

export const platformNavbarApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getNavbarServices: build.query<any, void>({
      query: () => `/platform-service/get-navbar-services`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetNavbarServicesQuery } = platformNavbarApi;
