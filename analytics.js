# modules/analytics/analytics.js

/**
 * ANALYTICS MODULE - Professional Dashboard Analytics
 * Features: Charts, metrics, data visualization, performance tracking
 * Animations: Smooth transitions, data reveals, interactive elements
 */

export class AnalyticsModule {
  constructor(dataStore) {
    this.dataStore = dataStore;
    this.doctors = dataStore.getDoctors();
    this.appointments = dataStore.getAppointments();
    this.chartAnimationDuration = 800; // ms
  }

  /**
   * Get appointment statistics
   */
  getAppointmentStats() {
    const stats = {
      total: this.appointments.length,
      confirmed: this.appointments.filter(a => a.status === 'Confirmed').length,
      pending: this.appointments.filter(a => a.status === 'Pending').length,
      cancelled: this.appointments.filter(a => a.status === 'Cancelled').length
    };

    stats.confirmationRate = Math.round((stats.confirmed / stats.total) * 100) || 0;
    stats.pendingRate = Math.round((stats.pending / stats.total) * 100) || 0;

    return stats;
  }

  /**
   * Get speciality distribution data
   */
  getSpecialtyDistribution() {
    const distribution = {};
    this.appointments.forEach(apt => {
      distribution[apt.specialty] = (distribution[apt.specialty] || 0) + 1;
    });
    return Object.entries(distribution).map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / this.appointments.length) * 100)
    }));
  }

  /**
   * Get doctor utilization data
   */
  getDoctorUtilization() {
    return this.doctors.map(doctor => ({
      name: doctor.name,
      appointmentsToday: doctor.appointmentsToday || 0,
      appointmentsWeek: doctor.appointmentsWeek || 24,
      capacity: 30, // appointments per week capacity
      utilizationRate: Math.round(((doctor.appointmentsWeek || 24) / 30) * 100)
    }));
  }

  /**
   * Get weekly appointment trends
   */
  getWeeklyTrends() {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = weekDays.map((day, index) => ({
      day,
      appointments: Math.floor(Math.random() * 15) + 5, // Sample data
      revenue: Math.floor(Math.random() * 2000) + 500
    }));
    return data;
  }

  /**
   * Render analytics dashboard
   */
  render() {
    const container = document.createElement('div');
    container.className = 'analytics-module analytics-fade-in';

    const stats = this.getAppointmentStats();
    const specialties = this.getSpecialtyDistribution();
    const utilization = this.getDoctorUtilization();
    const trends = this.getWeeklyTrends();

    container.innerHTML = `
      <div class="analytics-container">
        
        <!-- Header -->
        <div class="analytics-header">
          <h1>Analytics & Reports</h1>
          <p>Real-time performance metrics and insights</p>
        </div>

        <!-- Key Metrics Cards -->
        <div class="analytics-metrics">
          <div class="metric-card metric-card-1 animate-slide-up" style="animation-delay: 0s">
            <div class="metric-icon">📊</div>
            <div class="metric-content">
              <h3>Total Appointments</h3>
              <p class="metric-value animate-count" data-target="${stats.total}">0</p>
              <p class="metric-change positive">↑ 12% vs last week</p>
            </div>
          </div>

          <div class="metric-card metric-card-2 animate-slide-up" style="animation-delay: 0.1s">
            <div class="metric-icon">✅</div>
            <div class="metric-content">
              <h3>Confirmed Bookings</h3>
              <p class="metric-value animate-count" data-target="${stats.confirmed}">0</p>
              <p class="metric-change positive">${stats.confirmationRate}% confirmation rate</p>
            </div>
          </div>

          <div class="metric-card metric-card-3 animate-slide-up" style="animation-delay: 0.2s">
            <div class="metric-icon">⏳</div>
            <div class="metric-content">
              <h3>Pending Appointments</h3>
              <p class="metric-value animate-count" data-target="${stats.pending}">0</p>
              <p class="metric-change warning">${stats.pendingRate}% awaiting confirmation</p>
            </div>
          </div>

          <div class="metric-card metric-card-4 animate-slide-up" style="animation-delay: 0.3s">
            <div class="metric-icon">❌</div>
            <div class="metric-content">
              <h3>Cancellations</h3>
              <p class="metric-value animate-count" data-target="${stats.cancelled}">0</p>
              <p class="metric-change">Track cancellation patterns</p>
            </div>
          </div>
        </div>

        <!-- Charts Section -->
        <div class="analytics-charts">
          
          <!-- Appointment Status Pie Chart -->
          <div class="chart-card animate-fade-in" style="animation-delay: 0.4s">
            <h2>Appointment Status Distribution</h2>
            <div class="pie-chart-container">
              <svg class="pie-chart" viewBox="0 0 200 200">
                <circle class="pie-background" cx="100" cy="100" r="90"></circle>
                ${this.renderPieChart(stats)}
              </svg>
              <div class="pie-legend">
                <div class="legend-item">
                  <span class="legend-color" style="background-color: #50C878;"></span>
                  <span>Confirmed (${stats.confirmed})</span>
                </div>
                <div class="legend-item">
                  <span class="legend-color" style="background-color: #FFB700;"></span>
                  <span>Pending (${stats.pending})</span>
                </div>
                <div class="legend-item">
                  <span class="legend-color" style="background-color: #E24A4A;"></span>
                  <span>Cancelled (${stats.cancelled})</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Specialty Distribution Bar Chart -->
          <div class="chart-card animate-fade-in" style="animation-delay: 0.5s">
            <h2>Appointments by Specialty</h2>
            <div class="bar-chart-container">
              ${specialties.map((spec, index) => `
                <div class="bar-item">
                  <div class="bar-label">${spec.name}</div>
                  <div class="bar-wrapper">
                    <div class="bar-fill" 
                         style="width: ${spec.percentage}%; animation-delay: ${index * 0.1}s"
                         data-value="${spec.percentage}%">
                      <span class="bar-value">${spec.count}</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Doctor Utilization Chart -->
        <div class="chart-card full-width animate-fade-in" style="animation-delay: 0.6s">
          <h2>Doctor Utilization Rate</h2>
          <div class="utilization-chart">
            ${utilization.map((doc, index) => `
              <div class="utilization-row">
                <div class="doctor-name">${doc.name}</div>
                <div class="utilization-meter">
                  <div class="meter-background"></div>
                  <div class="meter-fill" 
                       style="width: ${doc.utilizationRate}%; animation-delay: ${index * 0.15}s"
                       data-rate="${doc.utilizationRate}%">
                  </div>
                  <span class="meter-label">${doc.utilizationRate}%</span>
                </div>
                <div class="appointments-count">${doc.appointmentsWeek}/${doc.capacity} slots</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Weekly Trends Chart -->
        <div class="chart-card full-width animate-fade-in" style="animation-delay: 0.7s">
          <h2>Weekly Appointment Trends</h2>
          <div class="line-chart-container">
            <div class="chart-bars">
              ${trends.map((day, index) => `
                <div class="trend-bar-wrapper">
                  <div class="trend-bar" 
                       style="height: ${(day.appointments / 20) * 100}%; animation-delay: ${index * 0.1}s"
                       data-value="${day.appointments}">
                    <span class="trend-value">${day.appointments}</span>
                  </div>
                  <div class="trend-label">${day.day}</div>
                </div>
              `).join('')}
            </div>
            <div class="chart-legend">
              <p>Peak day: ${trends.reduce((max, day) => day.appointments > max.appointments ? day : max).day}</p>
            </div>
          </div>
        </div>

        <!-- Performance Summary -->
        <div class="performance-summary animate-fade-in" style="animation-delay: 0.8s">
          <h2>Performance Summary</h2>
          <div class="summary-stats">
            <div class="summary-item">
              <h4>Average Appointments/Doctor</h4>
              <p class="big-number">${Math.round(stats.total / this.doctors.length)}</p>
            </div>
            <div class="summary-item">
              <h4>Best Performing Doctor</h4>
              <p class="big-number">${utilization.reduce((max, doc) => doc.utilizationRate > max.utilizationRate ? doc : max).name.split(' ')[1]}</p>
            </div>
            <div class="summary-item">
              <h4>System Efficiency</h4>
              <p class="big-number">${Math.round((stats.confirmed / stats.total) * 100)}%</p>
            </div>
          </div>
        </div>

      </div>
    `;

    // Trigger animations after render
    setTimeout(() => this.animateCounters(container), 100);
    setTimeout(() => this.animateCharts(container), 200);

    return container;
  }

  /**
   * Render pie chart SVG
   */
  renderPieChart(stats) {
    const confirmed = stats.confirmed;
    const pending = stats.pending;
    const cancelled = stats.cancelled;
    const total = stats.total || 1;

    const confirmedPercent = (confirmed / total) * 100;
    const pendingPercent = (pending / total) * 100;

    const confirmedAngle = (confirmedPercent / 100) * 360;
    const pendingAngle = (pendingPercent / 100) * 360;

    const radius = 90;
    const circumference = 2 * Math.PI * radius;

    const confirmedDash = (confirmedPercent / 100) * circumference;
    const pendingDash = (pendingPercent / 100) * circumference;
    const cancelledDash = ((100 - confirmedPercent - pendingPercent) / 100) * circumference;

    return `
      <circle class="pie-segment pie-confirmed" cx="100" cy="100" r="${radius}"
              style="stroke-dasharray: ${confirmedDash} ${circumference}; animation-delay: 0s">
      </circle>
      <circle class="pie-segment pie-pending" cx="100" cy="100" r="${radius}"
              style="stroke-dasharray: ${pendingDash} ${circumference}; 
                     stroke-dashoffset: ${-confirmedDash}; animation-delay: 0.2s">
      </circle>
      <circle class="pie-segment pie-cancelled" cx="100" cy="100" r="${radius}"
              style="stroke-dasharray: ${cancelledDash} ${circumference}; 
                     stroke-dashoffset: ${-(confirmedDash + pendingDash)}; animation-delay: 0.4s">
      </circle>
    `;
  }

  /**
   * Animate counter numbers
   */
  animateCounters(container) {
    const counters = container.querySelectorAll('.animate-count');
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target);
      const duration = this.chartAnimationDuration;
      const increment = target / (duration / 16);
      let current = 0;

      const animate = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(animate);
        } else {
          counter.textContent = target;
        }
      };

      animate();
    });
  }

  /**
   * Animate chart elements
   */
  animateCharts(container) {
    const barFills = container.querySelectorAll('.bar-fill');
    const meterFills = container.querySelectorAll('.meter-fill');
    const trendBars = container.querySelectorAll('.trend-bar');
    const pieSegments = container.querySelectorAll('.pie-segment');

    [...barFills, ...meterFills, ...trendBars, ...pieSegments].forEach(el => {
      el.classList.add('chart-animate');
    });
  }
}

export default AnalyticsModule;
