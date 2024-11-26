import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Heading from '@/components/heading';
import Placeholder from '@/components/placeholder';
import Spinner from '@/components/spinner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import TicketCreateForm from '@/features/ticket/components/ticket-create-form';
import TicketList from '@/features/ticket/components/ticket-list';

export const dynamic = 'force-dynamic';

export default function TicketsPage() {
  return (
    <div className='flex flex-1 flex-col gap-y-8'>
      <Heading title='Tickets' description='All your tickets at one place' />
      <Separator />
      <Card className='w-full max-w-[420px] self-center'>
        <CardHeader>
          <CardTitle>Create Ticket</CardTitle>
          <CardDescription>A new ticket will be created</CardDescription>
        </CardHeader>
        <CardContent>
          <TicketCreateForm />
        </CardContent>
      </Card>
      <ErrorBoundary fallback={<Placeholder label='Something went wrong' />}>
        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
