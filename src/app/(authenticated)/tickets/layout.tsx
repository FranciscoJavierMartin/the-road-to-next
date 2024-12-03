import { PropsWithChildren } from 'react';
import getAuthOrRedirect from '@/features/auth/queries/get-auth-or-redirect';

export default async function AuthenticatedLayout({
  children,
}: PropsWithChildren) {
  await getAuthOrRedirect();

  return children;
}
