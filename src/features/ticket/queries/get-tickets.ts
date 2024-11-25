import { initialTickets } from '@/data';
import { Ticket } from '@/features/ticket/types';

export default async function getTickets(): Promise<Ticket[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return new Promise((resolve) => resolve(initialTickets));
}
