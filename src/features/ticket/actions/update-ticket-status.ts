'use server';

import { TicketStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { prisma } from '@/lib/prisma';
import { ticketPath, ticketsPath } from '@/paths';

export async function updateTicketStatus(
  id: string,
  status: TicketStatus,
): Promise<ActionState> {
  let res: ActionState;

  try {
    await prisma.ticket.update({
      where: { id },
      data: { status },
    });

    revalidatePath(ticketsPath);
    revalidatePath(ticketPath(id));

    res = toActionState('SUCCESS', 'Status updated');
  } catch (error) {
    res = fromErrorToActionState(error);
  }

  return res;
}
