/**
 * DATA STORE
 * Central data management with observers
 */

const DataStore = (function() {
  'use strict';

  // In-memory data
  let doctors = [];
  let appointments = [];
  const observers = [];

  // Initialize with mock data
  function init() {
    doctors = JSON.parse(JSON.stringify(MockData.doctors));
    appointments = JSON.parse(JSON.stringify(MockData.appointments));
    console.log('DataStore initialized with mock data');
  }

  // Subscribe to data changes
  function subscribe(callback) {
    observers.push(callback);
  }

  // Notify observers
  function notify(type, action, data) {
    observers.forEach(callback => callback({ type, action, data }));
    DOMUtils.dispatch('dataUpdated', { type, action, data });
  }

  // ===== DOCTORS =====
  
  function getAllDoctors() {
    return [...doctors];
  }

  function getDoctorById(id) {
    return doctors.find(d => d.id === id);
  }

  function getDoctorsBySpecialty(specialty) {
    return doctors.filter(d => d.specialty === specialty);
  }

  function getWorkingDoctors() {
    return doctors.filter(d => d.status === 'Working');
  }

  function addDoctor(doctor) {
    const newDoctor = {
      ...doctor,
      id: `doc_${Date.now()}`
    };
    doctors.push(newDoctor);
    notify('doctor', 'add', newDoctor);
    return newDoctor;
  }

  function updateDoctor(id, updates) {
    const index = doctors.findIndex(d => d.id === id);
    if (index !== -1) {
      doctors[index] = { ...doctors[index], ...updates };
      notify('doctor', 'update', doctors[index]);
      return doctors[index];
    }
    return null;
  }

  function deleteDoctor(id) {
    const index = doctors.findIndex(d => d.id === id);
    if (index !== -1) {
      const deleted = doctors.splice(index, 1)[0];
      notify('doctor', 'delete', deleted);
      return deleted;
    }
    return null;
  }

  // ===== APPOINTMENTS =====
  
  function getAllAppointments() {
    return [...appointments];
  }

  function getAppointmentById(id) {
    return appointments.find(a => a.id === id);
  }

  function getAppointmentsByDate(date) {
    return appointments.filter(a => a.date === date);
  }

  function getAppointmentsByDoctor(doctorId) {
    return appointments.filter(a => a.doctorId === doctorId);
  }

  function getAppointmentsByDateRange(startDate, endDate) {
    return appointments.filter(a => a.date >= startDate && a.date <= endDate);
  }

  function getTodayAppointments() {
    const today = DateUtils.getToday();
    return getAppointmentsByDate(today);
  }

  function getUpcomingAppointments(limit = 5) {
    const now = new Date();
    return appointments
      .filter(a => {
        const aptDateTime = DateUtils.parseDateTime(a.date, a.time);
        return aptDateTime >= now && a.status !== 'Cancelled';
      })
      .sort((a, b) => {
        const dateA = DateUtils.parseDateTime(a.date, a.time);
        const dateB = DateUtils.parseDateTime(b.date, b.time);
        return dateA - dateB;
      })
      .slice(0, limit);
  }

  function addAppointment(appointment) {
    const newAppointment = {
      ...appointment,
      id: `apt_${Date.now()}`
    };
    appointments.push(newAppointment);
    notify('appointment', 'add', newAppointment);
    return newAppointment;
  }

  function updateAppointment(id, updates) {
    const index = appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      appointments[index] = { ...appointments[index], ...updates };
      notify('appointment', 'update', appointments[index]);
      return appointments[index];
    }
    return null;
  }

  function deleteAppointment(id) {
    const index = appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      const deleted = appointments.splice(index, 1)[0];
      notify('appointment', 'delete', deleted);
      return deleted;
    }
    return null;
  }

  // ===== STATISTICS =====
  
  function getDoctorStats(doctorId) {
    const doctorAppointments = appointments.filter(a => a.doctorId === doctorId);
    const today = DateUtils.getToday();
    const weekStart = DateUtils.formatDate(DateUtils.getWeekStart());
    const weekEnd = DateUtils.formatDate(DateUtils.getWeekEnd());

    return {
      today: doctorAppointments.filter(a => a.date === today).length,
      week: doctorAppointments.filter(a => a.date >= weekStart && a.date <= weekEnd).length,
      total: doctorAppointments.length
    };
  }

  function getOverallStats() {
    const today = DateUtils.getToday();
    const weekStart = DateUtils.formatDate(DateUtils.getWeekStart());
    const weekEnd = DateUtils.formatDate(DateUtils.getWeekEnd());

    return {
      totalDoctors: doctors.length,
      workingDoctors: doctors.filter(d => d.status === 'Working').length,
      todayAppointments: appointments.filter(a => a.date === today).length,
      weekAppointments: appointments.filter(a => a.date >= weekStart && a.date <= weekEnd).length,
      totalAppointments: appointments.length,
      confirmedToday: appointments.filter(a => a.date === today && a.status === 'Confirmed').length,
      pendingToday: appointments.filter(a => a.date === today && a.status === 'Pending').length
    };
  }

  // ===== HELPERS =====
  
  function getSpecialties() {
    return MockData.specialties;
  }

  function getAppointmentTypes() {
    return MockData.appointmentTypes;
  }

  function getStatuses() {
    return MockData.statuses;
  }

  return {
    init,
    subscribe,
    
    // Doctors
    getAllDoctors,
    getDoctorById,
    getDoctorsBySpecialty,
    getWorkingDoctors,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    
    // Appointments
    getAllAppointments,
    getAppointmentById,
    getAppointmentsByDate,
    getAppointmentsByDoctor,
    getAppointmentsByDateRange,
    getTodayAppointments,
    getUpcomingAppointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    
    // Statistics
    getDoctorStats,
    getOverallStats,
    
    // Helpers
    getSpecialties,
    getAppointmentTypes,
    getStatuses
  };

})();