import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore, getAllUsers, createUser, updateUserById, deleteUserById, resetUserPassword } from '@/store/authStore';
import { useDataStore } from '@/store/dataStore';
import type { User, Appointment } from '@/types';
import { format } from 'date-fns';
import {
  LayoutDashboard, Users, Calendar, FileText, Settings, LogOut,
  Menu, X, Plus, Pencil, Trash2, Key, Search,
  CheckCircle, XCircle, Clock, UserPlus, Activity,
  MessageSquare, Bell, ArrowLeft
} from 'lucide-react';

type Tab = 'dashboard' | 'users' | 'appointments' | 'patients' | 'services' | 'content' | 'messages' | 'settings';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { appointments, patients, services, contactMessages, testimonials, updateAppointment, deleteAppointment, settings, updateSettings } = useDataStore();
  
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(getAllUsers());

  // User form state
  const [userForm, setUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'staff' as User['role'],
    department: '',
    password: '',
    isActive: true,
  });

  const refreshUsers = () => setUsers(getAllUsers());

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const canManageUsers = user?.role === 'super_admin' || user?.role === 'admin';

  const menuItems = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'users' as Tab, label: 'User Management', icon: <Users size={20} />, adminOnly: true },
    { id: 'appointments' as Tab, label: 'Appointments', icon: <Calendar size={20} /> },
    { id: 'patients' as Tab, label: 'Patients', icon: <UserPlus size={20} /> },
    { id: 'services' as Tab, label: 'Services', icon: <Activity size={20} /> },
    { id: 'content' as Tab, label: 'Content', icon: <FileText size={20} /> },
    { id: 'messages' as Tab, label: 'Messages', icon: <MessageSquare size={20} /> },
    { id: 'settings' as Tab, label: 'Settings', icon: <Settings size={20} /> },
  ];

  const stats = [
    { label: 'Total Patients', value: patients.length, icon: <Users className="w-6 h-6" />, color: 'bg-blue-500' },
    { label: 'Appointments Today', value: appointments.filter(a => a.appointmentDate === format(new Date(), 'yyyy-MM-dd')).length, icon: <Calendar className="w-6 h-6" />, color: 'bg-emerald-500' },
    { label: 'Pending Appointments', value: appointments.filter(a => a.status === 'pending').length, icon: <Clock className="w-6 h-6" />, color: 'bg-yellow-500' },
    { label: 'Active Services', value: services.filter(s => s.isActive).length, icon: <Activity className="w-6 h-6" />, color: 'bg-purple-500' },
  ];

  const handleCreateUser = () => {
    if (!userForm.email || !userForm.firstName || !userForm.password) return;
    
    createUser({
      ...userForm,
      isEmailVerified: true,
    });
    refreshUsers();
    setShowUserModal(false);
    resetUserForm();
  };

  const handleUpdateUser = () => {
    if (!editingUser) return;
    
    const updateData: Partial<User> = {
      firstName: userForm.firstName,
      lastName: userForm.lastName,
      email: userForm.email,
      phone: userForm.phone,
      role: userForm.role,
      department: userForm.department,
      isActive: userForm.isActive,
    };
    
    if (userForm.password) {
      updateData.password = userForm.password;
    }
    
    updateUserById(editingUser.id, updateData);
    refreshUsers();
    setShowUserModal(false);
    setEditingUser(null);
    resetUserForm();
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUserById(userId);
      refreshUsers();
    }
  };

  const handleResetPassword = (userId: string) => {
    const newPassword = prompt('Enter new password:');
    if (newPassword) {
      resetUserPassword(userId, newPassword);
      alert('Password has been reset successfully!');
    }
  };

  const resetUserForm = () => {
    setUserForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'staff',
      department: '',
      password: '',
      isActive: true,
    });
  };

  const openEditUser = (u: User) => {
    setEditingUser(u);
    setUserForm({
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      phone: u.phone,
      role: u.role,
      department: u.department || '',
      password: '',
      isActive: u.isActive,
    });
    setShowUserModal(true);
  };

  const handleAppointmentStatus = (id: string, status: Appointment['status']) => {
    updateAppointment(id, { status });
  };

  const unreadMessages = contactMessages.filter(m => !m.isRead).length;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-400 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="font-bold">V</span>
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold">Vortex Care</h1>
                <p className="text-xs text-gray-400">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-grow p-4 space-y-1">
          {menuItems.map(item => {
            if (item.adminOnly && !canManageUsers) return null;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                {item.icon}
                {sidebarOpen && <span>{item.label}</span>}
                {item.id === 'messages' && unreadMessages > 0 && sidebarOpen && (
                  <span className="ml-auto bg-red-500 text-xs px-2 py-0.5 rounded-full">{unreadMessages}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors mb-2"
          >
            <ArrowLeft size={20} />
            {sidebarOpen && <span>Back to Site</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h2 className="text-xl font-semibold text-gray-900 capitalize">{activeTab.replace('-', ' ')}</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell size={20} />
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadMessages}
                </span>
              )}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">{user?.firstName?.charAt(0)}</span>
              </div>
              <div className="hidden md:block">
                <p className="font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role?.replace('_', ' ')}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-grow p-6 overflow-auto">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

              {/* Recent Appointments */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Appointments</h3>
                </div>
                <div className="p-6">
                  {appointments.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No appointments yet</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-sm text-gray-500">
                            <th className="pb-3">Patient</th>
                            <th className="pb-3">Service</th>
                            <th className="pb-3">Date & Time</th>
                            <th className="pb-3">Status</th>
                            <th className="pb-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {appointments.slice(0, 5).map(apt => (
                            <tr key={apt.id}>
                              <td className="py-3">
                                <p className="font-medium">{apt.patientName}</p>
                                <p className="text-sm text-gray-500">{apt.patientEmail}</p>
                              </td>
                              <td className="py-3">{apt.serviceName}</td>
                              <td className="py-3">
                                <p>{apt.appointmentDate}</p>
                                <p className="text-sm text-gray-500">{apt.appointmentTime}</p>
                              </td>
                              <td className="py-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                  apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                  apt.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {apt.status}
                                </span>
                              </td>
                              <td className="py-3">
                                <div className="flex gap-2">
                                  {apt.status === 'pending' && (
                                    <>
                                      <button
                                        onClick={() => handleAppointmentStatus(apt.id, 'confirmed')}
                                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                                        title="Confirm"
                                      >
                                        <CheckCircle size={18} />
                                      </button>
                                      <button
                                        onClick={() => handleAppointmentStatus(apt.id, 'cancelled')}
                                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                                        title="Cancel"
                                      >
                                        <XCircle size={18} />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && canManageUsers && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="relative w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <button
                  onClick={() => { resetUserForm(); setEditingUser(null); setShowUserModal(true); }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus size={20} />
                  Add User
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-sm text-gray-500">
                      <th className="px-6 py-3">User</th>
                      <th className="px-6 py-3">Role</th>
                      <th className="px-6 py-3">Department</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Last Login</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {users.map(u => (
                      <tr key={u.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold">{u.firstName?.charAt(0)}</span>
                            </div>
                            <div>
                              <p className="font-medium">{u.firstName} {u.lastName}</p>
                              <p className="text-sm text-gray-500">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            u.role === 'super_admin' ? 'bg-purple-100 text-purple-700' :
                            u.role === 'admin' ? 'bg-blue-100 text-blue-700' :
                            u.role === 'doctor' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {u.role.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{u.department || '-'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            u.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {u.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-sm">
                          {u.lastLogin ? format(new Date(u.lastLogin), 'MMM d, yyyy') : 'Never'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            <button
                              onClick={() => openEditUser(u)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                              title="Edit"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => handleResetPassword(u.id)}
                              className="p-2 text-orange-600 hover:bg-orange-50 rounded"
                              title="Reset Password"
                            >
                              <Key size={16} />
                            </button>
                            {u.role !== 'super_admin' && (
                              <button
                                onClick={() => handleDeleteUser(u.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(status => (
                    <button
                      key={status}
                      className={`px-4 py-2 rounded-lg font-medium capitalize ${
                        status === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-50'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {appointments.length === 0 ? (
                  <p className="text-gray-500 text-center py-12">No appointments found</p>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr className="text-left text-sm text-gray-500">
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Patient</th>
                        <th className="px-6 py-3">Service</th>
                        <th className="px-6 py-3">Date & Time</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {appointments.map(apt => (
                        <tr key={apt.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-mono text-sm">{apt.id.slice(-8).toUpperCase()}</td>
                          <td className="px-6 py-4">
                            <p className="font-medium">{apt.patientName}</p>
                            <p className="text-sm text-gray-500">{apt.patientPhone}</p>
                          </td>
                          <td className="px-6 py-4">{apt.serviceName}</td>
                          <td className="px-6 py-4">
                            <p>{format(new Date(apt.appointmentDate), 'MMM d, yyyy')}</p>
                            <p className="text-sm text-gray-500">{apt.appointmentTime}</p>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={apt.status}
                              onChange={(e) => handleAppointmentStatus(apt.id, e.target.value as Appointment['status'])}
                              className={`px-2 py-1 rounded text-sm font-medium border-0 ${
                                apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                apt.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                                'bg-red-100 text-red-700'
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                              <option value="no_show">No Show</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => deleteAppointment(apt.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* Patients Tab */}
          {activeTab === 'patients' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {patients.length === 0 ? (
                  <p className="text-gray-500 text-center py-12">No patients found</p>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr className="text-left text-sm text-gray-500">
                        <th className="px-6 py-3">Patient</th>
                        <th className="px-6 py-3">Contact</th>
                        <th className="px-6 py-3">DOB</th>
                        <th className="px-6 py-3">Gender</th>
                        <th className="px-6 py-3">Insurance</th>
                        <th className="px-6 py-3">Registered</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {patients.map(patient => (
                        <tr key={patient.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <p className="font-medium">{patient.firstName} {patient.lastName}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm">{patient.email}</p>
                            <p className="text-sm text-gray-500">{patient.phone}</p>
                          </td>
                          <td className="px-6 py-4">{patient.dateOfBirth}</td>
                          <td className="px-6 py-4 capitalize">{patient.gender.replace('_', ' ')}</td>
                          <td className="px-6 py-4">{patient.insuranceInfo?.provider || '-'}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {format(new Date(patient.createdAt), 'MMM d, yyyy')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {services.map(service => (
                  <div key={service.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <img src={service.featuredImage} alt={service.name} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{service.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs ${service.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {service.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{service.shortDescription}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-blue-600">${service.price}</span>
                        <span className="text-sm text-gray-500">{service.duration} mins</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-lg mb-4">Testimonials</h3>
                  <p className="text-gray-600 mb-4">{testimonials.length} testimonials</p>
                  <div className="space-y-3">
                    {testimonials.slice(0, 3).map(t => (
                      <div key={t.id} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium">{t.patientName}</p>
                        <p className="text-sm text-gray-600 truncate">"{t.content}"</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-lg mb-4">Site Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                      <input
                        type="text"
                        value={settings.siteName}
                        onChange={(e) => updateSettings({ siteName: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={settings.tagline}
                        onChange={(e) => updateSettings({ tagline: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="text"
                        value={settings.phone}
                        onChange={(e) => updateSettings({ phone: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {contactMessages.length === 0 ? (
                  <p className="text-gray-500 text-center py-12">No messages yet</p>
                ) : (
                  <div className="divide-y">
                    {contactMessages.map(msg => (
                      <div key={msg.id} className={`p-6 ${!msg.isRead ? 'bg-blue-50' : ''}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{msg.subject}</h3>
                            <p className="text-sm text-gray-500">{msg.name} • {msg.email}</p>
                          </div>
                          <span className="text-sm text-gray-500">
                            {format(new Date(msg.createdAt), 'MMM d, yyyy')}
                          </span>
                        </div>
                        <p className="text-gray-600">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-lg mb-6">General Settings</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => updateSettings({ siteName: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={settings.tagline}
                      onChange={(e) => updateSettings({ tagline: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => updateSettings({ email: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={settings.phone}
                      onChange={(e) => updateSettings({ phone: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={settings.address}
                      onChange={(e) => updateSettings({ address: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Operating Hours</label>
                    <input
                      type="text"
                      value={settings.operatingHours}
                      onChange={(e) => updateSettings({ operatingHours: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={settings.description}
                      onChange={(e) => updateSettings({ description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h3 className="text-xl font-semibold mb-6">
              {editingUser ? 'Edit User' : 'Create New User'}
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={userForm.firstName}
                    onChange={(e) => setUserForm({ ...userForm, firstName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={userForm.lastName}
                    onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={userForm.phone}
                  onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value as User['role'] })}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="staff">Staff</option>
                    <option value="doctor">Doctor</option>
                    <option value="admin">Admin</option>
                    {user?.role === 'super_admin' && <option value="super_admin">Super Admin</option>}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={userForm.department}
                    onChange={(e) => setUserForm({ ...userForm, department: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {editingUser ? 'New Password (leave empty to keep current)' : 'Password'}
                </label>
                <input
                  type="password"
                  value={userForm.password}
                  onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={userForm.isActive}
                  onChange={(e) => setUserForm({ ...userForm, isActive: e.target.checked })}
                  className="rounded"
                />
                <label className="text-sm text-gray-700">Active Account</label>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => { setShowUserModal(false); setEditingUser(null); resetUserForm(); }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={editingUser ? handleUpdateUser : handleCreateUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingUser ? 'Update User' : 'Create User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
