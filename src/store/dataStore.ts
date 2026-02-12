import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { JobPosition, JobApplication, ContactMessage, SiteSettings } from '@/types';

// Initial Job Positions
const initialJobPositions: JobPosition[] = [
  {
    id: '1',
    title: 'Registered Nurse',
    slug: 'registered-nurse',
    department: 'Nursing',
    location: 'New York, NY',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 65000, max: 85000, currency: 'USD' },
    description: 'We are seeking experienced Registered Nurses to join our dynamic healthcare team. Provide compassionate patient care and work alongside dedicated medical professionals.',
    requirements: [
      'Current RN License',
      '2+ years of nursing experience',
      'BScN or equivalent',
      'Strong communication skills',
      'ACLS Certification'
    ],
    benefits: [
      'Competitive salary and benefits',
      '401(k) matching',
      'Health insurance',
      'Paid time off',
      'Professional development opportunities'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1632925686637-d32aaded46e3?w=800',
    applicationsCount: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Physician Assistant',
    slug: 'physician-assistant',
    department: 'Clinical',
    location: 'Los Angeles, CA',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 110000, max: 140000, currency: 'USD' },
    description: 'Join our medical team as a Physician Assistant. Diagnose and treat patients, order tests, prescribe medications, and assist in surgical procedures.',
    requirements: [
      'Master\'s degree in PA Studies',
      'PA-C certification',
      '3+ years clinical experience',
      'State PA license',
      'Strong diagnostic skills'
    ],
    benefits: [
      'Excellent compensation package',
      'Comprehensive health insurance',
      'CME allowance',
      'Retirement plans',
      'Flexible scheduling'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800',
    applicationsCount: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Medical Technologist',
    slug: 'medical-technologist',
    department: 'Laboratory',
    location: 'Chicago, IL',
    jobType: 'full-time',
    experienceLevel: 'entry',
    salary: { min: 40000, max: 55000, currency: 'USD' },
    description: 'Perform laboratory tests and analysis to help in the diagnosis and treatment of diseases. Work with state-of-the-art equipment in a modern facility.',
    requirements: [
      'Bachelor\'s degree in Medical Technology',
      'ASCP MT(ASCP) certification',
      'Attention to detail',
      'Ability to work in a fast-paced environment',
      'Knowledge of laboratory safety'
    ],
    benefits: [
      'Starting salary competitive',
      'Health and dental insurance',
      'Shift differentials',
      'Tuition reimbursement',
      'Continuing education support'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
    applicationsCount: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Pharmacy Technician',
    slug: 'pharmacy-technician',
    department: 'Pharmacy',
    location: 'Houston, TX',
    jobType: 'part-time',
    experienceLevel: 'entry',
    salary: { min: 28000, max: 38000, currency: 'USD' },
    description: 'Assist pharmacists in dispensing medications and managing pharmacy operations. Ensure accuracy and patient safety in all transactions.',
    requirements: [
      'High school diploma or GED',
      'Pharmacy Technician Certification',
      'Reliable and detail-oriented',
      'Customer service experience',
      'Ability to lift up to 50 lbs'
    ],
    benefits: [
      'Flexible scheduling',
      'Employee discount on medications',
      'Health insurance',
      'Paid training',
      'Career advancement opportunities'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde0f?w=800',
    applicationsCount: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Medical Receptionist',
    slug: 'medical-receptionist',
    department: 'Administration',
    location: 'Miami, FL',
    jobType: 'full-time',
    experienceLevel: 'entry',
    salary: { min: 30000, max: 40000, currency: 'USD' },
    description: 'Welcome patients, schedule appointments, and handle administrative tasks. Be the first point of contact for patients visiting our healthcare facility.',
    requirements: [
      'High school diploma or GED',
      'Customer service experience',
      'Proficiency with medical scheduling software',
      'Excellent communication skills',
      'Bilingual a plus'
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Paid holidays and vacation',
      'Professional development',
      'Friendly work environment'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
    applicationsCount: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Physical Therapist',
    slug: 'physical-therapist',
    department: 'Rehabilitation',
    location: 'Seattle, WA',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 75000, max: 100000, currency: 'USD' },
    description: 'Help patients recover from injuries and disabilities through therapeutic exercises and treatments. Work in a collaborative healthcare environment.',
    requirements: [
      'DPT from accredited program',
      'State PT license',
      '2+ years practice experience',
      'Strong patient communication skills',
      'Knowledge of therapeutic modalities'
    ],
    benefits: [
      'Competitive compensation',
      'Comprehensive benefits package',
      'Continuing education funds',
      'Flexible hours',
      'Team environment'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    applicationsCount: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const initialSettings: SiteSettings = {
  siteName: 'Vortex Healthcare Careers',
  tagline: 'Join Our Healthcare Team',
  description: 'Discover exciting career opportunities in healthcare. We\'re seeking talented professionals to join our growing organization.',
  phone: '+1 (555) 123-4567',
  email: 'careers@vortexcare.com',
  address: '123 Healthcare Blvd, Medical City, MC 12345',
  operatingHours: 'Monday - Friday: 9:00 AM - 6:00 PM',
  emergencyContact: '+1 (555) 123-4567',
  socialLinks: {
    facebook: 'https://facebook.com/vortexcareers',
    twitter: 'https://twitter.com/vortexcareers',
    linkedin: 'https://linkedin.com/company/vortexcare',
    instagram: 'https://instagram.com/vortexcareers',
  },
};

interface DataState {
  jobPositions: JobPosition[];
  jobApplications: JobApplication[];
  contactMessages: ContactMessage[];
  settings: SiteSettings;
  
  // Job Positions
  addJobPosition: (position: Omit<JobPosition, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateJobPosition: (id: string, data: Partial<JobPosition>) => void;
  deleteJobPosition: (id: string) => void;
  
  // Job Applications
  addJobApplication: (application: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>) => JobApplication;
  updateJobApplication: (id: string, data: Partial<JobApplication>) => void;
  deleteJobApplication: (id: string) => void;
  
  // Contact Messages
  addContactMessage: (message: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>) => void;
  markMessageAsRead: (id: string) => void;
  deleteContactMessage: (id: string) => void;
  
  // Settings
  updateSettings: (settings: Partial<SiteSettings>) => void;
}

export const useDataStore = create<DataState>()(
  persist(
    (set) => ({
      jobPositions: initialJobPositions,
      jobApplications: [],
      contactMessages: [],
      settings: initialSettings,

      // Job Positions
      addJobPosition: (position) => set((state) => ({
        jobPositions: [...state.jobPositions, {
          ...position,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }],
      })),
      updateJobPosition: (id, data) => set((state) => ({
        jobPositions: state.jobPositions.map(p =>
          p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
        ),
      })),
      deleteJobPosition: (id) => set((state) => ({
        jobPositions: state.jobPositions.filter(p => p.id !== id),
      })),

      // Job Applications
      addJobApplication: (application) => {
        const newApplication: JobApplication = {
          ...application,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          jobApplications: [...state.jobApplications, newApplication],
          jobPositions: state.jobPositions.map(p =>
            p.id === application.jobPositionId
              ? { ...p, applicationsCount: p.applicationsCount + 1 }
              : p
          ),
        }));
        return newApplication;
      },
      updateJobApplication: (id, data) => set((state) => ({
        jobApplications: state.jobApplications.map(a =>
          a.id === id ? { ...a, ...data, updatedAt: new Date().toISOString() } : a
        ),
      })),
      deleteJobApplication: (id) => set((state) => ({
        jobApplications: state.jobApplications.filter(a => a.id !== id),
      })),

      // Contact Messages
      addContactMessage: (message) => set((state) => ({
        contactMessages: [...state.contactMessages, {
          ...message,
          id: Date.now().toString(),
          isRead: false,
          createdAt: new Date().toISOString(),
        }],
      })),
      markMessageAsRead: (id) => set((state) => ({
        contactMessages: state.contactMessages.map(m =>
          m.id === id ? { ...m, isRead: true } : m
        ),
      })),
      deleteContactMessage: (id) => set((state) => ({
        contactMessages: state.contactMessages.filter(m => m.id !== id),
      })),

      // Settings
      updateSettings: (settings) => set((state) => ({
        settings: { ...state.settings, ...settings },
      })),
    }),
    {
      name: 'vortex-recruitment-data',
    }
  )
);
