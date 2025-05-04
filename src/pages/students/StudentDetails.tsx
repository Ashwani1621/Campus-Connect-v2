import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash, Download, Mail, Phone, MapPin, Calendar, BookOpen } from 'lucide-react';
import { Student } from '../../types';

// Mock student data
const mockStudent: Student = {
  _id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  registrationNumber: 'REG2023001',
  contactNumber: '+1 234-567-8900',
  dateOfBirth: '2000-05-15',
  gender: 'male',
  address: '123 College Street, Academic City, ST 12345',
  department: 'Computer Science',
  batch: '2023',
  enrolledCourses: [],
  attendanceRecord: [],
  feeStatus: [],
  createdAt: '2023-01-15T08:30:00.000Z',
  updatedAt: '2023-08-20T14:20:00.000Z'
};

const StudentDetails = () => {
  const { id } = useParams();
  const [student] = useState<Student>(mockStudent);
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'attendance' | 'fees'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'courses', label: 'Courses' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'fees', label: 'Fees' }
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/students" className="btn-outline p-2">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">Student Details</h1>
            <p className="text-sm text-neutral-500">View and manage student information</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-outline">
            <Download size={18} className="mr-2" />
            Export
          </button>
          <button className="btn-primary">
            <Edit size={18} className="mr-2" />
            Edit
          </button>
          <button className="btn-outline text-error-600 hover:bg-error-50 hover:border-error-300">
            <Trash size={18} className="mr-2" />
            Delete
          </button>
        </div>
      </div>

      {/* Student Profile Card */}
      <div className="card">
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-2xl font-semibold">
              {student.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-neutral-900">{student.name}</h2>
              <p className="text-neutral-500">{student.registrationNumber}</p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-neutral-600">
                  <Mail size={16} className="mr-2 text-neutral-400" />
                  {student.email}
                </div>
                <div className="flex items-center text-sm text-neutral-600">
                  <Phone size={16} className="mr-2 text-neutral-400" />
                  {student.contactNumber}
                </div>
                <div className="flex items-center text-sm text-neutral-600">
                  <MapPin size={16} className="mr-2 text-neutral-400" />
                  {student.address}
                </div>
                <div className="flex items-center text-sm text-neutral-600">
                  <Calendar size={16} className="mr-2 text-neutral-400" />
                  {new Date(student.dateOfBirth).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-neutral-600">
                  <BookOpen size={16} className="mr-2 text-neutral-400" />
                  {student.department} - {student.batch}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Personal Information</h3>
              </div>
              <div className="card-body">
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-neutral-500">Full Name</dt>
                    <dd className="mt-1 text-sm text-neutral-900">{student.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-neutral-500">Email Address</dt>
                    <dd className="mt-1 text-sm text-neutral-900">{student.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-neutral-500">Phone Number</dt>
                    <dd className="mt-1 text-sm text-neutral-900">{student.contactNumber}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-neutral-500">Date of Birth</dt>
                    <dd className="mt-1 text-sm text-neutral-900">
                      {new Date(student.dateOfBirth).toLocaleDateString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-neutral-500">Gender</dt>
                    <dd className="mt-1 text-sm text-neutral-900 capitalize">{student.gender}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-neutral-500">Address</dt>
                    <dd className="mt-1 text-sm text-neutral-900">{student.address}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Academic Information</h3>
              </div>
              <div className="card-body">
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-neutral-500">Registration Number</dt>
                    <dd className="mt-1 text-sm text-neutral-900">{student.registrationNumber}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-neutral-500">Department</dt>
                    <dd className="mt-1 text-sm text-neutral-900">{student.department}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-neutral-500">Batch</dt>
                    <dd className="mt-1 text-sm text-neutral-900">{student.batch}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-neutral-500">Enrolled Courses</dt>
                    <dd className="mt-1 text-sm text-neutral-900">
                      {student.enrolledCourses.length} courses
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-neutral-500">Joined Date</dt>
                    <dd className="mt-1 text-sm text-neutral-900">
                      {new Date(student.createdAt).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Enrolled Courses</h3>
            </div>
            <div className="card-body">
              <p className="text-neutral-500">No courses enrolled yet.</p>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Attendance Record</h3>
            </div>
            <div className="card-body">
              <p className="text-neutral-500">No attendance records available.</p>
            </div>
          </div>
        )}

        {activeTab === 'fees' && (
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Fee Status</h3>
            </div>
            <div className="card-body">
              <p className="text-neutral-500">No fee records available.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;