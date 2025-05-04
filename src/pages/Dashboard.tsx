import { useState, useEffect } from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  BadgeDollarSign,
  ChevronRight,
  TrendingUp,
  Calendar,
  Bell
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DashboardStats } from '../types';
import { toaster } from '../components/ui/Toaster';

// Mock data
const MOCK_STATS: DashboardStats = {
  totalStudents: 1248,
  totalFaculty: 87,
  totalCourses: 156,
  feeCollection: {
    collected: 890000,
    pending: 125000,
    overdue: 45000
  },
  studentAttendance: {
    present: 78,
    absent: 12,
    late: 10
  },
  recentActivities: [
    {
      _id: '1',
      type: 'enrollment',
      description: 'John Doe enrolled in Computer Science 101',
      timestamp: '2023-09-12T10:30:00Z'
    },
    {
      _id: '2',
      type: 'fee_payment',
      description: 'Sarah Smith paid $1,200 for Spring semester',
      timestamp: '2023-09-11T14:45:00Z'
    },
    {
      _id: '3',
      type: 'course_update',
      description: 'Prof. Johnson updated the syllabus for Physics 202',
      timestamp: '2023-09-10T09:15:00Z'
    },
    {
      _id: '4',
      type: 'attendance',
      description: 'Attendance marked for 42 students in Mathematics 301',
      timestamp: '2023-09-09T11:20:00Z'
    }
  ]
};

// Attendance chart data
const attendanceData = [
  { name: 'Present', value: MOCK_STATS.studentAttendance.present, color: '#22c55e' },
  { name: 'Absent', value: MOCK_STATS.studentAttendance.absent, color: '#ef4444' },
  { name: 'Late', value: MOCK_STATS.studentAttendance.late, color: '#f59e0b' }
];

// Fee collection data
const feeData = [
  { name: 'Collected', amount: MOCK_STATS.feeCollection.collected },
  { name: 'Pending', amount: MOCK_STATS.feeCollection.pending },
  { name: 'Overdue', amount: MOCK_STATS.feeCollection.overdue }
];

// Format timestamp to readable date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit'
  });
};

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>(MOCK_STATS);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Show welcome toast
      toaster.showToast({
        type: 'info',
        message: 'Welcome to the College ERP System. This is a demo with mock data.',
        duration: 5000
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Activity icon based on type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'enrollment':
        return <Users className="h-5 w-5 text-primary-500" />;
      case 'fee_payment':
        return <BadgeDollarSign className="h-5 w-5 text-success-500" />;
      case 'course_update':
        return <BookOpen className="h-5 w-5 text-accent-500" />;
      case 'attendance':
        return <Calendar className="h-5 w-5 text-secondary-500" />;
      default:
        return <Bell className="h-5 w-5 text-neutral-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-white shadow-md p-6 flex items-center">
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-primary-100 text-primary-600">
            <Users size={24} />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-neutral-900">{stats.totalStudents.toLocaleString()}</h3>
            <p className="text-sm text-neutral-500">Students</p>
          </div>
        </div>

        <div className="card bg-white shadow-md p-6 flex items-center">
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-secondary-100 text-secondary-600">
            <GraduationCap size={24} />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-neutral-900">{stats.totalFaculty.toLocaleString()}</h3>
            <p className="text-sm text-neutral-500">Faculty</p>
          </div>
        </div>

        <div className="card bg-white shadow-md p-6 flex items-center">
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-accent-100 text-accent-600">
            <BookOpen size={24} />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-neutral-900">{stats.totalCourses.toLocaleString()}</h3>
            <p className="text-sm text-neutral-500">Courses</p>
          </div>
        </div>

        <div className="card bg-white shadow-md p-6 flex items-center">
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-success-100 text-success-600">
            <BadgeDollarSign size={24} />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-neutral-900">
              {formatCurrency(stats.feeCollection.collected)}
            </h3>
            <p className="text-sm text-neutral-500">Collected Fees</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fee Collection Chart */}
          <div className="card">
            <div className="card-header">
              <h3 className="font-semibold">Fee Collection Overview</h3>
            </div>
            <div className="card-body h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={feeData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis type="number" tickFormatter={(value) => `$${value/1000}k`} />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                  <Bar 
                    dataKey="amount" 
                    fill="#3b82f6"
                    radius={[0, 4, 4, 0]} 
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Attendance Chart */}
          <div className="card">
            <div className="card-header">
              <h3 className="font-semibold">Student Attendance</h3>
            </div>
            <div className="card-body h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="card">
          <div className="card-header flex justify-between items-center">
            <h3 className="font-semibold">Recent Activities</h3>
            <a href="#" className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
              View all <ChevronRight size={16} />
            </a>
          </div>
          <div className="card-body p-0">
            <ul className="divide-y divide-neutral-200">
              {stats.recentActivities.map((activity) => (
                <li key={activity._id} className="p-4 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-neutral-800">{activity.description}</p>
                      <p className="text-xs text-neutral-500 mt-1">
                        {formatDate(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-footer text-center">
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              Load more
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card hover:shadow-md transition-shadow cursor-pointer group">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full h-10 w-10 flex items-center justify-center bg-primary-100 text-primary-600">
                <Users size={20} />
              </div>
              <ChevronRight className="h-5 w-5 text-neutral-400 group-hover:text-primary-600 transition-colors" />
            </div>
            <h3 className="mt-4 font-semibold text-neutral-900">Manage Students</h3>
            <p className="mt-1 text-sm text-neutral-500">View, add, edit student records and track their progress</p>
          </div>
        </div>

        <div className="card hover:shadow-md transition-shadow cursor-pointer group">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full h-10 w-10 flex items-center justify-center bg-secondary-100 text-secondary-600">
                <BookOpen size={20} />
              </div>
              <ChevronRight className="h-5 w-5 text-neutral-400 group-hover:text-secondary-600 transition-colors" />
            </div>
            <h3 className="mt-4 font-semibold text-neutral-900">Manage Courses</h3>
            <p className="mt-1 text-sm text-neutral-500">Create and edit courses, assign faculty, and set schedules</p>
          </div>
        </div>

        <div className="card hover:shadow-md transition-shadow cursor-pointer group">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full h-10 w-10 flex items-center justify-center bg-accent-100 text-accent-600">
                <TrendingUp size={20} />
              </div>
              <ChevronRight className="h-5 w-5 text-neutral-400 group-hover:text-accent-600 transition-colors" />
            </div>
            <h3 className="mt-4 font-semibold text-neutral-900">Generate Reports</h3>
            <p className="mt-1 text-sm text-neutral-500">Access analytics, create custom reports, and export data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;