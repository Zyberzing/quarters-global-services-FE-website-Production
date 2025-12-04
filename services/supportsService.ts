'use server';
import { fetcher } from '@/lib/fetcher';
import { commonEmptyResponse } from './helper';
import { ApiPagination } from '@/lib/Types';

export interface SupportDataType {
  _id: string;
  name: string;
  phone: string;
  email: string;
  supportType: string;
  date: string;
  avatar?: string;
  isDeleted: boolean;
  deletedBy?: string | null;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const getSupports = async ({
  page,
}: {
  page: string;
}): Promise<ApiPagination & { data: SupportDataType[] }> => {
  try {
    const response = await fetcher(`/support/get-supports?page=${page}`, {
      cache: 'no-cache',
      revalidate: 60,
    });
    console.log(response, 'Supports data');

    // Transform the API response to match our expected structure
    if (response?.data) {
      return {
        data: response.data.supports || [],
        count: response.data.total || 0,
        currentPage: response.data.currentPage || 1,
        totalPages: response.data.totalPages || 1,
      };
    }

    return commonEmptyResponse;
  } catch (error) {
    console.log(error, 'Supports fetch error');
    return commonEmptyResponse;
  }
};

export const getSupportById = async (id: string): Promise<SupportDataType | null> => {
  try {
    const response = await fetcher(`/support/get-support/${id}`, {
      cache: 'no-cache',
      revalidate: 60,
    });
    console.log(response, 'Support by ID data');
    return response?.data || null;
  } catch (error) {
    console.log(error, 'Support by ID fetch error');
    return null;
  }
};
