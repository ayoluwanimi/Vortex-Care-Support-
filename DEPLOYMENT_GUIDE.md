# Vortex Healthcare Recruitment Portal - Deployment Guide

## Project Overview
This is a modern healthcare recruitment website built with React, Vite, TypeScript, and Tailwind CSS. It features:

- **Public Job Portal**: Browse and apply for healthcare positions
- **Admin Dashboard**: Manage jobs, applications, users, and messages
- **Secure Authentication**: Role-based access control
- **Responsive Design**: Mobile-friendly interface
- **State Management**: Zustand for client-side state

## Key Features Implemented

### Public Pages
- **Home**: Hero section, featured positions, why join us section
- **Jobs**: Complete job listing with filters (location, department, job type)
- **Job Application**: Detailed application form for each position
- **Contact**: Contact form
- **About**: Company information
- **Legal Pages**: Terms, Privacy Policy

### Admin Panel (Access: `/admin`)
- **Dashboard**: Overview of positions, applications, and metrics
- **Job Positions Management**: Create, edit, delete job positions
- **Applications Management**: View, filter, and update application status
- **User Management**: Create, edit, delete admin users (Super Admin only)
- **Messages**: Contact form submissions
- **Settings**: Site configuration

## Authentication
- **Default Admin Credentials**: 
  - Email: `admin@vortexcare.com`
  - Password: `SecureAdmin@2025` (CHANGE THIS IMMEDIATELY IN PRODUCTION!)
- **Access**: Admin panel at `/admin` with role-based permissions

## Technology Stack
- React 19.2.3
- TypeScript 5.9.3
- Vite 7.2.4
- Tailwind CSS 4.1.17
- React Router 7.13.0
- React Hook Form 7.71.1
- Zod for validation
- Zustand for state management
- Lucide React icons

## Local Development

### Setup
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
npm run preview
```

## Deployment to Netlify

### Method 1: Direct GitHub Connection (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Healthcare recruitment website"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to https://netlify.com
   - Click "Add new site" → "Import an existing project"
   - Select GitHub and authorize
   - Choose your repository: `ayoluwanimi/Vortex-Care-Support-`
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Custom Domain** (Optional)
   - Go to Site Settings → Domain Management
   - Add custom domain and configure DNS

### Method 2: Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to Netlify
   - Or use Netlify CLI:
     ```bash
     npm install -g netlify-cli
     netlify deploy --prod --dir=dist
     ```

### Method 3: Netlify CLI

1. **Install and authenticate**
   ```bash
   npm install -g netlify-cli
   netlify login
   ```

2. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

## Build and Deployment Configuration

### Vite Config
- Single-file build for easy deployment
- Optimized production bundle
- Asset inlining

### Environment Variables
Create a `.env` file if needed (for API endpoints, etc.)

## Post-Deployment Checklist

- [ ] Verify site loads correctly
- [ ] Test all navigation links
- [ ] Test job application form
- [ ] Test admin login at `/admin`
- [ ] Change default admin password
- [ ] Update site title and description in settings
- [ ] Configure email notifications (if using backend)
- [ ] Set up form submission notifications
- [ ] Configure custom domain
- [ ] Enable HTTPS (automatic with Netlify)
- [ ] Set up analytics

## Important Security Notes

⚠️ **SECURITY WARNINGS**:
1. The demo credentials are displayed in the console - change them immediately!
2. This is a frontend-only demo with localStorage for data persistence
3. For production:
   - Implement a proper backend API
   - Use secure password hashing
   - Implement proper authentication (OAuth, JWT, etc.)
   - Add rate limiting
   - Implement CSRF protection
   - Never store sensitive data in localStorage
   - Add comprehensive error handling

## Data Persistence

Currently, all data is stored in browser localStorage. For production:
- Implement a backend API (Node.js, Python, etc.)
- Use a proper database (PostgreSQL, MongoDB, etc.)
- Implement user authentication
- Add email notifications
- Implement file uploads for resumes

## Admin Credentials Reset

To change admin credentials, edit `src/store/authStore.ts`:
```typescript
const defaultUsers: User[] = [
  {
    id: '1',
    email: 'your-email@example.com',  // Change this
    password: 'NewPassword@2025',        // Change this
    // ... rest of config
  },
];
```

Then rebuild and redeploy.

## API Routes (Future Backend)

When implementing a backend, consider these endpoints:

```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout

GET /api/jobs
GET /api/jobs/:id
POST /api/jobs (admin)
PUT /api/jobs/:id (admin)
DELETE /api/jobs/:id (admin)

GET /api/applications
POST /api/applications
PUT /api/applications/:id (admin)

GET /api/users (admin)
POST /api/users (admin)
PUT /api/users/:id (admin)
DELETE /api/users/:id (admin)
```

## Troubleshooting

### Build Fails
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node version: `node --version` (should be v18+)

### Routes Not Working
- Check that React Router is properly configured
- Ensure Vite dev server is running for local development
- Check browser console for errors

### Form Submission Issues
- Verify form validation rules in application schema
- Check browser console for validation errors
- Test with valid email format

### Admin Login Issues
- Clear localStorage: Open DevTools → Application → Local Storage → Clear All
- Verify credentials in authStore.ts
- Check browser console for authentication errors

## Support & Maintenance

For issues or questions:
1. Check the browser console for errors
2. Review the source code in `src/`
3. Verify all dependencies are installed
4. Test in incognito/private mode to avoid cache issues

## License

This project is based on the Vortex Care Support template and has been transformed into a recruitment portal.

---

**Last Updated**: February 2026
**Version**: 1.0.0
