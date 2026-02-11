import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (data: Partial<User> & { password: string }) => Promise<{ success: boolean; error?: string }>;
  updateUser: (data: Partial<User>) => void;
}

// Default admin and sample users
const defaultUsers: User[] = [
  {
    id: '1',
    email: 'ayoluwanimi@gmail.com',
    password: 'University@1',
    firstName: 'Ayoluwa',
    lastName: 'Nimi',
    phone: '+1234567890',
    role: 'super_admin',
    department: 'Administration',
    isActive: true,
    isEmailVerified: true,
    passwordChangedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'doctor@vortexcare.com',
    password: 'Doctor@123',
    firstName: 'Sarah',
    lastName: 'Johnson',
    phone: '+1234567891',
    role: 'doctor',
    department: 'General Medicine',
    specialization: 'Internal Medicine',
    isActive: true,
    isEmailVerified: true,
    passwordChangedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'staff@vortexcare.com',
    password: 'Staff@123',
    firstName: 'Michael',
    lastName: 'Brown',
    phone: '+1234567892',
    role: 'staff',
    department: 'Reception',
    isActive: true,
    isEmailVerified: true,
    passwordChangedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const getUsers = (): User[] => {
  const stored = localStorage.getItem('vortex-users');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('vortex-users', JSON.stringify(defaultUsers));
  return defaultUsers;
};

const saveUsers = (users: User[]) => {
  localStorage.setItem('vortex-users', JSON.stringify(users));
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        const users = getUsers();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        
        if (!user) {
          return { success: false, error: 'Invalid email or password' };
        }
        
        if (!user.isActive) {
          return { success: false, error: 'Your account has been deactivated. Please contact support.' };
        }

        // Update last login
        const updatedUsers = users.map(u => 
          u.id === user.id ? { ...u, lastLogin: new Date().toISOString() } : u
        );
        saveUsers(updatedUsers);

        set({ user: { ...user, lastLogin: new Date().toISOString() }, isAuthenticated: true });
        return { success: true };
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      register: async (data) => {
        const users = getUsers();
        const existingUser = users.find(u => u.email.toLowerCase() === data.email?.toLowerCase());
        
        if (existingUser) {
          return { success: false, error: 'An account with this email already exists' };
        }

        const newUser: User = {
          id: Date.now().toString(),
          email: data.email || '',
          password: data.password,
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          phone: data.phone || '',
          role: 'patient',
          isActive: true,
          isEmailVerified: false,
          passwordChangedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        users.push(newUser);
        saveUsers(users);

        set({ user: newUser, isAuthenticated: true });
        return { success: true };
      },

      updateUser: (data) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const users = getUsers();
        const updatedUsers = users.map(u =>
          u.id === currentUser.id ? { ...u, ...data, updatedAt: new Date().toISOString() } : u
        );
        saveUsers(updatedUsers);

        set({ user: { ...currentUser, ...data, updatedAt: new Date().toISOString() } });
      },
    }),
    {
      name: 'vortex-auth',
    }
  )
);

// Helper functions for user management
export const getAllUsers = (): User[] => getUsers();

export const createUser = (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'passwordChangedAt'>): User => {
  const users = getUsers();
  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    passwordChangedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

export const updateUserById = (id: string, data: Partial<User>): User | null => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;
  
  users[index] = { ...users[index], ...data, updatedAt: new Date().toISOString() };
  saveUsers(users);
  return users[index];
};

export const deleteUserById = (id: string): boolean => {
  const users = getUsers();
  const filtered = users.filter(u => u.id !== id);
  if (filtered.length === users.length) return false;
  saveUsers(filtered);
  return true;
};

export const resetUserPassword = (id: string, newPassword: string): boolean => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return false;
  
  users[index] = { 
    ...users[index], 
    password: newPassword, 
    passwordChangedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString() 
  };
  saveUsers(users);
  return true;
};
