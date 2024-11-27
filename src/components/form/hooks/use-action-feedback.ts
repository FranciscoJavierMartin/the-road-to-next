import { useEffect, useRef } from 'react';
import { ActionState } from '@/components/form/utils/to-action-state';

type OnArgs = {
  actionState: ActionState;
};

type UserActionFeedbackOptions = {
  onSuccess?: (params: OnArgs) => void;
  onError?: (params: OnArgs) => void;
};

export default function useActionFeedback(
  actionState: ActionState,
  options: UserActionFeedbackOptions,
): void {
  const prevTimestamp = useRef(actionState.timestamp);
  const isUpdate: boolean = prevTimestamp.current !== actionState.timestamp;

  useEffect(() => {
    if (isUpdate) {
      switch (actionState.status) {
        case 'SUCCESS':
          options.onSuccess?.({ actionState });
          break;
        case 'ERROR':
          options.onError?.({ actionState });
          break;
      }

      prevTimestamp.current = actionState.timestamp;
    }
  }, [actionState, options, isUpdate]);
}
