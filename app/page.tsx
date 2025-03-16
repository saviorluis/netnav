import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-secondary-200 bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-lg mr-3">N</div>
            <span className="text-xl font-bold text-secondary-900">NetNav</span>
            <span className="ml-2 inline-flex items-center rounded-md bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700 ring-1 ring-inset ring-primary-600/20">
              Beta
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-sm font-semibold text-secondary-900 hover:text-primary-600">Home</Link>
            <Link href="/about" className="text-sm font-semibold text-secondary-900 hover:text-primary-600">About</Link>
            <Link href="/debug" className="text-sm font-semibold text-secondary-900 hover:text-primary-600">Debug</Link>
          </nav>
          
          <div>
            <Link href="/login" className="text-sm font-semibold text-primary-600 hover:text-primary-500">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="bg-gradient-to-b from-primary-100/20 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="md:flex md:items-center md:gap-12">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
                Discover Business Networking Events with <span className="text-primary-600">NetNav</span>
              </h1>
              <p className="text-lg text-secondary-600 mb-8">
                Find professional networking opportunities in your area, filtered by industry and event type. 
                Connect with like-minded professionals and grow your network.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Button asChild>
                  <Link href="/signup">Get started</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/about">Learn more</Link>
                </Button>
              </div>
              
              {/* Email capture form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-semibold text-secondary-900">Join our waitlist</CardTitle>
                  <CardDescription>Be the first to know when we launch in your area.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                        Email Address <span className="text-error-500">*</span>
                      </label>
                      <Input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                      />
                    </div>
                    <Button className="w-full">
                      Get Access to Exclusive Events
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative mx-auto max-w-[364px]">
                <div className="absolute -top-10 -left-10 w-[140%] h-[140%] rounded-full bg-primary-50 blur-3xl opacity-70"></div>
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
                      <div className="bg-primary-600 rounded-full px-3 py-1 text-xs font-medium">
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
            <h2 className="text-base font-semibold text-primary-600 mb-3">Powerful Features</h2>
            <p className="text-3xl font-bold text-secondary-900 mb-6">
              Everything you need to supercharge your networking
            </p>
            <p className="text-lg text-secondary-600">
              NetNav aggregates networking events from chambers of commerce, BNI, Toastmasters, and business incubators 
              to provide you with the most comprehensive list of networking opportunities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-lg bg-primary-600 flex items-center justify-center">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-lg">Location-Based Search</CardTitle>
                    <CardDescription>
                      Enter your zip code and desired radius to find networking events near you, whether they're in-person or virtual.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-lg bg-primary-600 flex items-center justify-center">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-lg">Industry Filtering</CardTitle>
                    <CardDescription>
                      Filter events by industry to find the most relevant networking opportunities for your professional goals.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <Card className="bg-secondary-900 text-white relative overflow-hidden">
            <CardHeader>
              <CardTitle className="text-3xl font-bold relative z-10">
                Ready to boost your professional network?
              </CardTitle>
              <CardDescription className="text-lg text-secondary-300 max-w-2xl mx-auto relative z-10">
                Join NetNav today and discover networking opportunities tailored to your industry and location.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-4 relative z-10">
                <Button variant="secondary" asChild>
                  <Link href="/signup">Get started</Link>
                </Button>
                <Button variant="ghost" className="text-white hover:text-secondary-200" asChild>
                  <Link href="/about">Learn more</Link>
                </Button>
              </div>
            </CardContent>
            
            {/* Background gradient */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1000px] max-h-[1000px] opacity-30">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-600 to-primary-800"></div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-secondary-200 py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-lg mr-3">N</div>
              <span className="text-xl font-bold text-secondary-900">NetNav</span>
            </div>
            
            <div className="flex flex-wrap gap-8">
              <Link href="/" className="text-sm text-secondary-600 hover:text-secondary-900">Home</Link>
              <Link href="/about" className="text-sm text-secondary-600 hover:text-secondary-900">About</Link>
              <Link href="/terms" className="text-sm text-secondary-600 hover:text-secondary-900">Terms</Link>
              <Link href="/privacy" className="text-sm text-secondary-600 hover:text-secondary-900">Privacy</Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-secondary-200 text-center">
            <p className="text-sm text-secondary-500">&copy; {new Date().getFullYear()} NetNav. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
