import { Session, User } from '@prisma/client';
import { redirect } from 'next/navigation';
import getAuth from '@/features/auth/queries/get-auth';
import { signInPath } from '@/paths';

export default async function getAuthOrRedirect(): Promise<{
  user: User;
  session: Session;
}> {
  const auth = await getAuth();

  if (!auth.user) {
    redirect(signInPath);
  }

  return auth;
}
