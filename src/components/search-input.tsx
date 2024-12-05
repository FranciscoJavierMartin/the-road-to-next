'use client';

import { ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/components/ui/input';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export default function SearchInput({
  placeholder,
  onChange,
  value,
}: SearchInputProps) {
  const handleSearch = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    250,
  );

  return (
    <Input
      placeholder={placeholder}
      onChange={handleSearch}
      defaultValue={value}
    />
  );
}
