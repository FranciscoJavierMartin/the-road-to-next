'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { setSessionCookie } from '@/features/auth/utils/session-cookie';
import { verifyPasswordHash } from '@/features/password/utils/hash-and-verify';
import { createSession } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';
import { ticketsPath } from '@/paths';
import { generateRandomToken } from '@/utils/crypto';

const signInSchema = z.object({
  email: z.string().min(1, { message: 'Is required' }).max(191).email(),
  password: z.string().min(6).max(191),
});

export default async function signIn(
  _actionState: ActionState,
  formData: FormData,
) {
  let res: ActionState;

  try {
    const { email, password } = signInSchema.parse(
      Object.fromEntries(formData),
    );

    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log(user);

    try {
      if (user) {
        console.log(user.passwordHash);
        console.log(password);
        await verifyPasswordHash(user.passwordHash, password);
      }
    } catch (error) {
      console.log('Perro');
      console.log(error);
    }

    if (user && (await verifyPasswordHash(user.passwordHash, password))) {
      const sessionToken = generateRandomToken();
      const session = await createSession(sessionToken, user.id);

      await setSessionCookie(sessionToken, session.expiresAt);
      console.log('Hello');
      revalidatePath(ticketsPath);
      throw redirect(ticketsPath);
    } else {
      return toActionState('ERROR', 'Invalid email or password', formData);
    }
  } catch (error) {
    console.log('Mio');
    console.log(error);
    return fromErrorToActionState(error, formData);
  }

  return res;
}
