import React from 'react';
import Button from '@/components/ui/Button';

const GetSupportPage = () => {
    return (
        <div className="pt-32 pb-24 bg-background">
            <div className="max-w-2xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif mb-6">Request Support</h1>
                    <p className="text-lg text-foreground/60">
                        We are here to help. Please fill out this simple form, and our team will reach out to you within 24 hours.
                    </p>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-foreground/5">
                    <form className="space-y-8">
                        <div className="space-y-4">
                            <label className="text-sm font-bold uppercase tracking-wider text-foreground/50">Your Name</label>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full p-4 bg-background rounded-xl border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-sm font-bold uppercase tracking-wider text-foreground/50">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="+234..."
                                    className="w-full p-4 bg-background rounded-xl border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm font-bold uppercase tracking-wider text-foreground/50">Location</label>
                                <input
                                    type="text"
                                    placeholder="City / Region"
                                    className="w-full p-4 bg-background rounded-xl border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-bold uppercase tracking-wider text-foreground/50">Type of Need</label>
                            <select className="w-full p-4 bg-background rounded-xl border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans appearance-none">
                                <option>Maternal Care (Prenatal/Postnatal)</option>
                                <option>Health Education Resource</option>
                                <option>Emergency Medical Support</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-bold uppercase tracking-wider text-foreground/50">How can we help you today?</label>
                            <textarea
                                rows={4}
                                placeholder="Briefly describe your situation..."
                                className="w-full p-4 bg-background rounded-xl border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans"
                            ></textarea>
                        </div>

                        <div className="pt-6">
                            <Button variant="primary" className="w-full" size="lg">
                                Submit Request
                            </Button>
                        </div>

                        <div className="flex items-center justify-center space-x-2 text-primary">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <p className="text-sm font-bold">Fast assistance: WhatsApp Fallback Button below</p>
                        </div>

                        <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white" size="lg">
                            Contact via WhatsApp
                        </Button>
                    </form>
                </div>

                <div className="mt-16 text-center text-sm text-foreground/40">
                    <p>Your data is protected and used only for providing support. <a href="/privacy" className="underline">View our Privacy Policy</a>.</p>
                </div>
            </div>
        </div>
    );
};

export default GetSupportPage;
