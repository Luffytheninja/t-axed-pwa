import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Fetch user profile and listings
    const fetchData = async () => {
      try {
        const [userResponse, listingsResponse] = await Promise.all([
          fetch('/api/auth/profile', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('/api/listings', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData.user);
        } else {
          setError('Failed to load user profile');
        }

        if (listingsResponse.ok) {
          const listingsData = await listingsResponse.json();
          setListings(listingsData.listings || []);
        } else {
          setError('Failed to load listings');
        }
      } catch (error) {
        setError('Network error. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Refined Jiji</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/sell" className="btn-primary">
                Sell
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your account today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Listings</span>
                  <span className="font-semibold text-gray-900">{listings.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Views</span>
                  <span className="font-semibold text-gray-900">
                    {listings.reduce((sum, listing) => sum + (listing.views || 0), 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Account Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user?.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user?.isVerified ? 'Verified' : 'Unverified'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-soft p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/sell" className="btn-primary w-full block text-center">
                  Post New Ad
                </Link>
                <Link href="/messages" className="btn-secondary w-full block text-center">
                  View Messages
                </Link>
                <Link href="/favorites" className="btn-secondary w-full block text-center">
                  My Favorites
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* AI Recommendations */}
            <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
              <div className="flex items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">AI Recommendations</h2>
                <span className="ml-2 text-primary-600">✨</span>
              </div>
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">🤖</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Smart Recommendations Coming Soon
                </h3>
                <p className="text-gray-600">
                  Our AI will learn your preferences and show you the most relevant listings.
                </p>
              </div>
            </div>

            {/* Recent Listings */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Your Recent Listings</h2>
                <Link href="/listings" className="text-primary-600 hover:text-primary-700 text-sm">
                  View all →
                </Link>
              </div>

              {listings.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">📦</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No listings yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start selling by posting your first ad.
                  </p>
                  <Link href="/sell" className="btn-primary">
                    Post Your First Ad
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {listings.slice(0, 5).map((listing) => (
                    <div key={listing.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        📦
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{listing.title}</h3>
                        <p className="text-sm text-gray-600 truncate">{listing.location}</p>
                        <p className="text-lg font-bold text-primary-600">
                          ₦{listing.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          listing.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {listing.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{listing.views || 0} views</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}