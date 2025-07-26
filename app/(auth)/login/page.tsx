import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ICONS from '@/constants/icons';
import LABELS from '@/constants/labels';

export default function Component() {
  return (
    <div className='container mx-auto px-4 sm:px-6  lg:px-8 py-12  flex flex-col  justify-evenly md:min-h-screen '>
      {/* Logo and Name */}
      <div className='flex items-center space-x-2 mb-4 md:mb-0 place-content-center'>
        <ICONS.dumbbell className='h-10 w-10' />
        <span className='font-semibold text-3xl '>{LABELS.app.name}</span>
      </div>
      {/* Login Form */}
      <div className='login-form mt-14 md:mt-0 '>
        <Card className='mx-auto max-w-sm  '>
          <CardTitle className='text-center text-2xl font-bold mb-4'>Hello, Welcome Back!! </CardTitle>
          <CardHeader className='space-y-1'>
            <CardDescription>Enter your email and password to login to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' type='email' placeholder='m@example.com' required />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <Input id='password' type='password' required />
              </div>
              <Button type='submit' className='w-full'>
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
