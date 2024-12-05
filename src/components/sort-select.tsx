'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type SortSelectOption = {
  label: string;
  sortKey: string;
  sortValue: string;
};

type SortObject = {
  sortKey: string;
  sortValue: string;
};

type SortSelectProps = {
  value: SortObject;
  onChange: (sort: SortObject) => void;
  options: SortSelectOption[];
};

export default function SortSelect({
  options,
  value,
  onChange,
}: SortSelectProps) {
  const handleSort = (compositeKey: string): void => {
    const [sortKey, sortValue] = compositeKey.split('_');

    onChange({
      sortKey,
      sortValue,
    });
  };

  return (
    <Select
      onValueChange={handleSort}
      defaultValue={value.sortKey + '_' + value.sortValue}
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
