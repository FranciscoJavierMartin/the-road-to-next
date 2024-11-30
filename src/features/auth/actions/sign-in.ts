'use server';

import { verify } from '@node-rs/argon2';
import { cookies } from 'next/headers';
import { z } from 'zod';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { lucia } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';

const signInSchema = z.object({
  email: z.string().min(1, { message: 'Is required' }).max(191).email(),
  password: z.string().min(6).max(191),
});

export default async function signIn(
  _actionState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  let res: ActionState;

  try {
    const { email, password } = signInSchema.parse(
      Object.fromEntries(formData),
    );

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!(user && verify(user.passwordHash, password))) {
      res = toActionState('ERROR', 'Invalid email or password');
    } else {
      const session = await lucia.createSession(user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      res = toActionState('SUCCESS', 'Sign in successful');
    }
  } catch (error) {
    res = fromErrorToActionState(error, formData);
  }

  return res;
}
