"use client";

import { motion } from "framer-motion";
import { Send, MapPin, Instagram, Youtube, Twitter, Music, Mail, Globe } from "lucide-react";

const socialLinks = [
    { name: "X (TWITTER)", handle: "@r3myjay", icon: Twitter, url: "https://x.com/r3myjay", color: "#00d9ff" },
    { name: "INSTAGRAM", handle: "@r3myjay", icon: Instagram, url: "https://instagram.com/r3myjay", color: "#f3f3ed" },
    { name: "YOUTUBE", handle: "r3my jay Official", icon: Youtube, url: "https://www.youtube.com/channel/UC3_aQA0Nne7FEo2SA30xRCQ", color: "#ff0000" },
    { name: "GENIUS", handle: "r3my jay", icon: Music, url: "https://genius.com/artists/R3my-jay", color: "#ffff00" },
];

const coordinates = [
    { id: "1", location: "Lagos, NG", event: "YUNNO THE DRILL POP-UP", time: "MAR 2026", active: true },
    { id: "2", location: "OAU, Ile-Ife", event: "SONS OF GOD LIVE", time: "NOV 2024", active: false },
    { id: "3", location: "Victoria Island", event: "THE 3NITY SHOWCASE", time: "DEC 2025", active: false },
];

export default function Archive() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-48 px-6 md:px-24">
            <header className="mb-20">
                <span className="text-accent text-[10px] font-bold tracking-[0.4em] uppercase block mb-4">Central Hub</span>
                <h1 className="text-6xl md:text-8xl kinetic-text">THE ARCHIVE</h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                {/* LEFT: Connect & Newsletter */}
                <div className="lg:col-span-6 space-y-24">
                    <section className="space-y-8">
                        <h2 className="text-2xl kinetic-text">JOIN THE ARCHIVE</h2>
                        <p className="text-cloudDancer/60 text-sm font-light leading-relaxed">
                            The primary communication channel for The 3NITY. Early unreleased demos, first-look merch, and secret show coordinates sent directly to your neural network.
                        </p>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="group border-b border-accent/20 focus-within:border-accent transition-colors">
                                <input
                                    type="email"
                                    placeholder="EMAIL@3NITY.CLOUD"
                                    className="w-full bg-transparent py-4 text-xs font-bold font-mono focus:outline-none placeholder:text-cloudDancer/20"
                                />
                            </div>
                            <button className="flex items-center gap-3 text-accent text-[10px] font-bold tracking-[0.3em] uppercase hover:text-cloudDancer transition-colors">
                                INITIALIZE CONNECTION <Send size={14} />
                            </button>
                        </form>
                    </section>

                    <section className="space-y-8">
                        <h2 className="text-2xl kinetic-text">COORDINATES</h2>
                        <div className="space-y-4 border-l border-accent/10 pl-6">
                            {coordinates.map((coord) => (
                                <div key={coord.id} className="relative group">
                                    <div className={`absolute -left-[27px] top-1 w-2 h-2 rotate-45 border ${coord.active ? "bg-accent border-accent" : "bg-background border-accent/30"}`} />
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className={`text-sm font-bold uppercase tracking-widest ${coord.active ? "text-accent" : "text-cloudDancer/40"}`}>
                                                {coord.location}
                                            </h3>
                                            <p className="text-[10px] text-cloudDancer/40 font-medium uppercase italic">{coord.event}</p>
                                        </div>
                                        <span className="text-[10px] font-mono text-cloudDancer/20">{coord.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Map Placeholder */}
                        <div className="aspect-[21/9] bg-charcoal border border-accent/10 relative overflow-hidden grayscale">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
                            <div className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 text-accent animate-pulse">
                                <MapPin size={32} />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[10px] font-bold tracking-[0.5em] text-accent/20 uppercase select-none">SCANNING LAGOS SEC...</span>
                            </div>
                        </div>
                    </section>
                </div>

                {/* RIGHT: Booking & Socials */}
                <div className="lg:col-span-6 space-y-24">
                    <section className="p-10 border border-accent/10 bg-accent/5">
                        <h2 className="text-2xl kinetic-text mb-8">BOOKING</h2>
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold tracking-widest text-accent uppercase">Requester</label>
                                    <input type="text" className="w-full bg-charcoal border border-accent/10 p-3 text-xs focus:outline-none focus:border-accent" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold tracking-widest text-accent uppercase">Type</label>
                                    <select className="w-full bg-charcoal border border-accent/10 p-3 text-xs focus:outline-none focus:border-accent appearance-none">
                                        <option>SHOW BOOKING</option>
                                        <option>COLLABORATION</option>
                                        <option>PRIVATE EVENT</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold tracking-widest text-accent uppercase">Manifesto / Inquiry</label>
                                <textarea rows={4} className="w-full bg-charcoal border border-accent/10 p-3 text-xs focus:outline-none focus:border-accent resize-none"></textarea>
                            </div>
                            <button className="w-full bg-accent text-charcoal py-4 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-cloudDancer transition-colors">
                                TRANSMIT REQUEST
                            </button>
                        </form>
                    </section>

                    <section className="space-y-12">
                        <h2 className="text-2xl kinetic-text">DIGITAL FOOTPRINT</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    className="flex flex-col gap-4 p-6 border border-accent/10 hover:border-accent transition-all group"
                                >
                                    <link.icon className="text-cloudDancer/20 group-hover:text-accent transition-colors" size={20} />
                                    <div>
                                        <h4 className="text-[10px] font-bold tracking-widest uppercase text-accent mb-1">{link.name}</h4>
                                        <p className="text-sm font-bold kinetic-text tracking-tight uppercase opacity-60 group-hover:opacity-100">{link.handle}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>

                    <footer className="pt-12 flex items-center justify-between">
                        <div className="text-[10px] font-bold text-cloudDancer/20 tracking-tighter uppercase">
                            &copy; 2026 r3my jay // the 3nity architect
                        </div>
                        <div className="flex gap-4">
                            <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                            <span className="text-[10px] font-bold text-accent uppercase tracking-widest leading-none">Status: Active</span>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
