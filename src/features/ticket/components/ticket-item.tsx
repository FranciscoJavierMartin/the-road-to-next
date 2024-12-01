import clsx from 'clsx';
import {
  LucideMoreVertical,
  LucidePencil,
  SquareArrowOutUpRight,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import TicketMoreMenu from '@/features/ticket/components/ticket-more-menu';
import { TICKET_ICONS } from '@/features/ticket/constants';
import { TicketWithMetadata } from '@/features/ticket/types';
import { editTicketPath, ticketPath } from '@/paths';
import { toCurrencyFromCent } from '@/utils/currency';

type TicketItemProps = {
  ticket: TicketWithMetadata;
  isDetail?: boolean;
};

export default function TicketItem({ ticket, isDetail }: TicketItemProps) {
  const detailButton = (
    <Button asChild variant='outline' size='icon'>
      <Link prefetch href={ticketPath(ticket.id)}>
        <SquareArrowOutUpRight className='size-4' />
      </Link>
    </Button>
  );

  const editButton = (
    <Button variant='outline' size='icon' asChild>
      <Link prefetch href={editTicketPath(ticket.id)}>
        <LucidePencil className='size-4' />
      </Link>
    </Button>
  );

  const moreMenu = (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant='outline' size='icon'>
          <LucideMoreVertical className='size-4' />
        </Button>
      }
    />
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
        <CardFooter className='flex justify-between'>
          <p className='text-sm text-muted-foreground'>
            {ticket.deadline} by {ticket.user.username}
          </p>
          <p className='text-sm text-muted-foreground'>
            {toCurrencyFromCent(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>
      <div className='flex flex-col gap-y-1'>
        {isDetail ? (
          <>
            {editButton}
            {moreMenu}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
          </>
        )}
      </div>
    </div>
  );
}
