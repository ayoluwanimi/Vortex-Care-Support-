# Vortex Healthcare Recruitment Portal

A modern, responsive healthcare job recruitment website featuring a public job portal and comprehensive admin dashboard.

## 🎯 Features

### Public Portal
- 🏢 **Browse Job Positions**: View all available healthcare positions
- 🔍 **Advanced Filters**: Filter by location, department, and job type
- 📝 **Apply for Jobs**: Submit applications with resume and cover letter
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- ℹ️ **Position Details**: Comprehensive job descriptions and requirements

### Admin Dashboard
- 📊 **Dashboard Overview**: Key metrics and recent activities
- 💼 **Job Management**: Create, edit, and manage job positions
- 📮 **Application Tracking**: Review and update application statuses
- 👥 **User Management**: Manage admin users and roles
- 💬 **Message Management**: Handle contact form submissions
- ⚙️ **Settings**: Configure site information

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ 
- npm or yarn

### Local Development

1. **Clone and install**
   ```bash
   cd Vortex-Care-Recruitment
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173 in your browser

3. **Build for production**
   ```bash
   npm run build
   ```

### Admin Access
- **URL**: http://localhost:5173/admin
- **Email**: admin@vortexcare.com
- **Password**: SecureAdmin@2025

⚠️ **Change these credentials before production deployment!**

## 📋 Project Structure

```
src/
├── components/          # Reusable components
├── pages/              # Page components
│   ├── HomePage.tsx                    # Landing page
│   ├── JobsPage.tsx                    # Job listings
│   ├── JobApplicationPage.tsx          # Application form
│   ├── AdminDashboard.tsx              # Admin panel
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   ├── AuthPages.tsx                   # Login/Register
│   └── LegalPages.tsx
├── store/              # State management
│   ├── authStore.ts                    # User authentication
│   └── dataStore.ts                    # Job & application data
├── types/              # TypeScript types
└── utils/              # Utilities
```

## 🏗️ Built With

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod
- **State Management**: Zustand
- **Routing**: React Router
- **Icons**: Lucide React

## 🔐 Authentication

The application includes role-based access control:
- **Super Admin**: Full system access
- **Admin**: Job and user management
- **Staff**: Limited access

Current users:
- Super Admin: admin@vortexcare.com / SecureAdmin@2025
- Admin: (create via admin panel)
- Staff: (create via admin panel)

## 📦 Data Storage

Currently uses browser localStorage for data persistence. For production deployment, integrate with a backend service:
- Database (PostgreSQL, MongoDB, etc.)
- API server (Node.js, Python, Django, etc.)
- Authentication service (Auth0, Firebase, etc.)

## 🌐 Deployment

### Deploy to Netlify

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Healthcare recruitment portal"
   git push origin main
   ```

2. **Deploy to Netlify**
   - Go to https://netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Configure:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy"

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

## 📝 Available Routes

### Public Routes
- `/` - Home page
- `/jobs` - Job listings with filters
- `/apply/:jobId` - Job application form
- `/about` - About page
- `/contact` - Contact page
- `/login` - Login page
- `/register` - Registration page
- `/privacy-policy` - Privacy policy
- `/terms-of-service` - Terms of service

### Protected Routes
- `/admin` - Admin dashboard (requires authentication)
  - Dashboard overview
  - Job positions management
  - Applications management
  - User management (admin only)
  - Messages
  - Settings

## 🎨 Customization

### Change Site Information
Edit `src/store/dataStore.ts` and update `initialSettings`:
```typescript
const initialSettings: SiteSettings = {
  siteName: 'Your Company Name',
  tagline: 'Your Tagline',
  description: 'Your Description',
  // ... other settings
};
```

### Change Brand Colors
Edit `src/index.css` to modify Tailwind color scheme or use Tailwind classes directly in components.

### Add More Job Positions
Edit `src/store/dataStore.ts` and add to `initialJobPositions` array.

## 🐛 Troubleshooting

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules dist
npm install
npm run build
```

### Port Already in Use
```bash
# Use different port
npm run dev -- --port 3000
```

### Authentication Issues
1. Clear localStorage: Open DevTools → Application → Local Storage → Clear All
2. Refresh the page
3. Try logging in again

## 🔒 Security Considerations

⚠️ **Important**: This is a frontend demo application. For production:

1. **Never store credentials in code** - Use environment variables
2. **Implement proper backend** - Use secure authentication (JWT, OAuth, etc.)
3. **Add HTTPS** - Netlify provides automatic HTTPS
4. **Validate all inputs** - Both frontend and backend
5. **Implement rate limiting** - Prevent brute force attacks
6. **Use environment variables** - For API keys and secrets
7. **Add CSRF protection** - For form submissions
8. **Implement proper error handling** - Don't expose sensitive data

## 📞 Contact & Support

For questions or issues:
- Check browser console for errors (F12)
- Review the source code comments
- See DEPLOYMENT_GUIDE.md for more help

## 📄 License

This project is based on a modern recruitment portal template.

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Status**: Production Ready
