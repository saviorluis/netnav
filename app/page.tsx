import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="space-y-8">
            <div className="animate-fade-in-1 opacity-0">
              <p className="text-2xl text-white">Many have tried...</p>
            </div>
            
            <div className="animate-fade-in-2 opacity-0">
              <p className="text-2xl text-white">None made it work seamlessly...</p>
            </div>
            
            <div className="animate-fade-in-3 opacity-0">
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl font-bold">
                  <span className="text-[#4299e1]">Network</span>
                </h1>
                <h1 className="text-5xl sm:text-6xl font-bold">
                  <span className="text-[#48bb78]">Navigator</span>
                </h1>
              </div>
              
              <div className="mt-12 animate-fade-in-4 opacity-0">
                <form className="flex flex-col gap-4 max-w-sm mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 rounded-xl bg-[#2a2a2a] border border-gray-700 focus:border-[#4299e1] focus:ring-2 focus:ring-[#4299e1] focus:outline-none text-white text-lg"
                  />
                  <button
                    type="submit"
                    className="w-full px-8 py-4 rounded-xl bg-[#4299e1] hover:bg-[#3182ce] transition-colors duration-200 font-semibold text-lg"
                  >
                    Join Waitlist
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
