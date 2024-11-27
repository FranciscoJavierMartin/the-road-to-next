import { cloneElement, ReactElement, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { Button } from './ui/button';

type UseConfirmDialogArgs = {
  title?: string;
  description?: string;
  action: (payload: FormData) => Promise<void>;
  trigger: ReactElement;
};

export default function useConfirmDialog({
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone. Make sure you understand the consequences.',
  action,
  trigger,
}: UseConfirmDialogArgs) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dialogTrigger = cloneElement(trigger, {
    onClick: () => setIsOpen((prev) => !prev),
  });

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <form action={action}>
              <Button type='submit'>Confirm</Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog] as const;
}