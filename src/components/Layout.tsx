import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useDataStore } from '@/store/dataStore';
import { 
  Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram,
  ChevronDown, User, LogOut, LayoutDashboard
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { settings } = useDataStore();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/jobs', label: 'Job Positions' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const isAdmin = user?.role === 'super_admin' || user?.role === 'admin' || user?.role === 'staff' || user?.role === 'doctor';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <a href={`tel:${settings.phone}`} className="flex items-center gap-1 hover:text-blue-200 transition-colors">
              <Phone size={14} />
              <span>{settings.phone}</span>
            </a>
            <a href={`mailto:${settings.email}`} className="flex items-center gap-1 hover:text-blue-200 transition-colors">
              <Mail size={14} />
              <span>{settings.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors">
              <Facebook size={16} />
            </a>
            <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors">
              <Twitter size={16} />
            </a>
            <a href={settings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors">
              <Linkedin size={16} />
            </a>
            <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors">
              <Instagram size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Vortex Care</h1>
                <p className="text-xs text-gray-500">Support LTD</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <User size={18} className="text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-700">{user.firstName}</span>
                    <ChevronDown size={16} className={`text-gray-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full capitalize">
                          {user.role.replace('_', ' ')}
                        </span>
                      </div>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <LayoutDashboard size={18} />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}
                      <Link
                        to="/job-seeker-portal"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User size={18} />
                        <span>My Applications</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full"
                      >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                {isAuthenticated && user ? (
                  <>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      to="/job-seeker-portal"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                    >
                      My Applications
                    </Link>
                    <button
                      onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                      className="block w-full text-left px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 text-center"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">V</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Vortex Care</h3>
                  <p className="text-xs text-gray-400">Support LTD</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {settings.description}
              </p>
              <div className="flex gap-3">
                <a href={settings.socialLinks.facebook} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Facebook size={18} />
                </a>
                <a href={settings.socialLinks.twitter} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <Twitter size={18} />
                </a>
                <a href={settings.socialLinks.linkedin} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href={settings.socialLinks.instagram} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <Instagram size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Job Categories */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Job Categories</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/jobs" className="text-gray-400 hover:text-white transition-colors">Nursing</Link></li>
                <li><Link to="/jobs" className="text-gray-400 hover:text-white transition-colors">Clinical</Link></li>
                <li><Link to="/jobs" className="text-gray-400 hover:text-white transition-colors">Laboratory</Link></li>
                <li><Link to="/jobs" className="text-gray-400 hover:text-white transition-colors">Administration</Link></li>
                <li><Link to="/jobs" className="text-gray-400 hover:text-white transition-colors">All Positions</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400">{settings.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-blue-400 flex-shrink-0" />
                  <a href={`tel:${settings.phone}`} className="text-gray-400 hover:text-white transition-colors">{settings.phone}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-blue-400 flex-shrink-0" />
                  <a href={`mailto:${settings.email}`} className="text-gray-400 hover:text-white transition-colors">{settings.email}</a>
                </li>
              </ul>
              <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">Emergency Hotline</p>
                <a href={`tel:${settings.emergencyContact}`} className="text-lg font-bold text-red-400 hover:text-red-300 transition-colors">
                  {settings.emergencyContact}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} Vortex Care Support LTD. All rights reserved.</p>
              <div className="flex gap-6">
                <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link to="/hipaa-compliance" className="hover:text-white transition-colors">HIPAA Compliance</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
