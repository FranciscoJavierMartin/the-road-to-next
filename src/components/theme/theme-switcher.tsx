'use client';
import { LucideMoon, LucideSun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';

export default function ThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
    >
      <LucideSun className='size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <LucideMoon className='absolute size-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}