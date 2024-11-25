import getTickets from '@/features/ticket/queries/get-tickets';
import TicketItem from './ticket-item';

export default async function TicketList() {
  const tickets = await getTickets();

  return (
    <div className='animate-fade-in-from-top flex flex-1 flex-col items-center gap-y-4'>
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
