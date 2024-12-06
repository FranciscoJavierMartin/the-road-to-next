'use server';

import getAuth from '@/features/auth/queries/get-auth';
import isOwner from '@/features/auth/utils/is-owner';
import { CommentWithMetadata } from '@/features/comment/types';
import { prisma } from '@/lib/prisma';
import { PaginatedData } from '@/utils/types';

export default async function getComments(
  ticketId: string,
  cursor?: string,
): Promise<PaginatedData<CommentWithMetadata>> {
  const { user } = await getAuth();

  const where = {
    ticketId,
    id: {
      lt: cursor,
    },
  };
  const take = 2;

  // eslint-disable-next-line prefer-const
  let [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      take: take + 1,
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
        { id: 'desc' },
      ],
    }),
    prisma.comment.count({
      where,
    }),
  ]);

  const hasNextPage: boolean = comments.length > take;
  comments = hasNextPage ? comments.slice(0, -1) : comments;

  return {
    list: comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(user, comment),
    })),
    metadata: {
      count,
      hasNextPage,
      cursor: comments.at(-1)?.id,
    },
  };
}
