import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal | Privacy & Terms',
  description: 'Privacy Policy, Terms and Conditions, and Acquisition Protocols for EOE Acquisition & Curation.',
};

export default function LegalPage() {
  return (
    <div className="pt-48 pb-32 px-6 max-w-[1400px] mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-24">
        {/* Header */}
        <div className="md:col-span-12 mb-32">
          <span className="text-micro opacity-40 uppercase tracking-[0.3em] mb-4 block">Standards</span>
          <h1 className="text-hero leading-[0.85] tracking-tighter text-black">
            Privacy & <br /> Terms.
          </h1>
        </div>

        {/* Content Navigation - Desktop Only */}
        <div className="hidden md:block md:col-span-3 sticky top-48 h-fit">
          <nav className="flex flex-col gap-4 border-l border-black/10 pl-6">
            <a href="#privacy" className="text-micro uppercase hover:text-black transition-colors">Privacy Policy</a>
            <a href="#terms" className="text-micro uppercase hover:text-black transition-colors">Terms of Service</a>
            <a href="#shipping" className="text-micro uppercase hover:text-black transition-colors">Shipping & Returns</a>
            <a href="#copyright" className="text-micro uppercase hover:text-black transition-colors">Copyright</a>
          </nav>
        </div>

        {/* Content Area */}
        <div className="md:col-span-8 flex flex-col gap-32">
          
          {/* Privacy Policy */}
          <section id="privacy">
            <h2 className="text-micro font-bold uppercase mb-12 tracking-widest text-black">01 — Privacy Policy</h2>
            <div className="flex flex-col gap-8 text-black/70 leading-relaxed font-medium">
              <p>
                Your privacy is paramount. This policy outlines how EOE ("we", "our", or "us") manages 
                personal data collected through our digital gallery and acquisition process.
              </p>
              <div>
                <h3 className="text-black mb-4">Data Collection</h3>
                <p>
                  We collect information necessary for inquiries and acquisitions, including name, 
                  contact details, and delivery address. This data is used exclusively for facilitating 
                  white-glove logistics and artist-collector communication.
                </p>
              </div>
              <div>
                <h3 className="text-black mb-4">Security</h3>
                <p>
                  All personal records are stored securely. We do not sell or trade collector data. 
                  Contact us at fomeozuwo@gmail.com to request data removal or copies of your information.
                </p>
              </div>
            </div>
          </section>

          {/* Terms & Conditions */}
          <section id="terms">
            <h2 className="text-micro font-bold uppercase mb-12 tracking-widest text-black">02 — Terms and Conditions</h2>
            <div className="flex flex-col gap-8 text-black/70 leading-relaxed">
              <p>
                By accessing this website, you agree to abide by these terms. All content displayed 
                is the property of EOE and the artist.
              </p>
              <div>
                <h3 className="text-black mb-4">Acquisition Contracts</h3>
                <p>
                  Sales are governed by individual contracts of provenance. Full payment is required 
                  before the release of physical assets and certificates of authenticity.
                </p>
              </div>
              <div>
                <h3 className="text-black mb-4">Website Use</h3>
                <p>
                  Unauthorized use of visual or technical assets from this site is strictly prohibited. 
                  Any commercial reproduction of works featured requires explicit written consent.
                </p>
              </div>
            </div>
          </section>

          {/* Shipping Protocol */}
          <section id="shipping">
            <h2 className="text-micro font-bold uppercase mb-12 tracking-widest text-black">03 — Shipping & Returns</h2>
            <div className="flex flex-col gap-8 text-black/70 leading-relaxed">
              <p>
                Our "White-Glove" delivery service ensures museum-quality transport across the globe.
              </p>
              <div>
                <h3 className="text-black mb-4">Returns</h3>
                <p>
                  Due to the unique, one-of-one nature of original paintings and limited-edition prints, 
                  returns are generally not accepted once the work has been dispatched. Damage during 
                  transit is covered by specialized insurance protocols.
                </p>
              </div>
            </div>
          </section>

          {/* Copyright */}
          <section id="copyright" className="pb-32">
            <h2 className="text-micro font-bold uppercase mb-12 tracking-widest text-black">04 — Copyright</h2>
            <p className="text-black/70 leading-relaxed">
              © 2024 EOE. All rights reserved. The moral rights of the artist have been asserted.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
