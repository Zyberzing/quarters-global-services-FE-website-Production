import { hasSession } from './session';

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  cache?: RequestCache; // "force-cache" | "no-store" etc.
  revalidate?: number;
  headers?: Record<string, string>;
};

export async function fetcher<T = any>(
  url: string,
  { method = 'GET', body, cache = 'no-store', revalidate, headers = {} }: FetchOptions = {},
): Promise<T> {
  try {
    const session = await hasSession();
    if (!session?.id || !session?.token) {
      throw 'User token not found';
    }
    const token = session?.token;

    const isFormData = body instanceof FormData;

    const res = await fetch(`${process.env.NEXT_PUBLIC_QUARTUS_API_URL}${url}`, {
      method,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: isFormData ? body : body ? JSON.stringify(body) : undefined,
      cache,
      next: revalidate ? { revalidate } : undefined,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const error: any = new Error(data?.message || res?.statusText || 'Request failed');
      error.status = res.status;
      error.body = data;
      throw error;
    }

    return data as T;
  } catch (err: any) {
    console.log('Fetcher error:', err);
    throw err as T;
  }
}