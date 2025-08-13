import Link from 'next/link';
import ICONS from '@/constants/icons';
import LABELS from '@/constants/labels';

export function AuthFooter2() {
    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col items-center space-y-8">
                    {/* Logo and tagline */}
                    <div className="flex items-center space-x-2">
                        <ICONS.dumbbell className="h-5 w-5" />
                        <span className="font-semibold">{LABELS.app.name}</span>
                    </div>


                    {/* Links section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">


                        {/* Team Leads */}
                        <div>
                            <p className="text-sm font-medium text-foreground mb-3">{LABELS.footer.sections.teamLeads}</p>
                            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                                <Link
                                    href="https://www.linkedin.com/in/rajakrishna/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
                                >
                                    Raja Krishna
                                </Link>
                                <Link
                                    href="https://www.linkedin.com/in/belle-duran-127760204/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
                                >
                                    Belle Duran
                                </Link>
                            </div>
                        </div>

                        {/* Team members */}
                        <div>
                            <p className="text-sm font-medium text-foreground mb-3">{LABELS.footer.sections.teamMembers}</p>
                            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                                <Link
                                    href="https://www.linkedin.com/in/gojoego/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
                                >
                                    Joe Gallego
                                </Link>
                                <Link
                                    href="https://www.linkedin.com/in/joeaguado/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
                                >
                                    Joe Aguado
                                </Link>
                                <Link
                                    href="https://www.linkedin.com/in/dannyrivasdev/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
                                >
                                    Danny Rivas
                                </Link>
                                <Link
                                    href="https://www.linkedin.com/in/developerdiego/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
                                >
                                    Diego Espino
                                </Link>
                            </div>
                        </div>

                        {/* Repository link */}
                        <div>
                            <p className="text-sm font-medium text-foreground mb-3">{LABELS.footer.sections.projectRepository}</p>
                            <Link
                                href="https://github.com/rajakrishna/smart-gym"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                FitMax Repository
                            </Link>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-sm text-muted-foreground pt-4 border-t border-border w-full text-center">
                        © {new Date().getFullYear()} {LABELS.app.name}. {LABELS.footer.copyright}
                    </div>
                </div>
            </div>
        </footer>
    );
}