import ICONS from '@/constants/icons';
import LABELS from '@/constants/labels';

export function AuthFooter() {
    return (
        <footer className="border-t bg-background py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">

                {/* Logo and Name */}
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <ICONS.dumbbell className="h-5 w-5" />
                    <span className="font-semibold">{LABELS.app.name}</span>
                </div>

                {/* Generic Copyright */}
                <div className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} {LABELS.app.name}. All rights reserved.
                </div>
            </div>
        </footer>
    );
}