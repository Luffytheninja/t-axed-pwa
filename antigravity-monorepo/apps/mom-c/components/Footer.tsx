import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-foreground text-background py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-4xl font-serif mb-8 italic">Mom-C</h2>
                        <p className="max-w-sm text-background/60 mb-10 leading-relaxed font-light">
                            Empowering underprivileged women with accessible maternal support, education, and resources. Dedicated to protecting futures through transparency and care.
                        </p>
                        <div className="text-[10px] font-bold tracking-widest uppercase text-background/30 space-y-2">
                            <p>Registered NGO No: [REG-NUM-HERE]</p>
                            <p>© {new Date().getFullYear()} Mom-C. All rights reserved.</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[12px] font-bold tracking-[0.2em] uppercase mb-8">Navigation</h3>
                        <ul className="space-y-5 text-[13px] text-background/50 font-light">
                            <li><Link href="/about" className="hover:text-background transition-colors">About Us</Link></li>
                            <li><Link href="/impact" className="hover:text-background transition-colors">Impact & Transparency</Link></li>
                            <li><Link href="/donate" className="hover:text-background transition-colors">Support Our Cause</Link></li>
                            <li><Link href="/get-support" className="hover:text-background transition-colors">Get Assistance</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[12px] font-bold tracking-[0.2em] uppercase mb-8">Governance</h3>
                        <ul className="space-y-5 text-[13px] text-background/50 font-light">
                            <li><Link href="/financials" className="hover:text-background transition-colors">Financial Reports</Link></li>
                            <li><Link href="/policies" className="hover:text-background transition-colors">Privacy & Data</Link></li>
                            <li><Link href="/safeguarding" className="hover:text-background transition-colors">Safeguarding</Link></li>
                            <li><Link href="/contact" className="hover:text-background transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-background/5 pt-12 flex flex-col sm:flex-row justify-between items-center text-[11px] font-bold tracking-widest uppercase text-background/20">
                    <div className="flex space-x-8 mb-6 sm:mb-0">
                        <Link href="/privacy" className="hover:text-background transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-background transition-colors">Terms</Link>
                    </div>
                    <div className="italic opacity-50 font-medium">
                        Designed for Impact.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
