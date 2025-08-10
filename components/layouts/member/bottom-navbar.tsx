'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ICONS from '@/constants/icons';
import LABELS from '@/constants/labels';
import FloatingAIChat from '@/components/layouts/member/FloatingAIChat';

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
            icon: ICONS.messageSquare,
            label: LABELS.navigation.aiCoach,
            href: '/member/messages',
        },
        {
            icon: ICONS.coffee,
            label: LABELS.navigation.cafe,
            href: '/member/cafe',
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

                        // AI Chat button
                        if (item.href === '/member/messages') {
                            return (
                                <FloatingAIChat key={item.label}>
                                    <button
                                        className={`relative flex flex-col items-center justify-center w-16 h-16 -mt-6 bg-red-600 rounded-t-full shadow-lg transition-all duration-200 hover:bg-red-700 hover:scale-105 ${isActive
                                            ? 'bg-red-700 scale-105'
                                            : ''
                                            }`}
                                    >
                                        <Icon className={`h-6 w-6 text-white`} />
                                        <span className={`text-xs font-medium text-white mt-1`}>
                                            {item.label}
                                        </span>
                                    </button>
                                </FloatingAIChat>
                            );
                        }

                        // Regular navigation items
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