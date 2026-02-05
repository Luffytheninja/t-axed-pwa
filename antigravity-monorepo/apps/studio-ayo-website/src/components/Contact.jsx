import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { supabase } from '../lib/supabase'

const Contact = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
    })

    const [focusedField, setFocusedField] = useState(null)
    const [status, setStatus] = useState('idle') // idle, loading, success, error

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')

        try {
            const { error } = await supabase
                .from('leads')
                .insert([formData])

            if (error) throw error

            setStatus('success')
            setFormData({ name: '', email: '', company: '', message: '' })
            setTimeout(() => setStatus('idle'), 5000)
        } catch (error) {
            console.error('Error submitting form:', error)
            setStatus('error')
            setTimeout(() => setStatus('idle'), 5000)
        }
    }

    return (
        <section id="contact" ref={ref} className="min-h-screen w-full flex items-center justify-center px-6 md:px-12 py-24">
            <div className="max-w-2xl mx-auto w-full">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl md:text-5xl font-light tracking-tight mb-4 text-center"
                >
                    Start Your Project
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-lg md:text-xl font-light text-near-black/60 mb-12 text-center"
                >
                    Tell us about your vision
                </motion.p>

                <motion.form
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            required
                            placeholder="Your Name"
                            className="w-full bg-transparent border-b border-near-black/20 py-4 text-lg font-light focus:outline-none focus:border-near-black transition-all duration-300"
                        />
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: focusedField === 'name' ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-near-black origin-left"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            required
                            placeholder="Email Address"
                            className="w-full bg-transparent border-b border-near-black/20 py-4 text-lg font-light focus:outline-none focus:border-near-black transition-all duration-300"
                        />
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: focusedField === 'email' ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-near-black origin-left"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('company')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="Company / Brand"
                            className="w-full bg-transparent border-b border-near-black/20 py-4 text-lg font-light focus:outline-none focus:border-near-black transition-all duration-300"
                        />
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: focusedField === 'company' ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-near-black origin-left"
                        />
                    </div>

                    <div className="relative">
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            required
                            placeholder="Tell us about your project"
                            rows="5"
                            className="w-full bg-transparent border-b border-near-black/20 py-4 text-lg font-light focus:outline-none focus:border-near-black transition-all duration-300 resize-none"
                        />
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: focusedField === 'message' ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-near-black origin-left"
                        />
                    </div>

                    <div className="pt-8 text-center">
                        <motion.button
                            type="submit"
                            disabled={status === 'loading'}
                            whileHover={{ scale: 1.02, opacity: 0.9 }}
                            whileTap={{ scale: 0.98 }}
                            className={`px-12 py-4 bg-near-black text-warm-white text-lg font-normal tracking-wide transition-all duration-300 ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {status === 'loading' ? 'Sending...' :
                                status === 'success' ? 'Sent' :
                                    status === 'error' ? 'Error' : 'Submit'}
                        </motion.button>
                    </div>
                </motion.form>
            </div>
        </section>
    )
}

export default Contact
