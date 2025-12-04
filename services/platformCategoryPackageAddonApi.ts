 import { emptySplitApi } from "@/store/rtk/emptySplitApi.ts";

export const platformCategoryPackageAddonApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getPlatformServiceCategoryPackageAddons: build.query<
      any,
      { platformServiceCategoryPackageSlug: string }
    >({
      query: ({ platformServiceCategoryPackageSlug }) =>
        `/platform-service-category-package-addon/get-platform-service-category-package-addon?platformServiceCategoryPackageSlug=${platformServiceCategoryPackageSlug}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPlatformServiceCategoryPackageAddonsQuery,
} = platformCategoryPackageAddonApi;
