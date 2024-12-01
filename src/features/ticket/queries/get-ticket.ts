import { TicketWithMetadata } from '@/features/ticket/types';
import { prisma } from '@/lib/prisma';

export default async function getTicket(
  id: string,
): Promise<TicketWithMetadata | null> {
  return await prisma.ticket.findUnique({
    where: { id },
    include: {
      user: {
        select: { username: true },
      },
    },
  });
}
