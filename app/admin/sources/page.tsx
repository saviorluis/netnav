import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import SourcesList from './SourcesList';
import SimpleScraperForm from './SimpleScraperForm';

// Function to check if user is admin
async function checkAdmin() {
  // In a real app, you would use a proper auth check
  // For now, we'll just allow access
  return true;
}

export default async function AdminSourcesPage() {
  const isAdmin = await checkAdmin();
  
  // Check if user is admin
  if (!isAdmin) {
    redirect('/admin/login');
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Event Sources Management</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Scrape Events</h2>
        <SimpleScraperForm />
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Manage Sources</h2>
        <Suspense fallback={<div>Loading sources...</div>}>
          <SourcesList />
        </Suspense>
      </div>
    </div>
  );
} 