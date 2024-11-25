'use server';

import { prisma } from '@/lib/prisma';

export default async function deleteTicket(id: string): Promise<void> {
  await prisma.ticket.delete({ where: { id } });
}
