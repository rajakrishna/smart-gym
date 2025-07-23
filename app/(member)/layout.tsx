import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './../globals.css';

import { BottomNavbar } from '@/components/layouts/member/bottom-navbar';
import LABELS from '@/constants/labels';

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {/* This pb-20 is so that the user can scroll to the bottom of the page and still see the bottom navbar */}
                <div className="min-h-screen flex flex-col pb-20">
                    <main className="flex-1">
                        {children}
                    </main>
                </div>
                <BottomNavbar />
            </body>
        </html>
    );
}
