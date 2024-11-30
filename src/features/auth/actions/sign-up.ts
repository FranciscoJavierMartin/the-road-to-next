'use server';

import { hash } from '@node-rs/argon2';
import { cookies } from 'next/headers';
import { z } from 'zod';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { lucia } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1)
      .max(191)
      .refine(
        (value) => !value.includes(' '),
        'Username cannot contain spaces',
      ),
    email: z.string().min(1, { message: 'Is required' }).max(191).email(),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export default async function signUp(
  _actionState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  let res: ActionState;

  try {
    const { username, email, password } = signUpSchema.parse(
      Object.fromEntries(formData),
    );

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash: await hash(password),
      },
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    res = toActionState('SUCCESS', 'Sign up successful');
  } catch (error) {
    res = fromErrorToActionState(error, formData);
  }

  return res;
}
