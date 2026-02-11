import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Service, Appointment, Patient, TeamMember, Testimonial, BlogPost, ContactMessage, AuditLog, SiteSettings } from '@/types';

// Initial Data
const initialServices: Service[] = [
  {
    id: '1',
    name: 'Primary Care',
    slug: 'primary-care',
    category: 'General',
    description: 'Comprehensive primary care services for patients of all ages. Our experienced physicians provide preventive care, routine check-ups, and management of chronic conditions.',
    shortDescription: 'Comprehensive health services for all ages',
    price: 150,
    duration: 30,
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800',
    icon: 'Heart',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Specialist Consultations',
    slug: 'specialist-consultations',
    category: 'Specialist',
    description: 'Access to a wide range of medical specialists including cardiologists, dermatologists, orthopedists, and more. Get expert opinions and specialized treatment plans.',
    shortDescription: 'Expert consultations across specialties',
    price: 250,
    duration: 45,
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
    icon: 'Stethoscope',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Preventive Health Screening',
    slug: 'preventive-screening',
    category: 'Preventive',
    description: 'Comprehensive health screenings to detect potential health issues early. Includes blood work, imaging, and complete physical examinations.',
    shortDescription: 'Early detection for better health outcomes',
    price: 350,
    duration: 60,
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    icon: 'Shield',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Mental Health Services',
    slug: 'mental-health',
    category: 'Mental Health',
    description: 'Compassionate mental health care including counseling, therapy, and psychiatric services. We support your mental wellness journey.',
    shortDescription: 'Supporting your mental wellness',
    price: 200,
    duration: 50,
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800',
    icon: 'Brain',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Telehealth Consultations',
    slug: 'telehealth',
    category: 'Virtual',
    description: 'Convenient virtual consultations from the comfort of your home. Connect with our healthcare providers through secure video calls.',
    shortDescription: 'Healthcare from anywhere',
    price: 100,
    duration: 30,
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
    icon: 'Video',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Laboratory Services',
    slug: 'laboratory',
    category: 'Diagnostics',
    description: 'State-of-the-art laboratory services with quick turnaround times. Comprehensive testing including blood work, urinalysis, and specialized tests.',
    shortDescription: 'Accurate diagnostics, fast results',
    price: 75,
    duration: 15,
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800',
    icon: 'FlaskConical',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const initialTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    role: 'Chief Medical Officer',
    department: 'Administration',
    bio: 'Dr. Johnson brings over 20 years of experience in internal medicine and healthcare administration. She is passionate about patient-centered care.',
    qualifications: ['MD - Harvard Medical School', 'MBA - Stanford University', 'Board Certified Internal Medicine'],
    specializations: ['Internal Medicine', 'Healthcare Administration'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
    email: 'sarah.johnson@vortexcare.com',
    phone: '+1 (555) 123-4567',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    role: 'Head of Cardiology',
    department: 'Cardiology',
    bio: 'Dr. Chen is a renowned cardiologist with expertise in interventional cardiology and heart failure management.',
    qualifications: ['MD - Johns Hopkins University', 'Fellowship in Cardiology - Mayo Clinic'],
    specializations: ['Interventional Cardiology', 'Heart Failure', 'Preventive Cardiology'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
    email: 'michael.chen@vortexcare.com',
    phone: '+1 (555) 123-4568',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    role: 'Pediatric Specialist',
    department: 'Pediatrics',
    bio: 'Dr. Rodriguez specializes in pediatric care and developmental medicine. She loves working with children and their families.',
    qualifications: ['MD - UCLA Medical School', 'Pediatric Residency - Children\'s Hospital Los Angeles'],
    specializations: ['General Pediatrics', 'Developmental Medicine', 'Adolescent Health'],
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400',
    email: 'emily.rodriguez@vortexcare.com',
    phone: '+1 (555) 123-4569',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Dr. James Williams',
    role: 'Mental Health Director',
    department: 'Psychiatry',
    bio: 'Dr. Williams leads our mental health services with compassion and expertise in treating various mental health conditions.',
    qualifications: ['MD - Columbia University', 'Psychiatry Residency - NYU Langone'],
    specializations: ['Psychiatry', 'Cognitive Behavioral Therapy', 'Anxiety & Depression'],
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400',
    email: 'james.williams@vortexcare.com',
    phone: '+1 (555) 123-4570',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

const initialTestimonials: Testimonial[] = [
  {
    id: '1',
    patientName: 'Jennifer M.',
    rating: 5,
    content: 'Vortex Care Support has completely transformed my healthcare experience. The staff is incredibly caring and the doctors take time to really listen.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    isApproved: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    patientName: 'Robert K.',
    rating: 5,
    content: 'The telehealth service is a game-changer! I was able to consult with a specialist from my home. Highly recommend their services.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    isApproved: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    patientName: 'Maria S.',
    rating: 5,
    content: 'As a busy mom, I appreciate how easy it is to book appointments and access my family\'s medical records online. Excellent service!',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    isApproved: true,
    createdAt: new Date().toISOString(),
  },
];

const initialSettings: SiteSettings = {
  siteName: 'Vortex Care Support LTD',
  tagline: 'Excellence in Healthcare',
  description: 'Providing comprehensive healthcare services with compassion and expertise.',
  phone: '+1 (555) 123-4567',
  email: 'info@vortexcare.com',
  address: '123 Healthcare Blvd, Medical City, MC 12345',
  operatingHours: 'Monday - Friday: 8:00 AM - 8:00 PM | Saturday: 9:00 AM - 5:00 PM | Sunday: Closed',
  emergencyContact: '+1 (555) 911-0000',
  socialLinks: {
    facebook: 'https://facebook.com/vortexcare',
    twitter: 'https://twitter.com/vortexcare',
    linkedin: 'https://linkedin.com/company/vortexcare',
    instagram: 'https://instagram.com/vortexcare',
  },
};

interface DataState {
  services: Service[];
  appointments: Appointment[];
  patients: Patient[];
  teamMembers: TeamMember[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  contactMessages: ContactMessage[];
  auditLogs: AuditLog[];
  settings: SiteSettings;
  
  // Services
  addService: (service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateService: (id: string, data: Partial<Service>) => void;
  deleteService: (id: string) => void;
  
  // Appointments
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => Appointment;
  updateAppointment: (id: string, data: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  
  // Patients
  addPatient: (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => Patient;
  updatePatient: (id: string, data: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  
  // Team Members
  addTeamMember: (member: Omit<TeamMember, 'id' | 'createdAt'>) => void;
  updateTeamMember: (id: string, data: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  
  // Testimonials
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'createdAt'>) => void;
  updateTestimonial: (id: string, data: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  
  // Blog Posts
  addBlogPost: (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBlogPost: (id: string, data: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  
  // Contact Messages
  addContactMessage: (message: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>) => void;
  markMessageAsRead: (id: string) => void;
  deleteContactMessage: (id: string) => void;
  
  // Audit Logs
  addAuditLog: (log: Omit<AuditLog, 'id' | 'createdAt'>) => void;
  
  // Settings
  updateSettings: (settings: Partial<SiteSettings>) => void;
}

export const useDataStore = create<DataState>()(
  persist(
    (set) => ({
      services: initialServices,
      appointments: [],
      patients: [],
      teamMembers: initialTeamMembers,
      testimonials: initialTestimonials,
      blogPosts: [],
      contactMessages: [],
      auditLogs: [],
      settings: initialSettings,

      // Services
      addService: (service) => set((state) => ({
        services: [...state.services, {
          ...service,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }],
      })),
      updateService: (id, data) => set((state) => ({
        services: state.services.map(s =>
          s.id === id ? { ...s, ...data, updatedAt: new Date().toISOString() } : s
        ),
      })),
      deleteService: (id) => set((state) => ({
        services: state.services.filter(s => s.id !== id),
      })),

      // Appointments
      addAppointment: (appointment) => {
        const newAppointment: Appointment = {
          ...appointment,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          appointments: [...state.appointments, newAppointment],
        }));
        return newAppointment;
      },
      updateAppointment: (id, data) => set((state) => ({
        appointments: state.appointments.map(a =>
          a.id === id ? { ...a, ...data, updatedAt: new Date().toISOString() } : a
        ),
      })),
      deleteAppointment: (id) => set((state) => ({
        appointments: state.appointments.filter(a => a.id !== id),
      })),

      // Patients
      addPatient: (patient) => {
        const newPatient: Patient = {
          ...patient,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          patients: [...state.patients, newPatient],
        }));
        return newPatient;
      },
      updatePatient: (id, data) => set((state) => ({
        patients: state.patients.map(p =>
          p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
        ),
      })),
      deletePatient: (id) => set((state) => ({
        patients: state.patients.filter(p => p.id !== id),
      })),

      // Team Members
      addTeamMember: (member) => set((state) => ({
        teamMembers: [...state.teamMembers, {
          ...member,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }],
      })),
      updateTeamMember: (id, data) => set((state) => ({
        teamMembers: state.teamMembers.map(t =>
          t.id === id ? { ...t, ...data } : t
        ),
      })),
      deleteTeamMember: (id) => set((state) => ({
        teamMembers: state.teamMembers.filter(t => t.id !== id),
      })),

      // Testimonials
      addTestimonial: (testimonial) => set((state) => ({
        testimonials: [...state.testimonials, {
          ...testimonial,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }],
      })),
      updateTestimonial: (id, data) => set((state) => ({
        testimonials: state.testimonials.map(t =>
          t.id === id ? { ...t, ...data } : t
        ),
      })),
      deleteTestimonial: (id) => set((state) => ({
        testimonials: state.testimonials.filter(t => t.id !== id),
      })),

      // Blog Posts
      addBlogPost: (post) => set((state) => ({
        blogPosts: [...state.blogPosts, {
          ...post,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }],
      })),
      updateBlogPost: (id, data) => set((state) => ({
        blogPosts: state.blogPosts.map(p =>
          p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
        ),
      })),
      deleteBlogPost: (id) => set((state) => ({
        blogPosts: state.blogPosts.filter(p => p.id !== id),
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

      // Audit Logs
      addAuditLog: (log) => set((state) => ({
        auditLogs: [
          {
            ...log,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
          },
          ...state.auditLogs,
        ].slice(0, 1000), // Keep only last 1000 logs
      })),

      // Settings
      updateSettings: (settings) => set((state) => ({
        settings: { ...state.settings, ...settings },
      })),
    }),
    {
      name: 'vortex-data',
    }
  )
);
