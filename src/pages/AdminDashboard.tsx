import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore, getAllUsers, createUser, updateUserById, deleteUserById, resetUserPassword } from '@/store/authStore';
import { useDataStore } from '@/store/dataStore';
import type { User, JobPosition, JobApplication } from '@/types';
import { format } from 'date-fns';
import {
  LayoutDashboard, Briefcase, Users, MessageSquare, Settings, LogOut,
  Menu, X, Plus, Pencil, Trash2, Key, Search,
  CheckCircle, XCircle, Clock, TrendingUp, Activity,
  Bell, ArrowLeft, AlertCircle, DollarSign
} from 'lucide-react';

type Tab = 'dashboard' | 'positions' | 'applications' | 'users' | 'messages' | 'settings';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { jobPositions, jobApplications, contactMessages, addJobPosition, updateJobPosition, deleteJobPosition, addJobApplication, updateJobApplication, deleteJobApplication, settings, updateSettings } = useDataStore();
  
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showPositionModal, setShowPositionModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingPosition, setEditingPosition] = useState<JobPosition | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(getAllUsers());
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);

  // Position form state
  const [positionForm, setPositionForm] = useState({
    title: '',
    department: '',
    location: '',
    jobType: 'full-time' as JobPosition['jobType'],
    experienceLevel: 'mid' as JobPosition['experienceLevel'],
    description: '',
    requirements: '',
    benefits: '',
    salary: { min: 0, max: 0, currency: 'USD' },
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
  });

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
    { id: 'positions' as Tab, label: 'Job Positions', icon: <Briefcase size={20} /> },
    { id: 'applications' as Tab, label: 'Applications', icon: <TrendingUp size={20} /> },
    { id: 'users' as Tab, label: 'User Management', icon: <Users size={20} />, adminOnly: true },
    { id: 'messages' as Tab, label: 'Messages', icon: <MessageSquare size={20} /> },
    { id: 'settings' as Tab, label: 'Settings', icon: <Settings size={20} />, adminOnly: true },
  ];

  const stats = [
    { label: 'Open Positions', value: jobPositions.filter(p => p.isActive).length, icon: <Briefcase className="w-6 h-6" />, color: 'bg-blue-500' },
    { label: 'Total Applications', value: jobApplications.length, icon: <TrendingUp className="w-6 h-6" />, color: 'bg-emerald-500' },
    { label: 'Shortlisted', value: jobApplications.filter(a => a.status === 'shortlisted').length, icon: <CheckCircle className="w-6 h-6" />, color: 'bg-yellow-500' },
    { label: 'Pending Review', value: jobApplications.filter(a => a.status === 'submitted' || a.status === 'under-review').length, icon: <Clock className="w-6 h-6" />, color: 'bg-purple-500' },
  ];

  const handleCreatePosition = () => {
    if (!positionForm.title || !positionForm.department) return;
    
    addJobPosition({
      ...positionForm,
      slug: positionForm.title.toLowerCase().replace(/\s+/g, '-'),
      requirements: positionForm.requirements.split('\n').filter(r => r.trim()),
      benefits: positionForm.benefits.split('\n').filter(b => b.trim()),
      applicationsCount: 0,
    });
    setShowPositionModal(false);
    resetPositionForm();
  };

  const handleUpdatePosition = () => {
    if (!editingPosition) return;
    
    updateJobPosition(editingPosition.id, {
      ...positionForm,
      requirements: positionForm.requirements.split('\n').filter(r => r.trim()),
      benefits: positionForm.benefits.split('\n').filter(b => b.trim()),
    });
    setShowPositionModal(false);
    setEditingPosition(null);
    resetPositionForm();
  };

  const handleDeletePosition = (positionId: string) => {
    if (confirm('Are you sure you want to delete this position?')) {
      deleteJobPosition(positionId);
    }
  };

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

  const handleUpdateApplicationStatus = (appId: string, status: JobApplication['status']) => {
    updateJobApplication(appId, { status });
  };

  const resetPositionForm = () => {
    setPositionForm({
      title: '',
      department: '',
      location: '',
      jobType: 'full-time',
      experienceLevel: 'mid',
      description: '',
      requirements: '',
      benefits: '',
      salary: { min: 0, max: 0, currency: 'USD' },
      isActive: true,
      featuredImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    });
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

  const openEditPosition = (p: JobPosition) => {
    setEditingPosition(p);
    setPositionForm({
      ...p,
      requirements: p.requirements.join('\n'),
      benefits: p.benefits.join('\n'),
    });
    setShowPositionModal(true);
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
                <h1 className="font-bold">Vortex Careers</h1>
                <p className="text-xs text-gray-400">Admin</p>
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

              {/* Recent Applications */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
                </div>
                <div className="p-6">
                  {jobApplications.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No applications yet</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-sm text-gray-500">
                            <th className="pb-3">Applicant</th>
                            <th className="pb-3">Position</th>
                            <th className="pb-3">Status</th>
                            <th className="pb-3">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {jobApplications.slice(-5).reverse().map(app => (
                            <tr key={app.id}>
                              <td className="py-3">
                                <p className="font-medium">{app.applicantName}</p>
                                <p className="text-sm text-gray-500">{app.applicantEmail}</p>
                              </td>
                              <td className="py-3">{app.jobTitle}</td>
                              <td className="py-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  app.status === 'hired' ? 'bg-green-100 text-green-700' :
                                  app.status === 'offered' ? 'bg-emerald-100 text-emerald-700' :
                                  app.status === 'shortlisted' ? 'bg-blue-100 text-blue-700' :
                                  app.status === 'under-review' ? 'bg-yellow-100 text-yellow-700' :
                                  app.status === 'submitted' ? 'bg-gray-100 text-gray-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {app.status}
                                </span>
                              </td>
                              <td className="py-3 text-sm text-gray-500">{format(new Date(app.createdAt), 'MMM d, yyyy')}</td>
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

          {/* Positions Tab */}
          {activeTab === 'positions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Job Positions</h3>
                <button
                  onClick={() => {
                    setEditingPosition(null);
                    resetPositionForm();
                    setShowPositionModal(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                >
                  <Plus size={20} />
                  Add Position
                </button>
              </div>

              {jobPositions.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No positions created yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {jobPositions.map(position => (
                    <div key={position.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{position.title}</h4>
                          <p className="text-sm text-gray-500">{position.department}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          position.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {position.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4 text-sm text-gray-600">
                        <p>{position.location} • {position.jobType}</p>
                        <p className="flex items-center gap-2">
                          <DollarSign size={16} />
                          ${position.salary.min.toLocaleString()} - ${position.salary.max.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{position.applicationsCount} applications</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditPosition(position)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => handleDeletePosition(position.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <div className="bg-white rounded-xl shadow-sm">
              {jobApplications.length === 0 ? (
                <div className="p-12 text-center">
                  <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No applications yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Applicant</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Position</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Experience</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {jobApplications.map(app => (
                        <tr key={app.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <p className="font-medium text-gray-900">{app.applicantName}</p>
                            <p className="text-sm text-gray-500">{app.applicantEmail}</p>
                          </td>
                          <td className="px-6 py-4 text-gray-900">{app.jobTitle}</td>
                          <td className="px-6 py-4 text-gray-900">{app.yearsOfExperience} years</td>
                          <td className="px-6 py-4">
                            <select
                              value={app.status}
                              onChange={(e) => handleUpdateApplicationStatus(app.id, e.target.value as JobApplication['status'])}
                              className="text-sm rounded border border-gray-200 px-2 py-1 focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="submitted">Submitted</option>
                              <option value="under-review">Under Review</option>
                              <option value="shortlisted">Shortlisted</option>
                              <option value="offered">Offered</option>
                              <option value="hired">Hired</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{format(new Date(app.createdAt), 'MMM d, yyyy')}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleDeleteApplication(app.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && canManageUsers && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                <button
                  onClick={() => {
                    setEditingUser(null);
                    resetUserForm();
                    setShowUserModal(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                >
                  <Plus size={20} />
                  Add User
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {users.map(u => (
                        <tr key={u.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{u.firstName} {u.lastName}</td>
                          <td className="px-6 py-4 text-gray-600">{u.email}</td>
                          <td className="px-6 py-4"><span className="capitalize">{u.role.replace('_', ' ')}</span></td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              u.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {u.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => openEditUser(u)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                              >
                                <Pencil size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(u.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="bg-white rounded-xl shadow-sm">
              {contactMessages.length === 0 ? (
                <div className="p-12 text-center">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No messages</p>
                </div>
              ) : (
                <div className="divide-y">
                  {contactMessages.map(msg => (
                    <div key={msg.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{msg.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          msg.isRead ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {msg.isRead ? 'Read' : 'Unread'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{msg.email} • {msg.phone}</p>
                      <p className="font-medium text-gray-900 mb-2">{msg.subject}</p>
                      <p className="text-gray-600 mb-2">{msg.message}</p>
                      <p className="text-xs text-gray-500">{format(new Date(msg.createdAt), 'MMM d, yyyy h:mm a')}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Position Modal */}
      {showPositionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingPosition ? 'Edit Position' : 'Create Position'}
              </h3>
              <button onClick={() => setShowPositionModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={positionForm.title}
                  onChange={(e) => setPositionForm({...positionForm, title: e.target.value})}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Department"
                  value={positionForm.department}
                  onChange={(e) => setPositionForm({...positionForm, department: e.target.value})}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Location"
                  value={positionForm.location}
                  onChange={(e) => setPositionForm({...positionForm, location: e.target.value})}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <select
                  value={positionForm.jobType}
                  onChange={(e) => setPositionForm({...positionForm, jobType: e.target.value as any})}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="temporary">Temporary</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Salary</label>
                  <input
                    type="number"
                    value={positionForm.salary.min}
                    onChange={(e) => setPositionForm({...positionForm, salary: {...positionForm.salary, min: parseInt(e.target.value)}})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Salary</label>
                  <input
                    type="number"
                    value={positionForm.salary.max}
                    onChange={(e) => setPositionForm({...positionForm, salary: {...positionForm.salary, max: parseInt(e.target.value)}})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <textarea
                placeholder="Description"
                value={positionForm.description}
                onChange={(e) => setPositionForm({...positionForm, description: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <textarea
                placeholder="Requirements (one per line)"
                value={positionForm.requirements}
                onChange={(e) => setPositionForm({...positionForm, requirements: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <textarea
                placeholder="Benefits (one per line)"
                value={positionForm.benefits}
                onChange={(e) => setPositionForm({...positionForm, benefits: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={positionForm.isActive}
                  onChange={(e) => setPositionForm({...positionForm, isActive: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="text-gray-700">Active</span>
              </label>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={editingPosition ? handleUpdatePosition : handleCreatePosition}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                >
                  {editingPosition ? 'Update' : 'Create'} Position
                </button>
                <button
                  onClick={() => setShowPositionModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 font-medium rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="border-b p-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingUser ? 'Edit User' : 'Create User'}
              </h3>
              <button onClick={() => setShowUserModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="First Name"
                value={userForm.firstName}
                onChange={(e) => setUserForm({...userForm, firstName: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={userForm.lastName}
                onChange={(e) => setUserForm({...userForm, lastName: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                value={userForm.email}
                onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={userForm.phone}
                onChange={(e) => setUserForm({...userForm, phone: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <select
                value={userForm.role}
                onChange={(e) => setUserForm({...userForm, role: e.target.value as any})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
              <input
                type="text"
                placeholder="Department"
                value={userForm.department}
                onChange={(e) => setUserForm({...userForm, department: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="password"
                placeholder={editingUser ? "Leave empty to keep current password" : "Password"}
                value={userForm.password}
                onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={userForm.isActive}
                  onChange={(e) => setUserForm({...userForm, isActive: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="text-gray-700">Active</span>
              </label>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={editingUser ? handleUpdateUser : handleCreateUser}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                >
                  {editingUser ? 'Update' : 'Create'} User
                </button>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 font-medium rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function handleDeleteApplication(appId: string) {
    if (confirm('Are you sure you want to delete this application?')) {
      deleteJobApplication(appId);
    }
  }
}
