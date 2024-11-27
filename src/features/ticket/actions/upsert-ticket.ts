'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ticketPath, ticketsPath } from '@/paths';

export default async function upsertTicket(
  id: string | undefined = '',
  _actionState: { message: string },
  formData: FormData,
): Promise<{ message: string }> {
  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
  };

  await prisma.ticket.upsert({
    where: { id },
    update: data,
    create: data,
  });

  revalidatePath(ticketsPath);

  if (id) {
    redirect(ticketPath(id));
  }

  return { message: 'Ticket created' };
}
