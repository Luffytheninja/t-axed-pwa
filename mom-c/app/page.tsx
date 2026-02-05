import Hero from '@/components/home/Hero';
import ProgramsSummary from '@/components/home/ProgramsSummary';
import RealStory from '@/components/home/RealStory';
import ImpactSnapshot from '@/components/home/ImpactSnapshot';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <>
      <Hero />

      {/* Trust Signal Bar */}
      <section className="bg-background py-8 border-y border-foreground/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="text-xl font-bold font-serif italic">Global Health Partners</div>
          <div className="text-xl font-bold font-serif italic">Women's Alliance</div>
          <div className="text-xl font-bold font-serif italic">Community Trust</div>
          <div className="text-xl font-bold font-serif italic">Regulator Approved</div>
        </div>
      </section>

      <ProgramsSummary />
      <RealStory />
      <ImpactSnapshot />

      {/* CTA Section */}
      <section className="py-32 bg-primary/10 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif mb-8 max-w-2xl mx-auto leading-tight">
            Ready to make a difference in a mother's life?
          </h2>
          <p className="text-lg text-foreground/70 mb-12 max-w-xl mx-auto">
            Your support directly funds maternal care, health education, and emergency services for women who need it most.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button variant="primary" size="lg">
              Donate Now
            </Button>
            <Button variant="outline" size="lg">
              Partner With Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
