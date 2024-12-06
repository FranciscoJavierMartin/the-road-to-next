'use client';

import { LucideLoaderCircle, LucideTrash } from 'lucide-react';
import useConfirmDialog from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import deleteComment from '@/features/comment/actions/delete-comment';

type CommentDeleteButtonProps = {
  id: string;
  onDeleteComment?: (id: string) => void;
};

export default function CommentDeleteButton({
  id,
  onDeleteComment,
}: CommentDeleteButtonProps) {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteComment.bind(null, id),
    trigger: (isPending: boolean) => (
      <Button variant='outline' size='icon'>
        {isPending ? (
          <LucideLoaderCircle className='size-4 animate-spin' />
        ) : (
          <LucideTrash className='size-4' />
        )}
      </Button>
    ),
    onSuccess: () => onDeleteComment?.(id),
  });

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  );
}
