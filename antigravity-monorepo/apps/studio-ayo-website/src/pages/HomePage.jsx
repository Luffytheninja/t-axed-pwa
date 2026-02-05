import React from 'react'
import Hero from '../components/Hero'
import Philosophy from '../components/Philosophy'
import Portfolio from '../components/Portfolio'
import Services from '../components/Services'
import ClientFilter from '../components/ClientFilter'
import Process from '../components/Process'
import Trust from '../components/Trust'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

function HomePage() {
    return (
        <div className="w-full">
            <Hero />
            <Philosophy />
            <Portfolio />
            <Services />
            <ClientFilter />
            <Process />
            <Trust />
            <Contact />
            <Footer />
        </div>
    )
}

export default HomePage
