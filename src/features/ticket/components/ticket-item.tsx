import { Ticket } from '@prisma/client';
import clsx from 'clsx';
import { SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TICKET_ICONS } from '@/features/ticket/constants';
import { ticketPath } from '@/paths';

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

export default function TicketItem({ ticket, isDetail }: TicketItemProps) {
  const detailButton = (
    <Button asChild variant='outline' size='icon'>
      <Link href={ticketPath(ticket.id)} className='text-sm underline'>
        <SquareArrowOutUpRight className='size-4' />
      </Link>
    </Button>
  );
  return (
    <div
      className={clsx('flex w-full gap-x-1', {
        'max-w-[580px]': isDetail,
        'max-w-[420px]': !isDetail,
      })}
    >
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='flex gap-x-2'>
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className='truncate'>{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={clsx('whitespace-break-spaces', {
              'line-clamp-3': !isDetail,
            })}
          >
            {ticket.content}
          </span>
        </CardContent>
      </Card>
      {!isDetail && <div className='flex flex-col gap-y-1'>{detailButton}</div>}
    </div>
  );
}
