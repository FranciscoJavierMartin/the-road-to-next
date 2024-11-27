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
import { toCent } from '@/utils/currency';

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Is required'),
  bounty: z.coerce.number().positive(),
});

export default async function upsertTicket(
  id: string | undefined = '',
  _actionState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  let res: ActionState;

  try {
    const data = upsertTicketSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
      deadline: formData.get('deadline'),
      bounty: formData.get('bounty'),
    });

    const dbData = {
      ...data,
      bounty: toCent(data.bounty),
    };

    await prisma.ticket.upsert({
      where: { id },
      update: dbData,
      create: dbData,
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
