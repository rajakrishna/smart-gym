'use client';

import Link from 'next/link';
import LABELS from '@/constants/labels';

export function AuthNavbar() {
    return (
        <nav className="absolute top-8 left-0 w-full z-50 px-4  sm:px-6 lg:px-8 flex h-16 items-center justify-between bg-transparent text-white">

            {/* Logo */}
            <Link href="/" className="">
                <p className="font-bold text-[48px] uppercase pl-14">{LABELS.app.name}</p>
            </Link>

            {/* Right hand side of navbar */}
            {/* <Button asChild className='w-[100px] text-black' >

                <Link href="admin/dashboard">
                    {LABELS.nav.auth.login}
                </Link>
            </Button> */}

        </nav>
    );
}