'use server';

import { cookies } from 'next/headers';
import { encrypt, decrypt } from './crypto';
import { UserSession, UserTypeENUM } from './Types';
 
const COOKIE_NAME = process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME!;
const COOKIE_USER_ROLE_NAME = process.env.NEXT_PUBLIC_SESSION_COOKIE_USER_ROLE!;

export async function saveSession(user: UserSession, userRole: UserTypeENUM) {
  const encrypted = encrypt(JSON.stringify(user));

  (await cookies()).set({
    name: COOKIE_NAME,
    value: encrypted,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  (await cookies()).set({
    name: COOKIE_USER_ROLE_NAME,
    value: userRole,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession(): Promise<UserSession | null> {
  const raw = (await cookies()).get(COOKIE_NAME)?.value;

  if (!raw) return null;

  try {
    const decrypted = decrypt(raw);

    return decrypted ? JSON.parse(decrypted) : null;
  } catch {
    return null;
  }
}

export async function clearSession() {
  (await cookies()).delete(COOKIE_NAME);
  (await cookies()).delete(COOKIE_USER_ROLE_NAME);
}

export async function hasSession(): Promise<UserSession | null> {
  const session = await getSession();
  return session;
}