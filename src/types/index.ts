// User types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'faculty' | 'student';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Student types
export interface Student {
  _id: string;
  name: string;
  email: string;
  registrationNumber: string;
  contactNumber: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  avatar?: string;
  department: string;
  batch: string;
  enrolledCourses: Course[];
  attendanceRecord: Attendance[];
  feeStatus: FeeRecord[];
  createdAt: string;
  updatedAt: string;
}

// Faculty types
export interface Faculty {
  _id: string;
  name: string;
  email: string;
  employeeId: string;
  contactNumber: string;
  department: string;
  designation: string;
  joinDate: string;
  education: string;
  specialization: string;
  assignedCourses: Course[];
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Course types
export interface Course {
  _id: string;
  courseCode: string;
  name: string;
  description: string;
  department: string;
  credits: number;
  semester: string;
  syllabus: string;
  assignedFaculty?: Faculty;
  enrolledStudents?: Student[];
  schedule?: Schedule[];
  createdAt: string;
  updatedAt: string;
}

export interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
  room: string;
}

// Attendance types
export interface Attendance {
  _id: string;
  student: string | Student;
  course: string | Course;
  date: string;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}

// Fee types
export interface FeeRecord {
  _id: string;
  student: string | Student;
  feeType: 'tuition' | 'hostel' | 'transport' | 'other';
  amount: number;
  dueDate: string;
  paidAmount: number;
  paidDate?: string;
  status: 'paid' | 'partial' | 'unpaid' | 'overdue';
  paymentMethod?: 'cash' | 'card' | 'bank transfer' | 'online';
  transactionId?: string;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}

// Department types
export interface Department {
  _id: string;
  name: string;
  code: string;
  headOfDepartment: string | Faculty;
  createdAt: string;
  updatedAt: string;
}

// Dashboard types
export interface DashboardStats {
  totalStudents: number;
  totalFaculty: number;
  totalCourses: number;
  feeCollection: {
    collected: number;
    pending: number;
    overdue: number;
  };
  studentAttendance: {
    present: number;
    absent: number;
    late: number;
  };
  recentActivities: Activity[];
}

export interface Activity {
  _id: string;
  type: 'enrollment' | 'fee_payment' | 'course_update' | 'attendance' | 'other';
  description: string;
  timestamp: string;
}

// Common pagination types
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  totalDocs: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
}

// API error type
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string>;
}