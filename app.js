// Data Storage (In-memory)
let doctors = [
  {
    id: 'doc_001',
    name: 'Dr. Sarah Johnson',
    specialty: 'General Dentistry',
    licenseNumber: 'DT-2020-001',
    bio: '12+ years of experience in preventive dentistry and patient care',
    workingHours: { start: '08:00', end: '18:00' },
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    status: 'Working',
    appointmentsToday: 6,
    appointmentsWeek: 24,
    averageDuration: 30,
    color: '#2180CE'
  },
  {
    id: 'doc_002',
    name: 'Dr. Michael Chen',
    specialty: 'Endodontics',
    licenseNumber: 'DT-2021-002',
    bio: 'Specialist in root canal therapy and endodontic pain management',
    workingHours: { start: '09:00', end: '17:00' },
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    status: 'Working',
    appointmentsToday: 4,
    appointmentsWeek: 18,
    averageDuration: 45,
    color: '#E24A4A'
  },
  {
    id: 'doc_003',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Orthodontics',
    licenseNumber: 'DT-2019-003',
    bio: 'Certified orthodontist specializing in braces and clear aligners',
    workingHours: { start: '08:00', end: '17:00' },
    workingDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    status: 'Off-Duty',
    appointmentsToday: 0,
    appointmentsWeek: 20,
    averageDuration: 60,
    color: '#50C878'
  },
  {
    id: 'doc_004',
    name: 'Dr. Robert Williams',
    specialty: 'Periodontics',
    licenseNumber: 'DT-2022-004',
    bio: '8+ years specializing in gum disease treatment and prevention',
    workingHours: { start: '08:00', end: '16:30' },
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    status: 'Working',
    appointmentsToday: 5,
    appointmentsWeek: 22,
    averageDuration: 40,
    color: '#FFB700'
  },
  {
    id: 'doc_005',
    name: 'Dr. Jessica Martinez',
    specialty: 'Prosthodontics',
    licenseNumber: 'DT-2020-005',
    bio: 'Implant specialist and prosthodontic surgeon with advanced training',
    workingHours: { start: '09:00', end: '18:00' },
    workingDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    status: 'Working',
    appointmentsToday: 3,
    appointmentsWeek: 16,
    averageDuration: 50,
    color: '#9B59B6'
  },
  {
    id: 'doc_006',
    name: 'Dr. Thomas Anderson',
    specialty: 'Pediatric Dentistry',
    licenseNumber: 'DT-2021-006',
    bio: 'Specialized in pediatric dentistry and creating positive patient experiences',
    workingHours: { start: '10:00', end: '14:00' },
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    status: 'Working',
    appointmentsToday: 7,
    appointmentsWeek: 28,
    averageDuration: 25,
    color: '#3B82F6'
  }
];

const specialties = [
  { id: 'spec_001', name: 'General Dentistry', description: 'General checkups, cleanings, and preventive care' },
  { id: 'spec_002', name: 'Endodontics', description: 'Root canal specialists' },
  { id: 'spec_003', name: 'Orthodontics', description: 'Braces and aligners' },
  { id: 'spec_004', name: 'Periodontics', description: 'Gum specialist' },
  { id: 'spec_005', name: 'Prosthodontics', description: 'Implants and dentures' },
  { id: 'spec_006', name: 'Pediatric Dentistry', description: 'Dentistry for children' }
];

