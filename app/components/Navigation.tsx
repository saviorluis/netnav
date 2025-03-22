'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { IoMenuOutline, IoCloseOutline, IoPersonOutline, IoHomeOutline, IoStatsChartOutline, IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  
  const isActive = (path: string) => pathname === path

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">NetNav</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className={`text-sm font-medium ${isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Home
            </Link>
            <Link 
              href="/dashboard" 
              className={`text-sm font-medium ${isActive('/dashboard') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Dashboard
            </Link>
            <Link 
              href="/dev" 
              className={`text-sm font-medium ${isActive('/dev') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Developer
            </Link>
            <Link 
              href="/" 
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-sm font-medium text-white"
            >
              Sign In
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <IoCloseOutline className="w-6 h-6" />
            ) : (
              <IoMenuOutline className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className={`px-3 py-2 rounded-lg text-sm font-medium ${isActive('/') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/dashboard" 
                className={`px-3 py-2 rounded-lg text-sm font-medium ${isActive('/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                href="/dev" 
                className={`px-3 py-2 rounded-lg text-sm font-medium ${isActive('/dev') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Developer
              </Link>
              <Link 
                href="/" 
                className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-sm font-medium text-white text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export function DashboardSidebar({ type = 'client' }: { type?: 'client' | 'dev' }) {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path
  
  const clientLinks = [
    { href: '/dashboard', label: 'Overview', icon: <IoHomeOutline className="w-5 h-5" /> },
    { href: '/dashboard/profile', label: 'Profile', icon: <IoPersonOutline className="w-5 h-5" /> },
    { href: '/dashboard/connections', label: 'Connections', icon: <IoStatsChartOutline className="w-5 h-5" /> },
    { href: '/dashboard/settings', label: 'Settings', icon: <IoSettingsOutline className="w-5 h-5" /> },
  ]
  
  const devLinks = [
    { href: '/dev', label: 'Overview', icon: <IoHomeOutline className="w-5 h-5" /> },
    { href: '/dev/waitlist', label: 'Waitlist', icon: <IoStatsChartOutline className="w-5 h-5" /> },
    { href: '/dev/users', label: 'Users', icon: <IoPersonOutline className="w-5 h-5" /> },
    { href: '/dev/settings', label: 'Settings', icon: <IoSettingsOutline className="w-5 h-5" /> },
  ]
  
  const links = type === 'dev' ? devLinks : clientLinks
  
  return (
    <aside className="bg-white border-r border-gray-100 h-screen sticky top-0 overflow-y-auto">
      <div className="p-4 border-b border-gray-100">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-blue-600">NetNav</span>
          <span className="text-xs font-medium text-gray-500">{type === 'dev' ? 'Dev' : 'Client'}</span>
        </Link>
      </div>
      
      <nav className="p-4 space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium ${
              isActive(link.href) 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
        
        <div className="pt-4 mt-4 border-t border-gray-100">
          <Link
            href="/"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            <IoLogOutOutline className="w-5 h-5" />
            <span>Sign Out</span>
          </Link>
        </div>
      </nav>
    </aside>
  )
}
