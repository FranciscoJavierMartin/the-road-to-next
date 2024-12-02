import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/breadcrumbs';
import CardCompact from '@/components/card-compact';
import { Separator } from '@/components/ui/separator';
import TicketUpdateForm from '@/features/ticket/components/ticket-upsert-form';
import getTicket from '@/features/ticket/queries/get-ticket';
import { homePath, ticketPath } from '@/paths';

type TicketEditPageProps = {
  params: Promise<{
    ticketId?: string;
  }>;
};

export default async function TicketEditPage({ params }: TicketEditPageProps) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId!);

  return ticket ? (
    <div className='flex flex-1 flex-col gap-y-8'>
      <Breadcrumbs
        breadcrumbs={[
          { title: 'Tickets', href: homePath },
          { title: ticket.title, href: ticketPath(ticket.id) },
          { title: 'Edit' },
        ]}
      />
      <Separator />
      <div className='flex flex-1 flex-col items-center justify-center'>
        <CardCompact
          title='Edit ticket'
          description='Edit an existing ticket'
          className='w-full max-w-[420px] animate-fade-in-from-top'
        >
          <TicketUpdateForm ticket={ticket} />
        </CardCompact>
      </div>
    </div>
  ) : (
    notFound()
  );
}
