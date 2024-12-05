import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type PageAndSize = {
  page: number;
  size: number;
};

type PaginationProps = {
  pagination: PageAndSize;
  onPagination: (pagination: PageAndSize) => void;
  paginationMetadata: {
    count: number;
    hasNextPage: boolean;
  };
};

export default function Pagination({
  pagination,
  onPagination,
  paginationMetadata: { count, hasNextPage },
}: PaginationProps) {
  const startOffset = pagination.page * pagination.size + 1;
  const endOffset = startOffset - 1 + pagination.size;
  const actualEndOffset = Math.min(endOffset, count);

  const label = `${startOffset}-${actualEndOffset} of ${count}`;

  function handleChangeSize(size: string): void {
    onPagination({ page: 0, size: parseInt(size) });
  }

  function handlePreviousPage(): void {
    onPagination({ ...pagination, page: pagination.page - 1 });
  }

  function handleNextPage(): void {
    onPagination({ ...pagination, page: pagination.page + 1 });
  }

  const previoustButton = (
    <Button
      variant='outline'
      size='sm'
      disabled={pagination.page < 1}
      onClick={handlePreviousPage}
    >
      Previous
    </Button>
  );

  const nextButton = (
    <Button
      variant='outline'
      size='sm'
      disabled={!hasNextPage}
      onClick={handleNextPage}
    >
      Next
    </Button>
  );

  const sizeButton = (
    <Select
      onValueChange={handleChangeSize}
      defaultValue={pagination.size.toString()}
    >
      <SelectTrigger className='h-[36px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='2'>2</SelectItem>
        <SelectItem value='5'>5</SelectItem>
        <SelectItem value='10'>10</SelectItem>
        <SelectItem value='25'>25</SelectItem>
        <SelectItem value='50'>50</SelectItem>
        <SelectItem value='100'>100</SelectItem>
      </SelectContent>
    </Select>
  );

  return (
    <div className='flex items-center justify-between'>
      <p className='text-sm text-muted-foreground'>{label}</p>
      <div className='flex gap-x-2'>
        {sizeButton}
        {previoustButton}
        {nextButton}
      </div>
    </div>
  );
}
