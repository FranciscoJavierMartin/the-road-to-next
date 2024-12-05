'use client';

import { useQueryStates } from 'nuqs';
import Pagination from '@/components/pagination';
import {
  paginationOptions,
  paginationParser,
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

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginationMetadata={paginatedTicketMetadata}
    />
  );
}
