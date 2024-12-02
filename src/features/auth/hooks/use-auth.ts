import { User } from '@prisma/client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import getAuth from '@/features/auth/queries/get-auth';

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    (async () => {
      const { user } = await getAuth();
      setUser(user);
      setIsFetched(true);
    })();
  }, [pathname]);

  return { user, isFetched };
}
