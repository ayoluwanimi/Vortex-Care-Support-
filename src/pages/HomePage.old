import { Link } from 'react-router-dom';
import { useDataStore } from '@/store/dataStore';
import { 
  ArrowRight, Calendar, Shield, Users, Award, Clock, CheckCircle,
  Heart, Stethoscope, Brain, Video, FlaskConical, Star, Phone
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-8 h-8" />,
  Stethoscope: <Stethoscope className="w-8 h-8" />,
  Shield: <Shield className="w-8 h-8" />,
  Brain: <Brain className="w-8 h-8" />,
  Video: <Video className="w-8 h-8" />,
  FlaskConical: <FlaskConical className="w-8 h-8" />,
};

export function HomePage() {
  const { services, teamMembers, testimonials, settings } = useDataStore();
  const activeServices = services.filter(s => s.isActive).slice(0, 6);
  const activeTeam = teamMembers.filter(t => t.isActive).slice(0, 4);
  const approvedTestimonials = testimonials.filter(t => t.isApproved);

  const stats = [
    { icon: <Users className="w-6 h-6" />, value: '50,000+', label: 'Patients Served' },
    { icon: <Award className="w-6 h-6" />, value: '25+', label: 'Years Experience' },
    { icon: <Stethoscope className="w-6 h-6" />, value: '100+', label: 'Medical Experts' },
    { icon: <Star className="w-6 h-6" />, value: '4.9', label: 'Patient Rating' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/70"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">Trusted Healthcare Partner</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Your Health Is Our{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Top Priority
                </span>
              </h1>
              
              <p className="text-lg text-blue-100 max-w-xl">
                At Vortex Care Support, we provide comprehensive healthcare services with compassion, 
                expertise, and cutting-edge technology. Your wellness journey starts here.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/book-appointment"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/25"
                >
                  <Calendar size={20} />
                  Book Appointment
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 backdrop-blur-sm transition-colors border border-white/20"
                >
                  Explore Services
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
                  <p className="font-semibold">Join 50,000+ patients</p>
                  <p className="text-sm text-blue-200">who trust our care</p>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=600"
                  alt="Healthcare Professional"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">24/7 Support</p>
                    <p className="text-sm text-gray-500">Always here for you</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Quick Response</p>
                    <p className="text-sm text-gray-500">Same day appointments</p>
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

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a wide range of medical services to meet all your healthcare needs under one roof.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeServices.map(service => (
              <div key={service.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.featuredImage}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 -mt-12 relative z-10 border-4 border-white shadow-md">
                    {iconMap[service.icon] || <Heart className="w-6 h-6" />}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.shortDescription}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-semibold">${service.price}</span>
                    <Link
                      to={`/book-appointment?service=${service.id}`}
                      className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1"
                    >
                      Book Now <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              View All Services
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600"
                alt="About Vortex Care"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-emerald-500 text-white rounded-2xl p-6 shadow-lg">
                <p className="text-4xl font-bold">25+</p>
                <p className="text-emerald-100">Years of Excellence</p>
              </div>
            </div>

            <div className="space-y-6">
              <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Dedicated to Your Health & Wellbeing
              </h2>
              <p className="text-gray-600">
                {settings.description} With over 25 years of experience, we have been serving our community with 
                dedication and excellence. Our team of healthcare professionals is committed to providing 
                personalized care that meets your unique needs.
              </p>

              <div className="space-y-4">
                {[
                  'State-of-the-art medical facilities',
                  'Board-certified physicians and specialists',
                  'Personalized treatment plans',
                  'Compassionate patient care',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Learn More About Us
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Doctors
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team of experienced healthcare professionals is dedicated to providing you with the best possible care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeTeam.map(member => (
              <div key={member.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 text-sm mb-2">{member.role}</p>
                  <p className="text-gray-500 text-sm">{member.department}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/about#team"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
            >
              View Full Team
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-white/10 text-blue-200 rounded-full text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Patients Say
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Don't just take our word for it. Hear from our satisfied patients about their experience with us.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {approvedTestimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}
                    />
                  ))}
                </div>
                <p className="text-blue-100 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  {testimonial.image ? (
                    <img src={testimonial.image} alt={testimonial.patientName} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                      {testimonial.patientName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{testimonial.patientName}</p>
                    <p className="text-sm text-blue-200">Verified Patient</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Take the First Step?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Schedule your appointment today and experience healthcare that puts you first. 
            Our team is ready to help you on your journey to better health.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Calendar size={20} />
              Schedule Appointment
            </Link>
            <a
              href={`tel:${settings.phone}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/30"
            >
              <Phone size={20} />
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
