'use server';
import { fetcher } from '@/lib/fetcher';

// Types for platform service category
export interface PlatformServiceCategory {
  _id: string;
  platformServiceId: string;
  parentCategoryId: string | null;
  name: string;
  description: string;
  isDeleted: boolean;
  applicableFrom: string[];
  applicableTo: string[];
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
  subCategories: PlatformServiceCategory[];
}

export interface PlatformServiceCategoryResponse {
  status: boolean;
  message: string;
  data: {
    data: PlatformServiceCategory[];
  };
}

/**
 * Fetch platform service categories by platform service slug
 * @param platformServiceSlug - The slug of the platform service (e.g., 'other-services')
 * @returns Promise with platform service categories
 */
export const getPlatformServiceCategories = async (
  platformServiceSlug: string,
): Promise<PlatformServiceCategory[]> => {
  try {
    const response: PlatformServiceCategoryResponse = await fetcher(
      `/platform-service-category/get-platform-service-category?platformServiceSlug=${platformServiceSlug}`,
      {
        cache: 'no-cache',
        revalidate: 60,
      },
    );

    if (response?.status && response?.data?.data) {
      console.log(response.data.data, 'Platform service categories');
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.log(error, 'Platform service categories fetch error');
    return [];
  }
};

/**
 * Fetch platform service categories by platform service ID
 * @param platformServiceId - The ID of the platform service
 * @param toCountryId - Optional country ID filter
 * @returns Promise with platform service categories
 */
export const getPlatformServiceCategoriesById = async (
  platformServiceId: string,
  toCountryId?: string,
): Promise<PlatformServiceCategory[]> => {
  try {
    const queryParams = new URLSearchParams({
      platformServiceId,
      ...(toCountryId && { toCountryId }),
    });

    const response: PlatformServiceCategoryResponse = await fetcher(
      `/platform-service-category/get-platform-service-category?${queryParams.toString()}`,
      {
        cache: 'no-cache',
        revalidate: 60,
      },
    );

    if (response?.status && response?.data?.data) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.log(error, 'Platform service categories fetch error');
    return [];
  }
};
