import { TicketWithMetadata } from '@/features/ticket/types';
import { prisma } from '@/lib/prisma';

export default async function getTickets(
  userId?: string,
): Promise<TicketWithMetadata[]> {
  return await prisma.ticket.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { username: true },
      },
    },
  });
}
