import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { initialTickets } from '@/data';
import TicketItem from '@/features/ticket/components/ticket-item';

export default function TicketsPage() {
  return (
    <div className='flex flex-1 flex-col gap-y-8'>
      <Heading title='Tickets' description='All your tickets at one place' />
      <Separator />
      <div className='animate-fade-in-from-top flex flex-1 flex-col items-center gap-y-4'>
        {initialTickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
