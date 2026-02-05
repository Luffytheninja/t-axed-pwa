import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import CaseStudyDetail from './pages/CaseStudyDetail'
import Navigation from './components/Navigation'

// Component to scroll to top on route change
function ScrollToTop() {
    const { pathname, hash } = useLocation()

    useEffect(() => {
        if (hash) {
            // If there's a hash, scroll to that element
            setTimeout(() => {
                const element = document.getElementById(hash.replace('#', ''))
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                }
            }, 100)
        } else {
            // Otherwise scroll to top
            window.scrollTo(0, 0)
        }
    }, [pathname, hash])

    return null
}

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Navigation />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/work" element={<CaseStudiesPage />} />
                <Route path="/work/:id" element={<CaseStudyDetail />} />
            </Routes>
        </Router>
    )
}

export default App
