'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { deleteCookieByKey, getCookieByKey } from '@/actions/cookies';

export default function RedirectToast() {
  useEffect(() => {
    async function showCookieToast() {
      const message = await getCookieByKey('toast');

      if (message) {
        toast.success(message);
        await deleteCookieByKey('toast');
      }
    }

    showCookieToast();
  }, []);

  return null;
}
