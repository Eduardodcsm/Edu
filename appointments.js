// ===== APPOINTMENTS MANAGEMENT =====

class AppointmentsManager {
  constructor() {
    this.appointments = [];
    this.selectedAppointment = null;
  }

  // Add appointment
  addAppointment(appointment) {
    const newAppointment = {
      id: generateId('apt'),
      ...appointment,
      createdAt: new Date().toISOString()
    };
    this.appointments.push(newAppointment);
    showNotification('Appointment created successfully', 'success');
    return newAppointment;
  }

  // Update appointment
  updateAppointment(id, updates) {
    const index = this.appointments.findIndex(apt => apt.id === id);
    if (index !== -1) {
      this.appointments[index] = { ...this.appointments[index], ...updates };
      showNotification('Appointment updated successfully', 'success');
      return this.appointments[index];
    }
    return null;
  }

  // Delete appointment
  deleteAppointment(id) {
    const index = this.appointments.findIndex(apt => apt.id === id);
    if (index !== -1) {
      this.appointments.splice(index, 1);
      showNotification('Appointment deleted successfully', 'success');
      return true;
    }
    return false;
  }

  // Get appointment by ID
  getAppointment(id) {
    return this.appointments.find(apt => apt.id === id);
  }

  // Get appointments by date
  getAppointmentsByDate(date) {
    return this.appointments.filter(apt => apt.date === date);
  }

  // Get appointments by doctor
  getAppointmentsByDoctor(doctorId) {
    return this.appointments.filter(apt => apt.doctorId === doctorId);
  }

  // Get appointments by status
  getAppointmentsByStatus(status) {
    return this.appointments.filter(apt => apt.status === status);
  }

  // Get today's appointments
  getTodayAppointments() {
    const today = getTodayDate();
    return this.getAppointmentsByDate(today);
  }

  // Get this week's appointments
  getWeekAppointments() {
    const weekDates = getWeekDates(new Date());
    return this.appointments.filter(apt => weekDates.includes(apt.date));
  }

  // Search appointments
  searchAppointments(searchTerm) {
    return filterBySearch(
      this.appointments,
      searchTerm,
      ['patientName', 'doctorId', 'specialty', 'date', 'status']
    );
  }

  // Check for conflicts
  hasConflict(doctorId, date, time, duration, excludeId = null) {
    const appointments = this.getAppointmentsByDoctor(doctorId)
      .filter(apt => apt.date === date && apt.id !== excludeId);

    const endTime = addMinutesToTime(time, duration);

    return appointments.some(apt => {
      const aptEndTime = addMinutesToTime(apt.time, apt.duration);
      return (
        (time >= apt.time && time < aptEndTime) ||
        (endTime > apt.time && endTime <= aptEndTime) ||
        (time <= apt.time && endTime >= aptEndTime)
      );
    });
  }

  // Get all appointments
  getAllAppointments() {
    return this.appointments;
  }

  // Initialize with sample data
  initializeSampleData(sampleAppointments, doctors) {
    this.appointments = sampleAppointments.map(apt => ({
      ...apt,
      doctorId: doctors.find(d => d.name === apt.doctorId)?.id || apt.doctorId
    }));
  }
}

// Render appointments table
function renderAppointmentsTable(appointments, doctors) {
  const tbody = document.getElementById('appointmentsTableBody');
  
  if (appointments.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: var(--space-32); color: var(--color-text-secondary);">
          No appointments found
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = appointments.map(apt => {
    const doctor = doctors.find(d => d.id === apt.doctorId);
    const statusClass = apt.status.toLowerCase();
    
    return `
      <tr>
        <td><strong>${apt.patientName}</strong></td>
        <td>${doctor ? doctor.name : 'Unknown'}</td>
        <td>
          <span style="display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 11px; background-color: ${doctor ? doctor.color + '20' : '#ccc'}; color: ${doctor ? doctor.color : '#666'};">
            ${apt.specialty}
          </span>
        </td>
        <td>${formatDate(apt.date)} ${formatTime(apt.time)}</td>
        <td>${apt.duration} min</td>
        <td><span class="status-badge ${statusClass}">${apt.status}</span></td>
        <td>
          <button class="btn btn--secondary btn-sm" onclick="editAppointment('${apt.id}')" style="padding: 4px 12px; font-size: 12px; margin-right: 4px;">Edit</button>
          <button class="btn btn--danger btn-sm" onclick="deleteAppointmentConfirm('${apt.id}')" style="padding: 4px 12px; font-size: 12px;">Cancel</button>
        </td>
      </tr>
    `;
  }).join('');
}

// Edit appointment
function editAppointment(id) {
  const appointment = appointmentsManager.getAppointment(id);
  if (!appointment) return;

  appointmentsManager.selectedAppointment = appointment;
  
  document.getElementById('appointmentModalTitle').textContent = 'Edit Appointment';
  document.getElementById('patientName').value = appointment.patientName;
  document.getElementById('patientPhone').value = appointment.patientPhone || '';
  document.getElementById('appointmentSpecialty').value = appointment.specialty;
  
  // Trigger specialty change to load doctors
  document.getElementById('appointmentSpecialty').dispatchEvent(new Event('change'));
  
  setTimeout(() => {
    document.getElementById('appointmentDoctor').value = appointment.doctorId;
    document.getElementById('appointmentDate').value = appointment.date;
    document.getElementById('appointmentTime').value = appointment.time;
    document.getElementById('appointmentType').value = appointment.type || 'Checkup';
    document.getElementById('appointmentNotes').value = appointment.notes || '';
  }, 100);

  document.getElementById('appointmentModal').classList.remove('hidden');
}

// Delete appointment confirmation
function deleteAppointmentConfirm(id) {
  if (confirm('Are you sure you want to cancel this appointment?')) {
    appointmentsManager.deleteAppointment(id);
    refreshAppointmentsView();
    refreshDashboard();
    if (currentView === 'calendar') {
      calendarManager.renderCalendar();
    }
  }
}

// Refresh appointments view
function refreshAppointmentsView() {
  const searchTerm = document.getElementById('searchAppointments').value;
  const statusFilter = document.getElementById('appointmentStatusFilter').value;
  
  let filtered = appointmentsManager.getAllAppointments();
  
  if (searchTerm) {
    filtered = appointmentsManager.searchAppointments(searchTerm);
  }
  
  if (statusFilter) {
    filtered = filtered.filter(apt => apt.status === statusFilter);
  }
  
  renderAppointmentsTable(filtered, doctorsManager.getAllDoctors());
}