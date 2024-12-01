'use client';

import clsx from 'clsx';
import { LucideLoaderCircle } from 'lucide-react';
import { cloneElement, ReactElement } from 'react';
import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from '@/components/ui/button';

type SubmitButtonProps = {
  label: string;
  icon?: ReactElement;
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
};

export default function SubmitButton({
  label,
  icon,
  variant = 'default',
  size = 'default',
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' disabled={pending} variant={variant} size={size}>
      {pending && (
        <LucideLoaderCircle
          className={clsx('size-4 animate-spin', { 'mr-2': label })}
        />
      )}
      {label}
      {pending ? null : icon ? (
        <span className={clsx({ 'ml-2': label })}>
          {cloneElement(icon, { className: 'size-4' })}
        </span>
      ) : null}
    </Button>
  );
}
