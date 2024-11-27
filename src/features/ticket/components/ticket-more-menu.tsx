'use client';

import { Ticket, TicketStatus } from '@prisma/client';
import { LucideTrash } from 'lucide-react';
import { ReactElement } from 'react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { updateTicketStatus } from '@/features/ticket/actions/update-ticket-status';
import { TICKET_STATUS_LABELS } from '@/features/ticket/constants';

type TicketMoreMenuProps = {
  ticket: Ticket;
  trigger: ReactElement;
};

export default function TicketMoreMenu({
  ticket,
  trigger,
}: TicketMoreMenuProps) {
  const deleteButton = (
    <DropdownMenuItem>
      <LucideTrash className='size-4' />
      <span>Delete</span>
    </DropdownMenuItem>
  );

  async function handleUpdateTicketStatus(value: string): Promise<void> {
    const promise = updateTicketStatus(ticket.id, value as TicketStatus);

    toast.promise(promise, {
      loading: 'Updating status ...',
    });

    const result = await promise;

    switch (result.status) {
      case 'ERROR':
        toast.error(result.message);
        break;
      case 'SUCCESS':
        toast.success(result.message);
        break;
    }
  }

  const ticketStatusRadioGroup = (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleUpdateTicketStatus}
    >
      {Object.entries(TICKET_STATUS_LABELS).map(([key, value]) => (
        <DropdownMenuRadioItem value={key} key={key}>
          {value}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' side='right'>
        {ticketStatusRadioGroup}
        <DropdownMenuSeparator />
        {deleteButton}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
