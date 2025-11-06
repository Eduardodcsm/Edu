/**
 * DASHBOARD MODULE
 * Main dashboard with metrics and overview
 */

const DashboardModule = (function() {
  'use strict';

  function render(container) {
    DOMUtils.empty(container);

    // Header
    const header = DOMUtils.createElement('div', { className: 'section-header' });
    const title = DOMUtils.createElement('h2', { className: 'section-title' }, ['Dashboard']);
    const addBtn = ButtonComponent.create({
      text: '+ Add Appointment',
      variant: 'primary',
      onClick: () => openAddAppointmentModal()
    });
    header.appendChild(title);
    header.appendChild(addBtn);
    container.appendChild(header);

    // Metrics
    const stats = DataStore.getOverallStats();
    const metricsGrid = DOMUtils.createElement('div', { className: 'metrics-grid' });

    const metrics = [
      { icon: '👨‍⚕️', label: 'Total Doctors', value: String(stats.totalDoctors), color: 'var(--color-bg-1)' },
      { icon: '📅', label: "Today's Appointments", value: String(stats.todayAppointments), color: 'var(--color-bg-2)' },
      { icon: '📊', label: 'This Week', value: String(stats.weekAppointments), color: 'var(--color-bg-3)' },
      { icon: '💼', label: 'Working Doctors', value: String(stats.workingDoctors), color: 'var(--color-bg-4)' }
    ];

    metrics.forEach(metric => {
      const card = CardComponent.createMetricCard(metric);
      metricsGrid.appendChild(card);
    });

    container.appendChild(metricsGrid);

    // Quick stats grid
    const quickStatsGrid = DOMUtils.createElement('div', { className: 'quick-stats-grid' });

    // On-duty doctors
    const doctorsCard = renderOnDutyDoctors();
    quickStatsGrid.appendChild(doctorsCard);

    // Upcoming appointments
    const appointmentsCard = renderUpcomingAppointments();
    quickStatsGrid.appendChild(appointmentsCard);

    container.appendChild(quickStatsGrid);

    // Add mobile-specific styles
    addStyles();
  }

  function renderOnDutyDoctors() {
    const doctors = DataStore.getWorkingDoctors();
    
    const content = DOMUtils.createElement('div');
    if (doctors.length === 0) {
      content.innerHTML = '<p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">No doctors on duty today</p>';
    } else {
      doctors.forEach(doctor => {
        const stats = DataStore.getDoctorStats(doctor.id);
        const item = DOMUtils.createElement('div', { className: 'doctor-item' });
        
        const status = DOMUtils.createElement('span', {
          className: `doctor-status ${doctor.status === 'Working' ? 'working' : 'off-duty'}`
        });
        
        const info = DOMUtils.createElement('div', { className: 'doctor-item-info' });
        const name = DOMUtils.createElement('div', { className: 'doctor-item-name' }, [doctor.name]);
        const specialty = DOMUtils.createElement('div', { className: 'doctor-item-specialty' }, [`${doctor.specialty} \u2022 ${stats.today} appointments today`]);
        
        info.appendChild(name);
        info.appendChild(specialty);
        item.appendChild(status);
        item.appendChild(info);
        
        content.appendChild(item);
      });
    }

    return CardComponent.create({
      title: 'On-Duty Doctors',
      content
    });
  }

  function renderUpcomingAppointments() {
    const appointments = DataStore.getUpcomingAppointments(5);
    
    const content = DOMUtils.createElement('div');
    if (appointments.length === 0) {
      content.innerHTML = '<p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">No upcoming appointments</p>';
    } else {
      appointments.forEach(apt => {
        const doctor = DataStore.getDoctorById(apt.doctorId);
        const item = DOMUtils.createElement('div', { className: 'appointment-item' });
        
        const header = DOMUtils.createElement('div', { className: 'appointment-item-header' });
        const patient = DOMUtils.createElement('span', { className: 'appointment-patient' }, [apt.patientName]);
        const status = DOMUtils.createElement('span', { className: `status status--${apt.status.toLowerCase()}` }, [apt.status]);
        
        header.appendChild(patient);
        header.appendChild(status);
        
        const details = DOMUtils.createElement('div', { className: 'appointment-details' }, [
          `${doctor?.name || 'Unknown'} \u2022 ${apt.date} at ${apt.time} \u2022 ${apt.type}`
        ]);
        
        item.appendChild(header);
        item.appendChild(details);
        content.appendChild(item);
      });
    }

    return CardComponent.create({
      title: 'Upcoming Appointments',
      content
    });
  }

  function openAddAppointmentModal() {
    // This would open the appointment modal (to be implemented in appointments module)
    NotificationUtils.info('Opening appointment form...');
    DOMUtils.dispatch('navigate', { module: 'appointments' });
  }

  function addStyles() {
    if (!document.getElementById('dashboard-styles')) {
      const style = document.createElement('style');
      style.id = 'dashboard-styles';
      style.textContent = `
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-24);
          gap: var(--space-16);
        }
        .section-title {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-text);
        }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--space-20);
          margin-bottom: var(--space-32);
        }
        .metric-card {
          background: var(--color-surface);
          padding: var(--space-20);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-card-border);
          display: flex;
          align-items: center;
          gap: var(--space-16);
          transition: transform var(--duration-fast), box-shadow var(--duration-fast);
        }
        .metric-card:active {
          transform: scale(0.98);
        }
        .metric-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--font-size-2xl);
        }
        .metric-content { flex: 1; }
        .metric-label {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-4);
        }
        .metric-value {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-text);
        }
        .quick-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: var(--space-20);
        }
        .card {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-card-border);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }
        .card__header {
          padding: var(--space-16) var(--space-20);
          border-bottom: 1px solid var(--color-card-border-inner);
        }
        .card__header h3 {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
        }
        .card__body {
          padding: var(--space-16) var(--space-20);
        }
        .doctor-item {
          display: flex;
          align-items: center;
          gap: var(--space-12);
          padding: var(--space-12);
          margin-bottom: var(--space-8);
          border-radius: var(--radius-base);
          transition: background var(--duration-fast);
          min-height: var(--touch-target-min);
        }
        .doctor-item:active {
          background: var(--color-secondary);
        }
        .doctor-status {
          width: 8px;
          height: 8px;
          border-radius: var(--radius-full);
          flex-shrink: 0;
        }
        .doctor-status.working { background: var(--color-success); }
        .doctor-status.off-duty { background: var(--color-text-secondary); }
        .doctor-item-info { flex: 1; }
        .doctor-item-name {
          font-weight: var(--font-weight-medium);
          color: var(--color-text);
          font-size: var(--font-size-sm);
        }
        .doctor-item-specialty {
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
        }
        .appointment-item {
          padding: var(--space-12);
          margin-bottom: var(--space-8);
          border-radius: var(--radius-base);
          border: 1px solid var(--color-card-border-inner);
          transition: all var(--duration-fast);
          min-height: var(--touch-target-min);
        }
        .appointment-item:active {
          border-color: var(--color-border);
          box-shadow: var(--shadow-sm);
        }
        .appointment-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-4);
        }
        .appointment-patient {
          font-weight: var(--font-weight-medium);
          color: var(--color-text);
          font-size: var(--font-size-sm);
        }
        .appointment-details {
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
        }
        .status {
          display: inline-flex;
          align-items: center;
          padding: var(--space-4) var(--space-8);
          border-radius: var(--radius-full);
          font-weight: var(--font-weight-medium);
          font-size: var(--font-size-xs);
          border: 1px solid;
        }
        .status--confirmed {
          background-color: rgba(var(--color-success-rgb), 0.15);
          color: var(--color-success);
          border-color: rgba(var(--color-success-rgb), 0.25);
        }
        .status--pending {
          background-color: rgba(var(--color-warning-rgb), 0.15);
          color: var(--color-warning);
          border-color: rgba(var(--color-warning-rgb), 0.25);
        }
        .status--cancelled {
          background-color: rgba(var(--color-error-rgb), 0.15);
          color: var(--color-error);
          border-color: rgba(var(--color-error-rgb), 0.25);
        }
        .status--completed {
          background-color: rgba(var(--color-info-rgb), 0.15);
          color: var(--color-info);
          border-color: rgba(var(--color-info-rgb), 0.25);
        }
        @media (max-width: 768px) {
          .section-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .metrics-grid {
            grid-template-columns: 1fr;
          }
          .quick-stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  return { render };

})();