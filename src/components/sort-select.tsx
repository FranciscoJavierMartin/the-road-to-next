'use client';

import { useQueryStates } from 'nuqs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { sortOptions, sortParser } from '@/features/ticket/search-params';

type Option = {
  label: string;
  sortKey: string;
  sortValue: string;
};

type SortSelectProps = {
  options: Option[];
};

export default function SortSelect({ options }: SortSelectProps) {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  const handleSort = (compositeKey: string): void => {
    const [sortKey, sortValue] = compositeKey.split('_');
    console.log({ sortKey, sortValue });
    // debugger;
    setSort({
      sortKey,
      sortValue,
    });
  };

  return (
    <Select
      onValueChange={handleSort}
      defaultValue={sort.sortKey + '_' + sort.sortValue}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.sortKey + option.sortValue}
            value={option.sortKey + '_' + option.sortValue}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
