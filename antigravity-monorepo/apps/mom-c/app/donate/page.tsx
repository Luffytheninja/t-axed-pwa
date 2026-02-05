import React from 'react';
import { Button } from '@antigravity/ui';

const DonatePage = () => {
    return (
        <div className="pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h1 className="text-5xl md:text-6xl font-serif mb-8">Your Impact Starts Here</h1>
                <p className="text-xl text-foreground/60 mb-16 leading-relaxed max-w-2xl mx-auto">
                    Every contribution directly supports our mission to provide maternal care and education to women who need it most.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="p-8 bg-white rounded-3xl border border-foreground/5 shadow-sm hover:border-primary/20 transition-all cursor-pointer group">
                        <div className="text-sm font-bold uppercase tracking-widest text-foreground/40 mb-4">Support a Mother</div>
                        <div className="text-4xl font-serif font-bold text-primary mb-4 group-hover:scale-110 transition-transform">$50</div>
                        <p className="text-sm text-foreground/60 mb-6">Covers 2 prenatal checkups and essential vitamins.</p>
                        <Button variant="outline" size="sm" className="w-full">Select</Button>
                    </div>
                    <div className="p-8 bg-primary/5 rounded-3xl border-2 border-primary shadow-md cursor-pointer group">
                        <div className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Community Impact</div>
                        <div className="text-4xl font-serif font-bold text-primary mb-4 group-hover:scale-110 transition-transform">$150</div>
                        <p className="text-sm text-foreground/60 mb-6">Funds a workshop for 10 expectant mothers.</p>
                        <Button variant="primary" size="sm" className="w-full">Select</Button>
                    </div>
                    <div className="p-8 bg-white rounded-3xl border border-foreground/5 shadow-sm hover:border-primary/20 transition-all cursor-pointer group">
                        <div className="text-sm font-bold uppercase tracking-widest text-foreground/40 mb-4">Life Saving Care</div>
                        <div className="text-4xl font-serif font-bold text-primary mb-4 group-hover:scale-110 transition-transform">$500+</div>
                        <p className="text-sm text-foreground/60 mb-6">Enables emergency medical interventions.</p>
                        <Button variant="outline" size="sm" className="w-full">Select</Button>
                    </div>
                </div>

                <div className="bg-foreground text-background p-12 rounded-3xl mb-16">
                    <h2 className="text-2xl font-serif mb-6">Monthly Giving</h2>
                    <p className="text-background/60 mb-8 max-w-lg mx-auto italic">
                        "Sustained support allows us to plan for long-term health outcomes in the communities we serve."
                    </p>
                    <Button variant="primary" size="lg">Become a Sustainer</Button>
                </div>

                <div className="text-xs text-foreground/30 uppercase tracking-widest font-bold">
                    Secure Payment Portal • Tax Deductible Receipt Provided • Cancel Anytime
                </div>
            </div>
        </div>
    );
};

export default DonatePage;
