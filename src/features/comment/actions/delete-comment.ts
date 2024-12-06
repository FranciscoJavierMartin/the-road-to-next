'use server';

import { revalidatePath } from 'next/cache';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import getAuthOrRedirect from '@/features/auth/queries/get-auth-or-redirect';
import isOwner from '@/features/auth/utils/is-owner';
import { prisma } from '@/lib/prisma';
import { ticketPath } from '@/paths';

export default async function deleteComment(id: string): Promise<ActionState> {
  let res: ActionState;
  const { user } = await getAuthOrRedirect();

  const comment = await prisma.comment.findUnique({ where: { id } });

  if (!comment || !isOwner(user, comment)) {
    res = toActionState('ERROR', 'Not authorized');
  } else {
    try {
      await prisma.comment.delete({ where: { id } });
      revalidatePath(ticketPath(comment.ticketId));
      res = toActionState('SUCCESS', 'Comment deleted');
    } catch (error) {
      res = fromErrorToActionState(error);
    }
  }

  return res;
}
