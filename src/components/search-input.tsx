'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/components/ui/input';

type SearchInputProps = {
  placeholder: string;
};

export default function SearchInput({ placeholder }: SearchInputProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }

      replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    250,
  );

  return <Input placeholder={placeholder} onChange={handleSearch} />;
}
