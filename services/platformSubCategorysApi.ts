import { emptySplitApi } from "@/store/rtk/emptySplitApi.ts";

export const platformSubCategoryApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    // ✅ New query
    getPlatformServiceSubCategories: build.query<
      any,
      { platformServiceSlug: string; toCountrySlug: string }
    >({
      query: ({ platformServiceSlug, toCountrySlug }) =>
        `/platform-service-category/get-platform-service-category?platformServiceSlug=${platformServiceSlug}&toCountrySlug=${toCountrySlug}`,
    }),
  }),
  overrideExisting: false,
});

// ✅ Export hook
export const { useGetPlatformServiceSubCategoriesQuery } = platformSubCategoryApi;
