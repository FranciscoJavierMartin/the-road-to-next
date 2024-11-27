import { PropsWithChildren } from 'react';
import { toast } from 'sonner';
import { ActionState } from '@/components/form/utils/to-action-state';
import useActionFeedback from './hooks/use-action-feedback';

type FormProps = {
  action: (payload: FormData) => void;
  actionState: ActionState;
};

export default function Form({
  action,
  actionState,
  children,
}: PropsWithChildren<FormProps>) {
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }
    },
  });

  return (
    <form action={action} className='flex flex-col gap-y-2'>
      {children}
    </form>
  );
}
