import { IoSearchOutline, IoLinkOutline, IoTrendingUpOutline, IoLocationOutline, IoTimeOutline, IoPeopleOutline } from 'react-icons/io5'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] pointer-events-none"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto space-y-24">
          {/* Hero Section */}
          <div className="relative text-center space-y-8">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-px h-40 bg-gradient-to-b from-transparent via-blue-200 to-blue-500/20"></div>
            
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
                <span className="animate-pulse w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                <span className="text-sm text-blue-600 font-medium">Now in private beta</span>
              </div>
              
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
                <span className="text-blue-600 inline-block transform hover:scale-105 transition-transform cursor-default">Network</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent inline-block transform hover:scale-105 transition-transform cursor-default">Navigator</span>
              </h1>
            </div>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Stop hoping to meet the right people. Let AI understand your goals and <span className="text-blue-600 font-medium">actively connect you</span> with perfect networking opportunities.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 transform hover:-translate-y-1 transition-all">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center">
                  <IoPeopleOutline className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">10,000+</p>
                  <p className="text-gray-600">Early Members</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 transform hover:-translate-y-1 transition-all">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-blue-400 flex items-center justify-center">
                  <IoLinkOutline className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">5,000+</p>
                  <p className="text-gray-600">Connections Made</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 transform hover:-translate-y-1 transition-all">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-emerald-500 flex items-center justify-center">
                  <IoLocationOutline className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">50+</p>
                  <p className="text-gray-600">Cities Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-sm">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <IoSearchOutline className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Smart Discovery</h3>
                <p className="text-gray-600 leading-relaxed">Find the perfect connections based on your industry, goals, and expertise level.</p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-sm">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <IoLinkOutline className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Meaningful Connections</h3>
                <p className="text-gray-600 leading-relaxed">Build relationships that matter with AI-powered compatibility matching.</p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-sm">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <IoTrendingUpOutline className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Career Growth</h3>
                <p className="text-gray-600 leading-relaxed">Accelerate your professional journey with targeted networking opportunities.</p>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-2xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Global Network</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Join professionals from around the world, with active communities in major tech hubs.</p>
              </div>
              
              <div className="relative aspect-[2/1] bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl overflow-hidden border border-gray-100">
                <div className="absolute inset-0">
                  <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-px">
                    {[...Array(72)].map((_, i) => (
                      <div key={i} className="border-[0.5px] border-gray-200/40"></div>
                    ))}
                  </div>
                  
                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full">
                    <line x1="25%" y1="30%" x2="45%" y2="60%" className="stroke-blue-500/20 stroke-[1]" />
                    <line x1="45%" y1="60%" x2="75%" y2="40%" className="stroke-emerald-500/20 stroke-[1]" />
                  </svg>
                  
                  {/* City Markers */}
                  <div className="absolute top-[30%] left-[25%] w-3 h-3">
                    <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75"></div>
                    <div className="absolute inset-0 rounded-full bg-blue-500"></div>
                  </div>
                  <div className="absolute top-[60%] left-[45%] w-3 h-3">
                    <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></div>
                    <div className="absolute inset-0 rounded-full bg-emerald-500"></div>
                  </div>
                  <div className="absolute top-[40%] left-[75%] w-3 h-3">
                    <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75"></div>
                    <div className="absolute inset-0 rounded-full bg-blue-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Waitlist Form */}
          <div className="relative max-w-md mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Join the Waitlist</h3>
                <p className="text-gray-600">Be among the first to experience the future of networking.</p>
              </div>
              
              <form className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-gray-800 text-lg placeholder-gray-400"
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <IoTimeOutline className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 transition-all duration-200 font-semibold text-lg text-white shadow-lg shadow-blue-500/25 transform hover:-translate-y-0.5"
                >
                  Join Waitlist
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
