'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    await signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className="flex items-center justify-center mt-8 bg-background">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-lg bg-card">
        <div>
          <h2 className="text-3xl font-extrabold text-center">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <Button
            onClick={handleGoogleLogin}
            className="w-full border bg-background text-foreground border-input hover:bg-accent hover:text-accent-foreground"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
              />
            </svg>
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
} 