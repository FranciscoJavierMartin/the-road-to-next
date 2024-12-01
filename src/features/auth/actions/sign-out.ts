'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import getAuth from '@/features/auth/queries/get-auth';
import { lucia } from '@/lib/lucia';
import { signInPath } from '@/paths';

export default async function signOut(): Promise<void> {
  const { session } = await getAuth();

  if (!session) {
    redirect(signInPath);
  }

  await lucia.invalidateSession(session.userId);

  const sessionCookie = lucia.createBlankSessionCookie();

  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect(signInPath);
}
