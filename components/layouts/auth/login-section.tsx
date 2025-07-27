import { LoginForm } from '@/components/layouts/auth/login-form'; // adjust path if needed

export default function LoginSection() {
  return (
    <section id='login' className='w-full px-4 py-20  flex justify-center items-center'>
      <div className='w-full max-w-md rounded-xl p-8'>
        <LoginForm />
      </div>
    </section>
  );
}
