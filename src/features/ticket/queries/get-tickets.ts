import { SearchParams } from '@/features/ticket/search-params';
import { TicketWithMetadata } from '@/features/ticket/types';
import { prisma } from '@/lib/prisma';

export default async function getTickets(
  userId: string | undefined,
  searchParams: SearchParams,
): Promise<TicketWithMetadata[]> {
  return await prisma.ticket.findMany({
    where: {
      userId,
      ...(typeof searchParams.search === 'string' && {
        title: {
          contains: searchParams.search,
          mode: 'insensitive',
        },
      }),
    },
    orderBy: {
      ...(searchParams.sort === undefined && { createdAt: 'desc' }),
      ...(searchParams.sort === 'bounty' && { bounty: 'desc' }),
    },
    include: {
      user: {
        select: { username: true },
      },
    },
  });
}
