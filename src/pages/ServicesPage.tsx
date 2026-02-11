import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDataStore } from '@/store/dataStore';
import { Search, Clock, ArrowRight, Heart, Stethoscope, Shield, Brain, Video, FlaskConical } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-6 h-6" />,
  Stethoscope: <Stethoscope className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  Video: <Video className="w-6 h-6" />,
  FlaskConical: <FlaskConical className="w-6 h-6" />,
};

export function ServicesPage() {
  const { services } = useDataStore();
  const activeServices = services.filter(s => s.isActive);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(activeServices.map(s => s.category))];

  const filteredServices = activeServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Healthcare Services</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Comprehensive medical care tailored to your needs. Explore our range of services designed to keep you healthy.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No services found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map(service => (
                <div key={service.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow overflow-hidden group">
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={service.featuredImage}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-600 text-sm font-medium rounded-full">
                        {service.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                        {iconMap[service.icon] || <Heart className="w-6 h-6" />}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">${service.price}</p>
                        <p className="text-sm text-gray-500">per session</p>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{service.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {service.duration} mins
                      </span>
                    </div>
                    
                    <Link
                      to={`/book-appointment?service=${service.id}`}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      Book Appointment
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-gray-600 mb-8">
            Contact us to learn more about our comprehensive healthcare services or to discuss your specific needs.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            Contact Us
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
