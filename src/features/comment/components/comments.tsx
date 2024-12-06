'use client';

import { useState } from 'react';
import CardCompact from '@/components/card-compact';
import { Button } from '@/components/ui/button';
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
  const [comments, setComments] = useState<CommentWithMetadata[]>(
    paginatedComments.list,
  );
  const [metadata, setMetadata] = useState(paginatedComments.metadata);

  async function handleMore(): Promise<void> {
    const morePaginatedComments = await getComments(ticketId, comments.length);
    setComments((prev) => [...prev, ...morePaginatedComments.list]);
    setMetadata(morePaginatedComments.metadata);
  }

  function handleDeleteComment(id: string): void {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  }

  return (
    <>
      <CardCompact
        title='Create comment'
        description='A new comment will be created'
      >
        <CommentCreateForm ticketId={ticketId} />
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
      </div>
      <div className='ml-8 flex flex-col justify-center'>
        {metadata.hasNextPage && (
          <Button variant='ghost' onClick={handleMore}>
            More
          </Button>
        )}
      </div>
    </>
  );
}
