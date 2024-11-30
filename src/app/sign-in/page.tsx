import Link from 'next/link';
import CardCompact from '@/components/card-compact';
import SignInForm from '@/features/auth/components/sign-in-form';
import { passwordForgotPath, signUpPath } from '@/paths';

export default function SignInPage() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center'>
      <CardCompact
        title='Sign Up'
        description='Create an account to get started'
        className='w-full max-w-[420px] animate-fade-in-from-top'
        footer={
          <div className='flex w-full justify-between'>
            <Link href={signUpPath} className='text-sm text-muted-foreground'>
              Not account yet?
            </Link>
            <Link
              href={passwordForgotPath}
              className='text-sm text-muted-foreground'
            >
              Forgot password?
            </Link>
          </div>
        }
      >
        <SignInForm />
      </CardCompact>
    </div>
  );
}
