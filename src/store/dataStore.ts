import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { JobPosition, JobApplication, ContactMessage, SiteSettings } from '@/types';

// Initial Job Positions - Healthcare, Tech, Multi-Sector, and Educational
const initialJobPositions: JobPosition[] = [
  // HEALTHCARE JOBS
  {
    id: '1',
    title: 'Registered Nurse',
    slug: 'registered-nurse',
    department: 'Healthcare - Nursing',
    location: 'London, UK',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 65000, max: 85000, currency: 'GBP' },
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
    featuredImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    applicationsCount: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Physician Assistant',
    slug: 'physician-assistant',
    department: 'Healthcare - Clinical',
    location: 'Manchester, UK',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 110000, max: 140000, currency: 'GBP' },
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
    featuredImage: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80',
    applicationsCount: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Medical Technologist',
    slug: 'medical-technologist',
    department: 'Healthcare - Laboratory',
    location: 'Birmingham, UK',
    jobType: 'full-time',
    experienceLevel: 'entry',
    salary: { min: 40000, max: 55000, currency: 'GBP' },
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
    featuredImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    applicationsCount: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Pharmacy Technician',
    slug: 'pharmacy-technician',
    department: 'Healthcare - Pharmacy',
    location: 'Leeds, UK',
    jobType: 'part-time',
    experienceLevel: 'entry',
    salary: { min: 28000, max: 38000, currency: 'GBP' },
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
    featuredImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde0f?w=800&q=80',
    applicationsCount: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Medical Receptionist',
    slug: 'medical-receptionist',
    department: 'Healthcare - Administration',
    location: 'Bristol, UK',
    jobType: 'full-time',
    experienceLevel: 'entry',
    salary: { min: 30000, max: 40000, currency: 'GBP' },
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
    featuredImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    applicationsCount: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Physical Therapist',
    slug: 'physical-therapist',
    department: 'Healthcare - Rehabilitation',
    location: 'Edinburgh, UK',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 75000, max: 100000, currency: 'GBP' },
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
    featuredImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
    applicationsCount: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // TECHNOLOGY JOBS
  {
    id: '7',
    title: 'Senior Full Stack Developer',
    slug: 'senior-full-stack-developer',
    department: 'Technology - Software Engineering',
    location: 'Cambridge, UK',
    jobType: 'full-time',
    experienceLevel: 'senior',
    salary: { min: 150000, max: 200000, currency: 'GBP' },
    description: 'Build and maintain scalable web applications using React, Node.js, and modern cloud technologies. Lead technical decisions and mentor junior developers.',
    requirements: [
      '5+ years of full stack development',
      'Proficiency in React and Node.js',
      'Experience with AWS/GCP/Azure',
      'Strong understanding of REST APIs',
      'Git and CI/CD experience'
    ],
    benefits: [
      'Competitive salary and equity',
      'Unlimited PTO',
      'Remote work options',
      'Tech conference budget',
      'State-of-the-art equipment'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    applicationsCount: 23,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    title: 'Mobile App Developer (iOS/Android)',
    slug: 'mobile-app-developer',
    department: 'Technology - Mobile Development',
    location: 'Oxford, UK',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 100000, max: 130000, currency: 'GBP' },
    description: 'Develop innovative mobile applications for iOS and Android. Work with cross-functional teams to deliver high-quality user experiences.',
    requirements: [
      '3+ years mobile development experience',
      'Swift or Kotlin proficiency',
      'Experience with mobile UI/UX',
      'Knowledge of mobile testing frameworks',
      'App Store/Google Play experience'
    ],
    benefits: [
      'Competitive compensation',
      'Health and wellness programs',
      'Flexible work hours',
      'Career development paths',
      'Collaborative team environment'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    applicationsCount: 18,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9',
    title: 'Data Scientist',
    slug: 'data-scientist',
    department: 'Technology - Data Science',
    location: 'York, UK',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 120000, max: 160000, currency: 'GBP' },
    description: 'Analyze complex datasets and build machine learning models to drive business decisions. Work with big data technologies and statistical methods.',
    requirements: [
      'Master\'s degree in Statistics, Math, or CS',
      'Proficiency in Python and R',
      'Experience with machine learning frameworks',
      'SQL and database experience',
      'Data visualization skills'
    ],
    benefits: [
      'Competitive salary',
      'Remote work flexibility',
      'Learning and development budget',
      'Healthcare coverage',
      'Bonus structure'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    applicationsCount: 14,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '10',
    title: 'DevOps Engineer',
    slug: 'devops-engineer',
    department: 'Technology - Infrastructure',
    location: 'Cardiff, UK',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 110000, max: 145000, currency: 'GBP' },
    description: 'Manage cloud infrastructure and automate deployment processes. Ensure system reliability and optimize performance across production environments.',
    requirements: [
      '3+ years DevOps experience',
      'AWS/Azure/GCP proficiency',
      'Docker and Kubernetes knowledge',
      'CI/CD pipeline experience',
      'Linux system administration'
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Paid time off',
      'Home office setup',
      'Professional certifications covered'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    applicationsCount: 11,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // OTHER SECTORS
  {
    id: '11',
    title: 'Sales Manager',
    slug: 'sales-manager',
    department: 'Business - Sales',
    location: 'Birmingham, UK',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 80000, max: 120000, currency: 'GBP' },
    description: 'Lead and manage a high-performing sales team. Develop sales strategies and drive revenue growth for our organization.',
    requirements: [
      '5+ years sales experience',
      '2+ years management experience',
      'Track record of exceeding targets',
      'Strong negotiation skills',
      'CRM software proficiency'
    ],
    benefits: [
      'Base salary plus commission',
      'Performance bonuses',
      'Health insurance',
      'Car allowance',
      'Sales training programs'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    applicationsCount: 9,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '12',
    title: 'Financial Analyst',
    slug: 'financial-analyst',
    department: 'Finance - Analysis',
    location: 'London, UK',
    jobType: 'full-time',
    experienceLevel: 'entry',
    salary: { min: 60000, max: 85000, currency: 'GBP' },
    description: 'Analyze financial data and prepare reports to support business decisions. Monitor market trends and provide investment recommendations.',
    requirements: [
      'Bachelor\'s in Finance or Accounting',
      'Excel and financial modeling skills',
      'Understanding of financial statements',
      'Analytical mindset',
      'Attention to detail'
    ],
    benefits: [
      'Competitive salary',
      'Performance bonus',
      'Health insurance',
      'Professional certifications (CFA)',
      'Career advancement'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    applicationsCount: 13,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '13',
    title: 'Marketing Manager',
    slug: 'marketing-manager',
    department: 'Marketing - Strategy',
    location: 'Manchester, UK',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 85000, max: 120000, currency: 'GBP' },
    description: 'Develop and execute marketing campaigns across digital and traditional channels. Manage brand strategy and lead marketing initiatives.',
    requirements: [
      '4+ years marketing experience',
      'Campaign management experience',
      'Digital marketing knowledge',
      'Social media expertise',
      'Analytics and reporting skills'
    ],
    benefits: [
      'Competitive salary',
      'Performance bonuses',
      'Health insurance',
      'Conference attendance budget',
      'Remote work options'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    applicationsCount: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '14',
    title: 'Operations Manager',
    slug: 'operations-manager',
    department: 'Operations - Management',
    location: 'Manchester, UK',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 75000, max: 105000, currency: 'GBP' },
    description: 'Oversee day-to-day operations and optimize processes for efficiency. Manage staff and ensure quality standards are met.',
    requirements: [
      '3+ years operations experience',
      'Process improvement knowledge',
      'Staff management experience',
      'Problem-solving skills',
      'ERP system experience'
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Paid time off',
      'Leadership training',
      'Performance bonuses'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    applicationsCount: 7,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '15',
    title: 'Graphic Designer',
    slug: 'graphic-designer',
    department: 'Creative - Design',
    location: 'Manchester, UK',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 55000, max: 75000, currency: 'GBP' },
    description: 'Create visual content and designs for digital and print media. Collaborate with marketing and product teams on creative projects.',
    requirements: [
      'Bachelor\'s in Graphic Design or similar',
      'Proficiency in Adobe Creative Suite',
      'Portfolio of design work',
      'Understanding of design principles',
      'Strong communication skills'
    ],
    benefits: [
      'Competitive salary',
      'Creative freedom',
      'Health insurance',
      'Flexible work environment',
      'Collaborative team'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    applicationsCount: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // EDUCATIONAL SUPPORT JOBS
  {
    id: '16',
    title: 'High School Teacher - Mathematics',
    slug: 'high-school-teacher-math',
    department: 'Education - Secondary',
    location: 'York, UK',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 50000, max: 70000, currency: 'GBP' },
    description: 'Teach mathematics to high school students. Develop curriculum, assess student progress, and inspire a love of learning.',
    requirements: [
      'Bachelor\'s in Mathematics or Education',
      'State teaching certification',
      '2+ years teaching experience',
      'Strong subject matter knowledge',
      'Passion for education'
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Pension plan',
      'Summer time off',
      'Professional development'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
    applicationsCount: 11,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '17',
    title: 'Elementary School Teacher',
    slug: 'elementary-school-teacher',
    department: 'Education - Primary',
    location: 'Manchester, UK',
    jobType: 'full-time',
    experienceLevel: 'entry',
    salary: { min: 45000, max: 60000, currency: 'GBP' },
    description: 'Educate and nurture elementary students in a supportive classroom environment. Develop engaging lessons and foster student development.',
    requirements: [
      'Bachelor\'s in Elementary Education',
      'State teaching license',
      'CPR certification',
      'Strong communication skills',
      'Passion for working with children'
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Pension plan',
      'School breaks',
      'Continuing education support'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
    applicationsCount: 16,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '18',
    title: 'Special Education Teacher',
    slug: 'special-education-teacher',
    department: 'Education - Special Needs',
    location: 'Edinburgh, UK',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 52000, max: 72000, currency: 'GBP' },
    description: 'Support students with special needs through individualized education plans. Provide inclusive, supportive learning environment.',
    requirements: [
      'Bachelor\'s in Special Education',
      'Special education certification',
      '2+ years experience',
      'Patience and empathy',
      'Strong problem-solving skills'
    ],
    benefits: [
      'Competitive salary',
      'Comprehensive health insurance',
      'Pension benefits',
      'Professional development',
      'Supportive work environment'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
    applicationsCount: 9,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '19',
    title: 'University Professor - Computer Science',
    slug: 'university-professor-cs',
    department: 'Education - Higher Education',
    location: 'Cambridge, UK',
    jobType: 'full-time',
    experienceLevel: 'senior',
    salary: { min: 90000, max: 140000, currency: 'GBP' },
    description: 'Lead research and teach advanced computer science courses. Mentor graduate students and advance the field through innovation.',
    requirements: [
      'Ph.D. in Computer Science',
      'Strong research background',
      'Published research papers',
      'Teaching experience',
      'Industry experience (preferred)'
    ],
    benefits: [
      'Competitive salary',
      'Research funding',
      'Health insurance',
      'Sabbatical opportunities',
      'Academic freedom'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
    applicationsCount: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '20',
    title: 'Educational Coordinator',
    slug: 'educational-coordinator',
    department: 'Education - Administration',
    location: 'Birmingham, UK',
    jobType: 'full-time',
    experienceLevel: 'entry',
    salary: { min: 40000, max: 55000, currency: 'GBP' },
    description: 'Coordinate educational programs and support teachers in delivering quality education. Manage schedules and resources.',
    requirements: [
      'Bachelor\'s in Education or related field',
      'Program coordination experience',
      'Excellent organizational skills',
      'Communication proficiency',
      'Detail-oriented'
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Paid time off',
      'Professional development',
      'Work-life balance'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
    applicationsCount: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '21',
    title: 'Corporate Trainer',
    slug: 'corporate-trainer',
    department: 'Education - Corporate',
    location: 'Belfast, UK',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 55000, max: 75000, currency: 'GBP' },
    description: 'Design and deliver training programs for corporate employees. Develop instructional materials and assess learning outcomes.',
    requirements: [
      'Bachelor\'s in Education or related field',
      '3+ years training experience',
      'Instructional design knowledge',
      'Presentation skills',
      'Adult learning principles'
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Training budget',
      'Flexible schedule',
      'Travel opportunities'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
    applicationsCount: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  
  // ADDITIONAL TECH JOBS
  {
    id: '22',
    title: 'Cloud Architect',
    slug: 'cloud-architect',
    department: 'Technology - Cloud Infrastructure',
    location: 'Edinburgh, UK',
    jobType: 'full-time',
    experienceLevel: 'senior',
    salary: { min: 140000, max: 180000, currency: 'GBP' },
    description: 'Design and implement scalable cloud solutions for enterprise clients. Lead cloud migration strategies and optimize infrastructure costs.',
    requirements: [
      '6+ years cloud architecture experience',
      'AWS, Azure, or GCP certification',
      'Enterprise architecture knowledge',
      'Strong security background',
      'Leadership experience'
    ],
    benefits: [
      'Competitive salary and equity',
      'Remote work flexibility',
      'Conference budget',
      'Healthcare and wellness',
      'Unlimited PTO'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    applicationsCount: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '23',
    title: 'AI/ML Engineer',
    slug: 'ai-ml-engineer',
    department: 'Technology - Artificial Intelligence',
    location: 'Cambridge, UK',
    jobType: 'full-time',
    experienceLevel: 'senior',
    salary: { min: 160000, max: 210000, currency: 'GBP' },
    description: 'Build and deploy machine learning models and AI solutions. Work on cutting-edge projects that impact millions of users worldwide.',
    requirements: [
      'Master\'s in ML, AI, or Computer Science',
      '4+ years ML/AI development experience',
      'TensorFlow, PyTorch, or similar frameworks',
      'Deep learning knowledge',
      'Research paper experience'
    ],
    benefits: [
      'Exceptional salary and equity package',
      'Research opportunities',
      'Free courses and certifications',
      'Gym membership',
      'Unlimited PTO'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    applicationsCount: 18,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '24',
    title: 'QA Automation Engineer',
    slug: 'qa-automation-engineer',
    department: 'Technology - Quality Assurance',
    location: 'Oxford, UK',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 90000, max: 120000, currency: 'GBP' },
    description: 'Develop automated testing frameworks and ensure software quality. Create comprehensive test strategies and improve testing efficiency.',
    requirements: [
      '3+ years QA automation experience',
      'Selenium, Cypress, or similar tools',
      'Strong programming skills (Java, Python, JavaScript)',
      'API testing knowledge',
      'CI/CD pipeline experience'
    ],
    benefits: [
      'Competitive salary',
      'Flexible work hours',
      'Health insurance',
      'Professional development',
      'Collaborative team environment'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    applicationsCount: 9,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '25',
    title: 'Product Manager',
    slug: 'product-manager',
    department: 'Technology - Product',
    location: 'Cambridge, UK',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 120000, max: 160000, currency: 'GBP' },
    description: 'Lead product strategy and roadmap. Collaborate with engineering, design, and marketing to deliver user-centric solutions.',
    requirements: [
      '3+ years product management experience',
      'Technical background or strong technical fluency',
      'User research and analytics skills',
      'Agile/Scrum experience',
      'Communication excellence'
    ],
    benefits: [
      'Competitive salary and equity',
      'Unlimited PTO',
      'Remote work options',
      'Learning budget',
      'Stock options'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    applicationsCount: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // ADDITIONAL BUSINESS JOBS
  {
    id: '26',
    title: 'HR Manager',
    slug: 'hr-manager',
    department: 'Human Resources - Management',
    location: 'London, UK',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 75000, max: 110000, currency: 'GBP' },
    description: 'Manage HR operations and talent acquisition. Develop and implement HR policies, recruit top talent, and manage employee relations.',
    requirements: [
      'Bachelor\'s in HR or related field',
      '3+ years HR management experience',
      'SHRM certification preferred',
      'Strong communication skills',
      'Knowledge of employment law'
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Performance bonuses',
      'Professional development',
      'Paid time off'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    applicationsCount: 7,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '27',
    title: 'Business Analyst',
    slug: 'business-analyst',
    department: 'Business - Analysis',
    location: 'Birmingham, UK',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 70000, max: 100000, currency: 'GBP' },
    description: 'Analyze business requirements and optimize processes. Bridge the gap between business needs and technical solutions.',
    requirements: [
      'Bachelor\'s in Business, Economics, or IT',
      '2+ years business analysis experience',
      'SQL and data analysis skills',
      'Strong documentation abilities',
      'Stakeholder management experience'
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Flexible schedule',
      'Professional growth opportunities',
      'Collaborative environment'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    applicationsCount: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '28',
    title: 'Content Writer',
    slug: 'content-writer',
    department: 'Marketing - Content',
    location: 'Remote (UK)',
    jobType: 'full-time',
    experienceLevel: 'entry',
    salary: { min: 45000, max: 65000, currency: 'GBP' },
    description: 'Create engaging content for blogs, social media, and marketing materials. Develop SEO-optimized content strategies.',
    requirements: [
      'Bachelor\'s in Communications, Journalism, or Marketing',
      '1+ years content writing experience',
      'Excellent writing and editing skills',
      'SEO knowledge',
      'Social media familiarity'
    ],
    benefits: [
      'Competitive salary',
      'Fully remote work',
      'Health insurance',
      'Flexible hours',
      'Creative freedom'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    applicationsCount: 14,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '29',
    title: 'Supply Chain Manager',
    slug: 'supply-chain-manager',
    department: 'Operations - Supply Chain',
    location: 'Belfast, UK',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 80000, max: 115000, currency: 'GBP' },
    description: 'Manage supply chain operations and vendor relationships. Optimize logistics and ensure cost efficiency.',
    requirements: [
      'Bachelor\'s in Supply Chain, Logistics, or Business',
      '3+ years supply chain experience',
      'APICS certification preferred',
      'SAP or ERP system knowledge',
      'Strong analytical skills'
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Performance incentives',
      'Travel opportunities',
      'Professional certifications'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    applicationsCount: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '30',
    title: 'Project Manager',
    slug: 'project-manager',
    department: 'Business - Project Management',
    location: 'York, UK',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 85000, max: 120000, currency: 'GBP' },
    description: 'Lead cross-functional teams and manage projects from conception to completion. Ensure on-time and on-budget delivery.',
    requirements: [
      'Bachelor\'s degree',
      '3+ years project management experience',
      'PMP or similar certification',
      'Agile/Waterfall methodology knowledge',
      'Leadership skills'
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Bonus structure',
      'Professional development budget',
      'Work-life balance'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    applicationsCount: 11,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '31',
    title: 'Frontend Developer',
    slug: 'frontend-developer',
    department: 'Technology - Web Development',
    location: 'Manchester, UK',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 95000, max: 130000, currency: 'GBP' },
    description: 'Build responsive and intuitive user interfaces. Collaborate with designers and backend developers to create exceptional web experiences.',
    requirements: [
      '3+ years frontend development experience',
      'Proficiency in React, Vue, or Angular',
      'HTML, CSS, JavaScript expertise',
      'Responsive design knowledge',
      'Version control experience'
    ],
    benefits: [
      'Competitive salary',
      'Remote work flexibility',
      'Health insurance',
      'Learning opportunities',
      'Collaborative culture'
    ],
    isActive: true,
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    applicationsCount: 16,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const initialSettings: SiteSettings = {
  siteName: 'Vortex Care and Support Ltd',
  tagline: 'Join Our Growing Team',
  description: 'Discover exciting career opportunities with Vortex Care and Support Ltd. We\'re seeking talented professionals to join our growing UK-based organisation across healthcare, technology, education, and business services.',
  phone: '+44 (0)20 7946 0958',
  email: 'careers@vortexcare.co.uk',
  address: '45 Harley Street, London, W1G 8QH, United Kingdom',
  operatingHours: 'Monday - Friday: 9:00 AM - 5:30 PM GMT',
  emergencyContact: '+44 (0)20 7946 0958',
  socialLinks: {
    facebook: 'https://facebook.com/vortexcaresupport',
    twitter: 'https://twitter.com/vortexcaresupport',
    linkedin: 'https://linkedin.com/company/vortex-care-and-support-ltd',
    instagram: 'https://instagram.com/vortexcaresupport',
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
