"use client";

import React from 'react';
import { Card } from '@antigravity/ui';

const stats = [
    { label: "Women Supported", value: "1,200+" },
    { label: "Healthy Births", value: "95%" },
    { label: "Communities Reached", value: "24" },
    { label: "Advocates Trained", value: "150" }
];

const ImpactSnapshot = () => {
    return (
        <section className="py-24 px-6 bg-primary text-on-dark">
            <div className="max-w-7xl mx-auto text-center">
                <p className="text-sm font-semibold tracking-[0.3em] uppercase text-on-dark-muted mb-4">
                    Transparency & Impact
                </p>
                <h2 className="text-4xl md:text-5xl font-serif mb-16 max-w-2xl mx-auto">
                    Our Impact <span className="italic font-normal">in Numbers</span>
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <Card
                            key={index}
                            variant="glass"
                            padding="sm"
                            className="text-center"
                        >
                            <div className="text-5xl md:text-6xl font-serif font-bold text-on-dark leading-none mb-3">
                                {stat.value}
                            </div>
                            <div className="text-xs md:text-sm font-medium uppercase tracking-wider text-on-dark-muted">
                                {stat.label}
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="mt-20 max-w-2xl mx-auto">
                    <blockquote className="text-lg text-on-dark-muted leading-relaxed italic">
                        "We believe that transparency is the foundation of trust. Every dollar donated is tracked and reported to ensure maximum impact."
                    </blockquote>
                    <div className="mt-8 flex justify-center">
                        <a
                            href="/impact"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-light hover:text-on-dark transition-colors group uppercase tracking-widest"
                        >
                            View Impact Report 2024
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ImpactSnapshot;
