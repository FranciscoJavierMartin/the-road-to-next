import Link from 'next/link';
import { ticketsPath } from '@/paths';

export default function Home() {
  return (
    <div>
      <h2 className='text-lg'>HomePage</h2>
      <Link href={ticketsPath} className='underline'>
        Go to tickets
      </Link>
    </div>
  );
}
