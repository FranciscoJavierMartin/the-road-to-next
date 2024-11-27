import { Ticket } from '@prisma/client';
import SubmitButton from '@/components/form/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import upsertTicket from '@/features/ticket/actions/upsert-ticket';

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

export default function TicketUpsertForm({ ticket }: TicketUpsertFormProps) {
  return (
    <form
      action={upsertTicket.bind(null, ticket?.id)}
      className='flex flex-col gap-y-2'
    >
      <Label htmlFor='title'>Title</Label>
      <Input id='title' name='title' type='text' defaultValue={ticket?.title} />
      <Label htmlFor='content'>Content</Label>
      <Textarea id='content' name='content' defaultValue={ticket?.content} />
      <SubmitButton label={ticket ? 'Edit' : 'Create'} />
    </form>
  );
}