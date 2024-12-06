'use client';

import { useActionState } from 'react';
import FieldError from '@/components/form/field-error';
import Form from '@/components/form/form';
import SubmitButton from '@/components/form/submit-button';
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from '@/components/form/utils/to-action-state';
import { Textarea } from '@/components/ui/textarea';
import { createComment } from '@/features/comment/actions/create-comment';
import { CommentWithMetadata } from '@/features/comment/types';

type CommentCreateFormProps = {
  ticketId: string;
  onCreateComment?: (comment: CommentWithMetadata | undefined) => void;
};

export default function CommentCreateForm({
  ticketId,
  onCreateComment,
}: CommentCreateFormProps) {
  const [actionState, action] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_ACTION_STATE,
  );

  function handleSuccess(
    actionState: ActionState<CommentWithMetadata | undefined>,
  ): void {
    onCreateComment?.(actionState.data as CommentWithMetadata);
  }

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Textarea name='content' placeholder='Write your comment here...' />
      <FieldError actionState={actionState} name='content' />
      <SubmitButton label='Comment' />
    </Form>
  );
}
