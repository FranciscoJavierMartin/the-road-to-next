import getAuth from '@/features/auth/queries/get-auth';
import isOwner from '@/features/auth/utils/is-owner';
import { TicketWithMetadata } from '@/features/ticket/types';
import { prisma } from '@/lib/prisma';

export default async function getTicket(
  id: string,
): Promise<TicketWithMetadata | null> {
  const { user } = await getAuth();

  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      user: {
        select: { username: true },
      },
    },
  });

  return ticket ? { ...ticket, isOwner: isOwner(user, ticket) } : null;
}
