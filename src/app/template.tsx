import { PropsWithChildren } from 'react';
import RedirectToast from '@/components/redirect-toast';

export default function RootTemplate({ children }: PropsWithChildren) {
  return (
    <>
      <>{children}</>
      <RedirectToast />
    </>
  );
}
