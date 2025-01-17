import { Suspense } from 'react';
import Heading from '@/components/heading';
import Spinner from '@/components/spinner';
import TicketList from '@/features/ticket/components/ticket-list';
import { ParsedSearchParams } from '@/features/ticket/search-params';

type HomePageProps = {
  searchParams: Promise<ParsedSearchParams>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  return (
    <div className='flex flex-1 flex-col gap-y-8'>
      <Heading
        title='All tickets'
        description='Tickets by everyone at one place'
      />
      <Suspense fallback={<Spinner />}>
        <TicketList searchParams={await searchParams} />
      </Suspense>
    </div>
  );
}
