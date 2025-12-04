// rtk/countryApi.ts
import { emptySplitApi } from "@/store/rtk/emptySplitApi.ts";

// --- Types ---
export type Country = {
  _id: string;
  code: string;
  name: string;
  slug: string;
};

export type CountryApiResponse = {
  status: boolean;
  message: string;
  data: {
    data: Country[];
  };
};

// --- RTK Query ---
export const countryApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getCountries: build.query<CountryApiResponse, void>({
      query: () => "/country/get-country?page=1&pageSize=256",
    }),
  }),
  overrideExisting: false,
});

export const { useGetCountriesQuery } = countryApi;
