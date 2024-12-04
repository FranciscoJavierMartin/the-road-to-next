'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';

type SearchInputProps = {
  placeholder: string;
};

export default function SearchInput({ placeholder }: SearchInputProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return <Input placeholder={placeholder} onChange={handleSearch} />;
}
