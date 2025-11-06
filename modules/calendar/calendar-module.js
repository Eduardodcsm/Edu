/**
 * CALENDAR MODULE
 * Calendar view for scheduling
 */

const CalendarModule = (function() {
  'use strict';

  let currentDate = new Date();

  function render(container) {
    DOMUtils.empty(container);

    // Header
    const header = DOMUtils.createElement('div', { className: 'section-header' });
    const title = DOMUtils.createElement('h2', { className: 'section-title' }, ['Calendar']);
    const addBtn = ButtonComponent.create({
      text: '+ Add Appointment',
      variant: 'primary',
      onClick: () => NotificationUtils.info('Appointment form coming soon!')
    });
    header.appendChild(title);
    header.appendChild(addBtn);
    container.appendChild(header);

    // Controls
    const controls = renderControls();
    container.appendChild(controls);

    // Month/Year header
    const monthName = DateUtils.getMonthName(currentDate.getMonth());
    const year = currentDate.getFullYear();
    const monthHeader = DOMUtils.createElement('div', {
      className: 'calendar-header'
    }, [`${monthName} ${year}`]);
    container.appendChild(monthHeader);

    // Calendar
    const appointments = DataStore.getAllAppointments();
    const calendar = CalendarComponent.create({
      currentDate,
      appointments,
      onDateClick: (dateStr) => {
        NotificationUtils.info(`Selected date: ${dateStr}`);
      }
    });
    container.appendChild(calendar);

    addStyles();
  }

  function renderControls() {
    const controls = DOMUtils.createElement('div', { className: 'calendar-controls' });

    const prevBtn = ButtonComponent.create({
      text: '\u2039',
      variant: 'secondary',
      onClick: () => {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const container = document.getElementById('mainContent');
        render(container);
      }
    });

    const nextBtn = ButtonComponent.create({
      text: '\u203a',
      variant: 'secondary',
      onClick: () => {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        const container = document.getElementById('mainContent');
        render(container);
      }
    });

    const todayBtn = ButtonComponent.create({
      text: 'Today',
      variant: 'secondary',
      onClick: () => {
        currentDate = new Date();
        const container = document.getElementById('mainContent');
        render(container);
      }
    });

    controls.appendChild(prevBtn);
    controls.appendChild(todayBtn);
    controls.appendChild(nextBtn);

    return controls;
  }

  function addStyles() {
    if (!document.getElementById('calendar-styles')) {
      const style = document.createElement('style');
      style.id = 'calendar-styles';
      style.textContent = `
        .calendar-controls {
          display: flex;
          gap: var(--space-12);
          margin-bottom: var(--space-20);
        }
        .calendar-header {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
          text-align: center;
          margin-bottom: var(--space-20);
          color: var(--color-text);
        }
        .calendar-container {
          background: var(--color-surface);
          border: 1px solid var(--color-card-border);
          border-radius: var(--radius-lg);
          padding: var(--space-20);
        }
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: var(--space-8);
        }
        .calendar-day-header {
          text-align: center;
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-secondary);
          padding: var(--space-12);
        }
        .calendar-day {
          min-height: 100px;
          border: 1px solid var(--color-card-border-inner);
          border-radius: var(--radius-base);
          padding: var(--space-8);
          background: var(--color-background);
          cursor: pointer;
          transition: all var(--duration-fast);
        }
        .calendar-day:active {
          background: var(--color-secondary);
          border-color: var(--color-border);
        }
        .calendar-day.other-month { opacity: 0.4; }
        .calendar-day.today {
          border-color: var(--color-primary);
          border-width: 2px;
        }
        .calendar-day-number {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          color: var(--color-text);
          margin-bottom: var(--space-4);
        }
        .calendar-appointment {
          font-size: var(--font-size-xs);
          padding: var(--space-2) var(--space-4);
          margin-bottom: var(--space-2);
          border-radius: var(--radius-sm);
          color: white;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (max-width: 768px) {
          .calendar-day { min-height: 80px; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  return { render };

})();