"use client";

import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight, ShieldAlert, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const products = [
    { id: "1", name: "3NITY ARCHITECT HOODIE", price: "₦45,000", status: "AVAILABLE", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop" },
    { id: "2", name: "SONS OF GOD OVERSIZED TEE", price: "₦25,000", status: "SOLD OUT", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop" },
    { id: "3", name: "AGBADA EXPERIMENTAL CAP", price: "₦15,500", status: "LAST 5", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop" },
    { id: "4", name: "3NITY CHAIN (LIMITED)", price: "₦120,000", status: "COMING SOON", image: "https://images.unsplash.com/photo-1611085583191-a3b1a30a8a0a?q=80&w=1000&auto=format&fit=crop" },
];

export default function Supply() {
    const [timeLeft, setTimeLeft] = useState("48:22:11");

    return (
        <div className="min-h-screen bg-background pt-32 pb-48 px-6 md:px-24">
            <header className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-accent text-[10px] font-bold tracking-[0.4em] uppercase">
                        <ShieldAlert size={14} />
                        <span>Limited Release Drops</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl kinetic-text">3NITY SUPPLY</h1>
                    <p className="text-cloudDancer/50 text-sm leading-relaxed max-w-md font-light">
                        Wear the movement. Each piece is an extension of the 3NITY philosophy—structured, experimental, and unapologetically alternative.
                    </p>
                </div>

                <div className="flex flex-col md:items-end gap-4">
                    <div className="bg-accent/10 border border-accent/20 px-8 py-4 flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-accent font-bold uppercase tracking-widest">Next Drop In</span>
                            <span className="text-3xl font-black tabular-nums kinetic-text">{timeLeft}</span>
                        </div>
                        <Clock className="text-accent animate-pulse" size={24} />
                    </div>
                    <p className="text-[9px] text-cloudDancer/30 font-bold uppercase tracking-[0.2em]">Next Drop: &lsquo;THE VOID COLLECTION&rsquo; 2026</p>
                </div>
            </header>

            {/* Product Grid - Custom Triangular Layout */}
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-accent/10 border border-accent/10">
                {products.map((product, idx) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group relative bg-background p-8 aspect-square flex flex-col justify-between overflow-hidden"
                    >
                        {/* Product Image Overlay */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale scale-110 group-hover:scale-100 transition-transform duration-1000" />
                        </div>

                        <div className="relative z-10 flex justify-between items-start">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-cloudDancer/30 font-bold tracking-widest uppercase">ID: 00{product.id}</span>
                                <span className={`text-[9px] font-black px-2 py-0.5 mt-2 inline-block border ${product.status === "SOLD OUT" ? "border-red-500 text-red-500" : "border-accent text-accent"
                                    }`}>
                                    {product.status}
                                </span>
                            </div>
                            <ShoppingBag className="text-accent/20 group-hover:text-accent transition-colors" size={20} />
                        </div>

                        <div className="relative z-10 space-y-4">
                            <h3 className="text-2xl font-bold italic uppercase tracking-tighter leading-none max-w-[80%]">
                                {product.name}
                            </h3>
                            <div className="flex items-center justify-between border-t border-accent/10 pt-4">
                                <span className="text-lg font-bold text-accent">{product.price}</span>
                                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-accent transition-colors">
                                    Details <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Triangular Hover Accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-0 group-hover:opacity-5 transition-opacity translate-x-16 -translate-y-16 rotate-45" />
                    </motion.div>
                ))}
            </main>

            {/* JOIN THE VAULT */}
            <section className="mt-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-accent/5 -skew-y-3 origin-right" />
                <div className="relative z-10 py-32 flex flex-col items-center text-center gap-8">
                    <h2 className="text-4xl md:text-6xl kinetic-text">JOIN THE VAULT</h2>
                    <p className="max-w-xl text-cloudDancer/60 text-sm font-light">
                        Exclusive access to archival pieces, early unreleased demos, and the inner circle of The 3NITY. We don&rsquo;t send spam; we send access.
                    </p>
                    <div className="flex w-full max-w-md gap-2 px-4">
                        <input
                            type="email"
                            placeholder="CITIZEN@3NITY.ARCHIVE"
                            className="flex-grow bg-charcoal border border-accent/20 px-6 py-4 text-xs font-bold font-mono focus:outline-none focus:border-accent transition-colors"
                        />
                        <button className="bg-accent text-charcoal px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-cloudDancer transition-colors">
                            SECURE
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
