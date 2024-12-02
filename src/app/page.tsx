import { Suspense } from 'react';
import Heading from '@/components/heading';
import Spinner from '@/components/spinner';
import TicketList from '@/features/ticket/components/ticket-list';

export default function Home() {
  return (
    <div className='flex flex-1 flex-col gap-y-8'>
      <Heading
        title='All tickets'
        description='Tickets by everyone at one place'
      />
      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
}
