'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import SidebarItem from '@/components/sidebar/components/sidebar-item';
import { navItems } from '@/components/sidebar/constants';
import useAuth from '@/features/auth/hooks/use-auth';
import { cn } from '@/lib/utils';
import { signInPath, signUpPath } from '@/paths';
import getActivePath from '@/utils/get-active-path';

export default function Sidebar() {
  const [isTransition, setIsTransition] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const { user, isFetched } = useAuth();
  const pathname = usePathname();

  const { activeIndex } = getActivePath(
    pathname,
    navItems.map((navItem) => navItem.href),
    [signInPath, signUpPath],
  );
  function handleToggle(open: boolean): void {
    setIsTransition(true);
    setOpen(open);
    setTimeout(() => setIsTransition(false), 200);
  }

  return !user || !isFetched ? (
    <div className='w-[78px] bg-secondary/20' />
  ) : (
    <nav
      className={cn(
        'animate-sidebar-from-left',
        'h-screen border-r pt-24',
        isTransition && 'duration-200',
        isOpen ? 'w-[78px] md:w-60' : 'w-[78px]',
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className='px-3 py-2'>
        <nav className='space-y-2'>
          {navItems.map((navItem, index) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              navItem={navItem}
              isActive={activeIndex === index}
            />
          ))}
        </nav>
      </div>
    </nav>
  );
}
