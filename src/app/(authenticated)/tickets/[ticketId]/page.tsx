import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/breadcrumbs';
import { Separator } from '@/components/ui/separator';
import getAuth from '@/features/auth/queries/get-auth';
import isOwner from '@/features/auth/utils/is-owner';
import TicketItem from '@/features/ticket/components/ticket-item';
import getTicket from '@/features/ticket/queries/get-ticket';
import { homePath } from '@/paths';

type TicketPageProps = {
  params: Promise<{
    ticketId?: string;
  }>;
};

export default async function TicketPage({ params }: TicketPageProps) {
  const { user } = await getAuth();
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId!);

  const isTicketOwner = isOwner(user, ticket);

  return ticket && isTicketOwner ? (
    <div className='flex flex-1 flex-col gap-y-8'>
      <Breadcrumbs
        breadcrumbs={[
          { title: 'Tickets', href: homePath },
          { title: ticket.title },
        ]}
      />
      <Separator />
      <div className='flex animate-fade-in-from-top justify-center'>
        <TicketItem ticket={ticket} isDetail />
      </div>
    </div>
  ) : (
    notFound()
  );
}
