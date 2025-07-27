import Hero from '@/components/layouts/auth/hero';
import LoginSection from '@/components/layouts/auth/login-section';
import DemoVideo from '@/components/layouts/auth/videodemo';

export default function AuthLandingPage() {
  return (
    <div className=''>
      <Hero />
      <DemoVideo />
      <LoginSection />
    </div>
  );
}
