'use client'

import { useState } from 'react'

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    licensed: '',
    specialties: [] as string[],
    availability: '',
    whyJoin: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const specialtyOptions = [
    'Fades',
    'Tapers',
    'Beard Grooming',
    'Hot Towel Shaves',
    'Hair Design/Patterns',
    'Kids Cuts',
    'Color Services',
  ]

  const handleSpecialtyChange = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit application')
      }

      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or email us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="text-6xl mb-4">✂️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Received!</h2>
          <p className="text-gray-600">
            Thank you for your interest in joining Tapered Edges. We&apos;ll review your application and get back to you soon.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            ✂️ Join Our Team
          </h1>
          <p className="text-gray-400">
            Tapered Edges is looking for talented barbers
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="space-y-6">
            {/* Personal Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                Personal Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                Experience & Qualifications
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Years of Experience *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    value={formData.experience}
                    onChange={e => setFormData({...formData, experience: e.target.value})}
                  >
                    <option value="">Select...</option>
                    <option value="0-1">Less than 1 year</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Licensed Barber? *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    value={formData.licensed}
                    onChange={e => setFormData({...formData, licensed: e.target.value})}
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes, fully licensed</option>
                    <option value="in-progress">In progress</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialties (check all that apply)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {specialtyOptions.map(specialty => (
                    <label key={specialty} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                        checked={formData.specialties.includes(specialty)}
                        onChange={() => handleSpecialtyChange(specialty)}
                      />
                      <span className="text-sm text-gray-700">{specialty}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                Availability
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  When can you start? *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  value={formData.availability}
                  onChange={e => setFormData({...formData, availability: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="immediately">Immediately</option>
                  <option value="1-week">Within 1 week</option>
                  <option value="2-weeks">Within 2 weeks</option>
                  <option value="1-month">Within 1 month</option>
                  <option value="other">Other (explain below)</option>
                </select>
              </div>
            </div>

            {/* Why Join */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Why do you want to join Tapered Edges? *
              </label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                placeholder="Tell us about yourself and why you'd be a great fit..."
                value={formData.whyJoin}
                onChange={e => setFormData({...formData, whyJoin: e.target.value})}
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Questions? Contact us at dedra@taperededges.com
        </p>
      </div>
    </div>
  )
}
