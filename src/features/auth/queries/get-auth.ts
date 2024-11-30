import { Session,User } from 'lucia';
import { cookies } from 'next/headers';
import { lucia } from '@/lib/lucia';

export default async function getAuth() {
  let result: { user: User; session: Session } | { user: null; session: null };
  const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value;

  if (!sessionId) {
    result = {
      user: null,
      session: null,
    };
  } else {
    result = await lucia.validateSession(sessionId);

    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        (await cookies()).set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        (await cookies()).set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {}
  }
  return result;
}
