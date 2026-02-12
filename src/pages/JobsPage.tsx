import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDataStore } from '@/store/dataStore';
import { MapPin, Briefcase, Clock, DollarSign, ArrowRight, Search, Filter } from 'lucide-react';

export function JobsPage() {
  const { jobPositions } = useDataStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobType, setSelectedJobType] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const activePositions = jobPositions.filter(p => p.isActive);
  
  const departments = Array.from(new Set(activePositions.map(p => p.department)));
  const locations = Array.from(new Set(activePositions.map(p => p.location)));
  const jobTypes = Array.from(new Set(activePositions.map(p => p.jobType)));

  const filtered = activePositions.filter(position => {
    const matchesSearch = position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         position.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesJobType = !selectedJobType || position.jobType === selectedJobType;
    const matchesDepartment = !selectedDepartment || position.department === selectedDepartment;
    const matchesLocation = !selectedLocation || position.location === selectedLocation;
    
    return matchesSearch && matchesJobType && matchesDepartment && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Available Positions</h1>
          <p className="text-lg text-white/90">Find your next career opportunity in healthcare</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Filter size={18} />
                  Filters
                </h3>
              </div>

              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Job title, keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Job Type</label>
                <div className="space-y-2">
                  {jobTypes.map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedJobType === type}
                        onChange={() => setSelectedJobType(selectedJobType === type ? null : type)}
                        className="rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm text-gray-700 capitalize">{type.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Department</label>
                <div className="space-y-2">
                  {departments.map(dept => (
                    <label key={dept} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedDepartment === dept}
                        onChange={() => setSelectedDepartment(selectedDepartment === dept ? null : dept)}
                        className="rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">{dept}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Location</label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {locations.map(loc => (
                    <label key={loc} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedLocation === loc}
                        onChange={() => setSelectedLocation(selectedLocation === loc ? null : loc)}
                        className="rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">{loc}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedJobType(null);
                  setSelectedDepartment(null);
                  setSelectedLocation(null);
                }}
                className="w-full py-2 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filtered.length}</span> positions
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No positions found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map(position => (
                  <Link
                    key={position.id}
                    to={`/apply/${position.id}`}
                    className="block"
                  >
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6 group">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-grow">
                          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                            {position.title}
                          </h3>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin size={18} className="flex-shrink-0" />
                              <span className="text-sm">{position.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Briefcase size={18} className="flex-shrink-0" />
                              <span className="text-sm capitalize">{position.jobType.replace('-', ' ')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock size={18} className="flex-shrink-0" />
                              <span className="text-sm capitalize">{position.experienceLevel.replace('-', ' ')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                              <DollarSign size={18} className="flex-shrink-0" />
                              <span className="text-sm">${position.salary.min.toLocaleString()}</span>
                            </div>
                          </div>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{position.description}</p>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {position.applicationsCount} applications
                            </span>
                            <span className="text-blue-600 font-medium flex items-center gap-1">
                              View Details <ArrowRight size={16} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
