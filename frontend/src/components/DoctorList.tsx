import React, { useState, useEffect } from 'react';
import type { Doctor } from '../types/Doctor';

const DoctorList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    // Mock data for now
    const mockDoctors: Doctor[] = [
      { id: 1, name: 'Dr. John Doe', specialty: 'Cardiology' },
      { id: 2, name: 'Dr. Jane Smith', specialty: 'Dermatology' },
    ];
    setDoctors(mockDoctors);
  }, []);

  return (
    <div>
      <h2>Doctor List</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            {doctor.name} - {doctor.specialty}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
