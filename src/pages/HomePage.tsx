import { Link } from 'react-router-dom';
import { useDataStore } from '@/store/dataStore';
import { 
  ArrowRight, Briefcase, MapPin, Clock, Users, Award, Heart, Building2, 
  CheckCircle, Star, Zap, TrendingUp
} from 'lucide-react';

export function HomePage() {
  const { jobPositions, settings } = useDataStore();
  const activePositions = jobPositions.filter(p => p.isActive);

  const stats = [
    { icon: <Briefcase className="w-6 h-6" />, value: activePositions.length, label: 'Open Positions' },
    { icon: <Users className="w-6 h-6" />, value: '500+', label: 'Healthcare Professionals' },
    { icon: <Award className="w-6 h-6" />, value: '25+', label: 'Years Experience' },
    { icon: <Building2 className="w-6 h-6" />, value: '15+', label: 'Locations' },
  ];

  const benefits = [
    { icon: <Heart className="w-8 h-8" />, title: 'Health Benefits', description: 'Comprehensive medical, dental, and vision coverage' },
    { icon: <TrendingUp className="w-8 h-8" />, title: 'Career Growth', description: 'Professional development and advancement opportunities' },
    { icon: <Clock className="w-8 h-8" />, title: 'Flexible Schedule', description: 'Work-life balance with flexible working arrangements' },
    { icon: <Award className="w-8 h-8" />, title: 'Competitive Pay', description: 'Industry-leading compensation packages' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/70"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">Join Our Growing Team</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Build Your Career in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Healthcare
                </span>
              </h1>
              
              <p className="text-lg text-blue-100 max-w-xl">
                Join Vortex Healthcare and make a difference in patients' lives. We're seeking dedicated healthcare professionals 
                to join our innovative and compassionate team.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/jobs"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/25"
                >
                  <Briefcase size={20} />
                  Browse Positions
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 backdrop-blur-sm transition-colors border border-white/20"
                >
                  Learn About Us
                  <ArrowRight size={20} />
                </Link>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-blue-800 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xs font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-semibold">Join 500+ Professionals</p>
                  <p className="text-sm text-blue-200">working at Vortex Healthcare</p>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80"
                  alt="Healthcare Team"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Great Culture</p>
                    <p className="text-sm text-gray-500">Work with dedicated professionals</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Growing Fast</p>
                    <p className="text-sm text-gray-500">New opportunities daily</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors">
                <div className="w-14 h-14 mx-auto mb-4 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  {stat.icon}
                </div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Positions Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
              Open Positions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Available Job Opportunities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're hiring talented healthcare professionals across multiple departments and locations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activePositions.slice(0, 6).map(position => (
              <div key={position.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
                <div className="h-48 overflow-hidden">
                  <img
                    src={position.featuredImage}
                    alt={position.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{position.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MapPin size={16} />
                      {position.location}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Clock size={16} />
                      {position.jobType.replace('-', ' ')}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Building2 size={16} />
                      {position.department}
                    </div>
                  </div>

                  <div className="mb-4 pb-4 border-b">
                    <p className="text-2xl font-bold text-emerald-600">
                      ${position.salary.min.toLocaleString()} - ${position.salary.max.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">{position.salary.currency}/year</p>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{position.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-600 font-medium">
                      {position.applicationsCount} applications
                    </span>
                    <Link
                      to={`/apply/${position.id}`}
                      className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1"
                    >
                      Apply Now <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              View All Positions
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Join Vortex Healthcare?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a supportive environment where you can grow, develop, and make a real impact on patients' lives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="text-emerald-500 mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Launch Your Healthcare Career?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of healthcare professionals who have found their calling at Vortex Healthcare. 
            Start your journey with us today.
          </p>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
          >
            Browse Our Open Positions
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
