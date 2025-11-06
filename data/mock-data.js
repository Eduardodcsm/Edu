/**
 * MOCK DATA
 * Sample data for development and testing
 */

const MockData = (function() {
  'use strict';

  const doctors = [
    {
      id: 'doc_001',
      name: 'Dr. Sarah Johnson',
      specialty: 'General Dentistry',
      licenseNumber: 'DT-2020-001',
      bio: '12+ years of experience in preventive dentistry and patient care',
      phone: '(555) 123-4567',
      email: 'sarah.johnson@dental.com',
      workingHours: { start: '08:00', end: '18:00' },
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      status: 'Working',
      color: '#2180CE'
    },
    {
      id: 'doc_002',
      name: 'Dr. Michael Chen',
      specialty: 'Endodontics',
      licenseNumber: 'DT-2021-002',
      bio: 'Specialist in root canal therapy and endodontic pain management',
      phone: '(555) 234-5678',
      email: 'michael.chen@dental.com',
      workingHours: { start: '09:00', end: '17:00' },
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      status: 'Working',
      color: '#E24A4A'
    },
    {
      id: 'doc_003',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Orthodontics',
      licenseNumber: 'DT-2019-003',
      bio: 'Certified orthodontist specializing in braces and clear aligners',
      phone: '(555) 345-6789',
      email: 'emily.rodriguez@dental.com',
      workingHours: { start: '08:00', end: '17:00' },
      workingDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      status: 'Off-Duty',
      color: '#50C878'
    },
    {
      id: 'doc_004',
      name: 'Dr. Robert Williams',
      specialty: 'Periodontics',
      licenseNumber: 'DT-2022-004',
      bio: '8+ years specializing in gum disease treatment and prevention',
      phone: '(555) 456-7890',
      email: 'robert.williams@dental.com',
      workingHours: { start: '08:00', end: '16:30' },
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      status: 'Working',
      color: '#FFB700'
    },
    {
      id: 'doc_005',
      name: 'Dr. Jessica Martinez',
      specialty: 'Prosthodontics',
      licenseNumber: 'DT-2020-005',
      bio: 'Implant specialist and prosthodontic surgeon with advanced training',
      phone: '(555) 567-8901',
      email: 'jessica.martinez@dental.com',
      workingHours: { start: '09:00', end: '18:00' },
      workingDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      status: 'Working',
      color: '#9B59B6'
    },
    {
      id: 'doc_006',
      name: 'Dr. Thomas Anderson',
      specialty: 'Pediatric Dentistry',
      licenseNumber: 'DT-2021-006',
      bio: 'Specialized in pediatric dentistry and creating positive patient experiences',
      phone: '(555) 678-9012',
      email: 'thomas.anderson@dental.com',
      workingHours: { start: '10:00', end: '14:00' },
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      status: 'Working',
      color: '#3B82F6'
    }
  ];

  const appointments = [
    { id: 'apt_001', patientName: 'John Smith', patientPhone: '(555) 111-1111', doctorId: 'doc_001', specialty: 'General Dentistry', date: '2025-11-06', time: '09:00', duration: 30, status: 'Confirmed', type: 'Checkup' },
    { id: 'apt_002', patientName: 'Maria Garcia', patientPhone: '(555) 222-2222', doctorId: 'doc_002', specialty: 'Endodontics', date: '2025-11-06', time: '10:00', duration: 45, status: 'Confirmed', type: 'Root Canal' },
    { id: 'apt_003', patientName: 'David Lee', patientPhone: '(555) 333-3333', doctorId: 'doc_001', specialty: 'General Dentistry', date: '2025-11-06', time: '14:00', duration: 30, status: 'Pending', type: 'Consultation' },
    { id: 'apt_004', patientName: 'Sarah Williams', patientPhone: '(555) 444-4444', doctorId: 'doc_004', specialty: 'Periodontics', date: '2025-11-07', time: '09:30', duration: 40, status: 'Confirmed', type: 'Treatment' },
    { id: 'apt_005', patientName: 'Robert Brown', patientPhone: '(555) 555-5555', doctorId: 'doc_005', specialty: 'Prosthodontics', date: '2025-11-07', time: '11:00', duration: 50, status: 'Confirmed', type: 'Consultation' },
    { id: 'apt_006', patientName: 'Emma Davis', patientPhone: '(555) 666-6666', doctorId: 'doc_006', specialty: 'Pediatric Dentistry', date: '2025-11-06', time: '11:00', duration: 25, status: 'Confirmed', type: 'Cleaning' },
    { id: 'apt_007', patientName: 'James Wilson', patientPhone: '(555) 789-0123', doctorId: 'doc_001', specialty: 'General Dentistry', date: '2025-11-08', time: '10:00', duration: 30, status: 'Confirmed', type: 'Checkup' },
    { id: 'apt_008', patientName: 'Patricia Johnson', patientPhone: '(555) 890-1234', doctorId: 'doc_005', specialty: 'Prosthodontics', date: '2025-11-08', time: '14:00', duration: 60, status: 'Pending', type: 'Implant Placement' },
    { id: 'apt_009', patientName: 'Michael Brown', patientPhone: '(555) 901-2345', doctorId: 'doc_002', specialty: 'Endodontics', date: '2025-11-07', time: '15:00', duration: 45, status: 'Confirmed', type: 'Root Canal' },
    { id: 'apt_010', patientName: 'Lisa Anderson', patientPhone: '(555) 012-3456', doctorId: 'doc_004', specialty: 'Periodontics', date: '2025-11-06', time: '16:00', duration: 40, status: 'Confirmed', type: 'Scaling & Root Planing' },
    { id: 'apt_011', patientName: 'Christopher Lee', patientPhone: '(555) 111-2222', doctorId: 'doc_006', specialty: 'Pediatric Dentistry', date: '2025-11-06', time: '12:00', duration: 25, status: 'Confirmed', type: 'Checkup' },
    { id: 'apt_012', patientName: 'Jennifer Martinez', patientPhone: '(555) 222-3333', doctorId: 'doc_001', specialty: 'General Dentistry', date: '2025-11-06', time: '15:30', duration: 30, status: 'Pending', type: 'Cleaning' },
    { id: 'apt_013', patientName: 'Daniel Harris', patientPhone: '(555) 333-4444', doctorId: 'doc_003', specialty: 'Orthodontics', date: '2025-11-07', time: '10:00', duration: 60, status: 'Confirmed', type: 'Consultation' },
    { id: 'apt_014', patientName: 'Michelle Clark', patientPhone: '(555) 444-5555', doctorId: 'doc_004', specialty: 'Periodontics', date: '2025-11-08', time: '08:30', duration: 40, status: 'Confirmed', type: 'Treatment' },
    { id: 'apt_015', patientName: 'Kevin Taylor', patientPhone: '(555) 555-6666', doctorId: 'doc_002', specialty: 'Endodontics', date: '2025-11-06', time: '13:00', duration: 45, status: 'Confirmed', type: 'Follow-up' },
    { id: 'apt_016', patientName: 'Amanda White', patientPhone: '(555) 666-7777', doctorId: 'doc_001', specialty: 'General Dentistry', date: '2025-11-09', time: '09:00', duration: 30, status: 'Pending', type: 'Checkup' },
    { id: 'apt_017', patientName: 'Ryan Thomas', patientPhone: '(555) 777-8888', doctorId: 'doc_006', specialty: 'Pediatric Dentistry', date: '2025-11-09', time: '10:30', duration: 25, status: 'Confirmed', type: 'Cleaning' },
    { id: 'apt_018', patientName: 'Nicole Jackson', patientPhone: '(555) 888-9999', doctorId: 'doc_004', specialty: 'Periodontics', date: '2025-11-09', time: '14:00', duration: 40, status: 'Confirmed', type: 'Consultation' },
    { id: 'apt_019', patientName: 'Brandon Lopez', patientPhone: '(555) 999-0000', doctorId: 'doc_002', specialty: 'Endodontics', date: '2025-11-10', time: '11:00', duration: 45, status: 'Pending', type: 'Root Canal' },
    { id: 'apt_020', patientName: 'Stephanie Hill', patientPhone: '(555) 000-1111', doctorId: 'doc_005', specialty: 'Prosthodontics', date: '2025-11-10', time: '15:00', duration: 50, status: 'Confirmed', type: 'Treatment' }
  ];

  const specialties = [
    { name: 'General Dentistry', color: '#2180CE' },
    { name: 'Endodontics', color: '#E24A4A' },
    { name: 'Orthodontics', color: '#50C878' },
    { name: 'Periodontics', color: '#FFB700' },
    { name: 'Prosthodontics', color: '#9B59B6' },
    { name: 'Pediatric Dentistry', color: '#3B82F6' }
  ];

  const appointmentTypes = [
    'Checkup',
    'Cleaning',
    'Root Canal',
    'Consultation',
    'Treatment',
    'Follow-up',
    'Implant Placement',
    'Scaling & Root Planing'
  ];

  const statuses = [
    { name: 'Confirmed', color: '#50C878' },
    { name: 'Pending', color: '#FFB700' },
    { name: 'Cancelled', color: '#E24A4A' },
    { name: 'Completed', color: '#3B82F6' }
  ];

  return {
    doctors,
    appointments,
    specialties,
    appointmentTypes,
    statuses
  };

})();