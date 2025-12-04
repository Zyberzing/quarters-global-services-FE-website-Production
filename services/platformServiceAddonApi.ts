 
import { emptySplitApi } from "@/store/rtk/emptySplitApi.ts";

 
export const platformServiceAddonApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getPlatformServiceCategoryPackageAddon: build.query<
      any,
      { platformServiceCategoryPackageSlug: string; toCountrySlug: string }
    >({
      query: ({ platformServiceCategoryPackageSlug, toCountrySlug }) => ({
        url: `/platform-service-category-package-addon/get-platform-service-category-package-addon`,
        method: "GET",
        params: {
          platformServiceCategoryPackageSlug,
          toCountrySlug,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetPlatformServiceCategoryPackageAddonQuery } = platformServiceAddonApi;
