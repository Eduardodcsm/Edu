// ===== MAIN APPLICATION =====

// Global managers
let appointmentsManager;
let doctorsManager;
let calendarManager;

// Global state
let currentView = 'dashboard';
let specialtiesData = [];
let businessHours = {
  start: '08:00',
  end: '18:00',
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
};

// Sample data
const sampleDoctors = [
  {
    id: 'doc_001',
    name: 'Dr. Sarah Johnson',
    specialty: 'General Dentistry',
    color: '#4A90E2',
    status: 'Working',
    licenseNumber: 'DT-2020-001',
    workingHours: { start: '08:00', end: '18:00' },
    appointmentsToday: 6,
    totalAppointmentsWeek: 24,
    averageDuration: 30
  },
  {
    id: 'doc_002',
    name: 'Dr. Michael Chen',
    specialty: 'Endodontics',
    color: '#E24A4A',
    status: 'Working',
    licenseNumber: 'DT-2021-002',
    workingHours: { start: '09:00', end: '17:00' },
    appointmentsToday: 4,
    totalAppointmentsWeek: 18,
    averageDuration: 45
  },
  {
    id: 'doc_003',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Orthodontics',
    color: '#50C878',
    status: 'Off',
    licenseNumber: 'DT-2019-003',
    workingHours: { start: '08:00', end: '17:00' },
    appointmentsToday: 0,
    totalAppointmentsWeek: 20,
    averageDuration: 60
  },
  {
    id: 'doc_004',
    name: 'Dr. Robert Williams',
    specialty: 'Periodontics',
    color: '#FFB700',
    status: 'Working',
    licenseNumber: 'DT-2022-004',
    workingHours: { start: '08:00', end: '16:30' },
    appointmentsToday: 5,
    totalAppointmentsWeek: 22,
    averageDuration: 40
  },
  {
    id: 'doc_005',
    name: 'Dr. Jessica Martinez',
    specialty: 'Prosthodontics',
    color: '#9B59B6',
    status: 'Working',
    licenseNumber: 'DT-2020-005',
    workingHours: { start: '09:00', end: '18:00' },
    appointmentsToday: 3,
    totalAppointmentsWeek: 16,
    averageDuration: 50
  }
];

const sampleSpecialties = [
  { id: 'spec_001', name: 'General Dentistry', color: '#4A90E2', description: 'General checkups and cleanings' },
  { id: 'spec_002', name: 'Endodontics', color: '#E24A4A', description: 'Root canal specialists' },
  { id: 'spec_003', name: 'Orthodontics', color: '#50C878', description: 'Braces and aligners' },
  { id: 'spec_004', name: 'Periodontics', color: '#FFB700', description: 'Gum specialist' },
  { id: 'spec_005', name: 'Prosthodontics', color: '#9B59B6', description: 'Implants and dentures' }
];

const sampleAppointments = [
  {
    id: 'apt_001',
    patientName: 'John Smith',
    doctorId: 'doc_001',
    specialty: 'General Dentistry',
    date: '2025-11-04',
    time: '09:00',
    duration: 30,
    status: 'Confirmed',
    type: 'Checkup',
    patientPhone: '(555) 123-4567'
  },
  {
    id: 'apt_002',
    patientName: 'Maria Garcia',
    doctorId: 'doc_002',
    specialty: 'Endodontics',
    date: '2025-11-04',
    time: '10:00',
    duration: 45,
    status: 'Confirmed',
    type: 'Root Canal',
    patientPhone: '(555) 234-5678'
  },
  {
    id: 'apt_003',
    patientName: 'David Lee',
    doctorId: 'doc_001',
    specialty: 'General Dentistry',
    date: '2025-11-04',
    time: '14:00',
    duration: 30,
    status: 'Pending',
    type: 'Consultation',
    patientPhone: '(555) 345-6789'
  },
  {
    id: 'apt_004',
    patientName: 'Sarah Williams',
    doctorId: 'doc_004',
    specialty: 'Periodontics',
    date: '2025-11-05',
    time: '09:30',
    duration: 40,
    status: 'Confirmed',
    type: 'Treatment',
    patientPhone: '(555) 456-7890'
  },
  {
    id: 'apt_005',
    patientName: 'Robert Brown',
    doctorId: 'doc_005',
    specialty: 'Prosthodontics',
    date: '2025-11-05',
    time: '11:00',
    duration: 50,
    status: 'Confirmed',
    type: 'Consultation',
    patientPhone: '(555) 567-8901'
  }
];

