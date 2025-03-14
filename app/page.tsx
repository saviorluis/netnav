import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg mr-3">N</div>
            <span className="text-xl font-bold text-gray-900">NetNav</span>
            <span className="ml-2 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
              Beta
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-sm font-semibold text-gray-900 hover:text-blue-600">Home</Link>
            <Link href="/about" className="text-sm font-semibold text-gray-900 hover:text-blue-600">About</Link>
            <Link href="/debug" className="text-sm font-semibold text-gray-900 hover:text-blue-600">Debug</Link>
          </nav>
          
          <div>
            <Link href="/login" className="text-sm font-semibold text-blue-600 hover:text-blue-500">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="bg-gradient-to-b from-indigo-100/20 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="md:flex md:items-center md:gap-12">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Discover Business Networking Events with <span className="text-blue-600">NetNav</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Find professional networking opportunities in your area, filtered by industry and event type. 
                Connect with like-minded professionals and grow your network.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/signup" className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
                  Get started
                </Link>
                <Link href="/about" className="text-sm font-semibold text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
              
              {/* Email capture form */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Join our waitlist</h3>
                <p className="text-sm text-gray-500 mb-4">Be the first to know when we launch in your area.</p>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="you@example.com"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                  >
                    Get Access to Exclusive Events
                  </button>
                </form>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative mx-auto max-w-[364px]">
                <div className="absolute -top-10 -left-10 w-[140%] h-[140%] rounded-full bg-blue-50 blur-3xl opacity-70"></div>
                <div className="relative shadow-xl rounded-2xl overflow-hidden border-8 border-white">
                  <Image
                    src="/images/checklist.jpg"
                    alt="NetNav Dashboard Preview"
                    width={364}
                    height={650}
                    className="w-full h-auto"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Upcoming Event</p>
                        <p className="text-lg font-bold">Tech Networking Mixer</p>
                      </div>
                      <div className="bg-blue-600 rounded-full px-3 py-1 text-xs font-medium">
                        2 miles away
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base font-semibold text-blue-600 mb-3">Powerful Features</h2>
            <p className="text-3xl font-bold text-gray-900 mb-6">
              Everything you need to supercharge your networking
            </p>
            <p className="text-lg text-gray-600">
              NetNav aggregates networking events from chambers of commerce, BNI, Toastmasters, and business incubators 
              to provide you with the most comprehensive list of networking opportunities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="relative pl-16">
              <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Location-Based Search</h3>
              <p className="text-gray-600">
                Enter your zip code and desired radius to find networking events near you, whether they're in-person or virtual.
              </p>
            </div>
            
            <div className="relative pl-16">
              <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Industry Filtering</h3>
              <p className="text-gray-600">
                Filter events by industry to find the most relevant networking opportunities for your professional goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gray-900 rounded-3xl px-6 py-16 md:py-20 text-center relative overflow-hidden">
            <h2 className="text-3xl font-bold text-white mb-6 relative z-10">
              Ready to boost your professional network?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto relative z-10">
              Join NetNav today and discover networking opportunities tailored to your industry and location.
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <Link href="/signup" className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100">
                Get started
              </Link>
              <Link href="/about" className="text-sm font-semibold text-white hover:text-gray-200">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
            
            {/* Background gradient */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1000px] max-h-[1000px] opacity-30">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-blue-800"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg mr-3">N</div>
              <span className="text-xl font-bold text-gray-900">NetNav</span>
            </div>
            
            <div className="flex flex-wrap gap-8">
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms</Link>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy</Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} NetNav. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