let appointments = [
  { id: 'apt_001', patientName: 'John Smith', doctorId: 'doc_001', specialty: 'General Dentistry', date: '2025-11-06', time: '09:00', duration: 30, status: 'Confirmed', type: 'Checkup', patientPhone: '(555) 123-4567' },
  { id: 'apt_002', patientName: 'Maria Garcia', doctorId: 'doc_002', specialty: 'Endodontics', date: '2025-11-06', time: '10:00', duration: 45, status: 'Confirmed', type: 'Root Canal', patientPhone: '(555) 234-5678' },
  { id: 'apt_003', patientName: 'David Lee', doctorId: 'doc_001', specialty: 'General Dentistry', date: '2025-11-06', time: '14:00', duration: 30, status: 'Pending', type: 'Consultation', patientPhone: '(555) 345-6789' },
  { id: 'apt_004', patientName: 'Sarah Williams', doctorId: 'doc_004', specialty: 'Periodontics', date: '2025-11-07', time: '09:30', duration: 40, status: 'Confirmed', type: 'Treatment', patientPhone: '(555) 456-7890' },
  { id: 'apt_005', patientName: 'Robert Brown', doctorId: 'doc_005', specialty: 'Prosthodontics', date: '2025-11-07', time: '11:00', duration: 50, status: 'Confirmed', type: 'Consultation', patientPhone: '(555) 567-8901' },
  { id: 'apt_006', patientName: 'Emma Davis', doctorId: 'doc_006', specialty: 'Pediatric Dentistry', date: '2025-11-06', time: '11:00', duration: 25, status: 'Confirmed', type: 'Cleaning', patientPhone: '(555) 678-9012' },
  { id: 'apt_007', patientName: 'James Wilson', doctorId: 'doc_001', specialty: 'General Dentistry', date: '2025-11-08', time: '10:00', duration: 30, status: 'Confirmed', type: 'Checkup', patientPhone: '(555) 789-0123' },
  { id: 'apt_008', patientName: 'Patricia Johnson', doctorId: 'doc_005', specialty: 'Prosthodontics', date: '2025-11-08', time: '14:00', duration: 60, status: 'Pending', type: 'Implant Placement', patientPhone: '(555) 890-1234' },
  { id: 'apt_009', patientName: 'Michael Brown', doctorId: 'doc_002', specialty: 'Endodontics', date: '2025-11-07', time: '15:00', duration: 45, status: 'Confirmed', type: 'Root Canal', patientPhone: '(555) 901-2345' },
  { id: 'apt_010', patientName: 'Lisa Anderson', doctorId: 'doc_004', specialty: 'Periodontics', date: '2025-11-06', time: '16:00', duration: 40, status: 'Confirmed', type: 'Scaling & Root Planing', patientPhone: '(555) 012-3456' },
  { id: 'apt_011', patientName: 'Christopher Lee', doctorId: 'doc_006', specialty: 'Pediatric Dentistry', date: '2025-11-06', time: '12:00', duration: 25, status: 'Confirmed', type: 'Checkup', patientPhone: '(555) 111-2222' },
  { id: 'apt_012', patientName: 'Jennifer Martinez', doctorId: 'doc_001', specialty: 'General Dentistry', date: '2025-11-06', time: '15:30', duration: 30, status: 'Pending', type: 'Cleaning', patientPhone: '(555) 222-3333' },
  { id: 'apt_013', patientName: 'Daniel Harris', doctorId: 'doc_003', specialty: 'Orthodontics', date: '2025-11-07', time: '10:00', duration: 60, status: 'Confirmed', type: 'Consultation', patientPhone: '(555) 333-4444' },
  { id: 'apt_014', patientName: 'Michelle Clark', doctorId: 'doc_004', specialty: 'Periodontics', date: '2025-11-08', time: '08:30', duration: 40, status: 'Confirmed', type: 'Treatment', patientPhone: '(555) 444-5555' },
  { id: 'apt_015', patientName: 'Kevin Taylor', doctorId: 'doc_002', specialty: 'Endodontics', date: '2025-11-06', time: '13:00', duration: 45, status: 'Confirmed', type: 'Follow-up', patientPhone: '(555) 555-6666' }
];

const appointmentTypes = ['Checkup', 'Cleaning', 'Root Canal', 'Consultation', 'Treatment', 'Follow-up', 'Implant Placement', 'Scaling & Root Planing'];

// Current state
let currentSection = 'dashboard';
let currentMonth = new Date();
let editingAppointment = null;
let editingDoctor = null;
let currentPage = 1;
let perPage = 10;
let sortField = 'date';
let sortDirection = 'asc';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initModals();
  renderDashboard();
  renderDoctors();
  renderCalendar();
  renderAppointmentsTable();
  populateFormDropdowns();
});

// Navigation
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const section = item.dataset.section;
      switchSection(section);
    });
  });

  const sidebarToggle = document.getElementById('sidebarToggle');
  sidebarToggle?.addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('active');
  });
}

