import Link from 'next/link';
import CardCompact from '@/components/card-compact';
import SignUpForm from '@/features/auth/components/sign-up-form';
import { signInPath } from '@/paths';

export default function SignUpPage() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center'>
      <CardCompact
        title='Sign Up'
        description='Create an account to get started'
        className='w-full max-w-[420px] animate-fade-in-from-top'
        footer={
          <span className='text-sm text-muted-foreground'>
            Have an account? <Link href={signInPath}>Sign In now.</Link>
          </span>
        }
      >
        <SignUpForm />
      </CardCompact>
    </div>
  );
}
