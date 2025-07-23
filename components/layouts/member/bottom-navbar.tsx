'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ICONS from '@/constants/icons';
import LABELS from '@/constants/labels';

export function BottomNavbar() {
    const pathname = usePathname();

    const navItems = [
        {
            icon: ICONS.home,
            label: LABELS.navigation.home,
            href: '/member/dashboard',
        },
        {
            icon: ICONS.calendar,
            label: LABELS.navigation.classes,
            href: '/member/classes',
        },
        {
            icon: ICONS.coffee,
            label: LABELS.navigation.cafe,
            href: '/member/cafe',
        },
        {
            icon: ICONS.messageSquare,
            label: LABELS.navigation.messages,
            href: '/member/messages',
        },
        {
            icon: ICONS.user,
            label: LABELS.navigation.profile,
            href: '/member/profile',
        },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white shadow-lg">
            <div className="mx-auto max-w-7xl">
                <div className="flex justify-around items-center py-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex flex-col items-center space-y-1 py-2 px-2 min-w-0 flex-1 rounded-md transition-colors hover:bg-gray-100 ${isActive
                                    ? 'text-red-600'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <Icon className={`h-5 w-5 ${isActive ? 'text-red-600' : ''}`} />
                                <span className={`text-xs font-medium ${isActive ? 'text-red-600' : ''
                                    }`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
} 