'use client';

import { useQueryState } from 'nuqs';
import { ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/components/ui/input';
import { searchParser } from '@/features/ticket/search-params';

type SearchInputProps = {
  placeholder: string;
};

export default function SearchInput({ placeholder }: SearchInputProps) {
  const [search, setSearch] = useQueryState('search', searchParser);

  const handleSearch = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    250,
  );

  return (
    <Input
      placeholder={placeholder}
      onChange={handleSearch}
      defaultValue={search}
    />
  );
}
