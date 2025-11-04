// ===== UTILITY FUNCTIONS =====

// Format date to readable string
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Format time to 12-hour format
function formatTime(timeStr) {
  const [hours, minutes] = timeStr.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

// Get today's date in YYYY-MM-DD format
function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

// Get current time in HH:MM format
function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Generate unique ID
function generateId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Get initials from name
function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Calculate time difference in minutes
function getMinutesDifference(time1, time2) {
  const [h1, m1] = time1.split(':').map(Number);
  const [h2, m2] = time2.split(':').map(Number);
  return Math.abs((h2 * 60 + m2) - (h1 * 60 + m1));
}

// Add minutes to time
function addMinutesToTime(time, minutes) {
  const [hours, mins] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + mins + minutes;
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMins = totalMinutes % 60;
  return `${String(newHours).padStart(2, '0')}:${String(newMins).padStart(2, '0')}`;
}

// Check if time is within range
function isTimeInRange(time, startTime, endTime) {
  return time >= startTime && time < endTime;
}

// Get week dates
function getWeekDates(date) {
  const current = new Date(date);
  const first = current.getDate() - current.getDay() + 1; // Monday
  const dates = [];
  
  for (let i = 0; i < 7; i++) {
    const day = new Date(current.setDate(first + i));
    dates.push(day.toISOString().split('T')[0]);
  }
  
  return dates;
}

// Get month name
function getMonthName(date) {
  const d = new Date(date);
  const options = { year: 'numeric', month: 'long' };
  return d.toLocaleDateString('en-US', options);
}

// Get days in month
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// Show notification
function showNotification(message, type = 'info') {
  // Simple console notification
  // In production, this would show a toast/notification component
  console.log(`[${type.toUpperCase()}] ${message}`);
}

// Validate email
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Validate phone
function isValidPhone(phone) {
  const regex = /^[\d\s\-\(\)\+]+$/;
  return phone.length >= 10 && regex.test(phone);
}

// Sort array by key
function sortByKey(array, key, ascending = true) {
  return array.sort((a, b) => {
    const valA = a[key];
    const valB = b[key];
    if (valA < valB) return ascending ? -1 : 1;
    if (valA > valB) return ascending ? 1 : -1;
    return 0;
  });
}

// Filter array by search term
function filterBySearch(array, searchTerm, keys) {
  const term = searchTerm.toLowerCase();
  return array.filter(item => {
    return keys.some(key => {
      const value = String(item[key]).toLowerCase();
      return value.includes(term);
    });
  });
}

// Calculate utilization rate
function calculateUtilizationRate(appointments, doctors, businessHours) {
  if (doctors.length === 0) return 0;
  
  const [startHour] = businessHours.start.split(':').map(Number);
  const [endHour] = businessHours.end.split(':').map(Number);
  const totalHoursPerDoctor = endHour - startHour;
  const totalAvailableHours = doctors.length * totalHoursPerDoctor;
  
  const bookedHours = appointments.reduce((sum, apt) => sum + (apt.duration / 60), 0);
  
  return Math.round((bookedHours / totalAvailableHours) * 100);
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Clone object
function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}