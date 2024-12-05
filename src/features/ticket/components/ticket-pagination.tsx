'use client';

import { useQueryState, useQueryStates } from 'nuqs';
import { useEffect, useRef } from 'react';
import Pagination from '@/components/pagination';
import {
  paginationOptions,
  paginationParser,
  searchParser,
} from '@/features/ticket/search-params';

type TicketPaginationProps = {
  paginatedTicketMetadata: {
    count: number;
    hasNextPage: boolean;
  };
};

export default function TicketPagination({
  paginatedTicketMetadata,
}: TicketPaginationProps) {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );
  const [search] = useQueryState('search', searchParser);
  const prevSearch = useRef(search);

  useEffect(() => {
    if (search !== prevSearch.current) {
      prevSearch.current = search;
      setPagination({ ...pagination, page: 0 });
    }
  }, [search, pagination, setPagination]);

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginationMetadata={paginatedTicketMetadata}
    />
  );
}
