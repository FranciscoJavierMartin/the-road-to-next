'use client';

import { useActionState } from 'react';
import FieldError from '@/components/form/field-error';
import Form from '@/components/form/form';
import SubmitButton from '@/components/form/submit-button';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { Input } from '@/components/ui/input';
import signUp from '@/features/auth/actions/sign-up';

export default function SignUpForm() {
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);

  return (
    <Form action={action} actionState={actionState}>
      <Input
        name='username'
        placeholder='Username'
        defaultValue={actionState.payload?.get('username') as string}
      />
      <FieldError actionState={actionState} name='username' />
      <Input
        name='email'
        type='email'
        placeholder='Email'
        defaultValue={actionState.payload?.get('email') as string}
      />
      <FieldError actionState={actionState} name='email' />
      <Input
        name='password'
        type='password'
        placeholder='Password'
        defaultValue={actionState.payload?.get('password') as string}
      />
      <FieldError actionState={actionState} name='password' />
      <Input
        name='confirmPassword'
        type='password'
        placeholder='Confirm password'
        defaultValue={actionState.payload?.get('confirmPassword') as string}
      />
      <FieldError actionState={actionState} name='confirmPassword' />
      <SubmitButton label='Sign Up' />
    </Form>
  );
}