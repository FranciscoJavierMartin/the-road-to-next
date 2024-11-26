import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import CardCompact from '@/components/card-compact';
import Heading from '@/components/heading';
import Placeholder from '@/components/placeholder';
import Spinner from '@/components/spinner';
import TicketList from '@/features/ticket/components/ticket-list';
import TicketUpsertForm from '@/features/ticket/components/ticket-upsert-form';

export const dynamic = 'force-dynamic';

export default function TicketsPage() {
  return (
    <div className='flex flex-1 flex-col gap-y-8'>
      <Heading title='Tickets' description='All your tickets at one place' />
      <CardCompact
        title='Create Ticket'
        className='w-full max-w-[420px] self-center'
        description='A new ticket will be created'
      >
        <TicketUpsertForm />
      </CardCompact>
      <ErrorBoundary fallback={<Placeholder label='Something went wrong' />}>
        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
