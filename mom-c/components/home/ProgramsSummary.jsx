"use client";

import React from 'react';

const programs = [
    {
        title: "Maternal Care",
        description: "Prenatal and postnatal medical support, nutrition, and professional care for underprivileged mothers.",
        number: "01"
    },
    {
        title: "Health Education",
        description: "Empowering women with knowledge to make informed decisions about their health and children's futures.",
        number: "02"
    },
    {
        title: "Emergency Support",
        description: "Rapid-response network for mothers in crisis, providing immediate financial and medical assistance.",
        number: "03"
    }
];

const ProgramsSummary = () => {
    return (
        <section className="py-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4 md:space-y-0 text-center md:text-left">
                    <div className="max-w-xl">
                        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-4">
                            Our Programs
                        </p>
                        <h2 className="text-4xl md:text-5xl font-serif leading-tight">
                            Tools to <span className="italic font-normal">thrive,</span> not just survive.
                        </h2>
                    </div>
                    <p className="text-muted-foreground max-w-xs text-center md:text-right">
                        Three core pillars of maternal wellbeing and community resilience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-primary/10">
                    {programs.map((program, index) => (
                        <a
                            key={index}
                            href={`/programs#${program.title.toLowerCase().replace(' ', '-')}`}
                            className="p-8 md:p-10 bg-background hover:bg-muted transition-all duration-300 group"
                        >
                            {/* Clean number indicator */}
                            <div className="text-6xl font-serif font-light text-primary/20 mb-6 group-hover:text-accent/40 transition-colors">
                                {program.number}
                            </div>
                            <h3 className="text-2xl font-serif mb-4 group-hover:text-accent transition-colors">
                                {program.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                {program.description}
                            </p>
                            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-accent transition-colors uppercase tracking-widest">
                                Learn more
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProgramsSummary;
