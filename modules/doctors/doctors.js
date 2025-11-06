/**
 * DOCTORS MODULE
 * Doctor management and profiles
 */

const DoctorsModule = (function() {
  'use strict';

  function render(container) {
    DOMUtils.empty(container);

    // Header
    const header = DOMUtils.createElement('div', { className: 'section-header' });
    const title = DOMUtils.createElement('h2', { className: 'section-title' }, ['Doctor Management']);
    const addBtn = ButtonComponent.create({
      text: '+ Add Doctor',
      variant: 'primary',
      onClick: () => NotificationUtils.info('Doctor form coming soon!')
    });
    header.appendChild(title);
    header.appendChild(addBtn);
    container.appendChild(header);

    // Doctors grid
    const grid = DOMUtils.createElement('div', { className: 'doctors-grid' });
    const doctors = DataStore.getAllDoctors();

    doctors.forEach(doctor => {
      const card = renderDoctorCard(doctor);
      grid.appendChild(card);
    });

    container.appendChild(grid);
    addStyles();
  }

  function renderDoctorCard(doctor) {
    const stats = DataStore.getDoctorStats(doctor.id);
    const initials = doctor.name.split(' ').map(n => n[0]).join('');

    const card = DOMUtils.createElement('div', { className: 'doctor-card' });

    // Header
    const cardHeader = DOMUtils.createElement('div', { className: 'doctor-card-header' });
    const avatar = DOMUtils.createElement('div', {
      className: 'doctor-avatar',
      style: `background: ${doctor.color};`
    }, [initials]);

    const info = DOMUtils.createElement('div', { className: 'doctor-card-info' });
    const name = DOMUtils.createElement('div', { className: 'doctor-card-name' }, [doctor.name]);
    const specialtyBadge = DOMUtils.createElement('div', {
      className: 'specialty-badge',
      style: `background: ${doctor.color};`
    }, [doctor.specialty]);
    const license = DOMUtils.createElement('div', { className: 'doctor-license' }, [`License: ${doctor.licenseNumber}`]);
    const statusBadge = DOMUtils.createElement('div', { className: 'doctor-status-badge' }, [
      doctor.status
    ]);
    const statusDot = DOMUtils.createElement('span', {
      className: `doctor-status ${doctor.status === 'Working' ? 'working' : 'off-duty'}`
    });
    statusBadge.insertBefore(statusDot, statusBadge.firstChild);

    info.appendChild(name);
    info.appendChild(specialtyBadge);
    info.appendChild(license);
    info.appendChild(statusBadge);
    cardHeader.appendChild(avatar);
    cardHeader.appendChild(info);

    // Bio
    const bio = DOMUtils.createElement('div', { className: 'doctor-bio' }, [doctor.bio]);

    // Stats
    const statsGrid = DOMUtils.createElement('div', { className: 'doctor-stats' });
    const statItems = [
      { value: String(stats.today), label: 'Today' },
      { value: String(stats.week), label: 'This Week' },
      { value: String(stats.total), label: 'Total' }
    ];

    statItems.forEach(stat => {
      const statEl = DOMUtils.createElement('div', { className: 'doctor-stat' });
      const value = DOMUtils.createElement('div', { className: 'doctor-stat-value' }, [stat.value]);
      const label = DOMUtils.createElement('div', { className: 'doctor-stat-label' }, [stat.label]);
      statEl.appendChild(value);
      statEl.appendChild(label);
      statsGrid.appendChild(statEl);
    });

    // Actions
    const actions = DOMUtils.createElement('div', { className: 'doctor-card-actions' });
    const editBtn = ButtonComponent.create({
      text: 'Edit',
      variant: 'secondary',
      size: 'small',
      onClick: () => NotificationUtils.info(`Edit ${doctor.name}`)
    });
    const scheduleBtn = ButtonComponent.create({
      text: 'Schedule',
      variant: 'secondary',
      size: 'small',
      onClick: () => {
        DOMUtils.dispatch('navigate', { module: 'calendar' });
        NotificationUtils.success(`Viewing schedule for ${doctor.name}`);
      }
    });
    actions.appendChild(editBtn);
    actions.appendChild(scheduleBtn);

    card.appendChild(cardHeader);
    card.appendChild(bio);
    card.appendChild(statsGrid);
    card.appendChild(actions);

    return card;
  }

  function addStyles() {
    if (!document.getElementById('doctors-styles')) {
      const style = document.createElement('style');
      style.id = 'doctors-styles';
      style.textContent = `
        .doctors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: var(--space-20);
        }
        .doctor-card {
          background: var(--color-surface);
          border: 1px solid var(--color-card-border);
          border-radius: var(--radius-lg);
          padding: var(--space-20);
          transition: all var(--duration-normal);
        }
        .doctor-card:active {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .doctor-card-header {
          display: flex;
          align-items: start;
          gap: var(--space-16);
          margin-bottom: var(--space-16);
        }
        .doctor-avatar {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: var(--font-weight-bold);
          font-size: var(--font-size-lg);
          color: white;
          flex-shrink: 0;
        }
        .doctor-card-info { flex: 1; }
        .doctor-card-name {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
          margin-bottom: var(--space-4);
        }
        .specialty-badge {
          display: inline-block;
          padding: var(--space-4) var(--space-12);
          border-radius: var(--radius-full);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-medium);
          color: white;
          margin-bottom: var(--space-8);
        }
        .doctor-license {
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-4);
        }
        .doctor-status-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-4);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-medium);
        }
        .doctor-bio {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: var(--space-16);
        }
        .doctor-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-12);
          margin-bottom: var(--space-16);
          padding: var(--space-12);
          background: var(--color-secondary);
          border-radius: var(--radius-base);
        }
        .doctor-stat { text-align: center; }
        .doctor-stat-value {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-text);
        }
        .doctor-stat-label {
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
          margin-top: var(--space-2);
        }
        .doctor-card-actions {
          display: flex;
          gap: var(--space-8);
        }
        @media (max-width: 768px) {
          .doctors-grid {
            grid-template-columns: 1fr;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  return { render };

})();