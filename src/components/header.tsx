import { LucideKanban } from 'lucide-react';
import Link from 'next/link';
import ThemeSwitcher from '@/components/theme/theme-switcher';
import { buttonVariants } from '@/components/ui/button';
import { homePath, signInPath, signUpPath, ticketsPath } from '@/paths';

export default function Header() {
  const navItems = (
    <>
      <Link
        href={ticketsPath}
        className={buttonVariants({ variant: 'default' })}
      >
        Tickets
      </Link>
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
    <nav className='supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 flex w-full justify-between border-b bg-background/95 px-5 py-2.5 backdrop-blur'>
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
