import { format } from 'date-fns';
import { PropsWithChildren } from 'react';
import { Card } from '@/components/ui/card';
import { CommentWithMetadata } from '@/features/comment/types';

type CommentItemProps = {
  comment: CommentWithMetadata;
};

export default function CommentItem({
  children,
  comment,
}: PropsWithChildren<CommentItemProps>) {
  return (
    <div className='flex gap-x-2'>
      <Card className='flex flex-1 flex-col gap-y-1 p-4'>
        <div className='flex justify-between'>
          <p className='text-sm text-muted-foreground'>
            {comment.isOwner
              ? 'You'
              : (comment.user?.username ?? 'Deleted User')}
          </p>
          <p className='text-sm text-muted-foreground'>
            {format(comment.createdAt, 'yyyy-MM-dd, HH:mm')}
          </p>
        </div>
        <p className='whitespace-pre-line'>{comment.content}</p>
      </Card>
      <div className='flex flex-col gap-y-1'>{children}</div>
    </div>
  );
}
