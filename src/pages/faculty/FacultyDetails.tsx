import React from 'react';
import { useParams } from 'react-router-dom';

const FacultyDetails = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Faculty Details</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Details for faculty member {id} will be implemented here</p>
      </div>
    </div>
  );
};

export default FacultyDetails;