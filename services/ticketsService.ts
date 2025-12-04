'use server';
import { fetcher } from '@/lib/fetcher';
import { commonEmptyResponse } from './helper';
import { ApiPagination } from '@/lib/Types';

export interface TicketAttachments {
  passportScan?: string;
  serviceForm?: string;
  signature?: string;
}

export interface TicketDataType {
  _id: string;
  status: 'Open' | 'Closed' | 'Resolved' | 'Waiting on Customer' | 'Urgent';
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  customer: string;
  applicationId: string;
  category: string;
  subCategory?: string;
  assignedStaff?: string;
  subject: string;
  description?: string;
  attachments: TicketAttachments;
  isDeleted: boolean;
  deletedBy?: string | null;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const getTickets = async ({
  page,
}: {
  page: string;
}): Promise<ApiPagination & { data: TicketDataType[] }> => {
  try {
    const response = await fetcher(`/ticket/get-tickets?page=${page}`, {
      cache: 'no-cache',
      revalidate: 60,
    });
    console.log(response, 'Tickets data');

    // Transform the API response to match our expected structure
    if (response?.data) {
      return {
        data: response.data.tickets || [],
        count: response.data.total || 0,
        currentPage: response.data.currentPage || 1,
        totalPages: response.data.totalPages || 1,
      };
    }

    return commonEmptyResponse;
  } catch (error) {
    console.log(error, 'Tickets fetch error');
    return commonEmptyResponse;
  }
};

export const getTicketById = async (id: string): Promise<TicketDataType | null> => {
  try {
    const data = await fetcher('/ticket/get-ticket/' + id, {
      cache: 'no-cache',
      revalidate: 60,
    });
    return data?.data || null;
  } catch (error) {
    console.log(error, 'Ticket fetch error');
    return null;
  }
};

export interface CreateTicketPayload {
  customer: string;
  applicationId?: string;
  category: string;
  subCategory?: string;
  assignedStaff?: string;
  subject: string;
  description?: string;
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  status: 'Open' | 'Closed' | 'Resolved' | 'Waiting on Customer' | 'Urgent';
  attachments: {
    passportScan?: string;
    serviceForm?: string;
    signature?: string;
  };
}

export const createTicket = async (payload: CreateTicketPayload) => {
  try {
    const result = await fetcher('/ticket/create-ticket', {
      method: 'POST',
      body: payload,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateTicket = async (id: string, payload: CreateTicketPayload) => {
  try {
    const result = await fetcher(`/ticket/update/${id}`, {
      method: 'PUT',
      body: payload,
    });
    return result;
  } catch (error) {
    throw error;
  }
};
