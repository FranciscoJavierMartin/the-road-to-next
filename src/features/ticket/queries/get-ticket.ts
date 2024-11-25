import { initialTickets } from '@/data';
import { Ticket } from '@/features/ticket/types';

export default async function getTicket(id: string): Promise<Ticket | null> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const maybeTicket = initialTickets.find((ticket) => ticket.id === id);

  return new Promise((resolve) => resolve(maybeTicket || null));
}
