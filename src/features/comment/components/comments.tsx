import CardCompact from '@/components/card-compact';
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
            {comment.isOwner ? <CommentDeleteButton id={comment.id} /> : null}
          </CommentItem>
        ))}
      </div>
    </>
  );
}
