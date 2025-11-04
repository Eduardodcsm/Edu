// ===== CALENDAR MANAGEMENT =====

class CalendarManager {
  constructor() {
    this.currentDate = new Date();
    this.viewType = 'week';
    this.filterSpecialty = '';
    this.filterDoctor = '';
    this.draggedAppointment = null;
  }

  // Set view type
  setViewType(type) {
    this.viewType = type;
    this.renderCalendar();
  }

  // Navigate to previous period
  navigatePrevious() {
    if (this.viewType === 'week') {
      this.currentDate.setDate(this.currentDate.getDate() - 7);
    } else if (this.viewType === 'month') {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    } else {
      this.currentDate.setDate(this.currentDate.getDate() - 1);
    }
    this.renderCalendar();
  }

  // Navigate to next period
  navigateNext() {
    if (this.viewType === 'week') {
      this.currentDate.setDate(this.currentDate.getDate() + 7);
    } else if (this.viewType === 'month') {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    } else {
      this.currentDate.setDate(this.currentDate.getDate() + 1);
    }
    this.renderCalendar();
  }

  // Go to today
  goToToday() {
    this.currentDate = new Date();
    this.renderCalendar();
  }

  // Render calendar
  renderCalendar() {
    const container = document.getElementById('calendarContainer');
    document.getElementById('calendarMonth').textContent = getMonthName(this.currentDate);

    if (this.viewType === 'week') {
      this.renderWeekView(container);
    } else if (this.viewType === 'day') {
      this.renderDayView(container);
    } else {
      this.renderMonthView(container);
    }
  }

  // Render week view
  renderWeekView(container) {
    const doctors = doctorsManager.getAllDoctors();
    let filteredDoctors = doctors;

    if (this.filterSpecialty) {
      filteredDoctors = doctors.filter(d => d.specialty === this.filterSpecialty);
    }
    if (this.filterDoctor) {
      filteredDoctors = doctors.filter(d => d.id === this.filterDoctor);
    }

    const weekDates = getWeekDates(this.currentDate);
    const timeSlots = this.generateTimeSlots('08:00', '18:00', 60);

    let html = '<div class="calendar-grid" style="grid-template-columns: 120px repeat(' + weekDates.length + ', 1fr);">';
    
    // Header row
    html += '<div class="calendar-time-label">Doctor / Time</div>';
    weekDates.forEach(date => {
      const d = new Date(date);
      const isToday = date === getTodayDate();
      html += `<div class="calendar-time-header" style="${isToday ? 'background-color: var(--color-bg-1); font-weight: var(--font-weight-bold);' : ''}">
        ${d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
      </div>`;
    });

    // Doctor rows
    filteredDoctors.forEach(doctor => {
      html += `<div class="calendar-doctor-label" style="border-left: 4px solid ${doctor.color};">
        <div style="font-weight: var(--font-weight-semibold);">${doctor.name}</div>
        <div style="font-size: var(--font-size-xs); color: var(--color-text-secondary);">${doctor.specialty}</div>
      </div>`;
      
      weekDates.forEach(date => {
        const appointments = appointmentsManager.getAppointmentsByDate(date)
          .filter(apt => apt.doctorId === doctor.id);
        
        html += `<div class="calendar-cell" data-doctor="${doctor.id}" data-date="${date}" onclick="createAppointmentQuick('${doctor.id}', '${date}')">` +
          appointments.map(apt => `
            <div class="appointment-block" style="background-color: ${doctor.color};" 
                 onclick="event.stopPropagation(); editAppointment('${apt.id}');"
                 draggable="true" 
                 data-appointment="${apt.id}">
              ${formatTime(apt.time)} - ${apt.patientName}
            </div>
          `).join('') +
        '</div>';
      });
    });

    html += '</div>';
    container.innerHTML = html;
    
    this.attachDragListeners();
  }

