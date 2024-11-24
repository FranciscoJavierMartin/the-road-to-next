import { initialTickets } from '@/data';

type TicketPageProps = {
  params: Promise<{
    ticketId?: string;
  }>;
};

export default async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = await params;
  const ticket = initialTickets.find((ticket) => ticket.id === ticketId);

  return ticket ? (
    <div>
      <h2 className='text-lg'>{ticket.title}</h2>
      <p className='text-sm'>{ticket.content}</p>
    </div>
  ) : (
    <div>Ticket not found</div>
  );
}
