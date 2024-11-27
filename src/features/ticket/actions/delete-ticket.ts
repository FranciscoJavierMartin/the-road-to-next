'use server';

import { redirect } from 'next/navigation';
import { setCookieByKey } from '@/actions/cookies';
import { prisma } from '@/lib/prisma';
import { ticketsPath } from '@/paths';

export default async function deleteTicket(id: string): Promise<void> {
  await prisma.ticket.delete({ where: { id } });
  await setCookieByKey('toast', 'Ticket delete');
  redirect(ticketsPath);
}
