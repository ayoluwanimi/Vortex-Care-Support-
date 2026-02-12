import { Link } from 'react-router-dom';
import { useDataStore } from '@/store/dataStore';
import { CheckCircle, Award, Users, Target, Heart, ArrowRight } from 'lucide-react';

export function AboutPage() {
  const { teamMembers } = useDataStore();
  const activeTeam = teamMembers.filter(t => t.isActive);

  const values = [
    { icon: <Heart className="w-8 h-8" />, title: 'Compassion', description: 'We treat every patient with empathy, understanding, and genuine care for their wellbeing.' },
    { icon: <Award className="w-8 h-8" />, title: 'Excellence', description: 'We strive for the highest standards in healthcare delivery and patient outcomes.' },
    { icon: <Users className="w-8 h-8" />, title: 'Collaboration', description: 'We work together as a team and with our patients to achieve the best health results.' },
    { icon: <Target className="w-8 h-8" />, title: 'Innovation', description: 'We embrace new technologies and methodologies to improve patient care.' },
  ];

  const milestones = [
    { year: '1998', title: 'Founded', description: 'Vortex Care and Support was established with a mission to provide quality healthcare.' },
    { year: '2005', title: 'Expansion', description: 'Opened our second facility and expanded our team of specialists.' },
    { year: '2012', title: 'Technology', description: 'Implemented state-of-the-art electronic health records system.' },
    { year: '2018', title: 'Telehealth', description: 'Launched our telehealth platform for remote consultations.' },
    { year: '2023', title: '50K Patients', description: 'Reached milestone of serving over 50,000 patients.' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-white/10 text-blue-200 rounded-full text-sm font-medium mb-4">
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Your Trusted Partner in Healthcare Excellence
              </h1>
              <p className="text-xl text-blue-200">
                For over 25 years, Vortex Care and Support has been committed to providing exceptional healthcare services to our community.
              </p>
            </div>
            <div className="relative hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80"
                alt="Healthcare Facility"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-blue-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To provide accessible, high-quality healthcare services that improve the health and wellbeing of our community. 
                We are committed to delivering compassionate care through a patient-centered approach, utilizing advanced 
                medical technologies and evidence-based practices.
              </p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To be the leading healthcare provider recognized for clinical excellence, innovation, and exceptional patient 
                experience. We envision a healthier community where everyone has access to the care they need to live their 
                best lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Drives Us Every Day
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              25+ Years of Excellence
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 hidden md:block" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`bg-gray-50 rounded-xl p-6 inline-block ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                      <span className="text-blue-600 font-bold text-xl">{milestone.year}</span>
                      <h3 className="font-semibold text-gray-900 mt-1">{milestone.title}</h3>
                      <p className="text-gray-600 text-sm mt-2">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-12 h-12 bg-blue-600 rounded-full items-center justify-center text-white font-bold z-10">
                    <CheckCircle size={24} />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Healthcare Experts
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team of experienced professionals is dedicated to providing you with the highest quality care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeTeam.map(member => (
              <div key={member.id} className="bg-white rounded-2xl shadow-sm overflow-hidden group">
                <div className="h-72 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 text-sm mb-2">{member.role}</p>
                  <p className="text-gray-500 text-sm mb-3">{member.department}</p>
                  <div className="flex flex-wrap gap-1">
                    {member.specializations.slice(0, 2).map((spec, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
              Accreditations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Certified & Recognized
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {['HIPAA Compliant', 'Joint Commission', 'AAAHC Certified', 'NCQA Recognized'].map((cert, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                <Award className="w-12 h-12 mx-auto text-blue-600 mb-3" />
                <p className="font-medium text-gray-900">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Our Care?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Schedule an appointment today and discover the Vortex Care and Support difference.
          </p>
          <Link
            to="/book-appointment"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
          >
            Book Appointment
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
