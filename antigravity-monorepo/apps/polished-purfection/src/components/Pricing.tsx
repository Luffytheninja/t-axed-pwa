"use client";

import { motion } from "framer-motion";

export default function Pricing() {
    return (
        <section id="pricing" className="py-32 px-6 bg-background relative overflow-hidden flex flex-col items-center border-t border-white/5">
            {/* Background Ambience */}
            <div className="absolute left-[-10%] top-[20%] w-[30%] h-[30%] bg-white/5 rounded-full blur-[100px] pointer-events-none opacity-20" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-24 max-w-2xl mx-auto"
            >
                <span className="text-gold tracking-[0.3em] font-sans font-medium uppercase text-xs mb-4 block opacity-70">
                    The Investment
                </span>
                <h2 className="text-5xl md:text-6xl font-serif text-white mb-6">Service Menu</h2>
                <p className="text-muted font-serif italic text-lg leading-relaxed">
                    Pricing reflects the time, precision, and high-quality materials required to ensure your set lasts and maintains its health.
                </p>
            </motion.div>

            <div className="w-full max-w-4xl mx-auto space-y-16">
                <PricingItem
                    title="Classic Gel-X"
                    price="₦7,000"
                    description="Flawless structure. Single color finish. Subtle elegance."
                />
                <PricingItem
                    title="Signature Set"
                    price="₦10,000"
                    description="Custom length with basic art (2-4 accent nails) or specialty polish."
                />
                <PricingItem
                    title="Luxury Custom"
                    price="₦15,000"
                    description="Full design (10 nails), 3D textures, hand-painted art, or charms."
                />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl border-t border-white/10 pt-16"
            >
                <div>
                    <h4 className="text-white font-serif text-xl mb-4">Add-ons</h4>
                    <ul className="space-y-3 text-sm text-muted font-sans font-light">
                        <li className="flex justify-between"><span>Soak Off (External)</span> <span className="text-gold">₦3,000</span></li>
                        <li className="flex justify-between"><span>Soak Off (My Work)</span> <span className="text-gold">₦1,500</span></li>
                        <li className="flex justify-between"><span>Nail Repair (Per Finger)</span> <span className="text-gold">₦2,500</span></li>
                        <li className="flex justify-between"><span>Charms (Per Finger)</span> <span className="text-gold">₦700</span></li>
                    </ul>
                </div>
            </motion.div>
        </section>
    );
}

function PricingItem({ title, price, description }: { title: string, price: string, description: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-baseline border-b border-white/5 pb-12 hover:border-gold/30 transition-all duration-500 group"
        >
            <div className="mb-4 md:mb-0 max-w-md">
                <h3 className="text-3xl font-serif text-white group-hover:text-gold transition-colors duration-500 mb-2">{title}</h3>
                <p className="text-muted font-sans text-sm tracking-wide leading-relaxed">{description}</p>
            </div>
            <div className="text-2xl font-serif text-gold/80 group-hover:text-gold group-hover:scale-110 transition-all duration-500">
                From {price}
            </div>
        </motion.div>
    )
}

