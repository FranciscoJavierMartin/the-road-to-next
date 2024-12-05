import { CommentWithMetadata } from '@/features/comment/types';
import { prisma } from '@/lib/prisma';

export default async function getComments(
  ticketId: string,
): Promise<CommentWithMetadata[]> {
  return await prisma.comment.findMany({
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
}
