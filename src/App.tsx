import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { JobsPage } from '@/pages/JobsPage';
import { JobApplicationPage } from '@/pages/JobApplicationPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { LoginPage, RegisterPage } from '@/pages/AuthPages';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { PrivacyPolicyPage, TermsOfServicePage, HIPAACompliancePage } from '@/pages/LegalPages';
import { useAuthStore } from '@/store/authStore';

// Protected Route Component
function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) {
  const { user, isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly) {
    const isAdmin = user?.role === 'super_admin' || user?.role === 'admin' || user?.role === 'staff' || user?.role === 'doctor';
    if (!isAdmin) {
      return <Navigate to="/" replace />;
    }
  }
  
  return <>{children}</>;
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Layout */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/jobs" element={<Layout><JobsPage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/privacy-policy" element={<Layout><PrivacyPolicyPage /></Layout>} />
        <Route path="/terms-of-service" element={<Layout><TermsOfServicePage /></Layout>} />
        <Route path="/hipaa-compliance" element={<Layout><HIPAACompliancePage /></Layout>} />
        <Route path="/apply/:jobId" element={<Layout><JobApplicationPage /></Layout>} />
        
        {/* Auth Routes (No Layout) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Admin Dashboard (Protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Catch all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
