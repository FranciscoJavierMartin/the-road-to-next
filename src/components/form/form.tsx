import { PropsWithChildren } from 'react';
import { toast } from 'sonner';
import { ActionState } from '@/components/form/utils/to-action-state';
import useActionFeedback from './hooks/use-action-feedback';

type FormProps = {
  action: (payload: FormData) => void;
  actionState: ActionState;
  onSuccess?: (actionState: ActionState) => void;
  onError?: (actionState: ActionState) => void;
};

export default function Form({
  action,
  actionState,
  onSuccess,
  onError,
  children,
}: PropsWithChildren<FormProps>) {
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }

      onSuccess?.(actionState);
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }

      onError?.(actionState);
    },
  });

  return (
    <form action={action} className='flex flex-col gap-y-2'>
      {children}
    </form>
  );
}
