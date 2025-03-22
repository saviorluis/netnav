'use client'

import { DashboardSidebar } from '../components/Navigation'
import { IoPersonOutline, IoStatsChartOutline, IoCalendarOutline, IoMailOutline } from 'react-icons/io5'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="dashboard-grid">
      <DashboardSidebar />
      
      <main className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome back, User</h1>
            <p className="text-gray-600 mt-1">Here's what's happening with your network</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 text-sm font-medium">Connections</h3>
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <IoPersonOutline className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-sm text-emerald-600 mt-1">+3 this week</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 text-sm font-medium">Profile Views</h3>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <IoStatsChartOutline className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">142</p>
              <p className="text-sm text-emerald-600 mt-1">+28% from last month</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 text-sm font-medium">Upcoming Events</h3>
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <IoCalendarOutline className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">2</p>
              <p className="text-sm text-gray-500 mt-1">Next: Virtual Coffee (Tue)</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 text-sm font-medium">Messages</h3>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <IoMailOutline className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">5</p>
              <p className="text-sm text-blue-600 mt-1">3 unread</p>
            </div>
          </div>
          
          {/* Recent Connections */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Connections</h2>
              <Link href="/dashboard/connections" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View all
              </Link>
            </div>
            
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100"></div>
                    <div>
                      <p className="font-medium text-gray-900">Connection {i + 1}</p>
                      <p className="text-sm text-gray-500">Product Designer at Company {i + 1}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">Connected 2 days ago</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recommended Connections */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recommended For You</h2>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                Refresh
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gray-100"></div>
                    <div>
                      <p className="font-medium text-gray-900">Recommended {i + 1}</p>
                      <p className="text-xs text-gray-500">UX Designer at Company {i + 1}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Shares 3 mutual connections and similar interests in design and technology.
                  </p>
                  <button className="w-full py-2 rounded-lg bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-colors">
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
