'use server';

import { cookies } from 'next/headers';

export async function getCookieByKey(key: string): Promise<string | null> {
  const cookie = (await cookies()).get(key);

  return cookie ? cookie.value : null;
}

export async function setCookieByKey(
  key: string,
  value: string,
): Promise<void> {
  (await cookies()).set(key, value);
}

export async function deleteCookieByKey(key: string): Promise<void> {
  (await cookies()).delete(key);
}
