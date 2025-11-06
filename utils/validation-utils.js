/**
 * VALIDATION UTILITIES
 * Helper functions for form validation and business logic
 */

const ValidationUtils = (function() {
  'use strict';

  // Validate required field
  function validateRequired(value, fieldName = 'Field') {
    if (!value || value.trim() === '') {
      return { valid: false, message: `${fieldName} is required` };
    }
    return { valid: true };
  }

  // Validate email
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return { valid: false, message: 'Please enter a valid email address' };
    }
    return { valid: true };
  }

  // Validate phone
  function validatePhone(phone) {
    const regex = /^[\d\s\-\(\)\+]+$/;
    if (phone && !regex.test(phone)) {
      return { valid: false, message: 'Please enter a valid phone number' };
    }
    return { valid: true };
  }

  // Validate time range
  function validateTimeRange(startTime, endTime) {
    const [startHours, startMins] = startTime.split(':').map(Number);
    const [endHours, endMins] = endTime.split(':').map(Number);
    const startTotal = startHours * 60 + startMins;
    const endTotal = endHours * 60 + endMins;
    
    if (endTotal <= startTotal) {
      return { valid: false, message: 'End time must be after start time' };
    }
    return { valid: true };
  }

  // Check appointment conflicts
  function checkAppointmentConflict(appointment, existingAppointments, excludeId = null) {
    const startTime = DateUtils.parseDateTime(appointment.date, appointment.time);
    const endTime = new Date(startTime.getTime() + appointment.duration * 60000);

    const conflicts = existingAppointments.filter(apt => {
      if (excludeId && apt.id === excludeId) return false;
      if (apt.doctorId !== appointment.doctorId || apt.date !== appointment.date) return false;
      
      const aptStart = DateUtils.parseDateTime(apt.date, apt.time);
      const aptEnd = new Date(aptStart.getTime() + apt.duration * 60000);
      
      return (startTime < aptEnd && endTime > aptStart);
    });

    if (conflicts.length > 0) {
      return {
        valid: false,
        message: 'This time slot conflicts with an existing appointment',
        conflicts
      };
    }

    return { valid: true };
  }

  // Validate doctor availability
  function validateDoctorAvailability(doctor, date, time) {
    const appointmentDate = new Date(date);
    const dayName = DateUtils.getDayName(appointmentDate.getDay());
    
    // Check if doctor works on this day
    if (!doctor.workingDays.includes(dayName)) {
      return {
        valid: false,
        message: `${doctor.name} does not work on ${dayName}s`
      };
    }

    // Check if time is within working hours
    const [hours, minutes] = time.split(':').map(Number);
    const appointmentTime = hours * 60 + minutes;
    
    const [startHours, startMins] = doctor.workingHours.start.split(':').map(Number);
    const workStart = startHours * 60 + startMins;
    
    const [endHours, endMins] = doctor.workingHours.end.split(':').map(Number);
    const workEnd = endHours * 60 + endMins;

    if (appointmentTime < workStart || appointmentTime >= workEnd) {
      return {
        valid: false,
        message: `Appointment time is outside ${doctor.name}'s working hours (${doctor.workingHours.start} - ${doctor.workingHours.end})`
      };
    }

    return { valid: true };
  }

  // Sanitize HTML to prevent XSS
  function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  return {
    validateRequired,
    validateEmail,
    validatePhone,
    validateTimeRange,
    checkAppointmentConflict,
    validateDoctorAvailability,
    sanitizeHTML
  };

})();