'use client';

import { useQueryState } from 'nuqs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { sortParser } from '@/features/ticket/search-params';

type Option = {
  label: string;
  value: string;
};

type SortSelectProps = {
  options: Option[];
};

export default function SortSelect({ options }: SortSelectProps) {
  const [sort, setSort] = useQueryState('sort', sortParser);

  const handleSort = (value: string): void => {
    setSort(value);
  };

  return (
    <Select defaultValue={sort} onValueChange={handleSort}>
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