function switchSection(section) {
  // Update nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.section === section);
  });

  // Update content
  document.querySelectorAll('.content-section').forEach(sec => {
    sec.classList.toggle('active', sec.id === `section-${section}`);
  });

  currentSection = section;

  // Refresh data when switching
  if (section === 'dashboard') renderDashboard();
  if (section === 'calendar') renderCalendar();
  if (section === 'appointments') renderAppointmentsTable();
}

// Dashboard
function renderDashboard() {
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(apt => apt.date === today);
  const weekStart = getWeekStart(new Date());
  const weekEnd = getWeekEnd(new Date());
  const weekAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    return aptDate >= weekStart && aptDate <= weekEnd;
  });

  // Update metrics
  document.getElementById('totalDoctors').textContent = doctors.length;
  document.getElementById('todayAppointments').textContent = todayAppointments.length;
  document.getElementById('weekAppointments').textContent = weekAppointments.length;

  // Calculate utilization
  const workingDoctors = doctors.filter(d => d.status === 'Working');
  const totalCapacity = workingDoctors.reduce((sum, d) => {
    const hours = parseFloat(d.workingHours.end.split(':')[0]) - parseFloat(d.workingHours.start.split(':')[0]);
    return sum + (hours * 60) / d.averageDuration;
  }, 0);
  const utilization = totalCapacity > 0 ? Math.round((todayAppointments.length / totalCapacity) * 100) : 0;
  document.getElementById('utilizationRate').textContent = `${utilization}%`;
  const utilizationBar = document.getElementById('utilizationBar');
  utilizationBar.style.width = `${utilization}%`;
  utilizationBar.style.background = utilization < 40 ? '#E24A4A' : utilization < 70 ? '#FFB700' : '#2180CE';

  // On-duty doctors
  const onDutyDoctors = document.getElementById('onDutyDoctors');
  const onDuty = doctors.filter(d => d.status === 'Working');
  onDutyDoctors.innerHTML = onDuty.length > 0 ? onDuty.map(doctor => `
    <div class="doctor-item">
      <span class="doctor-status ${doctor.status === 'Working' ? 'working' : 'off-duty'}"></span>
      <div class="doctor-item-info">
        <div class="doctor-item-name">${doctor.name}</div>
        <div class="doctor-item-specialty">${doctor.specialty}</div>
      </div>
    </div>
  `).join('') : '<p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">No doctors on duty today</p>';

  // Upcoming appointments
  const upcomingAppointments = document.getElementById('upcomingAppointments');
  const upcoming = [...appointments]
    .filter(apt => apt.status !== 'Cancelled')
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA - dateB;
    })
    .filter(apt => new Date(`${apt.date}T${apt.time}`) >= new Date())
    .slice(0, 5);

  upcomingAppointments.innerHTML = upcoming.length > 0 ? upcoming.map(apt => {
    const doctor = doctors.find(d => d.id === apt.doctorId);
    return `
      <div class="appointment-item">
        <div class="appointment-item-header">
          <span class="appointment-patient">${apt.patientName}</span>
          <span class="status status--${apt.status.toLowerCase()}">${apt.status}</span>
        </div>
        <div class="appointment-details">
          ${doctor?.name} • ${apt.date} at ${apt.time} • ${apt.type}
        </div>
      </div>
    `;
  }).join('') : '<p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">No upcoming appointments</p>';
}

