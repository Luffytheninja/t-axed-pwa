"use client";

import React from 'react';
import Image from 'next/image';
import Button from '../ui/Button';

const RealStory = () => {
    return (
        <section className="py-24 px-6 bg-muted">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Cinematic Image */}
                    <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl group">
                        <Image
                            src="/mother_child_bond.png"
                            alt="Mother and child bond"
                            fill
                            className="object-cover cinematic-image transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Subtle vignette for cinematic feel */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                    </div>

                    <div className="max-w-xl">
                        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-4">
                            A Mother's Journey
                        </p>
                        <h3 className="text-4xl md:text-5xl font-serif text-foreground leading-tight mb-8">
                            "They gave me <span className="italic text-accent">hope.</span>"
                        </h3>
                        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed border-l-2 border-accent/30 pl-8 mb-10">
                            <p>
                                When Sarah found out she was pregnant, she was alone and without resources. She feared for her future and the health of her child.
                            </p>
                            <p>
                                Through Mom-C's Maternal Care program, she received consistent prenatal checkups and a community of women who stood by her. Today, her son is thriving.
                            </p>
                        </div>
                        <div className="flex items-center space-x-4 mb-12">
                            <div className="w-12 h-px bg-foreground/20" />
                            <span className="font-medium text-muted-foreground text-sm uppercase tracking-widest">Sarah, 2024</span>
                        </div>
                        <Button variant="primary" size="md">
                            Read More Stories
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RealStory;
