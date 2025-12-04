'use server';
import { fetcher } from '@/lib/fetcher';
import { commonEmptyResponse } from './helper';
import { revalidatePath } from 'next/cache';
import { ApiPagination, RoleDataType } from '@/lib/Types';

export const getRoles = async (): Promise<ApiPagination & { data: RoleDataType[] }> => {
    try {
        const data = await fetcher('/role/get-roles', {
            cache: 'no-cache',
            revalidate: 60,
        });
        return data?.data || [];
    } catch (error) {
        console.log(error, 'Roles fetch error');
        return commonEmptyResponse;
    }
};

export const getRole = async (id: string): Promise<RoleDataType | null> => {
    try {
        const data = await fetcher(`/role/get-role/${id}`, {
            cache: 'no-cache',
            revalidate: 60,
        });
        return data?.data || null;
    } catch (error) {
        console.log(error, 'Role fetch error');
        return null;
    }
};

export const createRole = async (body: any) => {
    try {
        const result = await fetcher('/role/create-role', {
            method: 'POST',
            body,
        });
        revalidatePath('/admin/users-and-roles');
        return result;
    } catch (error) {
        throw error;
    }
};

export const editRole = async (body: { id: string } & any) => {
    try {
        const result = await fetcher(`/role/update-role`, {
            method: 'PUT',
            body,
        });
        revalidatePath('/admin/users-and-roles');
        return result;
    } catch (error) {
        throw error;
    }
};

export const deleteRole = async (id: string) => {
    try {
        const result = await fetcher(`/role/delete-role/${id}`, {
            method: 'DELETE',
        });
        revalidatePath('/admin/users-and-roles');
        return result;
    } catch (error) {
        throw error;
    }
};