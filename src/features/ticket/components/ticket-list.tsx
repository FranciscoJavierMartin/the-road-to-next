import SearchInput from '@/components/search-input';
import TicketItem from '@/features/ticket/components/ticket-item';
import getTickets from '@/features/ticket/queries/get-tickets';

type TicketListProps = {
  userId?: string;
};

export default async function TicketList({ userId }: TicketListProps) {
  const tickets = await getTickets(userId);

  return (
    <div className='flex flex-1 animate-fade-in-from-top flex-col items-center gap-y-4'>
      <div className='w-full max-w-[420px]'>
        <SearchInput placeholder='Search tickets ...' />
      </div>
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
