'use server';

import getAuth from '@/features/auth/queries/get-auth';
import isOwner from '@/features/auth/utils/is-owner';
import { CommentWithMetadata } from '@/features/comment/types';
import { prisma } from '@/lib/prisma';
import { PaginatedData } from '@/utils/types';

export default async function getComments(
  ticketId: string,
  offset?: number,
): Promise<PaginatedData<CommentWithMetadata>> {
  const { user } = await getAuth();

  const where = {
    ticketId,
  };
  const skip = offset ?? 0;
  const take = 2;

  const [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      skip,
      take,
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
    }),
    prisma.comment.count({
      where,
    }),
  ]);

  return {
    list: comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(user, comment),
    })),
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
}
