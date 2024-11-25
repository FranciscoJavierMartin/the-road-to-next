import { Suspense } from 'react';
import Heading from '@/components/heading';
import Spinner from '@/components/spinner';
import { Separator } from '@/components/ui/separator';
import TicketList from '@/features/ticket/components/ticket-list';

export default function TicketsPage() {
  return (
    <div className='flex flex-1 flex-col gap-y-8'>
      <Heading title='Tickets' description='All your tickets at one place' />
      <Separator />
      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
}
