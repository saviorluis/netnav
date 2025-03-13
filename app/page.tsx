import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import components that use browser APIs
const EmailPopup = dynamic(() => import('./components/EmailPopup'), { ssr: false });
const LeadMagnet = dynamic(() => import('./components/LeadMagnet'), { ssr: false });
const SimpleEmailCapture = dynamic(() => import('./components/SimpleEmailCapture'), { ssr: false });
const ModernLayout = dynamic(() => import('./components/ModernLayout'), { ssr: false });

export default function Home() {
  return (
    <ModernLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Email popup that appears after 5 seconds */}
        <EmailPopup 
          triggerType="time" 
          timeDelay={5000} 
          showOncePerDays={3}
        />
        
        {/* Hero section */}
        <div className="pt-20 pb-16 text-center lg:pt-32 px-4">
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
            Discover Business Networking Events 
            <span className="relative whitespace-nowrap text-blue-600">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
              <span className="relative">at netnav.app</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Find professional networking opportunities in your area, filtered by industry and event type. 
            Connect with like-minded professionals and grow your network.
          </p>
          
          {/* Email capture form */}
          <div className="mt-12 mx-auto max-w-md">
            <SimpleEmailCapture />
            <div className="mt-4 text-sm text-gray-500 text-center">
              Already have access? <Link href="/login" className="text-blue-600 hover:underline">Login here</Link>
            </div>
          </div>
        </div>

        {/* Features preview section */}
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Coming Soon</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                The Future of Networking
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
        
        {/* Lead Magnet Section */}
        <div className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center mb-12">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Free Resources</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Networking Resources to Help You Succeed
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Access our free guides and resources to enhance your networking skills and make meaningful connections.
              </p>
            </div>
            
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              <LeadMagnet
                title="Ultimate Networking Guide"
                description="Learn proven strategies to make meaningful connections at networking events and turn them into valuable relationships."
                imageUrl="/images/networking-guide.svg"
                buttonText="Download Free Guide"
                downloadUrl="/downloads/networking-guide.html"
              />
              
              <LeadMagnet
                title="Networking Event Checklist"
                description="Never miss a networking opportunity again. Our comprehensive checklist ensures you're prepared for every event."
                imageUrl="/images/checklist.jpg"
                buttonText="Get Your Checklist"
                downloadUrl="/downloads/networking-checklist.pdf"
              />
            </div>
          </div>
        </div>
      </div>
    </ModernLayout>
  );
}
