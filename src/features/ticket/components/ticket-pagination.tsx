'use client';

import { useQueryStates } from 'nuqs';
import Pagination from '@/components/pagination';
import {
  paginationOptions,
  paginationParser,
} from '@/features/ticket/search-params';

export default function TicketPagination() {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );

  return <Pagination pagination={pagination} onPagination={setPagination} />;
}
