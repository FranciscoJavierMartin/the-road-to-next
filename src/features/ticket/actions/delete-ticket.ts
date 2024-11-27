'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { setCookieByKey } from '@/actions/cookies';
import { prisma } from '@/lib/prisma';
import { ticketsPath } from '@/paths';

export default async function deleteTicket(id: string): Promise<void> {
  await prisma.ticket.delete({ where: { id } });

  revalidatePath(ticketsPath);
  await setCookieByKey('toast', 'Ticket deleted');
  redirect(ticketsPath);
}
