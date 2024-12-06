'use client';

import { useActionState } from 'react';
import FieldError from '@/components/form/field-error';
import Form from '@/components/form/form';
import SubmitButton from '@/components/form/submit-button';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { Textarea } from '@/components/ui/textarea';
import { createComment } from '@/features/comment/actions/create-comment';

type CommentCreateFormProps = {
  ticketId: string;
};

export default function CommentCreateForm({
  ticketId,
}: CommentCreateFormProps) {
  const [actionState, action] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Textarea name='content' placeholder='Write your comment here...' />
      <FieldError actionState={actionState} name='content' />
      <SubmitButton label='Comment' />
    </Form>
  );
}
