'use server';
import { ProfileFormSchemaType } from '@/components/form/profileForm/ProfileForm';
import { fetcher } from '@/lib/fetcher';
import { revalidatePath } from 'next/cache';

export const editProfile = async (id: string, body: ProfileFormSchemaType) => {
  try {
    const result = await fetcher(`/user/update-user/${id}`, {
      method: 'PUT',
      body,
    });
    revalidatePath('/admin/profile');
    return result;
  } catch (error) {
    throw error;
  }
};