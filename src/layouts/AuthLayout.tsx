import { Outlet, Navigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  // Redirect if already authenticated
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 mb-4">
              <GraduationCap className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900">College ERP System</h1>
            <p className="text-neutral-500 mt-1">A comprehensive management solution</p>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;