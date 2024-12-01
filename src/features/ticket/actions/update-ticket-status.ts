'use server';

import { TicketStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import getAuthOrRedirect from '@/features/auth/queries/get-auth-or-redirect';
import { prisma } from '@/lib/prisma';
import { ticketPath, ticketsPath } from '@/paths';

export async function updateTicketStatus(
  id: string,
  status: TicketStatus,
): Promise<ActionState> {
  let res: ActionState;

  try {
    const { user } = await getAuthOrRedirect();

    await prisma.ticket.update({
      where: { id, userId: user.id },
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