// Doctors
function renderDoctors() {
  const grid = document.getElementById('doctorsGrid');
  grid.innerHTML = doctors.map(doctor => {
    const initials = doctor.name.split(' ').map(n => n[0]).join('');
    return `
      <div class="doctor-card">
        <div class="doctor-card-header">
          <div class="doctor-avatar" style="background: ${doctor.color};">${initials}</div>
          <div class="doctor-card-info">
            <div class="doctor-card-name">${doctor.name}</div>
            <div class="specialty-badge" style="background: ${doctor.color};">${doctor.specialty}</div>
            <div class="doctor-license">License: ${doctor.licenseNumber}</div>
            <div class="doctor-status-badge">
              <span class="doctor-status ${doctor.status === 'Working' ? 'working' : 'off-duty'}"></span>
              ${doctor.status}
            </div>
          </div>
        </div>
        <div class="doctor-bio">${doctor.bio}</div>
        <div class="doctor-stats">
          <div class="doctor-stat">
            <div class="doctor-stat-value">${doctor.appointmentsToday}</div>
            <div class="doctor-stat-label">Today</div>
          </div>
          <div class="doctor-stat">
            <div class="doctor-stat-value">${doctor.appointmentsWeek}</div>
            <div class="doctor-stat-label">This Week</div>
          </div>
          <div class="doctor-stat">
            <div class="doctor-stat-value">${doctor.averageDuration}m</div>
            <div class="doctor-stat-label">Avg Duration</div>
          </div>
        </div>
        <div class="doctor-card-actions">
          <button class="btn btn--secondary btn-small" onclick="editDoctor('${doctor.id}')" aria-label="Edit ${doctor.name}">Edit</button>
          <button class="btn btn--secondary btn-small" onclick="viewSchedule('${doctor.id}')" aria-label="View schedule for ${doctor.name}">Schedule</button>
        </div>
      </div>
    `;
  }).join('');
}

window.editDoctor = function(doctorId) {
  const doctor = doctors.find(d => d.id === doctorId);
  if (!doctor) return;

  editingDoctor = doctorId;
  document.getElementById('doctorModalTitle').textContent = 'Edit Doctor';
  document.getElementById('doctorName').value = doctor.name;
  document.getElementById('doctorSpecialty').value = doctor.specialty;
  document.getElementById('licenseNumber').value = doctor.licenseNumber;
  document.getElementById('doctorBio').value = doctor.bio;
  document.getElementById('workStart').value = doctor.workingHours.start;
  document.getElementById('workEnd').value = doctor.workingHours.end;
  document.getElementById('doctorStatus').value = doctor.status;
  document.getElementById('doctorColor').value = doctor.color;

  // Working days
  const checkboxes = document.querySelectorAll('input[name="workingDays"]');
  checkboxes.forEach(cb => {
    cb.checked = doctor.workingDays.includes(cb.value);
  });

  openModal('doctorModal');
};

window.viewSchedule = function(doctorId) {
  const doctor = doctors.find(d => d.id === doctorId);
  if (!doctor) return;
  
  // Switch to calendar and filter by doctor
  switchSection('calendar');
  document.getElementById('calendarDoctorFilter').value = doctorId;
  renderCalendar();
  showToast('success', `Showing schedule for ${doctor.name}`);
};

// Calendar
function renderCalendar() {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  document.getElementById('calendarMonthYear').textContent = `${monthNames[month]} ${year}`;

  // Filters
  const doctorFilter = document.getElementById('calendarDoctorFilter').value;
  const specialtyFilter = document.getElementById('calendarSpecialtyFilter').value;

  let filteredAppointments = appointments;
  if (doctorFilter) filteredAppointments = filteredAppointments.filter(apt => apt.doctorId === doctorFilter);
  if (specialtyFilter) filteredAppointments = filteredAppointments.filter(apt => apt.specialty === specialtyFilter);

  const calendar = document.getElementById('calendar');
  let html = '<div class="calendar-grid">';

  // Day headers
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayNames.forEach(day => {
    html += `<div class="calendar-day-header">${day}</div>`;
  });

  // Empty cells for days before month starts
  const startDay = firstDay.getDay();
  for (let i = 0; i < startDay; i++) {
    const date = prevLastDay.getDate() - (startDay - i - 1);
    html += `<div class="calendar-day other-month"><div class="calendar-day-number">${date}</div></div>`;
  }

  // Days of month
  const today = new Date().toISOString().split('T')[0];
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isToday = dateStr === today;
    const dayAppointments = filteredAppointments.filter(apt => apt.date === dateStr);

    html += `
      <div class="calendar-day ${isToday ? 'today' : ''}" onclick="selectCalendarDate('${dateStr}')">
        <div class="calendar-day-number">${day}</div>
        ${dayAppointments.slice(0, 3).map(apt => {
          const doctor = doctors.find(d => d.id === apt.doctorId);
          return `<div class="calendar-appointment" style="background: ${doctor?.color || '#2180CE'};" title="${apt.patientName} - ${apt.time}">${apt.time} ${apt.patientName}</div>`;
        }).join('')}
        ${dayAppointments.length > 3 ? `<div style="font-size: var(--font-size-xs); color: var(--color-text-secondary); margin-top: 2px;">+${dayAppointments.length - 3} more</div>` : ''}
      </div>
    `;
  }

  // Remaining cells
  const totalCells = startDay + lastDay.getDate();
  const remainingCells = 7 - (totalCells % 7);
  if (remainingCells < 7) {
    for (let i = 1; i <= remainingCells; i++) {
      html += `<div class="calendar-day other-month"><div class="calendar-day-number">${i}</div></div>`;
    }
  }

  html += '</div>';
  calendar.innerHTML = html;
}

