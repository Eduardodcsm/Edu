/**
 * NAVIGATION COMPONENT
 * Sidebar navigation with mobile support
 */

const NavigationComponent = (function() {
  'use strict';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'doctors', label: 'Doctors', icon: '👨‍⚕️' },
    { id: 'appointments', label: 'Appointments', icon: '📋' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  function init() {
    render();
  }

  function render() {
    const nav = document.getElementById('sidebarNav');
    if (!nav) return;

    nav.innerHTML = '';

    navItems.forEach(item => {
      const button = DOMUtils.createElement('button', {
        className: `nav-item ${item.id === 'dashboard' ? 'active' : ''}`,
        'data-section': item.id,
        'aria-label': item.label
      });

      const icon = DOMUtils.createElement('span', { className: 'nav-icon' }, [item.icon]);
      const label = DOMUtils.createElement('span', { className: 'nav-label' }, [item.label]);

      button.appendChild(icon);
      button.appendChild(label);

      button.addEventListener('click', () => handleNavigate(item.id, button));

      nav.appendChild(button);
    });
  }

  function handleNavigate(section, button) {
    // Update active state
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    button.classList.add('active');

    // Dispatch navigation event
    DOMUtils.dispatch('navigate', { module: section });
  }

  return { init };

})();