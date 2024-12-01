import { notFound } from 'next/navigation';
import getAuth from '@/features/auth/queries/get-auth';
import isOwner from '@/features/auth/utils/is-owner';
import TicketItem from '@/features/ticket/components/ticket-item';
import getTicket from '@/features/ticket/queries/get-ticket';

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
    <div className='flex animate-fade-in-from-top justify-center'>
      <TicketItem ticket={ticket} isDetail />
    </div>
  ) : (
    notFound()
  );
}