window.selectCalendarDate = function(dateStr) {
  document.getElementById('appointmentDate').value = dateStr;
  openAppointmentModal();
};

document.getElementById('prevMonth')?.addEventListener('click', () => {
  currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
  renderCalendar();
});

document.getElementById('nextMonth')?.addEventListener('click', () => {
  currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
  renderCalendar();
});

document.getElementById('calendarDoctorFilter')?.addEventListener('change', renderCalendar);
document.getElementById('calendarSpecialtyFilter')?.addEventListener('change', renderCalendar);

// Appointments Table
function renderAppointmentsTable() {
  const searchTerm = document.getElementById('appointmentSearch')?.value.toLowerCase() || '';
  const statusFilter = document.getElementById('statusFilter')?.value || '';
  perPage = parseInt(document.getElementById('perPage')?.value || '10');

  let filtered = [...appointments];

  // Search
  if (searchTerm) {
    filtered = filtered.filter(apt => {
      const doctor = doctors.find(d => d.id === apt.doctorId);
      return apt.patientName.toLowerCase().includes(searchTerm) ||
             doctor?.name.toLowerCase().includes(searchTerm) ||
             apt.specialty.toLowerCase().includes(searchTerm);
    });
  }

  // Status filter
  if (statusFilter) {
    filtered = filtered.filter(apt => apt.status === statusFilter);
  }

  // Sort
  filtered.sort((a, b) => {
    let valA, valB;
    if (sortField === 'date') {
      valA = new Date(`${a.date}T${a.time}`);
      valB = new Date(`${b.date}T${b.time}`);
    } else if (sortField === 'doctor') {
      const docA = doctors.find(d => d.id === a.doctorId);
      const docB = doctors.find(d => d.id === b.doctorId);
      valA = docA?.name || '';
      valB = docB?.name || '';
    } else {
      valA = a[sortField] || '';
      valB = b[sortField] || '';
    }

    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const paginated = filtered.slice(start, end);

  // Render table
  const tbody = document.getElementById('appointmentsTableBody');
  tbody.innerHTML = paginated.map(apt => {
    const doctor = doctors.find(d => d.id === apt.doctorId);
    return `
      <tr>
        <td>${apt.patientName}</td>
        <td>${doctor?.name || 'Unknown'}</td>
        <td>${apt.specialty}</td>
        <td>${apt.date} at ${apt.time}</td>
        <td>${apt.duration} min</td>
        <td>${apt.type}</td>
        <td><span class="status status--${apt.status.toLowerCase()}">${apt.status}</span></td>
        <td>
          <div class="table-actions">
            <button class="btn btn--secondary btn-small" onclick="editAppointment('${apt.id}')" aria-label="Edit appointment for ${apt.patientName}">Edit</button>
            <button class="btn btn--secondary btn-small" onclick="deleteAppointment('${apt.id}')" aria-label="Delete appointment for ${apt.patientName}">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Render pagination
  const pagination = document.getElementById('pagination');
  let paginationHtml = `
    <button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})" aria-label="Previous page">Previous</button>
  `;
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      paginationHtml += `<button class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i})" aria-label="Page ${i}">${i}</button>`;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      paginationHtml += '<span>...</span>';
    }
  }
  paginationHtml += `
    <button ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})" aria-label="Next page">Next</button>
  `;
  pagination.innerHTML = paginationHtml;
}

window.changePage = function(page) {
  currentPage = page;
  renderAppointmentsTable();
};

