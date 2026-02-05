import React from 'react';
import Image from 'next/image';
import Button from '../ui/Button';

const Hero = () => {
    return (
        <section className="relative h-[90vh] min-h-[600px] w-full flex items-center overflow-hidden">
            {/* Background Image with Cinematic Treatment */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero_pregnancy_dignity.png"
                    alt="Dignified pregnant woman"
                    fill
                    className="object-cover object-center cinematic-image"
                    priority
                />
                {/* Cinematic Gradient Overlay */}
                <div className="cinematic-overlay absolute inset-0" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <div className="max-w-3xl">
                    {/* Tagline */}
                    <p className="text-sm font-medium tracking-[0.3em] uppercase text-on-dark-muted mb-6">
                        Every Mother Matters
                    </p>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-on-dark leading-[0.95] mb-8">
                        Supporting <br />
                        <span className="italic font-normal">Mothers.</span>
                        <br />
                        <span className="text-4xl md:text-5xl lg:text-6xl font-light opacity-80">Protecting Futures.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-on-dark-muted mb-12 max-w-lg leading-relaxed font-light">
                        Essential maternal care and resources for underprivileged women, ensuring every mother and child has a healthy start.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button variant="accent" size="lg">
                            Get Support
                        </Button>
                        <Button variant="outline-light" size="lg">
                            Donate Now
                        </Button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
                <span className="text-xs text-on-dark-muted uppercase tracking-widest">Scroll</span>
                <div className="w-px h-12 bg-on-dark/30 animate-pulse" />
            </div>
        </section>
    );
};

export default Hero;
