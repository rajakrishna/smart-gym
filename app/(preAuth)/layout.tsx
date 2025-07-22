import { AuthNavbar } from '@/components/layouts/auth/navbar';
import { AuthFooter } from '@/components/layouts/auth/footer';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <AuthNavbar />
            <main className="flex-1">
                {children}
            </main>
            <AuthFooter />
        </div>
    );
}