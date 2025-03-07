import { IoSearchOutline, IoLinkOutline, IoTrendingUpOutline, IoLocationOutline, IoTimeOutline, IoPeopleOutline, IoRocketOutline, IoHeartOutline } from 'react-icons/io5'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FCFCFC]">
      {/* Organic shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-50 via-emerald-50 to-transparent rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-50 via-blue-50 to-transparent rounded-full blur-3xl opacity-60 translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto space-y-32">
          {/* Hero Section */}
          <div className="relative text-center space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-6 hover:bg-emerald-100 transition-colors cursor-default">
              <IoRocketOutline className="w-4 h-4 text-emerald-600 mr-2" />
              <span className="text-sm text-emerald-600 font-medium">Join 10,000+ early members</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-gray-900">
                Connect with people
                <br />
                <span className="text-blue-600 relative inline-block">
                  who get you
                  <svg className="absolute -bottom-2 left-0 w-full" height="15" viewBox="0 0 400 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 13C100 -1 300 -1 400 13" stroke="#93C5FD" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                We're building a more human way to network. No more cold connections or random requests - just meaningful relationships with people who share your path.
              </p>
            </div>
          </div>

          {/* Community Map */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Join a Global Community</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Connect with professionals worldwide who are ready to share experiences, offer advice, and grow together.</p>
              </div>
              
              <div className="relative aspect-[2/1] bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl overflow-hidden border border-gray-100">
                <div className="absolute inset-0">
                  {/* Background Grid */}
                  <div className="absolute inset-0 grid grid-cols-24 grid-rows-12 gap-px opacity-20">
                    {[...Array(288)].map((_, i) => (
                      <div key={i} className="border-[0.5px] border-gray-200"></div>
                    ))}
                  </div>
                  
                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full">
                    {/* SF to NYC */}
                    <path 
                      d="M 20% 40% Q 40% 30%, 80% 35%" 
                      className="stroke-blue-200" 
                      fill="none" 
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="8;0"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </path>
                    {/* SF to London */}
                    <path 
                      d="M 20% 40% Q 40% 20%, 60% 25%" 
                      className="stroke-emerald-200" 
                      fill="none" 
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="8;0"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </path>
                    {/* London to Singapore */}
                    <path 
                      d="M 60% 25% Q 75% 35%, 85% 45%" 
                      className="stroke-blue-200" 
                      fill="none" 
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="8;0"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                  
                  {/* City Markers */}
                  {/* San Francisco */}
                  <div className="absolute top-[40%] left-[20%]">
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-blue-100 rounded-full animate-ping opacity-50"></div>
                      <div className="relative w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-sm font-medium text-gray-900">San Francisco</p>
                        <p className="text-xs text-gray-500">2,500+ members</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* New York */}
                  <div className="absolute top-[35%] left-[80%]">
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-emerald-100 rounded-full animate-ping opacity-50"></div>
                      <div className="relative w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-sm font-medium text-gray-900">New York</p>
                        <p className="text-xs text-gray-500">3,000+ members</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* London */}
                  <div className="absolute top-[25%] left-[60%]">
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-blue-100 rounded-full animate-ping opacity-50"></div>
                      <div className="relative w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-sm font-medium text-gray-900">London</p>
                        <p className="text-xs text-gray-500">2,800+ members</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Singapore */}
                  <div className="absolute top-[45%] left-[85%]">
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-emerald-100 rounded-full animate-ping opacity-50"></div>
                      <div className="relative w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-sm font-medium text-gray-900">Singapore</p>
                        <p className="text-xs text-gray-500">1,700+ members</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">10,000+</p>
                  <p className="text-sm text-gray-600">Global Members</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">20+</p>
                  <p className="text-sm text-gray-600">Countries</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">5,000+</p>
                  <p className="text-sm text-gray-600">Connections Made</p>
                </div>
              </div>
            </div>
          </div>

          {/* Waitlist Form */}
          <div className="relative max-w-md mx-auto">
            <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to join?</h3>
                <p className="text-gray-600">Be one of the first to experience a more meaningful way to network.</p>
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
                  className="w-full px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg text-white"
                >
                  Join the Waitlist
                </button>
                <p className="text-sm text-center text-gray-500">Join 10,000+ early members already signed up</p>
              </form>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <IoSearchOutline className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Find Your People</h3>
                <p className="text-gray-600 leading-relaxed">Connect with professionals who share your interests, values, and career aspirations.</p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <IoLinkOutline className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Real Conversations</h3>
                <p className="text-gray-600 leading-relaxed">Skip the small talk. Our ice-breakers help you start meaningful discussions from day one.</p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <IoTrendingUpOutline className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Grow Together</h3>
                <p className="text-gray-600 leading-relaxed">Join interest groups, attend virtual meetups, and build lasting professional relationships.</p>
              </div>
            </div>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <IoHeartOutline className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Built for real connections</h3>
                  <p className="text-gray-600 leading-relaxed">Our matching goes beyond job titles. We look at your journey, interests, and goals to connect you with people you'll genuinely click with.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <IoSearchOutline className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Smart, not artificial</h3>
                  <p className="text-gray-600 leading-relaxed">We use technology to understand what makes connections meaningful, then get out of the way to let real relationships flourish.</p>
                </div>
              </div>
            </div>
            
            {/* Social Proof */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100"></div>
                    <div className="flex-1">
                      <div className="h-4 w-24 bg-gray-100 rounded mb-2"></div>
                      <div className="h-3 w-32 bg-gray-50 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600 italic">"I've made more meaningful connections here in a month than I did in years on LinkedIn. The people I meet actually share my interests and goals."</p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