// Initialize application
function initializeApp() {
  // Initialize managers
  appointmentsManager = new AppointmentsManager();
  doctorsManager = new DoctorsManager();
  calendarManager = new CalendarManager();

  // Load sample data
  specialtiesData = sampleSpecialties;
  doctorsManager.initializeSampleData(sampleDoctors);
  appointmentsManager.initializeSampleData(sampleAppointments, sampleDoctors);

  // Populate dropdowns
  populateSpecialtyDropdowns();
  populateDoctorDropdown();

  // Setup event listeners
  setupEventListeners();

  // Initial renders
  refreshDashboard();
  updateCurrentDate();

  console.log('Dental Practice Management System initialized');
}

// Setup event listeners
function setupEventListeners() {
  // Navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const view = e.currentTarget.dataset.view;
      switchView(view);
    });
  });

  // Sidebar toggle
  document.getElementById('sidebarToggle')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // Calendar controls
  document.getElementById('todayBtn').addEventListener('click', () => {
    calendarManager.goToToday();
  });

  document.getElementById('prevPeriod').addEventListener('click', () => {
    calendarManager.navigatePrevious();
  });

  document.getElementById('nextPeriod').addEventListener('click', () => {
    calendarManager.navigateNext();
  });

  document.getElementById('viewTypeSelect').addEventListener('change', (e) => {
    calendarManager.setViewType(e.target.value);
  });

  document.getElementById('filterSpecialty').addEventListener('change', (e) => {
    calendarManager.filterSpecialty = e.target.value;
    calendarManager.renderCalendar();
  });

  document.getElementById('filterDoctor').addEventListener('change', (e) => {
    calendarManager.filterDoctor = e.target.value;
    calendarManager.renderCalendar();
  });

  // Appointment modal
  document.getElementById('addAppointmentBtn').addEventListener('click', openAppointmentModal);
  document.getElementById('closeAppointmentModal').addEventListener('click', closeAppointmentModal);
  document.getElementById('cancelAppointmentModal').addEventListener('click', closeAppointmentModal);
  document.getElementById('saveAppointment').addEventListener('click', saveAppointment);

  // Appointment specialty change
  document.getElementById('appointmentSpecialty').addEventListener('change', (e) => {
    const specialty = e.target.value;
    const doctorSelect = document.getElementById('appointmentDoctor');
    doctorSelect.innerHTML = '<option value="">Select doctor</option>';
    
    if (specialty) {
      const doctors = doctorsManager.getDoctorsBySpecialty(specialty);
      doctors.forEach(doctor => {
        const option = document.createElement('option');
        option.value = doctor.id;
        option.textContent = doctor.name;
        doctorSelect.appendChild(option);
      });
    }
  });

  // Doctor modal
  document.getElementById('addDoctorBtn').addEventListener('click', openDoctorModal);
  document.getElementById('closeDoctorModal').addEventListener('click', closeDoctorModal);
  document.getElementById('cancelDoctorModal').addEventListener('click', closeDoctorModal);
  document.getElementById('saveDoctor').addEventListener('click', saveDoctor);

  // Appointments filters
  document.getElementById('searchAppointments')?.addEventListener('input', debounce(refreshAppointmentsView, 300));
  document.getElementById('appointmentStatusFilter')?.addEventListener('change', refreshAppointmentsView);

  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', () => {
      closeAppointmentModal();
      closeDoctorModal();
    });
  });
}

// Switch view
function switchView(view) {
  currentView = view;
  
  // Update navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.view === view) {
      item.classList.add('active');
    }
  });

  // Update views
  document.querySelectorAll('.view').forEach(v => {
    v.classList.remove('active');
  });
  document.getElementById(view + 'View').classList.add('active');

  // Update title
  const titles = {
    dashboard: 'Dashboard',
    calendar: 'Calendar',
    doctors: 'Doctors',
    appointments: 'Appointments',
    analytics: 'Analytics',
    settings: 'Settings'
  };
  document.getElementById('viewTitle').textContent = titles[view];

  // Render view-specific content
  if (view === 'dashboard') {
    refreshDashboard();
  } else if (view === 'calendar') {
    calendarManager.renderCalendar();
  } else if (view === 'doctors') {
    renderDoctorsGrid(doctorsManager.getAllDoctors());
  } else if (view === 'appointments') {
    refreshAppointmentsView();
  } else if (view === 'analytics') {
    renderAnalytics();
  }
}

