import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Search, Plus } from 'lucide-react';

function Students() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        </div>
        <Link
          to="/students/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Student
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search students..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Students List */}
      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-5 gap-4 p-4 font-semibold text-gray-700 border-b">
          <div>Name</div>
          <div>Student ID</div>
          <div>Course</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        
        {/* Placeholder content - Replace with actual data */}
        <div className="p-4 text-gray-600 text-center">
          No students found. Add a new student to get started.
        </div>
      </div>
    </div>
  );
}

export default Students;