'use client';

import { useState } from 'react';
import SidebarItem from '@/components/sidebar/components/sidebar-item';
import { navItems } from '@/components/sidebar/constants';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const [isTransition, setIsTransition] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handleToggle = (open: boolean) => {
    setIsTransition(true);
    setOpen(open);
    setTimeout(() => setIsTransition(false), 200);
  };

  return (
    <nav
      className={cn(
        'h-screen border-r pt-24',
        isTransition && 'duration-200',
        isOpen ? 'w-[78px] md:w-60' : 'w-[78px]',
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className='px-3 py-2'>
        <nav className='space-y-2'>
          {navItems.map((navItem) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              navItem={navItem}
            />
          ))}
        </nav>
      </div>
    </nav>
  );
}
