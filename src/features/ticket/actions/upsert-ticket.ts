'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { setCookieByKey } from '@/actions/cookies';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { prisma } from '@/lib/prisma';
import { ticketPath, ticketsPath } from '@/paths';

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
});

export default async function upsertTicket(
  id: string | undefined = '',
  _actionState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  let res: ActionState;

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
      await setCookieByKey('toast', 'Ticket upsert');
      redirect(ticketPath(id));
    }

    res = toActionState('SUCCESS', 'Ticket created');
  } catch (error) {
    res = fromErrorToActionState(error, formData);
  }

  return res;
}
