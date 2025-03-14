import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Get domain from environment variables
const domain = process.env.NEXT_PUBLIC_DOMAIN || 'netnav.app';
const url = process.env.NEXT_PUBLIC_URL || 'https://netnav.app';

// Dynamically import components that use browser APIs
const EmailPopup = dynamic(() => import('./components/EmailPopup'), { ssr: false });
const LeadMagnet = dynamic(() => import('./components/LeadMagnet'), { ssr: false });
const SimpleEmailCapture = dynamic(() => import('./components/SimpleEmailCapture'), { ssr: false });
const ModernLayout = dynamic(() => import('./components/ModernLayout'), { ssr: false });

export default function Home() {
  return (
    <ModernLayout>
      {/* Hero section with modern gradient background */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 to-white">
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 className="max-w-lg text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Discover Business Networking Events with <span className="text-blue-600">NetNav</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Find professional networking opportunities in your area, filtered by industry and event type. 
              Connect with like-minded professionals and grow your network.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link href="/signup" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Get started
              </Link>
              <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
            
            {/* Email capture form */}
            <div className="mt-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold leading-6 text-gray-900">Join our waitlist</h3>
              <p className="mt-1 text-sm text-gray-500">Be the first to know when we launch in your area.</p>
              <div className="mt-4">
                <SimpleEmailCapture />
              </div>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
            <div className="relative mx-auto w-[364px] max-w-full">
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
        
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32"></div>
      </div>

      {/* Features section with modern design */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Powerful Features</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to supercharge your networking
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              NetNav aggregates networking events from chambers of commerce, BNI, Toastmasters, and business incubators 
              to provide you with the most comprehensive list of networking opportunities.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  Location-Based Search
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Enter your zip code and desired radius to find networking events near you, whether they're in-person or virtual.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                    </svg>
                  </div>
                  Industry Filtering
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Filter events by industry to find the most relevant networking opportunities for your professional goals.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  Connect with Professionals
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Create a profile, connect with other professionals, and see which events your connections are attending.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  </div>
                  All Event Types
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Find both in-person and virtual events, from workshops and conferences to meetups and networking happy hours.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      
      {/* Testimonials section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-lg font-semibold leading-8 tracking-tight text-blue-600">Testimonials</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              See what our users are saying
            </p>
          </div>
          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Marketing Director",
                  image: "https://randomuser.me/api/portraits/women/32.jpg",
                  quote: "NetNav has completely transformed how I find networking events. I've made valuable connections that have directly led to new business opportunities."
                },
                {
                  name: "Michael Chen",
                  role: "Tech Entrepreneur",
                  image: "https://randomuser.me/api/portraits/men/46.jpg",
                  quote: "As someone who's constantly looking to expand my professional network, NetNav has been a game-changer. The location-based search is incredibly useful."
                },
                {
                  name: "Emily Rodriguez",
                  role: "Freelance Designer",
                  image: "https://randomuser.me/api/portraits/women/65.jpg",
                  quote: "I've found amazing industry-specific events through NetNav that I wouldn't have discovered otherwise. It's become an essential tool for my business growth."
                }
              ].map((testimonial, index) => (
                <div key={index} className="pt-8 sm:inline-block sm:w-full sm:px-4">
                  <figure className="rounded-2xl bg-white p-8 text-sm leading-6 shadow-sm ring-1 ring-gray-900/5">
                    <blockquote className="text-gray-900">
                      <p>{`"${testimonial.quote}"`}</p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-x-4">
                      <img className="h-10 w-10 rounded-full bg-gray-50" src={testimonial.image} alt="" />
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-gray-600">{testimonial.role}</div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to boost your professional network?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Join NetNav today and discover networking opportunities tailored to your industry and location.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/signup" className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Get started
              </Link>
              <Link href="/about" className="text-sm font-semibold leading-6 text-white">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
            <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
              <circle cx="512" cy="512" r="512" fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                  <stop stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#1d4ed8" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </ModernLayout>
  );
}
