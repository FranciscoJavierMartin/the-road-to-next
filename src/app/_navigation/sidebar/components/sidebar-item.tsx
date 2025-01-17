import Link from 'next/link';
import { cloneElement } from 'react';
import { closedClassName } from '@/app/_navigation/sidebar/constants';
import { NavItem } from '@/app/_navigation/sidebar/types';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type SidebarItemProps = {
  isOpen: boolean;
  isActive: boolean;
  navItem: NavItem;
};

export default function SidebarItem({
  isOpen,
  isActive,
  navItem,
}: SidebarItemProps) {
  return (
    <>
      {navItem.separator && <Separator />}
      <Link
        href={navItem.href}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'group relative flex h-12 justify-start',
          isActive && 'bg-muted font-bold hover:bg-muted',
        )}
      >
        {cloneElement(navItem.icon, {
          className: 'h-5 w-5',
        })}
        <span
          className={cn(
            'absolute left-12 text-base duration-200',
            isOpen ? 'hidden md:block' : 'w-[78px]',
            !isOpen && closedClassName,
          )}
        >
          {navItem.title}
        </span>
      </Link>
    </>
  );
}
