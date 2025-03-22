'use client'

import { DashboardSidebar } from '../components/Navigation'
import { IoPersonOutline, IoMailOutline, IoTrendingUpOutline, IoSettingsOutline } from 'react-icons/io5'
import Link from 'next/link'

export default function DevDashboard() {
  return (
    <div className="dashboard-grid">
      <DashboardSidebar type="dev" />
      
      <main className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Developer Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitor and manage your NetNav platform</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <IoPersonOutline className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">10,482</p>
              <p className="text-sm text-emerald-600 mt-1">+124 this week</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 text-sm font-medium">Waitlist</h3>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <IoMailOutline className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">3,254</p>
              <p className="text-sm text-emerald-600 mt-1">+52 this week</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 text-sm font-medium">Active Users</h3>
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <IoTrendingUpOutline className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">8,741</p>
              <p className="text-sm text-emerald-600 mt-1">83% of total users</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 text-sm font-medium">Connections Made</h3>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <IoSettingsOutline className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">5,128</p>
              <p className="text-sm text-emerald-600 mt-1">+215 this week</p>
            </div>
          </div>
          
          {/* Waitlist Growth Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Waitlist Growth</h2>
              <div className="flex items-center space-x-2">
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Last year</option>
                </select>
                <Link href="/dev/waitlist" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  View all
                </Link>
              </div>
            </div>
            
            {/* Chart Placeholder */}
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <p className="text-sm text-gray-600">Waitlist Signups</p>
                </div>
                <p className="text-gray-500 text-sm">Chart visualization would appear here</p>
              </div>
            </div>
          </div>
          
          {/* Recent Waitlist Signups */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Waitlist Signups</h2>
              <Link href="/dev/waitlist" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View all
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">user{i + 1}@example.com</td>
                      <td className="py-3 px-4 text-sm text-gray-500">March {20 - i}, 2025</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          New
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                          Invite
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Invite Users</h3>
              <p className="text-sm text-gray-600 mb-4">Send invitations to users on the waitlist to join the platform.</p>
              <Link href="/dev/waitlist" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
                Manage invitations
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
              <p className="text-sm text-gray-600 mb-4">View and manage user accounts, roles, and permissions.</p>
              <Link href="/dev/users" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
                Manage users
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Settings</h3>
              <p className="text-sm text-gray-600 mb-4">Configure platform settings, features, and integrations.</p>
              <Link href="/dev/settings" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
                Manage settings
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