// Sorting
document.querySelectorAll('.sortable').forEach(th => {
  th.addEventListener('click', () => {
    const field = th.dataset.sort;
    if (sortField === field) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortField = field;
      sortDirection = 'asc';
    }
    renderAppointmentsTable();
  });
});

// Search and filters
document.getElementById('appointmentSearch')?.addEventListener('input', () => {
  currentPage = 1;
  renderAppointmentsTable();
});

document.getElementById('statusFilter')?.addEventListener('change', () => {
  currentPage = 1;
  renderAppointmentsTable();
});

document.getElementById('perPage')?.addEventListener('change', () => {
  currentPage = 1;
  renderAppointmentsTable();
});

window.editAppointment = function(appointmentId) {
  const appointment = appointments.find(apt => apt.id === appointmentId);
  if (!appointment) return;

  editingAppointment = appointmentId;
  document.getElementById('appointmentModalTitle').textContent = 'Edit Appointment';
  document.getElementById('patientName').value = appointment.patientName;
  document.getElementById('patientPhone').value = appointment.patientPhone || '';
  document.getElementById('appointmentSpecialty').value = appointment.specialty;
  
  // Trigger specialty change to populate doctors
  const event = new Event('change');
  document.getElementById('appointmentSpecialty').dispatchEvent(event);
  
  setTimeout(() => {
    document.getElementById('appointmentDoctor').value = appointment.doctorId;
    document.getElementById('appointmentDate').value = appointment.date;
    document.getElementById('appointmentTime').value = appointment.time;
    document.getElementById('appointmentDuration').value = appointment.duration;
    document.getElementById('appointmentType').value = appointment.type;
    document.getElementById('appointmentStatus').value = appointment.status;
  }, 100);

  openModal('appointmentModal');
};

window.deleteAppointment = function(appointmentId) {
  const appointment = appointments.find(apt => apt.id === appointmentId);
  if (!appointment) return;

  showConfirmDialog(
    `Are you sure you want to delete the appointment for ${appointment.patientName}?`,
    () => {
      appointments = appointments.filter(apt => apt.id !== appointmentId);
      renderAppointmentsTable();
      renderDashboard();
      renderCalendar();
      showToast('success', 'Appointment deleted successfully');
    }
  );
};

// Modals
function initModals() {
  // Add appointment buttons
  document.getElementById('addAppointmentBtn')?.addEventListener('click', openAppointmentModal);
  document.getElementById('addAppointmentFromCalendar')?.addEventListener('click', openAppointmentModal);
  document.getElementById('addAppointmentFromTable')?.addEventListener('click', openAppointmentModal);

  // Add doctor button
  document.getElementById('addDoctorBtn')?.addEventListener('click', openDoctorModal);

  // Close buttons
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(btn.closest('.modal').id);
    });
  });

  // Cancel buttons
  document.getElementById('cancelAppointment')?.addEventListener('click', () => closeModal('appointmentModal'));
  document.getElementById('cancelDoctor')?.addEventListener('click', () => closeModal('doctorModal'));

  // Click outside to close
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal.id);
    });
  });

  // Form submissions
  document.getElementById('appointmentForm')?.addEventListener('submit', handleAppointmentSubmit);
  document.getElementById('doctorForm')?.addEventListener('submit', handleDoctorSubmit);

  // Specialty change handler
  document.getElementById('appointmentSpecialty')?.addEventListener('change', handleSpecialtyChange);

  // Time/date change for conflict detection
  document.getElementById('appointmentDoctor')?.addEventListener('change', checkConflicts);
  document.getElementById('appointmentDate')?.addEventListener('change', checkConflicts);
  document.getElementById('appointmentTime')?.addEventListener('change', checkConflicts);
  document.getElementById('appointmentDuration')?.addEventListener('change', checkConflicts);
}

function openAppointmentModal() {
  editingAppointment = null;
  document.getElementById('appointmentModalTitle').textContent = 'Add Appointment';
  document.getElementById('appointmentForm').reset();
  
  // Set today's date as default
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('appointmentDate').value = today;
  document.getElementById('appointmentDate').min = today;
  
  document.getElementById('conflictWarning').style.display = 'none';
  openModal('appointmentModal');
}

