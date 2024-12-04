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
      title: {
        contains: searchParams.search,
        mode: 'insensitive',
      },
    },
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { username: true },
      },
    },
  });
}
