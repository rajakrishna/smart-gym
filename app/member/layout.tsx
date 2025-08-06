import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './../globals.css';

import { redirect } from 'next/navigation';

import { BottomNavbar } from '@/components/layouts/member/bottom-navbar';
import MemberWelcome from '@/components/layouts/member/member-welcome-banner';
import MobileOnly from '@/components/layouts/member/required-view';
import LABELS from '@/constants/labels';
import { UserProvider } from '@/context/user-context';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: LABELS.metadata.member.title,
  description: LABELS.metadata.member.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = LABELS.memberContextId.id;
  if (!userId) {
    redirect('/');
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    redirect('/');
  }
  const userData = await res.json();

  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider userData={userData}>
          {/* This pb-20 is so that the user can scroll to the bottom of the page and still see the bottom navbar */}
          {/* <MobileOnly> */}
            <div className='min-h-screen flex flex-col pb-20'>
              <MemberWelcome />
              <main className='flex-1'>{children}</main>
            </div>
            <BottomNavbar />
          {/* </MobileOnly> */}
        </UserProvider>
      </body>
    </html>
  );
}
