import CardCompact from '@/components/card-compact';
import getAuth from '@/features/auth/queries/get-auth';
import isOwner from '@/features/auth/utils/is-owner';
import CommentCreateForm from '@/features/comment/components/comment-create-form';
import CommentDeleteButton from '@/features/comment/components/comment-delete-button';
import CommentItem from '@/features/comment/components/comment-item';
import { CommentWithMetadata } from '@/features/comment/types';

type CommentsProps = {
  ticketId: string;
  comments?: CommentWithMetadata[];
};

export default async function Comments({
  ticketId,
  comments = [],
}: CommentsProps) {
  const { user } = await getAuth();

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
            {isOwner(user, comment) ? (
              <CommentDeleteButton id={comment.id} />
            ) : null}
          </CommentItem>
        ))}
      </div>
    </>
  );
}
