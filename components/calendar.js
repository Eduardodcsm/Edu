/**
 * CALENDAR COMPONENT
 * Calendar view with appointment display
 */

const CalendarComponent = (function() {
  'use strict';

  function create(options = {}) {
    const {
      currentDate = new Date(),
      appointments = [],
      onDateClick = null
    } = options;

    const container = DOMUtils.createElement('div', { className: 'calendar-container' });

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);

    const grid = DOMUtils.createElement('div', { className: 'calendar-grid' });

    // Day headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
      const header = DOMUtils.createElement('div', { className: 'calendar-day-header' }, [day]);
      grid.appendChild(header);
    });

    // Empty cells before month starts
    const startDay = firstDay.getDay();
    for (let i = 0; i < startDay; i++) {
      const date = prevLastDay.getDate() - (startDay - i - 1);
      const day = DOMUtils.createElement('div', { className: 'calendar-day other-month' });
      const number = DOMUtils.createElement('div', { className: 'calendar-day-number' }, [String(date)]);
      day.appendChild(number);
      grid.appendChild(day);
    }

    // Days of month
    const today = DateUtils.getToday();
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = dateStr === today;
      const dayAppointments = appointments.filter(apt => apt.date === dateStr);

      const dayEl = DOMUtils.createElement('div', {
        className: `calendar-day ${isToday ? 'today' : ''}`
      });

      const number = DOMUtils.createElement('div', { className: 'calendar-day-number' }, [String(day)]);
      dayEl.appendChild(number);

      dayAppointments.slice(0, 3).forEach(apt => {
        const doctor = DataStore.getDoctorById(apt.doctorId);
        const aptEl = DOMUtils.createElement('div', {
          className: 'calendar-appointment',
          style: `background: ${doctor?.color || '#2180CE'};`,
          title: `${apt.patientName} - ${apt.time}`
        }, [`${apt.time} ${apt.patientName}`]);
        dayEl.appendChild(aptEl);
      });

      if (dayAppointments.length > 3) {
        const more = DOMUtils.createElement('div', {
          style: 'font-size: var(--font-size-xs); color: var(--color-text-secondary); margin-top: 2px;'
        }, [`+${dayAppointments.length - 3} more`]);
        dayEl.appendChild(more);
      }

      if (onDateClick) {
        dayEl.addEventListener('click', () => onDateClick(dateStr));
      }

      grid.appendChild(dayEl);
    }

    // Remaining cells
    const totalCells = startDay + lastDay.getDate();
    const remainingCells = 7 - (totalCells % 7);
    if (remainingCells < 7) {
      for (let i = 1; i <= remainingCells; i++) {
        const day = DOMUtils.createElement('div', { className: 'calendar-day other-month' });
        const number = DOMUtils.createElement('div', { className: 'calendar-day-number' }, [String(i)]);
        day.appendChild(number);
        grid.appendChild(day);
      }
    }

    container.appendChild(grid);
    return container;
  }

  return { create };

})();