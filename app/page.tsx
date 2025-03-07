export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold">
              <span className="bg-gradient-to-r from-[#1d9bf0] to-[#1a8cd8] bg-clip-text text-transparent">Network</span>
            </h1>
            <h1 className="text-5xl sm:text-6xl font-bold">
              <span className="bg-gradient-to-r from-[#00ba7c] to-[#00a76c] bg-clip-text text-transparent">Navigator</span>
            </h1>
          </div>

          <p className="text-xl text-gray-200">
            Your AI-powered networking assistant that helps you build meaningful connections
          </p>
          
          <form className="flex flex-col gap-4 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-6 py-4 rounded-xl bg-[#202020] border border-[#2f2f2f] focus:border-[#1d9bf0] focus:ring-2 focus:ring-[#1d9bf0]/20 focus:outline-none text-white text-lg placeholder-gray-400"
            />
            <button
              type="submit"
              className="w-full px-8 py-4 rounded-xl bg-[#1d9bf0] hover:bg-[#1a8cd8] transition-colors duration-200 font-semibold text-lg text-white shadow-lg shadow-[#1d9bf0]/20"
            >
              Join Waitlist
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
