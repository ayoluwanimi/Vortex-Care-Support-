import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useDataStore } from '@/store/dataStore';
import { format } from 'date-fns';
import {
  LayoutDashboard, Calendar, FileText, CreditCard, MessageSquare,
  LogOut, Settings, ArrowLeft, CheckCircle, Plus
} from 'lucide-react';

type Tab = 'dashboard' | 'appointments' | 'records' | 'billing' | 'messages' | 'settings';

export function PatientPortal() {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuthStore();
  const { appointments } = useDataStore();
  
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleUpdateProfile = () => {
    updateUser(profileForm);
    setIsEditingProfile(false);
  };

  // Get patient's appointments (matching by email)
  const myAppointments = appointments.filter(
    a => a.patientEmail.toLowerCase() === user?.email?.toLowerCase()
  );

  const upcomingAppointments = myAppointments.filter(
    a => new Date(a.appointmentDate) >= new Date() && a.status !== 'cancelled'
  );

  const pastAppointments = myAppointments.filter(
    a => new Date(a.appointmentDate) < new Date() || a.status === 'completed'
  );

  const menuItems = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'appointments' as Tab, label: 'Appointments', icon: <Calendar size={20} /> },
    { id: 'records' as Tab, label: 'Medical Records', icon: <FileText size={20} /> },
    { id: 'billing' as Tab, label: 'Billing', icon: <CreditCard size={20} /> },
    { id: 'messages' as Tab, label: 'Messages', icon: <MessageSquare size={20} /> },
    { id: 'settings' as Tab, label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">{user?.firstName?.charAt(0)}</span>
            </div>
            <div>
              <h2 className="font-semibold">{user?.firstName} {user?.lastName}</h2>
              <p className="text-sm text-gray-500">Patient</p>
            </div>
          </div>
        </div>

        <nav className="flex-grow p-4 space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors mb-2"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.firstName}!</h1>
                <p className="text-gray-500">Here's an overview of your health journey</p>
              </div>
              <Link
                to="/book-appointment"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus size={20} />
                Book Appointment
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{upcomingAppointments.length}</p>
                    <p className="text-gray-500 text-sm">Upcoming Appointments</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{pastAppointments.length}</p>
                    <p className="text-gray-500 text-sm">Completed Visits</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-gray-500 text-sm">Medical Records</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
                <Link to="/book-appointment" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Book New
                </Link>
              </div>
              <div className="p-6">
                {upcomingAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No upcoming appointments</p>
                    <Link
                      to="/book-appointment"
                      className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Schedule your first appointment
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingAppointments.slice(0, 3).map(apt => (
                      <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{apt.serviceName}</p>
                            <p className="text-sm text-gray-500">
                              {format(new Date(apt.appointmentDate), 'EEEE, MMMM d, yyyy')} at {apt.appointmentTime}
                            </p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                          apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {apt.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Health Tips */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <h3 className="font-semibold text-lg mb-2">Health Tip of the Day</h3>
              <p className="text-blue-100">
                Stay hydrated! Drinking at least 8 glasses of water daily helps maintain your body's fluid balance, 
                aids digestion, and keeps your skin healthy.
              </p>
            </div>
          </div>
        )}

        {/* Appointments */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
              <Link
                to="/book-appointment"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus size={20} />
                Book New
              </Link>
            </div>

            {myAppointments.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments yet</h3>
                <p className="text-gray-500 mb-6">Book your first appointment to get started</p>
                <Link
                  to="/book-appointment"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus size={20} />
                  Book Appointment
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-sm text-gray-500">
                      <th className="px-6 py-3">Service</th>
                      <th className="px-6 py-3">Date & Time</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Confirmation #</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {myAppointments.map(apt => (
                      <tr key={apt.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="font-medium">{apt.serviceName}</p>
                          <p className="text-sm text-gray-500">{apt.duration} minutes</p>
                        </td>
                        <td className="px-6 py-4">
                          <p>{format(new Date(apt.appointmentDate), 'MMM d, yyyy')}</p>
                          <p className="text-sm text-gray-500">{apt.appointmentTime}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            apt.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono text-sm">
                          {apt.id.slice(-8).toUpperCase()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Medical Records */}
        {activeTab === 'records' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No records available</h3>
              <p className="text-gray-500">Your medical records will appear here after your appointments</p>
            </div>
          </div>
        )}

        {/* Billing */}
        {activeTab === 'billing' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Billing & Payments</h1>
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No billing history</h3>
              <p className="text-gray-500">Your invoices and payment history will appear here</p>
            </div>
          </div>
        )}

        {/* Messages */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No messages</h3>
              <p className="text-gray-500">Communicate securely with your healthcare providers here</p>
            </div>
          </div>
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-6">Profile Information</h2>
              
              {isEditingProfile ? (
                <div className="space-y-4 max-w-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        value={profileForm.firstName}
                        onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={profileForm.lastName}
                        onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleUpdateProfile}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-2xl">{user?.firstName?.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{user?.firstName} {user?.lastName}</p>
                      <p className="text-gray-500">{user?.email}</p>
                      <p className="text-gray-500">{user?.phone}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Security</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Change Password
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Notifications</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span>Email notifications for appointments</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span>SMS reminders before appointments</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span>Newsletter and health tips</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
