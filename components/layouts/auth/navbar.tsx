'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ICONS from '@/constants/icons';
import LABELS from '@/constants/labels';

export function AuthNavbar() {
    return (
        <nav className="border-b bg-background/95 backdrop-blur container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
                <ICONS.dumbbell className="h-6 w-6" />
                <span className="font-bold text-xl">{LABELS.app.name}</span>
            </Link>

            {/* Right hand side of navbar */}
            <Button variant="ghost" asChild>
                {/* TODO: Change this to scroll to the login section on the landing page */}
                <Link href="/login">
                    <ICONS.login className="mr-2 h-4 w-4" />
                    {LABELS.nav.auth.login}
                </Link>
            </Button>

        </nav>
    );
}