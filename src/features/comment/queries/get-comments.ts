import getAuth from '@/features/auth/queries/get-auth';
import isOwner from '@/features/auth/utils/is-owner';
import { CommentWithMetadata } from '@/features/comment/types';
import { prisma } from '@/lib/prisma';

export default async function getComments(
  ticketId: string,
): Promise<CommentWithMetadata[]> {
  const { user } = await getAuth();

  const comments = await prisma.comment.findMany({
    where: {
      ticketId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return comments.map((comment) => ({
    ...comment,
    isOwner: isOwner(user, comment),
  }));
}
