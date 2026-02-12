import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useDataStore } from '@/store/dataStore';
import type { JobApplication } from '@/types';
import { format } from 'date-fns';
import { ArrowRight, Briefcase, CheckCircle, Clock, FileText, Search } from 'lucide-react';

export function JobSeekerPortal() {
  const { user } = useAuthStore();
  const { jobApplications, jobPositions } = useDataStore();
  const [searchTerm, setSearchTerm] = useState('');

  // Get user's applications
  const userApplications = jobApplications.filter(
    app => app.applicantEmail === user?.email
  );

  // Filter applications based on search
  const filteredApplications = userApplications.filter(app =>
    app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Applications Submitted', value: userApplications.length, icon: <FileText className="w-6 h-6" />, color: 'bg-blue-500' },
    { label: 'Under Review', value: userApplications.filter(a => a.status === 'under-review' || a.status === 'submitted').length, icon: <Clock className="w-6 h-6" />, color: 'bg-yellow-500' },
    { label: 'Shortlisted', value: userApplications.filter(a => a.status === 'shortlisted').length, icon: <CheckCircle className="w-6 h-6" />, color: 'bg-emerald-500' },
    { label: 'Job Offers', value: userApplications.filter(a => a.status === 'offered').length, icon: <Briefcase className="w-6 h-6" />, color: 'bg-purple-500' },
  ];

  const statusColors: Record<JobApplication['status'], string> = {
    submitted: 'bg-gray-100 text-gray-700',
    'under-review': 'bg-blue-100 text-blue-700',
    shortlisted: 'bg-emerald-100 text-emerald-700',
    rejected: 'bg-red-100 text-red-700',
    offered: 'bg-purple-100 text-purple-700',
    hired: 'bg-green-100 text-green-700',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">My Career Dashboard</h1>
          <p className="text-lg text-white/90">Track your job applications and career progress</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">{user?.firstName?.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{user?.firstName} {user?.lastName}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-500 mt-1">{user?.phone}</p>
              </div>
            </div>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Search size={20} />
              Browse More Jobs
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">My Applications</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {filteredApplications.length === 0 ? (
            <div className="p-12 text-center">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">No Applications</h4>
              <p className="text-gray-600 mb-6">
                {userApplications.length === 0
                  ? "You haven't applied for any positions yet."
                  : "No applications match your search."}
              </p>
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Browse Job Positions
                <ArrowRight size={20} />
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {filteredApplications.map((application) => (
                <div
                  key={application.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {application.jobTitle}
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            statusColors[application.status]
                          }`}
                        >
                          {application.status.replace('-', ' ')}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Applied</p>
                          <p className="font-medium">
                            {format(new Date(application.createdAt), 'MMM d, yyyy')}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Experience</p>
                          <p className="font-medium">{application.yearsOfExperience} years</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Last Updated</p>
                          <p className="font-medium">
                            {format(new Date(application.updatedAt), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>

                      {application.notes && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
                          <p className="font-medium mb-1">Admin Note:</p>
                          <p>{application.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="text-right">
                        {application.status === 'offered' && (
                          <div className="text-emerald-600 font-semibold text-sm">
                            ✓ Job Offer
                          </div>
                        )}
                        {application.status === 'hired' && (
                          <div className="text-green-600 font-semibold text-sm">
                            ✓ Hired
                          </div>
                        )}
                        {application.status === 'rejected' && (
                          <div className="text-red-600 font-semibold text-sm">
                            ✗ Not Selected
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        {userApplications.length < 3 && (
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Keep Exploring Opportunities!
            </h3>
            <p className="text-gray-600 mb-4">
              The more positions you apply to, the better your chances of finding the perfect role. Browse our job listings and apply today.
            </p>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              View All Positions
              <ArrowRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
