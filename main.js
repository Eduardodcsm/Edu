document.addEventListener('DOMContentLoaded', () => {
  const API_URL = 'http://localhost:3000/api';

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${API_URL}/doctors`);
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      return [];
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`${API_URL}/appointments`);
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return [];
    }
  };

  const fetchSpecialties = async () => {
    try {
      const response = await fetch(`${API_URL}/specialties`);
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching specialties:', error);
      return [];
    }
  };

  const renderDoctors = (doctors) => {
    const doctorsGrid = document.getElementById('doctorsGrid');
    if (doctorsGrid) {
      doctorsGrid.innerHTML = doctors.map(doctor => `
        <div class="doctor-card-full">
          <div class="doctor-card-header">
            <div class="doctor-card-info">
              <div class="doctor-card-name">${doctor.name}</div>
              <span class="doctor-card-specialty" style="background-color: ${doctor.color}20; color: ${doctor.color};">
                ${doctor.specialty}
              </span>
            </div>
            <span class="doctor-status ${doctor.status === 'Working' ? 'working' : 'off'}">${doctor.status}</span>
          </div>
          <div class="doctor-card-details">
            <div class="doctor-card-detail">
              <span style="color: var(--color-text-secondary);">License:</span>
              <span>${doctor.licenseNumber}</span>
            </div>
            <div class="doctor-card-detail">
              <span style="color: var(--color-text-secondary);">Working Hours:</span>
              <span>${doctor.workingHoursStart} - ${doctor.workingHoursEnd}</span>
            </div>
          </div>
        </div>
      `).join('');
    }
  };

  const renderAppointments = (appointments, doctors) => {
    const appointmentsTableBody = document.getElementById('appointmentsTableBody');
    if (appointmentsTableBody) {
        appointmentsTableBody.innerHTML = appointments.map(apt => {
        const doctor = doctors.find(d => d.id === apt.doctorId);
        const statusClass = apt.status.toLowerCase();
        return `
          <tr>
            <td data-label="Patient"><strong>${apt.patientName}</strong></td>
            <td data-label="Doctor">${doctor ? doctor.name : 'Unknown'}</td>
            <td data-label="Specialty">
              <span style="display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 11px; background-color: ${doctor ? doctor.color + '20' : '#ccc'}; color: ${doctor ? doctor.color : '#666'};">
                ${apt.specialty}
              </span>
            </td>
            <td data-label="Date & Time">${apt.date} ${apt.time}</td>
            <td data-label="Duration">${apt.duration} min</td>
            <td data-label="Status"><span class="status-badge ${statusClass}">${apt.status}</span></td>
            <td data-label="Actions">
              <button class="btn btn--secondary btn-sm" style="padding: 4px 12px; font-size: 12px; margin-right: 4px;">Edit</button>
              <button class="btn btn--danger btn-sm" style="padding: 4px 12px; font-size: 12px;">Cancel</button>
            </td>
          </tr>
        `;
      }).join('');
    }
  };

  const init = async () => {
    const doctors = await fetchDoctors();
    const appointments = await fetchAppointments();
    // const specialties = await fetchSpecialties();

    renderDoctors(doctors);
    renderAppointments(appointments, doctors);
  };

  init();
});