  // Render day view
  renderDayView(container) {
    const doctors = doctorsManager.getAllDoctors();
    let filteredDoctors = doctors;

    if (this.filterSpecialty) {
      filteredDoctors = doctors.filter(d => d.specialty === this.filterSpecialty);
    }
    if (this.filterDoctor) {
      filteredDoctors = doctors.filter(d => d.id === this.filterDoctor);
    }

    const date = this.currentDate.toISOString().split('T')[0];
    const timeSlots = this.generateTimeSlots('08:00', '18:00', 30);

    let html = '<div class="calendar-grid" style="grid-template-columns: 100px repeat(' + filteredDoctors.length + ', 1fr);">';
    
    // Header row
    html += '<div class="calendar-time-label">Time</div>';
    filteredDoctors.forEach(doctor => {
      html += `<div class="calendar-time-header" style="border-left: 3px solid ${doctor.color};">
        <div style="font-weight: var(--font-weight-semibold);">${doctor.name}</div>
        <div style="font-size: var(--font-size-xs);">${doctor.specialty}</div>
      </div>`;
    });

    // Time slot rows
    timeSlots.forEach(time => {
      html += `<div class="calendar-time-label" style="font-size: var(--font-size-sm);">${formatTime(time)}</div>`;
      
      filteredDoctors.forEach(doctor => {
        const appointments = appointmentsManager.getAppointmentsByDate(date)
          .filter(apt => apt.doctorId === doctor.id && apt.time === time);
        
        html += `<div class="calendar-cell" data-doctor="${doctor.id}" data-date="${date}" data-time="${time}" onclick="createAppointmentQuick('${doctor.id}', '${date}', '${time}')">` +
          appointments.map(apt => `
            <div class="appointment-block" style="background-color: ${doctor.color};" 
                 onclick="event.stopPropagation(); editAppointment('${apt.id}');">
              ${apt.patientName} (${apt.duration}min)
            </div>
          `).join('') +
        '</div>';
      });
    });

    html += '</div>';
    container.innerHTML = html;
  }

  // Render month view (simplified)
  renderMonthView(container) {
    container.innerHTML = '<div style="padding: var(--space-32); text-align: center; color: var(--color-text-secondary);">Month view - Switch to Week or Day view for detailed scheduling</div>';
  }

  // Generate time slots
  generateTimeSlots(startTime, endTime, intervalMinutes) {
    const slots = [];
    let current = startTime;
    
    while (current < endTime) {
      slots.push(current);
      current = addMinutesToTime(current, intervalMinutes);
    }
    
    return slots;
  }

  // Attach drag and drop listeners
  attachDragListeners() {
    const appointmentBlocks = document.querySelectorAll('.appointment-block');
    const calendarCells = document.querySelectorAll('.calendar-cell');

    appointmentBlocks.forEach(block => {
      block.addEventListener('dragstart', (e) => {
        const aptId = e.target.dataset.appointment;
        this.draggedAppointment = appointmentsManager.getAppointment(aptId);
        e.target.style.opacity = '0.5';
      });

      block.addEventListener('dragend', (e) => {
        e.target.style.opacity = '1';
      });
    });

    calendarCells.forEach(cell => {
      cell.addEventListener('dragover', (e) => {
        e.preventDefault();
        cell.style.backgroundColor = 'var(--color-bg-3)';
      });

      cell.addEventListener('dragleave', (e) => {
        cell.style.backgroundColor = '';
      });

      cell.addEventListener('drop', (e) => {
        e.preventDefault();
        cell.style.backgroundColor = '';
        
        if (!this.draggedAppointment) return;

        const newDoctorId = cell.dataset.doctor;
        const newDate = cell.dataset.date;
        const newTime = cell.dataset.time || this.draggedAppointment.time;

        // Check for conflicts
        if (appointmentsManager.hasConflict(
          newDoctorId,
          newDate,
          newTime,
          this.draggedAppointment.duration,
          this.draggedAppointment.id
        )) {
          alert('Time slot conflict! Please choose another time.');
          return;
        }

        // Update appointment
        appointmentsManager.updateAppointment(this.draggedAppointment.id, {
          doctorId: newDoctorId,
          date: newDate,
          time: newTime
        });

        this.draggedAppointment = null;
        this.renderCalendar();
        refreshDashboard();
      });
    });
  }
}

// Create appointment quick action
function createAppointmentQuick(doctorId, date, time = null) {
  appointmentsManager.selectedAppointment = null;
  
  const doctor = doctorsManager.getDoctor(doctorId);
  if (!doctor) return;

  document.getElementById('appointmentModalTitle').textContent = 'New Appointment';
  document.getElementById('patientName').value = '';
  document.getElementById('patientPhone').value = '';
  document.getElementById('appointmentSpecialty').value = doctor.specialty;
  
  // Trigger specialty change
  document.getElementById('appointmentSpecialty').dispatchEvent(new Event('change'));
  
  setTimeout(() => {
    document.getElementById('appointmentDoctor').value = doctorId;
    document.getElementById('appointmentDate').value = date;
    document.getElementById('appointmentTime').value = time || getCurrentTime();
    document.getElementById('appointmentType').value = 'Checkup';
    document.getElementById('appointmentNotes').value = '';
  }, 100);

  document.getElementById('appointmentModal').classList.remove('hidden');
}