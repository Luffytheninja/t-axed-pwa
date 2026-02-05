import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">Lungu Trade</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/sell" className="btn-primary">
                Sell
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              Commerce, Elevated.
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 mb-10 max-w-2xl mx-auto font-light">
              The premier marketplace by Studio Ayo. Curated, seamless, and designed for you.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex bg-white rounded-xl shadow-medium overflow-hidden">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="w-full px-6 py-4 text-lg focus:outline-none"
                  />
                </div>
                <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 flex items-center space-x-2 transition-colors">
                  <span>🔍</span>
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Browse Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: 'Vehicles', icon: '🚗', count: '311K ads', slug: 'vehicles' },
              { name: 'Property', icon: '🏠', count: '103K ads', slug: 'real-estate' },
              { name: 'Phones', icon: '📱', count: '86K ads', slug: 'mobile-phones-tablets' },
              { name: 'Electronics', icon: '💻', count: '250K ads', slug: 'electronics' },
              { name: 'Home', icon: '🏡', count: '505K ads', slug: 'home-garden' },
              { name: 'Fashion', icon: '👕', count: '142K ads', slug: 'fashion-and-beauty' },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/category/${category.slug}`}
                className="card p-6 text-center hover:shadow-medium transition-shadow group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
            <Link href="/listings" className="text-primary-600 hover:text-primary-700 font-medium">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="card overflow-hidden group cursor-pointer hover:shadow-medium transition-shadow">
                <div className="aspect-square bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <span className="text-red-500">❤️</span>
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    Sample Product Title {item}
                  </h3>
                  <p className="text-2xl font-bold text-primary-600 mb-2">
                    ₦{(Math.random() * 500000 + 50000).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">Lagos, Nigeria</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powered by AI 🤖
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our intelligent system learns your preferences to show you exactly what you're looking for.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-soft">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Recommendations</h3>
              <p className="text-gray-600">
                Get personalized suggestions based on your browsing history and preferences.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-soft">
                <span className="text-white text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Price Intelligence</h3>
              <p className="text-gray-600">
                AI-powered pricing suggestions to help you sell faster and buy smarter.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-soft">
                <span className="text-white text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trust & Safety</h3>
              <p className="text-gray-600">
                Advanced verification and fraud detection to ensure safe transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Buy or Sell?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of users discovering amazing deals every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Get Started Free
            </Link>
            <Link href="/login" className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-lg">L</span>
                </div>
                <span className="text-xl font-bold">Lungu Trade</span>
              </div>
              <p className="text-gray-400">
                Connecting buyers and sellers with trust and innovation.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white">📘 Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">🐦 Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white">📷 Instagram</a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/how-it-works" className="hover:text-white">How it works</Link></li>
                <li><Link href="/safety" className="hover:text-white">Safety center</Link></li>
                <li><Link href="/ai" className="hover:text-white">AI Features</Link></li>
                <li><Link href="/api" className="hover:text-white">API</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact us</Link></li>
                <li><Link href="/feedback" className="hover:text-white">Feedback</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/press" className="hover:text-white">Press</Link></li>
                <li><Link href="/investors" className="hover:text-white">Investors</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Studio Ayo. All rights reserved.</p>
            <div className="flex justify-center space-x-6 mt-4">
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms of Service</Link>
              <Link href="/cookies" className="hover:text-white">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}