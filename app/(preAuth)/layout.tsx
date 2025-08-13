import { AuthNavbar } from '@/components/layouts/auth/navbar';
// import { AuthFooter } from '@/components/layouts/auth/footer';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './../globals.css';
import { AuthFooter2 } from '@/components/layouts/auth/footer2';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Title',
    description: 'Description',
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <div className="min-h-screen flex flex-col">
                    <AuthNavbar />
                    <main className="flex-1">
                        {children}
                    </main>
                    <AuthFooter2 />
                </div>
            </body>
        </html>
    );
}
