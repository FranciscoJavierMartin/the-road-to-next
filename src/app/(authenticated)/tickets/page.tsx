import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import CardCompact from '@/components/card-compact';
import Heading from '@/components/heading';
import Placeholder from '@/components/placeholder';
import Spinner from '@/components/spinner';
import getAuth from '@/features/auth/queries/get-auth';
import TicketList from '@/features/ticket/components/ticket-list';
import TicketUpsertForm from '@/features/ticket/components/ticket-upsert-form';
import { ParsedSearchParams } from '@/features/ticket/search-params';

export const dynamic = 'force-dynamic';

type TicketsPageProps = {
  searchParams: Promise<ParsedSearchParams>;
};

export default async function TicketsPage({ searchParams }: TicketsPageProps) {
  const { user } = await getAuth();

  return (
    <div className='flex flex-1 flex-col gap-y-8'>
      <Heading title='My tickets' description='All your tickets at one place' />
      <CardCompact
        title='Create Ticket'
        className='w-full max-w-[420px] self-center'
        description='A new ticket will be created'
      >
        <TicketUpsertForm />
      </CardCompact>
      <ErrorBoundary fallback={<Placeholder label='Something went wrong' />}>
        <Suspense fallback={<Spinner />}>
          <TicketList userId={user?.id} searchParams={await searchParams} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