function openDoctorModal() {
  editingDoctor = null;
  document.getElementById('doctorModalTitle').textContent = 'Add Doctor';
  document.getElementById('doctorForm').reset();
  openModal('doctorModal');
}

function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
  document.getElementById(modalId).setAttribute('aria-hidden', 'false');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
  document.getElementById(modalId).setAttribute('aria-hidden', 'true');
  
  // Clear errors
  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
}

function handleSpecialtyChange(e) {
  const specialty = e.target.value;
  const doctorSelect = document.getElementById('appointmentDoctor');
  
  if (!specialty) {
    doctorSelect.disabled = true;
    doctorSelect.innerHTML = '<option value="">Select doctor</option>';
    return;
  }

  const filteredDoctors = doctors.filter(d => d.specialty === specialty && d.status === 'Working');
  doctorSelect.disabled = false;
  doctorSelect.innerHTML = '<option value="">Select doctor</option>' + 
    filteredDoctors.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
}

function checkConflicts() {
  const doctorId = document.getElementById('appointmentDoctor').value;
  const date = document.getElementById('appointmentDate').value;
  const time = document.getElementById('appointmentTime').value;
  const duration = parseInt(document.getElementById('appointmentDuration').value);

  if (!doctorId || !date || !time || !duration) return;

  const startTime = new Date(`${date}T${time}`);
  const endTime = new Date(startTime.getTime() + duration * 60000);

  const conflicts = appointments.filter(apt => {
    if (editingAppointment && apt.id === editingAppointment) return false;
    if (apt.doctorId !== doctorId || apt.date !== date) return false;
    
    const aptStart = new Date(`${apt.date}T${apt.time}`);
    const aptEnd = new Date(aptStart.getTime() + apt.duration * 60000);
    
    return (startTime < aptEnd && endTime > aptStart);
  });

  const warning = document.getElementById('conflictWarning');
  warning.style.display = conflicts.length > 0 ? 'block' : 'none';
}

function handleAppointmentSubmit(e) {
  e.preventDefault();
  
  // Clear previous errors
  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

  // Get form values
  const patientName = document.getElementById('patientName').value.trim();
  const patientPhone = document.getElementById('patientPhone').value.trim();
  const specialty = document.getElementById('appointmentSpecialty').value;
  const doctorId = document.getElementById('appointmentDoctor').value;
  const date = document.getElementById('appointmentDate').value;
  const time = document.getElementById('appointmentTime').value;
  const duration = parseInt(document.getElementById('appointmentDuration').value);
  const type = document.getElementById('appointmentType').value;
  const status = document.getElementById('appointmentStatus').value;
  const notes = document.getElementById('appointmentNotes').value.trim();

  // Validation
  let hasError = false;
  if (!patientName) {
    document.getElementById('patientNameError').textContent = 'Patient name is required';
    hasError = true;
  }
  if (!specialty) {
    document.getElementById('specialtyError').textContent = 'Specialty is required';
    hasError = true;
  }
  if (!doctorId) {
    document.getElementById('doctorError').textContent = 'Doctor is required';
    hasError = true;
  }
  if (!date) {
    document.getElementById('dateError').textContent = 'Date is required';
    hasError = true;
  }
  if (!time) {
    document.getElementById('timeError').textContent = 'Time is required';
    hasError = true;
  }

  if (hasError) return;

  if (editingAppointment) {
    // Update existing
    const index = appointments.findIndex(apt => apt.id === editingAppointment);
    appointments[index] = {
      ...appointments[index],
      patientName,
      patientPhone,
      specialty,
      doctorId,
      date,
      time,
      duration,
      type,
      status,
      notes
    };
    showToast('success', 'Appointment updated successfully');
  } else {
    // Create new
    const newAppointment = {
      id: `apt_${Date.now()}`,
      patientName,
      patientPhone,
      specialty,
      doctorId,
      date,
      time,
      duration,
      type,
      status,
      notes
    };
    appointments.push(newAppointment);
    showToast('success', 'Appointment created successfully');
  }

  // Refresh views
  renderDashboard();
  renderCalendar();
  renderAppointmentsTable();
  closeModal('appointmentModal');
}

function handleDoctorSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('doctorName').value.trim();
  const specialty = document.getElementById('doctorSpecialty').value;
  const licenseNumber = document.getElementById('licenseNumber').value.trim();
  const bio = document.getElementById('doctorBio').value.trim();
  const workStart = document.getElementById('workStart').value;
  const workEnd = document.getElementById('workEnd').value;
  const status = document.getElementById('doctorStatus').value;
  const color = document.getElementById('doctorColor').value;
  
  const workingDays = Array.from(document.querySelectorAll('input[name="workingDays"]:checked'))
    .map(cb => cb.value);

  if (!name || !specialty || !licenseNumber || workingDays.length === 0) {
    showToast('error', 'Please fill in all required fields');
    return;
  }

  if (editingDoctor) {
    const index = doctors.findIndex(d => d.id === editingDoctor);
    doctors[index] = {
      ...doctors[index],
      name,
      specialty,
      licenseNumber,
      bio,
      workingHours: { start: workStart, end: workEnd },
      workingDays,
      status,
      color
    };
    showToast('success', 'Doctor updated successfully');
  } else {
    const newDoctor = {
      id: `doc_${Date.now()}`,
      name,
      specialty,
      licenseNumber,
      bio,
      workingHours: { start: workStart, end: workEnd },
      workingDays,
      status,
      color,
      appointmentsToday: 0,
      appointmentsWeek: 0,
      averageDuration: 30
    };
    doctors.push(newDoctor);
    showToast('success', 'Doctor added successfully');
  }

  renderDoctors();
  renderDashboard();
  populateFormDropdowns();
  closeModal('doctorModal');
}

// Populate dropdowns
function populateFormDropdowns() {
  // Specialties
  const specialtySelects = [document.getElementById('appointmentSpecialty'), document.getElementById('doctorSpecialty'), document.getElementById('calendarSpecialtyFilter')];
  specialtySelects.forEach(select => {
    if (!select) return;
    const currentValue = select.value;
    const isFilter = select.id.includes('Filter');
    select.innerHTML = (isFilter ? '<option value="">All Specialties</option>' : '<option value="">Select specialty</option>') +
      specialties.map(s => `<option value="${s.name}">${s.name}</option>`).join('');
    if (currentValue) select.value = currentValue;
  });

  // Doctors for calendar filter
  const doctorFilter = document.getElementById('calendarDoctorFilter');
  if (doctorFilter) {
    const currentValue = doctorFilter.value;
    doctorFilter.innerHTML = '<option value="">All Doctors</option>' +
      doctors.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
    if (currentValue) doctorFilter.value = currentValue;
  }

  // Appointment types
  const typeSelect = document.getElementById('appointmentType');
  if (typeSelect) {
    const currentValue = typeSelect.value;
    typeSelect.innerHTML = '<option value="">Select type</option>' +
      appointmentTypes.map(t => `<option value="${t}">${t}</option>`).join('');
    if (currentValue) typeSelect.value = currentValue;
  }
}

// Toast notifications
function showToast(type, message) {
  const toast = document.getElementById('toast');
  const icon = document.getElementById('toastIcon');
  const messageEl = document.getElementById('toastMessage');

  const icons = {
    success: '✓',
    error: '✗',
    warning: '⚠',
    info: 'ℹ'
  };

  icon.textContent = icons[type] || icons.info;
  messageEl.textContent = message;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 3000);
}

// Confirmation dialog
function showConfirmDialog(message, onConfirm) {
  document.getElementById('confirmDialogMessage').textContent = message;
  openModal('confirmDialog');

  const confirmBtn = document.getElementById('confirmOk');
  const cancelBtn = document.getElementById('confirmCancel');

  const handleConfirm = () => {
    onConfirm();
    closeModal('confirmDialog');
    confirmBtn.removeEventListener('click', handleConfirm);
    cancelBtn.removeEventListener('click', handleCancel);
  };

  const handleCancel = () => {
    closeModal('confirmDialog');
    confirmBtn.removeEventListener('click', handleConfirm);
    cancelBtn.removeEventListener('click', handleCancel);
  };

  confirmBtn.addEventListener('click', handleConfirm);
  cancelBtn.addEventListener('click', handleCancel);
}

// Utility functions
function getWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

function getWeekEnd(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() + (6 - day);
  return new Date(d.setDate(diff));
}