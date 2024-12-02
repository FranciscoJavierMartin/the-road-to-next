import { LucideKanban, LucideLogOut } from 'lucide-react';
import Link from 'next/link';
import SubmitButton from '@/components/form/submit-button';
import ThemeSwitcher from '@/components/theme/theme-switcher';
import { buttonVariants } from '@/components/ui/button';
import signOut from '@/features/auth/actions/sign-out';
import getAuth from '@/features/auth/queries/get-auth';
import { homePath, signInPath, signUpPath } from '@/paths';

export default async function Header() {
  const { user } = await getAuth();

  const navItems = user ? (
    <form action={signOut}>
      <SubmitButton label='Sign Out' icon={<LucideLogOut />} />
    </form>
  ) : (
    <>
      <Link
        href={signUpPath}
        className={buttonVariants({ variant: 'outline' })}
      >
        Sign Up
      </Link>
      <Link
        href={signInPath}
        className={buttonVariants({ variant: 'outline' })}
      >
        Sign In
      </Link>
    </>
  );

  return (
    <nav className='animate-header-from-top supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 flex w-full justify-between border-b bg-background/95 px-5 py-2.5 backdrop-blur'>
      <div className='flex gap-x-2'>
        <Link href={homePath} className={buttonVariants({ variant: 'ghost' })}>
          <LucideKanban />
          <h1 className='text-lg font-semibold'>TicketBounty</h1>
        </Link>
      </div>
      <div className='flex gap-x-2'>
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
}
