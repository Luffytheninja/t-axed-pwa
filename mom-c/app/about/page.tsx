import React from 'react';
import Button from '@/components/ui/Button';

const AboutPage = () => {
    return (
        <div className="pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-5xl md:text-6xl font-serif mb-12">Our Mission</h1>
                <p className="text-2xl text-primary font-medium mb-16 leading-relaxed">
                    Mom-C is dedicated to providing accessible maternal support to underprivileged women, ensuring transparency and measurable impact in every community we serve.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                    <div>
                        <h2 className="text-2xl font-serif mb-6">Our Story</h2>
                        <p className="text-foreground/70 leading-loose">
                            Founded in response to the growing disparities in maternal healthcare, Mom-C began as a small community initiative. We recognized that underprivileged women faced significant barriers to accessing quality care, and we set out to bridge that gap through digital tools and local advocacy.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-serif mb-6">Our Vision</h2>
                        <p className="text-foreground/70 leading-loose">
                            We envision a world where no mother's future is determined by her economic status. A future where every woman has the support, education, and resources needed to bring her child into a safe and healthy environment.
                        </p>
                    </div>
                </div>

                <div className="bg-primary/5 rounded-3xl p-12 mb-24">
                    <h2 className="text-3xl font-serif mb-8">Governance & Accountability</h2>
                    <p className="text-foreground/70 mb-8 leading-loose">
                        At Mom-C, we believe that trust is earned through transparency. Our leadership team and advisory board are committed to the highest standards of NGO governance and compliance.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm font-bold">
                        <div className="p-4 bg-white rounded-xl">Registered NGO: [REG-NUM]</div>
                        <div className="p-4 bg-white rounded-xl">NDPA Compliant</div>
                        <div className="p-4 bg-white rounded-xl">Safeguarding Certified</div>
                        <div className="p-4 bg-white rounded-xl">Annual Financial Audits</div>
                    </div>
                </div>

                <div className="text-center">
                    <Button variant="primary" size="lg">
                        Download Annual Report 2024
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
