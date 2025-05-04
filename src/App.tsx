import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useAuthStore } from './stores/authStore';
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';
import LoadingScreen from './components/common/LoadingScreen';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Lazy loaded pages
const Login = lazy(() => import('./pages/auth/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Students = lazy(() => import('./pages/students/Students'));
const StudentDetails = lazy(() => import('./pages/students/StudentDetails'));
const Faculty = lazy(() => import('./pages/faculty/Faculty'));
// const FacultyDetails = lazy(() => import('./pages/faculty/FacultyDetails'));
// const Courses = lazy(() => import('./pages/courses/Courses'));
// const CourseDetails = lazy(() => import('./pages/courses/CourseDetails'));
// const Fees = lazy(() => import('./pages/fees/Fees'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const { checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* App Routes */}
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Student Routes */}
            <Route path="/students" element={<Students />} />
            <Route path="/students/:id" element={<StudentDetails />} />
            
            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Route>  
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;