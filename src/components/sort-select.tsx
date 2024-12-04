'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Option = {
  label: string;
  value: string;
};

type SortSelectProps = {
  options: Option[];
  defaultValue?: string;
};

export default function SortSelect({ options, defaultValue }: SortSelectProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSort = (value: string): void => {
    const params = new URLSearchParams(searchParams);

    if (value === defaultValue) {
      params.delete('sort');
    } else if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Select
      defaultValue={searchParams.get('sort')?.toString() || defaultValue}
      onValueChange={handleSort}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
