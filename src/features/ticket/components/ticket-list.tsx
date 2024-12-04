import Placeholder from '@/components/placeholder';
import SearchInput from '@/components/search-input';
import TicketItem from '@/features/ticket/components/ticket-item';
import getTickets from '@/features/ticket/queries/get-tickets';
import { SearchParams } from '@/features/ticket/search-params';

type TicketListProps = {
  userId?: string;
  searchParams: SearchParams;
};

export default async function TicketList({
  userId,
  searchParams,
}: TicketListProps) {
  const tickets = await getTickets(userId, searchParams);

  return (
    <div className='flex flex-1 animate-fade-in-from-top flex-col items-center gap-y-4'>
      <div className='w-full max-w-[420px]'>
        <SearchInput placeholder='Search tickets ...' />
      </div>
      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label='No tickets found' />
      )}
    </div>
  );
}
