'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { RefObject, useImperativeHandle, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export type ImperativeHandleFromDatePicker = {
  reset: () => void;
};

type DatePickerProps = {
  id: string;
  name: string;
  defaultValue?: string;
  imperativeHandleRef?: RefObject<ImperativeHandleFromDatePicker>;
};

export default function DatePicker({
  id,
  name,
  defaultValue,
  imperativeHandleRef,
}: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date(),
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useImperativeHandle(imperativeHandleRef, () => ({
    reset: () => setDate(new Date()),
  }));

  const formattedStringDate = date ? format(date, 'yyyy-MM-dd') : '';

  function handleSelect(selectedDate: Date | undefined) {
    setDate(selectedDate);
    setIsOpen(false);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className='w-full' id={id} asChild>
        <Button
          variant='outline'
          className='justify-start text-left font-normal'
        >
          <CalendarIcon className='size-4' />
          {formattedStringDate}
          <input type='hidden' name={name} value={formattedStringDate} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
