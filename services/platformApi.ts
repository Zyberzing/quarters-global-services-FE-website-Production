// rtk/platformApi.ts
import { emptySplitApi } from "@/store/rtk/emptySplitApi.ts";

export const platformApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
         getPlatformServices: build.query<any, { page: number; limit: number; category: number }>({
            query: ({ page, limit, category }) =>
                `/platform-service/get-platform-service?page=${page}&limit=${limit}&category=${category}`,
        }),

         getPlatformServiceById: build.query<any, string>({
            query: (toCountrySlug) =>
                `/platform-service/get-platform-service/?toCountrySlug=${toCountrySlug}`,
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetPlatformServicesQuery,
    useGetPlatformServiceByIdQuery, // ✅ export new hook
} = platformApi;
