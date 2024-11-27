'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { ticketPath, ticketsPath } from '@/paths';

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
});

export default async function upsertTicket(
  id: string | undefined = '',
  _actionState: { message: string; payload?: FormData },
  formData: FormData,
): Promise<{ message: string; payload?: FormData }> {
  let res: { message: string; payload?: FormData };

  try {
    const data = upsertTicketSchema.parse({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
    });

    await prisma.ticket.upsert({
      where: { id },
      update: data,
      create: data,
    });

    revalidatePath(ticketsPath);

    if (id) {
      redirect(ticketPath(id));
    }

    res = { message: 'Ticket created' };
  } catch {
    res = { message: 'Something went wrong', payload: formData };
  }

  return res;
}
