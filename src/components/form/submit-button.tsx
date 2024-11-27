'use client'
import { LucideLoaderCircle } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

type SubmitButtonProps = { label: string };

export default function SubmitButton({ label }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' disabled={pending}>
      {pending && <LucideLoaderCircle className='mr-2 size-4 animate-spin' />}
      {label}
    </Button>
  );
}