// Refresh dashboard
function refreshDashboard() {
  const doctors = doctorsManager.getAllDoctors();
  const appointments = appointmentsManager.getAllAppointments();
  const todayAppointments = appointmentsManager.getTodayAppointments();
  const weekAppointments = appointmentsManager.getWeekAppointments();

  // Update doctor stats
  doctors.forEach(doctor => {
    doctorsManager.updateDoctorStats(doctor.id, appointments);
  });

  // Update stats
  document.getElementById('totalDoctors').textContent = doctors.length;
  document.getElementById('todayAppointments').textContent = todayAppointments.length;
  document.getElementById('weekAppointments').textContent = weekAppointments.length;
  
  const utilizationRate = calculateUtilizationRate(todayAppointments, doctors, businessHours);
  document.getElementById('utilizationRate').textContent = utilizationRate + '%';

  // Render doctors on duty
  renderDoctorsOnDuty(doctors);

  // Render recent activity
  renderRecentActivity(appointments.slice(-5).reverse());
}

// Render recent activity
function renderRecentActivity(recentAppointments) {
  const container = document.querySelector('#recentActivity .activity-list');
  
  if (recentAppointments.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary); padding: var(--space-20);">No recent activity</p>';
    return;
  }

  container.innerHTML = recentAppointments.map(apt => {
    const doctor = doctorsManager.getDoctor(apt.doctorId);
    return `
      <div class="activity-item">
        <strong>${apt.patientName}</strong> scheduled with ${doctor ? doctor.name : 'Unknown'} 
        on ${formatDate(apt.date)} at ${formatTime(apt.time)}
      </div>
    `;
  }).join('');
}

// Update current date display
function updateCurrentDate() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', options);
}

// Populate specialty dropdowns
function populateSpecialtyDropdowns() {
  const selects = [
    document.getElementById('appointmentSpecialty'),
    document.getElementById('doctorSpecialty'),
    document.getElementById('filterSpecialty')
  ];

  selects.forEach(select => {
    if (!select) return;
    
    // Keep existing first option
    const firstOption = select.querySelector('option');
    select.innerHTML = '';
    if (firstOption) select.appendChild(firstOption);

    specialtiesData.forEach(specialty => {
      const option = document.createElement('option');
      option.value = specialty.name;
      option.textContent = specialty.name;
      select.appendChild(option);
    });
  });
}

// Populate doctor dropdown
function populateDoctorDropdown() {
  const select = document.getElementById('filterDoctor');
  if (!select) return;

  select.innerHTML = '<option value="">All Doctors</option>';
  
  doctorsManager.getAllDoctors().forEach(doctor => {
    const option = document.createElement('option');
    option.value = doctor.id;
    option.textContent = doctor.name;
    select.appendChild(option);
  });
}

// Appointment Modal Functions
function openAppointmentModal() {
  appointmentsManager.selectedAppointment = null;
  document.getElementById('appointmentModalTitle').textContent = 'New Appointment';
  document.getElementById('appointmentForm').reset();
  document.getElementById('appointmentDate').value = getTodayDate();
  document.getElementById('appointmentModal').classList.remove('hidden');
}

function closeAppointmentModal() {
  document.getElementById('appointmentModal').classList.add('hidden');
}

