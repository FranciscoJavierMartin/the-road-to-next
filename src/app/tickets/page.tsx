import Link from 'next/link';
import { initialTickets } from '@/data';
import { ticketPath } from '@/paths';

const TICKET_ICONS = {
  OPEN: 'O',
  DONE: 'X',
  IN_PROGRESS: '>',
};

export default function TicketPage() {
  return (
    <div>
      <h2 className='text-lg'>TicketsPage</h2>
      {initialTickets.map((ticket) => (
        <div key={ticket.id}>
          <div>{TICKET_ICONS[ticket.status]}</div>
          <h2 className='text-lg'>{ticket.title}</h2>
          <Link href={ticketPath(ticket.id)} className='text-sm underline'>
            View
          </Link>
        </div>
      ))}
    </div>
  );
}
