import { emptySplitApi } from "@/store/rtk/emptySplitApi.ts";


export const platformCategoryApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getPlatformServiceCategories: build.query({
      query: ({ platformServiceSlug, toCountrySlug, fromCountrySlug }: { platformServiceSlug: string; toCountrySlug: string; fromCountrySlug: string }) =>
        `/platform-service/get-platform-service?platformServiceSlug=${platformServiceSlug}&toCountrySlug=${toCountrySlug}&fromCountrySlug=${fromCountrySlug}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetPlatformServiceCategoriesQuery } = platformCategoryApi;
