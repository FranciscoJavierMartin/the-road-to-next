import { notFound } from 'next/navigation';
import RedirectToast from '@/components/redirect-toast';
import TicketItem from '@/features/ticket/components/ticket-item';
import getTicket from '@/features/ticket/queries/get-ticket';

type TicketPageProps = {
  params: Promise<{
    ticketId?: string;
  }>;
};

export default async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId!);

  return ticket ? (
    <>
      <div className='flex animate-fade-in-from-top justify-center'>
        <TicketItem ticket={ticket} isDetail />
      </div>
      <RedirectToast />
    </>
  ) : (
    notFound()
  );
}
