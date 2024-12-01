import { User } from '@prisma/client';

type Entity = {
  userId: string | null;
};

export default function isOwner(
  user: User | null | undefined,
  entity: Entity | null | undefined,
): boolean {
  return !!user && !!entity && entity.userId === user.id;
}
