import { IoSearchOutline, IoLinkOutline, IoTrendingUpOutline, IoLocationOutline, IoTimeOutline, IoPeopleOutline } from 'react-icons/io5'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#101010] to-[#0a0a0a] text-white">
      {/* Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#1d9bf0] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#00ba7c] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto text-center space-y-16">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-bold">
                <span className="bg-gradient-to-r from-[#1d9bf0] to-[#1a8cd8] bg-clip-text text-transparent">Network</span>
              </h1>
              <h1 className="text-5xl sm:text-7xl font-bold">
                <span className="bg-gradient-to-r from-[#00ba7c] to-[#00a76c] bg-clip-text text-transparent">Navigator</span>
              </h1>
            </div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              AI-powered networking that understands your goals and connects you with the right people
            </p>
          </div>

          {/* Early Signups Counter */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#222] rounded-2xl p-8 max-w-sm mx-auto border border-gray-800">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-[#1d9bf0]/10 flex items-center justify-center">
                <IoPeopleOutline className="w-8 h-8 text-[#1d9bf0]" />
              </div>
              <div className="text-left">
                <p className="text-3xl font-bold bg-gradient-to-r from-[#1d9bf0] to-[#1a8cd8] bg-clip-text text-transparent">10,000+</p>
                <p className="text-gray-400">Early Signups</p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group bg-gradient-to-br from-[#1a1a1a] to-[#222] p-8 rounded-2xl border border-gray-800 hover:border-[#1d9bf0]/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#1d9bf0]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <IoSearchOutline className="w-6 h-6 text-[#1d9bf0]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find</h3>
              <p className="text-gray-400">Discover relevant connections in your industry</p>
            </div>
            <div className="group bg-gradient-to-br from-[#1a1a1a] to-[#222] p-8 rounded-2xl border border-gray-800 hover:border-[#1d9bf0]/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#1d9bf0]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <IoLinkOutline className="w-6 h-6 text-[#1d9bf0]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-400">Build meaningful professional relationships</p>
            </div>
            <div className="group bg-gradient-to-br from-[#1a1a1a] to-[#222] p-8 rounded-2xl border border-gray-800 hover:border-[#1d9bf0]/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#1d9bf0]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <IoTrendingUpOutline className="w-6 h-6 text-[#1d9bf0]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Grow</h3>
              <p className="text-gray-400">Expand your network and opportunities</p>
            </div>
          </div>

          {/* Smart Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#222] rounded-2xl p-8 border border-gray-800">
              <h3 className="text-2xl font-semibold mb-4">Instant Connections</h3>
              <p className="text-gray-400 mb-6">AI-powered matching algorithm finds the perfect networking opportunities for you</p>
              <div className="relative h-48 bg-[#0f0f0f] rounded-xl overflow-hidden border border-gray-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-[#1d9bf0]/10 flex items-center justify-center animate-pulse">
                    <div className="w-16 h-16 rounded-full bg-[#1d9bf0]/20 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-[#1d9bf0]/30"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#222] rounded-2xl p-8 border border-gray-800">
              <h3 className="text-2xl font-semibold mb-4">Smart Networking</h3>
              <p className="text-gray-400 mb-6">Personalized recommendations based on your goals and interests</p>
              <div className="relative h-48 bg-[#0f0f0f] rounded-xl overflow-hidden border border-gray-800">
                <div className="absolute inset-0 grid grid-cols-3 gap-2 p-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-[#1d9bf0]/5 rounded-lg animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Events Map Section */}
          <div>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <IoLocationOutline className="w-6 h-6 text-[#1d9bf0]" />
              <h2 className="text-3xl font-bold">Upcoming Events Near You</h2>
            </div>
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#222] rounded-2xl p-6 border border-gray-800">
              <div className="relative aspect-video bg-[#0f0f0f] rounded-xl overflow-hidden border border-gray-800">
                {/* Map Grid Overlay */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-3">
                  {[...Array(18)].map((_, i) => (
                    <div key={i} className="border border-[#1d9bf0]/5"></div>
                  ))}
                </div>
                {/* Event Markers */}
                <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-[#1d9bf0] rounded-full animate-ping"></div>
                <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-[#00ba7c] rounded-full animate-ping" style={{ animationDelay: '500ms' }}></div>
              </div>
            </div>
          </div>

          {/* Waitlist Form */}
          <div className="max-w-sm mx-auto">
            <form className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 rounded-xl bg-[#1a1a1a] border border-gray-800 focus:border-[#1d9bf0] focus:ring-2 focus:ring-[#1d9bf0]/20 focus:outline-none text-white text-lg placeholder-gray-500"
                />
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <IoTimeOutline className="w-6 h-6 text-gray-500" />
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-[#1d9bf0] to-[#1a8cd8] hover:from-[#1a8cd8] hover:to-[#1d9bf0] transition-all duration-300 font-semibold text-lg text-white shadow-lg shadow-[#1d9bf0]/20"
              >
                Join Waitlist
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
