'use client';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import CardCompact from '@/components/card-compact';
import { Skeleton } from '@/components/ui/skeleton';
import CommentCreateForm from '@/features/comment/components/comment-create-form';
import CommentDeleteButton from '@/features/comment/components/comment-delete-button';
import CommentItem from '@/features/comment/components/comment-item';
import getComments from '@/features/comment/queries/get-comments';
import { CommentWithMetadata } from '@/features/comment/types';
import { PaginatedData } from '@/utils/types';

type CommentsProps = {
  ticketId: string;
  paginatedComments: PaginatedData<CommentWithMetadata>;
};

export default function Comments({
  ticketId,
  paginatedComments,
}: CommentsProps) {
  const queryClient = useQueryClient();
  const queryKey = ['comments', ticketId];
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: {
        pages: [
          {
            list: paginatedComments.list,
            metadata: paginatedComments.metadata,
          },
        ],
        pageParams: [undefined],
      },
    });
  const comments: CommentWithMetadata[] = data.pages.flatMap(
    (page) => page.list,
  );

  function handleDeleteComment(): void {
    queryClient.invalidateQueries({ queryKey });
  }

  function handleCreateComment(): void {
    queryClient.invalidateQueries({ queryKey });
  }

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  return (
    <>
      <CardCompact
        title='Create comment'
        description='A new comment will be created'
      >
        <CommentCreateForm
          ticketId={ticketId}
          onCreateComment={handleCreateComment}
        />
      </CardCompact>
      <div className='ml-8 flex flex-col gap-y-2'>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment}>
            {comment.isOwner ? (
              <CommentDeleteButton
                id={comment.id}
                onDeleteComment={handleDeleteComment}
              />
            ) : null}
          </CommentItem>
        ))}
        {isFetchingNextPage && (
          <>
            <div className='flex gap-x-2'>
              <Skeleton className='h-[82px] w-full' />
              <Skeleton className='h-[40px] w-[40px]' />
            </div>
            <div className='flex gap-x-2'>
              <Skeleton className='h-[82px] w-full' />
              <Skeleton className='h-[40px] w-[40px]' />
            </div>
          </>
        )}
      </div>
      <div ref={ref}>
        {!hasNextPage && (
          <p className='text-right text-xs italic'>No more comments.</p>
        )}
      </div>
    </>
  );
}
