import Link from "next/link";
import { Facebook, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t bg-slate-50">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Kulaura Professional Technology Institute</h3>
                        <p className="text-sm text-muted-foreground">
                            BTEB Approved Computer & Spoken English Training Center.
                            Code: 62040
                        </p>
                        <div className="flex items-center space-x-4">
                            {/* Add actual social links if available */}
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <Facebook className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
                            <li><Link href="/admission" className="hover:text-foreground">Admission</Link></li>
                            <li><Link href="/notices" className="hover:text-foreground">Notices</Link></li>
                            <li><Link href="/gallery" className="hover:text-foreground">Gallery</Link></li>
                            <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-start">
                                <MapPin className="mr-2 h-4 w-4 mt-0.5 shrink-0" />
                                <span>Kulaura, Moulvibazar, Sylhet</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="mr-2 h-4 w-4 shrink-0" />
                                <span>01777-301073, 01797-755856</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="mr-2 h-4 w-4 shrink-0" />
                                <span>kptibd@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} KPTI. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
