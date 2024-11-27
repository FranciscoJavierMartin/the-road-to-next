import { ActionState } from '@/components/form/utils/to-action-state';

type FieldErrorProps = {
  actionState: ActionState;
  name: string;
};

export default function FieldError({ actionState, name }: FieldErrorProps) {
  const message = actionState.fieldErrors[name]?.[0];

  return message ? (
    <span className='text-xs text-red-500'>{message}</span>
  ) : null;
}
