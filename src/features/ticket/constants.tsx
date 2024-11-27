import { LucideCheckCircle, LucideFileText, LucidePencil } from 'lucide-react';

export const TICKET_ICONS = {
  OPEN: <LucideFileText />,
  IN_PROGRESS: <LucideCheckCircle />,
  DONE: <LucidePencil />,
};

export const TICKET_STATUS_LABELS = {
  OPEN: 'Open',
  IN_PROGRESS: 'In progress',
  DONE: 'Done',
};
