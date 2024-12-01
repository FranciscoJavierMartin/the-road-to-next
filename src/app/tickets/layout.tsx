import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';
import getAuth from '@/features/auth/queries/get-auth';
import { signInPath } from '@/paths';

export default async function AuthenticatedLayout({
  children,
}: PropsWithChildren) {
  const { user } = await getAuth();

  if (!user) {
    redirect(signInPath);
  }

  return children;
}
