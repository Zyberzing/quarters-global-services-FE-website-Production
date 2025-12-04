
'use server';

import { clearSession } from '@/lib/session'; // adjust path to your file

export async function logoutAction() {
  await clearSession(); // ✅ deletes both cookies
  return { success: true };
}
