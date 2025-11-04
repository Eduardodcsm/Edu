import React from 'react';
import DoctorList from './DoctorList';
import AddDoctorForm from './AddDoctorForm';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AddDoctorForm />
      <DoctorList />
    </div>
  );
};

export default AdminDashboard;
