'use client';

import { useQueryState, useQueryStates } from 'nuqs';
import SearchInput from '@/components/search-input';
import {
  paginationOptions,
  paginationParser,
  searchParser,
} from '@/features/ticket/search-params';

type TicketSearchInputProps = {
  placeholder: string;
};

export default function TicketSearchInput({
  placeholder,
}: TicketSearchInputProps) {
  const [search, setSearch] = useQueryState('search', searchParser);
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );

  function handleSearch(value: string): void {
    setPagination({ ...pagination, page: 0 });
    setSearch(value);
  }

  return (
    <SearchInput
      value={search}
      onChange={handleSearch}
      placeholder={placeholder}
    />
  );
}
