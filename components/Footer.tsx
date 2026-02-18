import Link from "next/link";
import { Facebook, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-gradient-subtle transition-colors duration-300">
            <div className="container-base py-12 md:py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="space-y-4 lg:col-span-1">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-lg flex-center text-primary-foreground font-bold">K</div>
                            <h3 className="text-lg font-bold text-gradient">KPTI</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            BTEB Approved Computer & Spoken English Training Center.
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="badge-primary">Code: 62040</span>
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                            <Link 
                                href="#" 
                                className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-foreground">Explore</h3>
                        <ul className="space-y-2.5">
                            <li>
                                <Link 
                                    href="/" 
                                    className="link-muted flex items-center gap-2 group text-sm"
                                >
                                    Home <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/about" 
                                    className="link-muted flex items-center gap-2 group text-sm"
                                >
                                    About <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/admission" 
                                    className="link-muted flex items-center gap-2 group text-sm"
                                >
                                    Admission <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/notices" 
                                    className="link-muted flex items-center gap-2 group text-sm"
                                >
                                    Notices <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* More Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-foreground">More</h3>
                        <ul className="space-y-2.5">
                            <li>
                                <Link 
                                    href="/gallery" 
                                    className="link-muted flex items-center gap-2 group text-sm"
                                >
                                    Gallery <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/contact" 
                                    className="link-muted flex items-center gap-2 group text-sm"
                                >
                                    Contact <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-foreground">Get in Touch</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 group cursor-pointer">
                                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all mt-0.5">
                                    <MapPin className="h-4 w-4 text-primary group-hover:text-primary-foreground transition-colors" />
                                </div>
                                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                    Kulaura, Moulvibazar, Sylhet
                                </span>
                            </li>
                            <li className="flex items-start gap-3 group cursor-pointer">
                                <div className="p-2 rounded-lg bg-secondary/10 group-hover:bg-secondary group-hover:text-secondary-foreground transition-all mt-0.5">
                                    <Phone className="h-4 w-4 text-secondary group-hover:text-secondary-foreground transition-colors" />
                                </div>
                                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                                    <div>01777-301073</div>
                                    <div>01797-755856</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 group cursor-pointer">
                                <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent group-hover:text-accent-foreground transition-all mt-0.5">
                                    <Mail className="h-4 w-4 text-accent group-hover:text-accent-foreground transition-colors" />
                                </div>
                                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                    kptibd@gmail.com
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="divider my-8" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-muted-foreground">
                    <p>
                        &copy; {new Date().getFullYear()} <span className="text-foreground font-semibold">KPTI</span>. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-primary transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="hover:text-primary transition-colors">
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
