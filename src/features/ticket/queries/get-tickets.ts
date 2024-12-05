import { ParsedSearchParams } from '@/features/ticket/search-params';
import { TicketWithMetadata } from '@/features/ticket/types';
import { prisma } from '@/lib/prisma';
import { PaginatedData } from '@/utils/types';

export default async function getTickets(
  userId: string | undefined,
  searchParams: ParsedSearchParams,
): Promise<PaginatedData<TicketWithMetadata>> {
  const where = {
    userId,
    title: {
      contains: searchParams.search,
      mode: 'insensitive' as const,
    },
  };

  const skip = searchParams.page * searchParams.size;
  const take = searchParams.size;

  const tickets: TicketWithMetadata[] = await prisma.ticket.findMany({
    where,
    skip,
    take,
    orderBy: {
      [searchParams.sortKey]: searchParams.sortValue,
    },
    include: {
      user: {
        select: { username: true },
      },
    },
  });

  const count = await prisma.ticket.count({ where });

  return {
    list: tickets,
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
}
