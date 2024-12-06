import getAuth from '@/features/auth/queries/get-auth';
import isOwner from '@/features/auth/utils/is-owner';
import { ParsedSearchParams } from '@/features/ticket/search-params';
import { TicketWithMetadata } from '@/features/ticket/types';
import { prisma } from '@/lib/prisma';
import { PaginatedData } from '@/utils/types';

export default async function getTickets(
  userId: string | undefined,
  searchParams: ParsedSearchParams,
): Promise<PaginatedData<TicketWithMetadata>> {
  const { user } = await getAuth();
  const where = {
    userId,
    title: {
      contains: searchParams.search,
      mode: 'insensitive' as const,
    },
  };

  const skip = searchParams.page * searchParams.size;
  const take = searchParams.size;

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
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
    }),
    prisma.ticket.count({ where }),
  ]);

  return {
    list: tickets.map((ticket) => ({
      ...ticket,
      isOwner: isOwner(user, ticket),
    })),
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
}
