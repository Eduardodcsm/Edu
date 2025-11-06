/**
 * APPOINTMENTS MODULE
 * Appointment list and management
 */

const AppointmentsModule = (function() {
  'use strict';

  let currentPage = 1;
  let perPage = 10;
  let searchTerm = '';
  let statusFilter = '';

  function render(container) {
    DOMUtils.empty(container);

    // Header
    const header = DOMUtils.createElement('div', { className: 'section-header' });
    const title = DOMUtils.createElement('h2', { className: 'section-title' }, ['Appointments']);
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

    // Table
    const appointments = getFilteredAppointments();
    const table = renderTable(appointments);
    container.appendChild(table);

    // Pagination
    const totalPages = Math.ceil(appointments.length / perPage);
    const pagination = TableComponent.createPagination({
      currentPage,
      totalPages,
      onPageChange: (page) => {
        currentPage = page;
        render(container);
      }
    });
    container.appendChild(pagination);

    addStyles();
  }

  function renderControls() {
    const controls = DOMUtils.createElement('div', { className: 'appointments-controls' });

    const searchBar = FilterComponent.createSearchBar({
      id: 'appointmentSearch',
      placeholder: 'Search by patient, doctor, or specialty...',
      onSearch: (value) => {
        searchTerm = value;
        currentPage = 1;
        const container = document.getElementById('mainContent');
        render(container);
      }
    });

    const statusSelect = FormComponent.createSelect({
      id: 'statusFilter',
      options: [
        { value: '', label: 'All Status' },
        { value: 'Confirmed', label: 'Confirmed' },
        { value: 'Pending', label: 'Pending' },
        { value: 'Cancelled', label: 'Cancelled' },
        { value: 'Completed', label: 'Completed' }
      ],
      onChange: (e) => {
        statusFilter = e.target.value;
        currentPage = 1;
        const container = document.getElementById('mainContent');
        render(container);
      }
    });

    const perPageSelect = FormComponent.createSelect({
      id: 'perPage',
      options: [
        { value: '10', label: '10 per page' },
        { value: '25', label: '25 per page' },
        { value: '50', label: '50 per page' }
      ],
      onChange: (e) => {
        perPage = parseInt(e.target.value);
        currentPage = 1;
        const container = document.getElementById('mainContent');
        render(container);
      }
    });

    controls.appendChild(searchBar);
    controls.appendChild(statusSelect);
    controls.appendChild(perPageSelect);

    return controls;
  }

  function getFilteredAppointments() {
    let appointments = DataStore.getAllAppointments();

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      appointments = appointments.filter(apt => {
        const doctor = DataStore.getDoctorById(apt.doctorId);
        return apt.patientName.toLowerCase().includes(term) ||
               doctor?.name.toLowerCase().includes(term) ||
               apt.specialty.toLowerCase().includes(term);
      });
    }

    // Status filter
    if (statusFilter) {
      appointments = appointments.filter(apt => apt.status === statusFilter);
    }

    return appointments;
  }

  function renderTable(appointments) {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const paginatedData = appointments.slice(start, end);

    const table = TableComponent.create({
      columns: [
        { label: 'Patient', field: 'patientName' },
        { label: 'Doctor', field: 'doctorId', render: (apt) => {
          const doctor = DataStore.getDoctorById(apt.doctorId);
          return doctor?.name || 'Unknown';
        }},
        { label: 'Specialty', field: 'specialty' },
        { label: 'Date & Time', field: 'date', render: (apt) => `${apt.date} at ${apt.time}` },
        { label: 'Duration', field: 'duration', render: (apt) => `${apt.duration} min` },
        { label: 'Type', field: 'type' },
        { label: 'Status', field: 'status', render: (apt) => {
          const status = DOMUtils.createElement('span', {
            className: `status status--${apt.status.toLowerCase()}`
          }, [apt.status]);
          return status;
        }},
        { label: 'Actions', sortable: false, render: (apt) => {
          const actions = DOMUtils.createElement('div', { className: 'table-actions' });
          const editBtn = ButtonComponent.create({
            text: 'Edit',
            variant: 'secondary',
            size: 'small',
            onClick: () => NotificationUtils.info(`Edit appointment for ${apt.patientName}`)
          });
          const deleteBtn = ButtonComponent.create({
            text: 'Delete',
            variant: 'secondary',
            size: 'small',
            onClick: () => handleDelete(apt)
          });
          actions.appendChild(editBtn);
          actions.appendChild(deleteBtn);
          return actions;
        }}
      ],
      data: paginatedData
    });

    return table;
  }

  function handleDelete(appointment) {
    if (confirm(`Are you sure you want to delete the appointment for ${appointment.patientName}?`)) {
      DataStore.deleteAppointment(appointment.id);
      NotificationUtils.success('Appointment deleted successfully');
      const container = document.getElementById('mainContent');
      render(container);
    }
  }

  function addStyles() {
    if (!document.getElementById('appointments-styles')) {
      const style = document.createElement('style');
      style.id = 'appointments-styles';
      style.textContent = `
        .appointments-controls {
          display: flex;
          gap: var(--space-12);
          margin-bottom: var(--space-20);
        }
        .appointments-controls > * {
          flex: 1;
        }
        .table-actions {
          display: flex;
          gap: var(--space-8);
        }
        .btn--small {
          padding: var(--space-4) var(--space-12);
          font-size: var(--font-size-xs);
          min-height: var(--touch-target-min);
        }
        @media (max-width: 768px) {
          .appointments-controls {
            flex-direction: column;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  return { render };

})();