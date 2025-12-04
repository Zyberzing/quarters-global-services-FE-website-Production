// rtk/platformCategoryPackageApi.ts
import { emptySplitApi } from "@/store/rtk/emptySplitApi.ts";

export const platformCategoryPackageApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getPlatformServiceCategoryPackages: build.query<
      any,
      { platformServiceCategorySlug: string; toCountrySlug: string; page?: number; limit?: number }
    >({
      query: ({ platformServiceCategorySlug, toCountrySlug, page, limit }) => {
        let url = `/platform-service-category-package/get-platform-service-category-package?platformServiceCategorySlug=${platformServiceCategorySlug}&toCountrySlug=${toCountrySlug}`;
        if (page) url += `&page=${page}`;
        if (limit) url += `&limit=${limit}`;
        return url;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetPlatformServiceCategoryPackagesQuery } =
  platformCategoryPackageApi;
