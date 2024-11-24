import Link from 'next/link';
import Placeholder from '@/components/placeholder';
import { Button } from '@/components/ui/button';
import { initialTickets } from '@/data';
import TicketItem from '@/features/ticket/components/ticket-item';
import { ticketsPath } from '@/paths';

type TicketPageProps = {
  params: Promise<{
    ticketId?: string;
  }>;
};

export default async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = await params;
  const ticket = initialTickets.find((ticket) => ticket.id === ticketId);

  return ticket ? (
    <div className='animate-fade-in-from-top flex justify-center'>
      <TicketItem ticket={ticket} isDetail />
    </div>
  ) : (
    <Placeholder
      label='Ticket not found'
      button={
        <Button asChild variant='outline'>
          <Link href={ticketsPath}>Go to tickets</Link>
        </Button>
      }
    />
  );
}
