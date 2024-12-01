'use server';

import { Session, User } from '@prisma/client';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/features/auth/utils/session-cookie';
import { validateSession } from '@/lib/lucia';

export default async function getAuth(): Promise<
  { user: User; session: Session } | { user: null; session: null }
> {
  let result: { user: User; session: Session } | { user: null; session: null };
  const sessionToken = (await cookies()).get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) {
    result = {
      user: null,
      session: null,
    };
  } else {
    result = await validateSession(sessionToken);
  }

  return result;
}
