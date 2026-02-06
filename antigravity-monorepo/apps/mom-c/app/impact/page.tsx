import React from 'react';
import { Button } from '@antigravity/ui';

const ImpactPage = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-serif mb-16 text-center">
          Outcome & Transparency
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-foreground/5 text-center">
            <div className="text-4xl font-serif font-bold text-primary mb-2">1,200+</div>
            <div className="text-sm font-bold uppercase tracking-widest text-foreground/50">
              Women Supported
            </div>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-foreground/5 text-center">
            <div className="text-4xl font-serif font-bold text-primary mb-2">$450k+</div>
            <div className="text-sm font-bold uppercase tracking-widest text-foreground/50">
              Funds Deployed
            </div>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-foreground/5 text-center">
            <div className="text-4xl font-serif font-bold text-primary mb-2">150</div>
            <div className="text-sm font-bold uppercase tracking-widest text-foreground/50">
              Active Volunteers
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-serif mb-12 text-center">Where Your Money Goes</h2>
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold uppercase tracking-wider">
                <span>Direct Maternal Care</span>
                <span>60%</span>
              </div>
              <div className="h-4 bg-foreground/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[60%] rounded-full" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold uppercase tracking-wider">
                <span>Education & Advocacy</span>
                <span>25%</span>
              </div>
              <div className="h-4 bg-foreground/5 rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-[25%] rounded-full" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold uppercase tracking-wider">
                <span>Logistics & Operations</span>
                <span>15%</span>
              </div>
              <div className="h-4 bg-foreground/5 rounded-full overflow-hidden">
                <div className="h-full bg-accent w-[15%] rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-foreground text-background rounded-[3rem] p-12 md:p-24 text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-8 max-w-3xl mx-auto leading-tight">
            Our commitment to{' '}
            <span className="italic font-light opacity-80">total transparency.</span>
          </h2>
          <p className="text-lg md:text-xl text-background/60 mb-16 max-w-xl mx-auto italic font-light">
            "Transparency is not just a policy, it is our duty to the women we serve and the donors
            who trust us with their support."
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 w-full max-w-2xl mx-auto">
            <Button intent="hope" size="lg" className="w-full sm:w-auto">
              Download Audit Report
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-background/20 text-background hover:bg-background hover:text-foreground"
            >
              View Financials
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactPage;
