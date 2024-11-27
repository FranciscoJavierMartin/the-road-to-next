import { notFound } from 'next/navigation';
import CardCompact from '@/components/card-compact';
import TicketUpdateForm from '@/features/ticket/components/ticket-upsert-form';
import getTicket from '@/features/ticket/queries/get-ticket';

type TicketEditPageProps = {
  params: Promise<{
    ticketId?: string;
  }>;
};

export default async function TicketEditPage({ params }: TicketEditPageProps) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId!);

  return ticket ? (
    <div className='flex flex-1 flex-col items-center justify-center'>
      <CardCompact
        title='Edit ticket'
        description='Edit an existing ticket'
        className='w-full max-w-[420px] animate-fade-in-from-top'
      >
        <TicketUpdateForm ticket={ticket} />
      </CardCompact>
    </div>
  ) : (
    notFound()
  );
}