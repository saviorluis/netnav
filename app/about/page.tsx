import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'About NetNav',
  description: 'Learn about NetNav, the network navigation tool for business professionals',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About NetNav</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg mb-4">
            NetNav is designed to help business professionals navigate networking events 
            more effectively. We believe that meaningful connections are the foundation 
            of successful business relationships.
          </p>
          <p className="text-lg mb-4">
            Our platform provides tools to discover relevant events, prepare for 
            networking opportunities, and follow up with new connections.
          </p>
        </div>
        <div className="relative h-64 md:h-80">
          <Image 
            src="/images/checklist.jpg" 
            alt="Networking checklist" 
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>
      
      <div className="bg-gray-50 p-8 rounded-lg mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">Event Discovery</h3>
            <p>Find networking events tailored to your industry, interests, and location.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">Networking Guides</h3>
            <p>Access resources to help you prepare for and excel at networking events.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">Connection Management</h3>
            <p>Organize and follow up with your professional connections effectively.</p>
          </div>
        </div>
      </div>
      
      <div className="text-center mb-12">
        <h2 className="text-2xl font-semibold mb-6">Get Started Today</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join NetNav and transform your networking experience. Our tools are designed 
          to help you make meaningful connections that drive your professional growth.
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/signup" 
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </Link>
          <Link 
            href="/login" 
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
} 