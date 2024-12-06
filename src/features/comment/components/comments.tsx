import CardCompact from '@/components/card-compact';
import CommentCreateForm from '@/features/comment/components/comment-create-form';
import CommentItem from '@/features/comment/components/comment-item';
import getComments from '@/features/comment/queries/get-comments';

type CommentsProps = {
  ticketId: string;
};

export default async function Comments({ ticketId }: CommentsProps) {
  const comments = await getComments(ticketId);
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
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
}
