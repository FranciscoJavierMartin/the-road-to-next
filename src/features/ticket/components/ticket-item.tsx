'use client';
import { Ticket } from '@prisma/client';
import clsx from 'clsx';
import { LucideTrash, SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import deleteTicket from '@/features/ticket/actions/delete-ticket';
import { TICKET_ICONS } from '@/features/ticket/constants';
import { ticketPath } from '@/paths';

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

export default function TicketItem({ ticket, isDetail }: TicketItemProps) {
  async function handleDeleteTicket(): Promise<void> {
    await deleteTicket(ticket.id);
  }

  const detailButton = (
    <Button asChild variant='outline' size='icon'>
      <Link href={ticketPath(ticket.id)} className='text-sm underline'>
        <SquareArrowOutUpRight className='size-4' />
      </Link>
    </Button>
  );

  const deleteButton = (
    <Button variant='outline' size='icon' onClick={handleDeleteTicket}>
      <LucideTrash className='size-4' />
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
      <div className='flex flex-col gap-y-1'>
        {isDetail ? deleteButton : detailButton}
      </div>
    </div>
  );
}
