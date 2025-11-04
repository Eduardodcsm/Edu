// ===== DOCTORS MANAGEMENT =====

class DoctorsManager {
  constructor() {
    this.doctors = [];
    this.selectedDoctor = null;
  }

  // Add doctor
  addDoctor(doctor) {
    const newDoctor = {
      id: generateId('doc'),
      ...doctor,
      status: 'Working',
      appointmentsToday: 0,
      totalAppointmentsWeek: 0,
      averageDuration: 30
    };
    this.doctors.push(newDoctor);
    showNotification('Doctor added successfully', 'success');
    return newDoctor;
  }

  // Update doctor
  updateDoctor(id, updates) {
    const index = this.doctors.findIndex(doc => doc.id === id);
    if (index !== -1) {
      this.doctors[index] = { ...this.doctors[index], ...updates };
      showNotification('Doctor updated successfully', 'success');
      return this.doctors[index];
    }
    return null;
  }

  // Delete doctor
  deleteDoctor(id) {
    const index = this.doctors.findIndex(doc => doc.id === id);
    if (index !== -1) {
      this.doctors.splice(index, 1);
      showNotification('Doctor removed successfully', 'success');
      return true;
    }
    return false;
  }

  // Get doctor by ID
  getDoctor(id) {
    return this.doctors.find(doc => doc.id === id);
  }

  // Get doctors by specialty
  getDoctorsBySpecialty(specialty) {
    return this.doctors.filter(doc => doc.specialty === specialty);
  }

  // Get active doctors
  getActiveDoctors() {
    return this.doctors.filter(doc => doc.status === 'Working');
  }

  // Get all doctors
  getAllDoctors() {
    return this.doctors;
  }

  // Update doctor stats
  updateDoctorStats(doctorId, appointments) {
    const doctor = this.getDoctor(doctorId);
    if (!doctor) return;

    const todayAppointments = appointments.filter(
      apt => apt.doctorId === doctorId && apt.date === getTodayDate()
    );
    
    const weekAppointments = appointments.filter(
      apt => apt.doctorId === doctorId && getWeekDates(new Date()).includes(apt.date)
    );

    doctor.appointmentsToday = todayAppointments.length;
    doctor.totalAppointmentsWeek = weekAppointments.length;
    
    if (todayAppointments.length > 0) {
      const totalDuration = todayAppointments.reduce((sum, apt) => sum + apt.duration, 0);
      doctor.averageDuration = Math.round(totalDuration / todayAppointments.length);
    }
  }

  // Initialize with sample data
  initializeSampleData(sampleDoctors) {
    this.doctors = sampleDoctors;
  }
}

// Render doctors grid
function renderDoctorsGrid(doctors) {
  const grid = document.getElementById('doctorsGrid');
  
  if (doctors.length === 0) {
    grid.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary);">No doctors found</p>';
    return;
  }

  grid.innerHTML = doctors.map(doctor => {
    const statusClass = doctor.status === 'Working' ? 'working' : 'off';
    
    return `
      <div class="doctor-card-full">
        <div class="doctor-card-header">
          <div class="doctor-card-info">
            <div class="doctor-card-name">${doctor.name}</div>
            <span class="doctor-card-specialty" style="background-color: ${doctor.color}20; color: ${doctor.color};">
              ${doctor.specialty}
            </span>
          </div>
          <span class="doctor-status ${statusClass}">${doctor.status}</span>
        </div>
        <div class="doctor-card-details">
          <div class="doctor-card-detail">
            <span style="color: var(--color-text-secondary);">License:</span>
            <span>${doctor.licenseNumber}</span>
          </div>
          <div class="doctor-card-detail">
            <span style="color: var(--color-text-secondary);">Working Hours:</span>
            <span>${formatTime(doctor.workingHours.start)} - ${formatTime(doctor.workingHours.end)}</span>
          </div>
          <div class="doctor-card-detail">
            <span style="color: var(--color-text-secondary);">Appointments Today:</span>
            <span><strong>${doctor.appointmentsToday}</strong></span>
          </div>
          <div class="doctor-card-detail">
            <span style="color: var(--color-text-secondary);">This Week:</span>
            <span>${doctor.totalAppointmentsWeek}</span>
          </div>
        </div>
        <div class="doctor-card-actions">
          <button class="btn btn--secondary" onclick="viewDoctorSchedule('${doctor.id}')" style="flex: 1;">View Schedule</button>
          <button class="btn btn--secondary" onclick="editDoctor('${doctor.id}')">Edit</button>
        </div>
      </div>
    `;
  }).join('');
}

// View doctor schedule
function viewDoctorSchedule(doctorId) {
  // Switch to calendar view and filter by doctor
  switchView('calendar');
  document.getElementById('filterDoctor').value = doctorId;
  calendarManager.filterDoctor = doctorId;
  calendarManager.renderCalendar();
}

// Edit doctor
function editDoctor(id) {
  const doctor = doctorsManager.getDoctor(id);
  if (!doctor) return;

  doctorsManager.selectedDoctor = doctor;
  
  document.getElementById('doctorModalTitle').textContent = 'Edit Doctor';
  document.getElementById('doctorName').value = doctor.name;
  document.getElementById('doctorSpecialty').value = doctor.specialty;
  document.getElementById('doctorLicense').value = doctor.licenseNumber;
  document.getElementById('doctorStartTime').value = doctor.workingHours.start;
  document.getElementById('doctorEndTime').value = doctor.workingHours.end;

  document.getElementById('doctorModal').classList.remove('hidden');
}

// Render doctors on duty (for dashboard)
function renderDoctorsOnDuty(doctors) {
  const container = document.getElementById('doctorsOnDuty');
  const activeDoctors = doctors.filter(d => d.status === 'Working');
  
  if (activeDoctors.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary); padding: var(--space-20);">No doctors on duty</p>';
    return;
  }

  container.innerHTML = activeDoctors.map(doctor => `
    <div class="doctor-card">
      <div class="doctor-avatar" style="background-color: ${doctor.color};">
        ${getInitials(doctor.name)}
      </div>
      <div class="doctor-info">
        <div class="doctor-name">${doctor.name}</div>
        <div class="doctor-specialty">${doctor.specialty}</div>
      </div>
      <span class="doctor-status working">${doctor.appointmentsToday} today</span>
    </div>
  `).join('');
}