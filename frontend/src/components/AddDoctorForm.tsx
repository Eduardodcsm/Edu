import React, { useState } from 'react';

const AddDoctorForm: React.FC = () => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to add the new doctor will be added here
    console.log('Adding new doctor:', { name, specialty });
    setName('');
    setSpecialty('');
  };

  return (
    <div>
      <h2>Add New Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="specialty">Specialty:</label>
          <input
            type="text"
            id="specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Doctor</button>
      </form>
    </div>
  );
};

export default AddDoctorForm;
