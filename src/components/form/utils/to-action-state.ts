import { ZodError } from 'zod';

export type ActionState = {
  status?: 'SUCCESS' | 'ERROR';
  message: string;
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
  timestamp: number;
  data?: unknown;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: '',
  fieldErrors: {},
  timestamp: Date.now(),
};

export function fromErrorToActionState(
  error: unknown,
  formData?: FormData,
): ActionState {
  let res: ActionState;

  if (error instanceof ZodError) {
    res = {
      status: 'ERROR',
      message: '',
      fieldErrors: error.flatten().fieldErrors,
      payload: formData,
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    res = {
      status: 'ERROR',
      message: error.message,
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
  } else {
    res = {
      status: 'ERROR',
      message: 'An unknow error occured',
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
  }

  return res;
}

export function toActionState(
  status: ActionState['status'],
  message: string,
  formData?: FormData,
  data?: unknown,
): ActionState {
  return {
    status,
    message,
    fieldErrors: {},
    payload: formData,
    timestamp: Date.now(),
    data,
  };
}
