'use client';

import { Ticket } from '@prisma/client';
import { LucideLoaderCircle } from 'lucide-react';
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import upsertTicket from '@/features/ticket/actions/upsert-ticket';

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

export default function TicketUpsertForm({ ticket }: TicketUpsertFormProps) {
  const [isPending, startTransition] = useTransition();

  function upsertTicketAction(formData: FormData) {
    startTransition(async () => {
      await upsertTicket.bind(null, ticket?.id)(formData);
    });
  }

  return (
    <form action={upsertTicketAction} className='flex flex-col gap-y-2'>
      <Label htmlFor='title'>Title</Label>
      <Input id='title' name='title' type='text' defaultValue={ticket?.title} />
      <Label htmlFor='content'>Content</Label>
      <Textarea id='content' name='content' defaultValue={ticket?.content} />
      <Button type='submit' disabled={isPending}>
        {isPending && (
          <LucideLoaderCircle className='mr-2 size-4 animate-spin' />
        )}
        {ticket ? 'Edit' : 'Create'}
      </Button>
    </form>
  );
}
