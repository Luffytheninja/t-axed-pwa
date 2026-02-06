import React from 'react';
import { Button } from '@antigravity/ui';
import Image from 'next/image';

const programs = [
  {
    id: 'maternal-care',
    title: 'Maternal Care',
    description:
      'Comprehensive support for expectant and new mothers from underprivileged backgrounds.',
    details: [
      'Monthly prenatal checkups by qualified professionals',
      'Nutritional supplements and dietary guidance',
      'Postnatal recovery support and mental health checks',
      'Neonatal care and vaccination scheduling',
    ],
    impact: 'Over 800 healthy births supported in 2024.',
    image: '/hero_pregnancy_dignity.png', // Placeholder
  },
  {
    id: 'health-education',
    title: 'Health Education',
    description:
      'Empowering women with knowledge to make informed decisions for themselves and their families.',
    details: [
      'Weekly community health workshops',
      'Digital literacy for healthcare app navigation',
      'Hygiene and sanitation training',
      'Family planning and reproductive health guidance',
    ],
    impact: '150+ women trained as community health advocates.',
    image: '/mother_child_bond.png', // Placeholder
  },
  {
    id: 'emergency-support',
    title: 'Emergency Support',
    description: 'A financial and medical safety net for mothers in critical situations.',
    details: [
      '24/7 emergency medical transportation fund',
      'Crisis grants for essential supplies (food, water, medicine)',
      'Immediate shelter referral system',
      'Legal advocacy for maternal rights',
    ],
    impact: 'Average response time of under 4 hours for critical needs.',
    image: '/hero_pregnancy_dignity.png', // Placeholder
  },
];

const ProgramsPage = () => {
  return (
    <div className="pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-24">
          <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-6">
            Our Initiatives
          </h2>
          <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
            We provide <span className="italic font-light opacity-80">comprehensive</span> support
            structures.
          </h1>
          <p className="text-xl text-foreground/60 leading-relaxed font-light italic">
            "Maternal health is the foundation of community health. When we support a mother, we
            protect a generation."
          </p>
        </div>

        <div className="space-y-32">
          {programs.map((program, index) => (
            <div
              key={program.id}
              id={program.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden shadow-sm border border-foreground/5">
                  <Image src={program.image} alt={program.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
                </div>
              </div>

              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <h3 className="text-3xl md:text-4xl font-serif mb-6">{program.title}</h3>
                <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                  {program.description}
                </p>

                <ul className="space-y-4 mb-10">
                  {program.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-primary mr-3 mt-1.5">•</span>
                      <span className="text-foreground/80">{detail}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-6 bg-white rounded-2xl border border-foreground/5 mb-10 inline-block shadow-sm">
                  <p className="text-sm font-bold uppercase tracking-wider text-primary mb-1">
                    Impact Highlight
                  </p>
                  <p className="text-lg font-serif italic text-foreground/80">{program.impact}</p>
                </div>

                <div>
                  <Button variant="primary" size="md" className="px-10">
                    Support This Program
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-40 bg-foreground text-background rounded-[3rem] p-12 md:p-24 text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-8 max-w-2xl mx-auto">
            Have a specific need or <span className="italic font-light">proposal?</span>
          </h2>
          <p className="text-lg text-background/60 mb-12 max-w-xl mx-auto italic font-light">
            We are always looking for new ways to expand our reach and improve our service delivery.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button intent="hope" size="lg" className="px-10">
              Get Assistance
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-10 border-background/20 text-background"
            >
              Partner With Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsPage;
