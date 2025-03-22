'use client'

import { DashboardSidebar } from '../../components/Navigation'
import { useState } from 'react'
import { IoPersonOutline, IoBriefcaseOutline, IoLocationOutline, IoLinkOutline, IoSaveOutline } from 'react-icons/io5'

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    title: 'Product Designer',
    company: 'Design Co.',
    location: 'San Francisco, CA',
    bio: 'Product designer with 5+ years of experience in SaaS and mobile applications. Passionate about creating intuitive user experiences and solving complex problems through design.',
    website: 'johndoe.design',
    skills: ['UI/UX Design', 'Product Strategy', 'User Research', 'Prototyping', 'Design Systems'],
    interests: ['Technology', 'Design', 'Startups', 'Photography', 'Travel'],
    email: 'john@example.com',
    phone: '(555) 123-4567',
    isPublic: true,
  })
  
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(profile)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  
  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      [name]: checked,
    })
  }
  
  const handleTagChange = (field: 'skills' | 'interests', value: string) => {
    const values = value.split(',').map(item => item.trim()).filter(Boolean)
    setFormData({
      ...formData,
      [field]: values,
    })
  }
  
  const handleSave = () => {
    setProfile(formData)
    setIsEditing(false)
  }
  
  const handleCancel = () => {
    setFormData(profile)
    setIsEditing(false)
  }
  
  return (
    <div className="dashboard-grid">
      <DashboardSidebar />
      
      <main className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Profile</h1>
              <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
            </div>
            
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-sm font-medium text-white"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-sm font-medium text-white flex items-center"
                >
                  <IoSaveOutline className="mr-1.5 w-4 h-4" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            {/* Profile Header */}
            <div className="relative">
              <div className="h-32 bg-gradient-to-r from-blue-400 to-emerald-400"></div>
              <div className="absolute bottom-0 left-8 transform translate-y-1/2">
                <div className="w-24 h-24 rounded-full bg-white p-1">
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                    <IoPersonOutline className="w-10 h-10 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-16 px-8 pb-8">
              {/* Basic Info */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
                
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Job Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                        Website
                      </label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-6">
                      <input
                        type="checkbox"
                        id="isPublic"
                        name="isPublic"
                        checked={formData.isPublic}
                        onChange={handleToggleChange}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="isPublic" className="text-sm text-gray-700">
                        Make profile public
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <h3 className="text-2xl font-bold text-gray-900">{profile.name}</h3>
                      <div className="flex items-center mt-2 md:mt-0">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          profile.isPublic ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {profile.isPublic ? 'Public Profile' : 'Private Profile'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center text-gray-600">
                        <IoBriefcaseOutline className="w-5 h-5 mr-2" />
                        <span>{profile.title} at {profile.company}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <IoLocationOutline className="w-5 h-5 mr-2" />
                        <span>{profile.location}</span>
                      </div>
                      
                      {profile.website && (
                        <div className="flex items-center text-gray-600">
                          <IoLinkOutline className="w-5 h-5 mr-2" />
                          <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {profile.website}
                          </a>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-700 mt-4">{profile.bio}</p>
                  </div>
                )}
              </div>
              
              {/* Skills & Interests */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Skills & Interests</h2>
                
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                        Skills (comma separated)
                      </label>
                      <input
                        type="text"
                        id="skills"
                        name="skills"
                        value={formData.skills.join(', ')}
                        onChange={(e) => handleTagChange('skills', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">
                        Interests (comma separated)
                      </label>
                      <input
                        type="text"
                        id="interests"
                        name="interests"
                        value={formData.interests.join(', ')}
                        onChange={(e) => handleTagChange('interests', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill, index) => (
                          <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.interests.map((interest, index) => (
                          <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Contact Information */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
                
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-1">Email</h3>
                      <p className="text-gray-900">{profile.email}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-1">Phone</h3>
                      <p className="text-gray-900">{profile.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
