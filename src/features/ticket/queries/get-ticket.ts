import { Ticket } from '@/features/ticket/types';
import { prisma } from '@/lib/prisma';

export default async function getTicket(id: string): Promise<Ticket | null> {
  return await prisma.ticket.findUnique({
    where: { id },
  });
}
