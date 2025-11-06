/**
 * DATE UTILITIES
 * Helper functions for date manipulation and formatting
 */

const DateUtils = (function() {
  'use strict';

  // Format date to YYYY-MM-DD
  function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Format date to display string
  function formatDateDisplay(date) {
    const d = new Date(date);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return d.toLocaleDateString('en-US', options);
  }

  // Format time to HH:MM
  function formatTime(time) {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  }

  // Format time to 12-hour format
  function formatTime12Hour(time) {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  }

  // Get today's date
  function getToday() {
    return formatDate(new Date());
  }

  // Get week start (Sunday)
  function getWeekStart(date = new Date()) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  }

  // Get week end (Saturday)
  function getWeekEnd(date = new Date()) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() + (6 - day);
    return new Date(d.setDate(diff));
  }

  // Get month name
  function getMonthName(month) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month];
  }

  // Get day name
  function getDayName(day) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
  }

  // Check if date is today
  function isToday(date) {
    return formatDate(date) === getToday();
  }

  // Check if date is in past
  function isPast(date) {
    return new Date(date) < new Date(getToday());
  }

  // Check if date is in future
  function isFuture(date) {
    return new Date(date) > new Date(getToday());
  }

  // Add days to date
  function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  }

  // Add minutes to time
  function addMinutes(time, minutes) {
    const [hours, mins] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMins = totalMinutes % 60;
    return `${String(newHours).padStart(2, '0')}:${String(newMins).padStart(2, '0')}`;
  }

  // Get duration in minutes between two times
  function getDuration(startTime, endTime) {
    const [startHours, startMins] = startTime.split(':').map(Number);
    const [endHours, endMins] = endTime.split(':').map(Number);
    const startTotal = startHours * 60 + startMins;
    const endTotal = endHours * 60 + endMins;
    return endTotal - startTotal;
  }

  // Parse date and time to Date object
  function parseDateTime(date, time) {
    return new Date(`${date}T${time}`);
  }

  return {
    formatDate,
    formatDateDisplay,
    formatTime,
    formatTime12Hour,
    getToday,
    getWeekStart,
    getWeekEnd,
    getMonthName,
    getDayName,
    isToday,
    isPast,
    isFuture,
    addDays,
    addMinutes,
    getDuration,
    parseDateTime
  };

})();