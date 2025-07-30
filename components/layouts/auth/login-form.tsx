import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LABELS from '@/constants/labels';
import { cn } from '@/lib/utils';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { title, description, emailLabel, emailPlaceholder, passwordLabel, forgotPassword, submitButton } =
    LABELS.auth.loginForm;
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='email'>{emailLabel}</Label>
                <Input id='email' type='email' placeholder={emailPlaceholder} required />
              </div>
              <div className='grid gap-3'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>{passwordLabel}</Label>
                  <a href='#' className='ml-auto inline-block text-sm underline-offset-4 hover:underline'>
                    {forgotPassword}
                  </a>
                </div>
                <Input id='password' type='password' required />
              </div>
              <div className='flex flex-col gap-3'>
                <Button type='submit' className='w-full'>
                  {submitButton}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
