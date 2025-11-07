# modules/settings/settings.js

/**
 * SETTINGS MODULE - System Configuration & Preferences
 * Features: Theme, notifications, business hours, team settings
 * Animations: Smooth toggles, slide transitions, form interactions
 */

export class SettingsModule {
  constructor(dataStore) {
    this.dataStore = dataStore;
    this.settings = {
      theme: 'light',
      notifications: true,
      emailAlerts: true,
      smsAlerts: false,
      businessHourStart: '08:00',
      businessHourEnd: '18:00',
      appointmentDuration: 30,
      bufferTimeBetween: 10,
      cancelNotificationDays: 1,
      autoConfirm: false,
      darkMode: false,
      soundNotifications: true,
      language: 'en'
    };
  }

  /**
   * Render settings dashboard
   */
  render() {
    const container = document.createElement('div');
    container.className = 'settings-module settings-fade-in';

    container.innerHTML = `
      <div class="settings-container">
        
        <!-- Header -->
        <div class="settings-header">
          <h1>System Settings</h1>
          <p>Configure your practice management system</p>
        </div>

        <!-- Settings Navigation Tabs -->
        <div class="settings-tabs animate-tabs-in">
          <button class="settings-tab active" data-tab="general">
            <span class="tab-icon">⚙️</span> General
          </button>
          <button class="settings-tab" data-tab="notifications">
            <span class="tab-icon">🔔</span> Notifications
          </button>
          <button class="settings-tab" data-tab="schedule">
            <span class="tab-icon">📅</span> Schedule
          </button>
          <button class="settings-tab" data-tab="appearance">
            <span class="tab-icon">🎨</span> Appearance
          </button>
          <button class="settings-tab" data-tab="advanced">
            <span class="tab-icon">🔧</span> Advanced
          </button>
        </div>

        <!-- Settings Content -->
        <div class="settings-content">

          <!-- GENERAL TAB -->
          <div class="settings-tab-content active" id="general-tab">
            <div class="settings-section animate-slide-up" style="animation-delay: 0s">
              <h2>Practice Information</h2>
              
              <div class="setting-item">
                <label>Practice Name</label>
                <input type="text" value="Dental Excellence Clinic" placeholder="Enter practice name">
                <p class="help-text">Display name for your practice</p>
              </div>

              <div class="setting-item">
                <label>Practice Phone</label>
                <input type="tel" value="(555) 123-4567" placeholder="Enter phone number">
                <p class="help-text">Main contact number</p>
              </div>

              <div class="setting-item">
                <label>Practice Email</label>
                <input type="email" value="info@dentalclinic.com" placeholder="Enter email address">
                <p class="help-text">Main contact email</p>
              </div>

              <div class="setting-item">
                <label>Time Zone</label>
                <select>
                  <option>UTC-8 (Pacific Time)</option>
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC (GMT)</option>
                  <option selected>UTC+1 (CET)</option>
                </select>
                <p class="help-text">Your practice time zone</p>
              </div>

              <button class="btn btn-primary animate-button-hover">Save Settings</button>
            </div>
          </div>

          <!-- NOTIFICATIONS TAB -->
          <div class="settings-tab-content" id="notifications-tab">
            <div class="settings-section animate-slide-up" style="animation-delay: 0s">
              <h2>Notification Preferences</h2>

              <div class="setting-toggle-item animate-fade-in" style="animation-delay: 0.1s">
                <div class="toggle-info">
                  <h3>Enable Notifications</h3>
                  <p>Receive notifications for appointments and system alerts</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked>
                  <span class="toggle-slider"></span>
                </label>
              </div>

              <div class="setting-toggle-item animate-fade-in" style="animation-delay: 0.15s">
                <div class="toggle-info">
                  <h3>Email Alerts</h3>
                  <p>Receive email notifications for important events</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked>
                  <span class="toggle-slider"></span>
                </label>
              </div>

              <div class="setting-toggle-item animate-fade-in" style="animation-delay: 0.2s">
                <div class="toggle-info">
                  <h3>SMS Alerts</h3>
                  <p>Receive text message notifications</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox">
                  <span class="toggle-slider"></span>
                </label>
              </div>

              <div class="setting-toggle-item animate-fade-in" style="animation-delay: 0.25s">
                <div class="toggle-info">
                  <h3>Sound Notifications</h3>
                  <p>Play sound for new appointment bookings</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked>
                  <span class="toggle-slider"></span>
                </label>
              </div>

              <div class="setting-item animate-fade-in" style="animation-delay: 0.3s">
                <label>Notification Reminder Time (before appointment)</label>
                <select>
                  <option>15 minutes before</option>
                  <option selected>30 minutes before</option>
                  <option>1 hour before</option>
                  <option>2 hours before</option>
                  <option>1 day before</option>
                </select>
              </div>
            </div>
          </div>

          <!-- SCHEDULE TAB -->
          <div class="settings-tab-content" id="schedule-tab">
            <div class="settings-section animate-slide-up" style="animation-delay: 0s">
              <h2>Business Hours</h2>

              <div class="time-picker-row animate-fade-in" style="animation-delay: 0.1s">
                <div class="time-picker">
                  <label>Monday Start Time</label>
                  <input type="time" value="08:00">
                </div>
                <div class="time-picker">
                  <label>Monday End Time</label>
                  <input type="time" value="18:00">
                </div>
              </div>

              <div class="time-picker-row animate-fade-in" style="animation-delay: 0.15s">
                <div class="time-picker">
                  <label>Tuesday Start Time</label>
                  <input type="time" value="08:00">
                </div>
                <div class="time-picker">
                  <label>Tuesday End Time</label>
                  <input type="time" value="18:00">
                </div>
              </div>

              <div class="time-picker-row animate-fade-in" style="animation-delay: 0.2s">
                <div class="time-picker">
                  <label>Wednesday Start Time</label>
                  <input type="time" value="08:00">
                </div>
                <div class="time-picker">
                  <label>Wednesday End Time</label>
                  <input type="time" value="18:00">
                </div>
              </div>

              <div class="setting-toggle-item animate-fade-in" style="animation-delay: 0.25s">
                <div class="toggle-info">
                  <h3>Open on Saturday</h3>
                  <p>Enable weekend appointments</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox">
                  <span class="toggle-slider"></span>
                </label>
              </div>

              <h2 style="margin-top: 30px;">Appointment Settings</h2>

              <div class="setting-item animate-fade-in" style="animation-delay: 0.3s">
                <label>Default Appointment Duration (minutes)</label>
                <select>
                  <option>15</option>
                  <option>20</option>
                  <option selected>30</option>
                  <option>45</option>
                  <option>60</option>
                </select>
              </div>

              <div class="setting-item animate-fade-in" style="animation-delay: 0.35s">
                <label>Buffer Time Between Appointments (minutes)</label>
                <select>
                  <option>5</option>
                  <option selected>10</option>
                  <option>15</option>
                  <option>20</option>
                </select>
              </div>

              <button class="btn btn-primary animate-button-hover">Save Schedule Settings</button>
            </div>
          </div>

          <!-- APPEARANCE TAB -->
          <div class="settings-tab-content" id="appearance-tab">
            <div class="settings-section animate-slide-up" style="animation-delay: 0s">
              <h2>Theme & Colors</h2>

              <div class="theme-selector animate-fade-in" style="animation-delay: 0.1s">
                <h3>Color Theme</h3>
                <div class="theme-options">
                  <label class="theme-option active">
                    <input type="radio" name="theme" value="light" checked>
                    <span class="theme-preview" style="background: white; border: 2px solid #2180CE;"></span>
                    <span>Light Mode</span>
                  </label>
                  <label class="theme-option">
                    <input type="radio" name="theme" value="dark">
                    <span class="theme-preview" style="background: #1F2937;"></span>
                    <span>Dark Mode</span>
                  </label>
                  <label class="theme-option">
                    <input type="radio" name="theme" value="auto">
                    <span class="theme-preview" style="background: linear-gradient(135deg, white 50%, #1F2937 50%);"></span>
                    <span>Auto (System)</span>
                  </label>
                </div>
              </div>

              <div class="color-customization animate-fade-in" style="animation-delay: 0.2s">
                <h3>Primary Color</h3>
                <div class="color-picker-row">
                  <input type="color" value="#2180CE">
                  <span class="color-value">#2180CE</span>
                </div>
              </div>

              <div class="setting-toggle-item animate-fade-in" style="animation-delay: 0.3s">
                <div class="toggle-info">
                  <h3>Compact Mode</h3>
                  <p>Reduce spacing for more content on screen</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox">
                  <span class="toggle-slider"></span>
                </label>
              </div>

              <div class="setting-item animate-fade-in" style="animation-delay: 0.35s">
                <label>Font Size</label>
                <select>
                  <option>Small</option>
                  <option selected>Normal</option>
                  <option>Large</option>
                  <option>Extra Large</option>
                </select>
              </div>

              <button class="btn btn-primary animate-button-hover">Apply Theme</button>
            </div>
          </div>

          <!-- ADVANCED TAB -->
          <div class="settings-tab-content" id="advanced-tab">
            <div class="settings-section animate-slide-up" style="animation-delay: 0s">
              <h2>Advanced Settings</h2>

              <div class="setting-toggle-item animate-fade-in" style="animation-delay: 0.1s">
                <div class="toggle-info">
                  <h3>Auto-Confirm Appointments</h3>
                  <p>Automatically confirm appointments after booking</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox">
                  <span class="toggle-slider"></span>
                </label>
              </div>

              <div class="setting-item animate-fade-in" style="animation-delay: 0.15s">
                <label>Cancellation Notice Period (days)</label>
                <input type="number" value="1" min="0" max="30">
                <p class="help-text">Number of days required to cancel without penalty</p>
              </div>

              <div class="setting-toggle-item animate-fade-in" style="animation-delay: 0.2s">
                <div class="toggle-info">
                  <h3>Enable Waiting List</h3>
                  <p>Allow patients to join waiting list for full slots</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox">
                  <span class="toggle-slider"></span>
                </label>
              </div>

              <div class="setting-item animate-fade-in" style="animation-delay: 0.25s">
                <label>Language</label>
                <select>
                  <option selected>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Portuguese</option>
                </select>
              </div>

              <h2 style="margin-top: 30px; margin-bottom: 15px;">Data & Privacy</h2>

              <div class="danger-zone animate-fade-in" style="animation-delay: 0.3s">
                <h3>Export Data</h3>
                <p>Download all practice data as CSV</p>
                <button class="btn btn-secondary">Export All Data</button>
              </div>

              <div class="danger-zone warning animate-fade-in" style="animation-delay: 0.35s">
                <h3>Clear Cache</h3>
                <p>Remove temporary application data</p>
                <button class="btn btn-secondary">Clear Cache</button>
              </div>

              <div class="danger-zone critical animate-fade-in" style="animation-delay: 0.4s">
                <h3>Reset All Settings</h3>
                <p>Restore default settings (cannot be undone)</p>
                <button class="btn btn-danger">Reset Settings</button>
              </div>
            </div>
          </div>

        </div>

      </div>
    `;

    // Add event listeners
    this.setupTabNavigation(container);
    this.setupToggleSwitches(container);

    return container;
  }

  /**
   * Setup tab navigation
   */
  setupTabNavigation(container) {
    const tabs = container.querySelectorAll('.settings-tab');
    const contents = container.querySelectorAll('.settings-tab-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabName = tab.dataset.tab;

        // Remove active class from all
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        // Add active to clicked
        tab.classList.add('active');
        container.querySelector(`#${tabName}-tab`).classList.add('active');

        // Add animation
        container.querySelector(`#${tabName}-tab`).style.animation = 'fadeInUp 0.3s ease-out';
      });
    });
  }

  /**
   * Setup toggle switches
   */
  setupToggleSwitches(container) {
    const switches = container.querySelectorAll('.toggle-switch input');

    switches.forEach(toggle => {
      toggle.addEventListener('change', function() {
        const switchEl = this.closest('.toggle-switch');
        switchEl.classList.toggle('active');
      });
    });
  }
}

export default SettingsModule;