function saveAppointment() {
  const form = document.getElementById('appointmentForm');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const appointmentData = {
    patientName: document.getElementById('patientName').value,
    patientPhone: document.getElementById('patientPhone').value,
    specialty: document.getElementById('appointmentSpecialty').value,
    doctorId: document.getElementById('appointmentDoctor').value,
    date: document.getElementById('appointmentDate').value,
    time: document.getElementById('appointmentTime').value,
    type: document.getElementById('appointmentType').value,
    notes: document.getElementById('appointmentNotes').value,
    status: 'Confirmed'
  };

  const doctor = doctorsManager.getDoctor(appointmentData.doctorId);
  if (doctor) {
    appointmentData.duration = 30; // Default, could be based on specialty
  }

  // Check for conflicts
  if (appointmentsManager.hasConflict(
    appointmentData.doctorId,
    appointmentData.date,
    appointmentData.time,
    appointmentData.duration,
    appointmentsManager.selectedAppointment?.id
  )) {
    alert('Time slot conflict! Please choose another time.');
    return;
  }

  if (appointmentsManager.selectedAppointment) {
    // Update existing
    appointmentsManager.updateAppointment(appointmentsManager.selectedAppointment.id, appointmentData);
  } else {
    // Create new
    appointmentsManager.addAppointment(appointmentData);
  }

  closeAppointmentModal();
  refreshDashboard();
  
  if (currentView === 'calendar') {
    calendarManager.renderCalendar();
  } else if (currentView === 'appointments') {
    refreshAppointmentsView();
  }
}

// Doctor Modal Functions
function openDoctorModal() {
  doctorsManager.selectedDoctor = null;
  document.getElementById('doctorModalTitle').textContent = 'Add Doctor';
  document.getElementById('doctorForm').reset();
  document.getElementById('doctorModal').classList.remove('hidden');
}

function closeDoctorModal() {
  document.getElementById('doctorModal').classList.add('hidden');
}

function saveDoctor() {
  const form = document.getElementById('doctorForm');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const doctorData = {
    name: document.getElementById('doctorName').value,
    specialty: document.getElementById('doctorSpecialty').value,
    licenseNumber: document.getElementById('doctorLicense').value,
    workingHours: {
      start: document.getElementById('doctorStartTime').value,
      end: document.getElementById('doctorEndTime').value
    }
  };

  // Get color from specialty
  const specialty = specialtiesData.find(s => s.name === doctorData.specialty);
  doctorData.color = specialty ? specialty.color : '#4A90E2';

  if (doctorsManager.selectedDoctor) {
    // Update existing
    doctorsManager.updateDoctor(doctorsManager.selectedDoctor.id, doctorData);
  } else {
    // Create new
    doctorsManager.addDoctor(doctorData);
  }

  closeDoctorModal();
  populateDoctorDropdown();
  refreshDashboard();
  
  if (currentView === 'doctors') {
    renderDoctorsGrid(doctorsManager.getAllDoctors());
  }
}

// Render Analytics
function renderAnalytics() {
  const doctors = doctorsManager.getAllDoctors();
  const appointments = appointmentsManager.getAllAppointments();

  // Doctor Utilization Chart
  const utilizationCtx = document.getElementById('utilizationChart');
  if (utilizationCtx) {
    const utilizationData = doctors.map(doctor => ({
      doctor: doctor.name,
      appointments: appointmentsManager.getAppointmentsByDoctor(doctor.id).length
    }));

    new Chart(utilizationCtx, {
      type: 'bar',
      data: {
        labels: utilizationData.map(d => d.doctor),
        datasets: [{
          label: 'Total Appointments',
          data: utilizationData.map(d => d.appointments),
          backgroundColor: doctors.map(d => d.color + '80'),
          borderColor: doctors.map(d => d.color),
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  // Appointments by Specialty Chart
  const specialtyCtx = document.getElementById('specialtyChart');
  if (specialtyCtx) {
    const specialtyCounts = {};
    appointments.forEach(apt => {
      specialtyCounts[apt.specialty] = (specialtyCounts[apt.specialty] || 0) + 1;
    });

    new Chart(specialtyCtx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(specialtyCounts),
        datasets: [{
          data: Object.values(specialtyCounts),
          backgroundColor: specialtiesData.map(s => s.color + '80'),
          borderColor: specialtiesData.map(s => s.color),
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
      }
    });
  }

  // Weekly Appointments Chart
  const weeklyCtx = document.getElementById('weeklyChart');
  if (weeklyCtx) {
    const weekDates = getWeekDates(new Date());
    const weeklyData = weekDates.map(date => {
      return appointmentsManager.getAppointmentsByDate(date).length;
    });

    new Chart(weeklyCtx, {
      type: 'line',
      data: {
        labels: weekDates.map(date => formatDate(date)),
        datasets: [{
          label: 'Appointments',
          data: weeklyData,
          borderColor: '#4A90E2',
          backgroundColor: '#4A90E280',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}