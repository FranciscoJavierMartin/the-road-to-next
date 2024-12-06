import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/breadcrumbs';
import { Separator } from '@/components/ui/separator';
import getAuth from '@/features/auth/queries/get-auth';
import isOwner from '@/features/auth/utils/is-owner';
import Comments from '@/features/comment/components/comments';
import getComments from '@/features/comment/queries/get-comments';
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

  const [ticket, comments] = await Promise.all([
    getTicket(ticketId!),
    getComments(ticketId!),
  ]);

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
        <TicketItem ticket={ticket} isDetail>
          <Comments ticketId={ticket.id} comments={comments} />
        </TicketItem>
      </div>
    </div>
  ) : (
    notFound()
  );
}
