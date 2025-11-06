/**
 * DENTAL PRACTICE MANAGER PRO - MODULAR EDITION
 * Main Application Entry Point
 * 
 * This file initializes the modular architecture and coordinates
 * between different components and modules.
 */

(function() {
  'use strict';

  // Application state
  const AppState = {
    currentModule: 'dashboard',
    isMobile: window.innerWidth <= 768,
    isTablet: window.innerWidth > 768 && window.innerWidth <= 1024,
    sidebarOpen: false
  };

  // Initialize application
  function initApp() {
    console.log('🦷 Dental Practice Manager Pro - Modular Edition');
    console.log('Initializing application...');

    // Initialize data store
    if (typeof DataStore !== 'undefined') {
      DataStore.init();
      console.log('✓ Data store initialized');
    }

    // Initialize navigation
    if (typeof NavigationComponent !== 'undefined') {
      NavigationComponent.init();
      console.log('✓ Navigation component initialized');
    }

    // Initialize notification system
    if (typeof NotificationComponent !== 'undefined') {
      NotificationComponent.init();
      console.log('✓ Notification system initialized');
    }

    // Initialize modal system
    if (typeof ModalComponent !== 'undefined') {
      ModalComponent.init();
      console.log('✓ Modal system initialized');
    }

    // Load default module (Dashboard)
    loadModule('dashboard');

    // Setup event listeners
    setupEventListeners();

    // Detect mobile/tablet
    detectDevice();

    console.log('✓ Application initialized successfully');
  }

  // Setup global event listeners
  function setupEventListeners() {
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', toggleSidebar);
    }

    // Close sidebar on overlay click (mobile)
    document.addEventListener('click', (e) => {
      if (AppState.sidebarOpen && !e.target.closest('.sidebar') && !e.target.closest('.sidebar-toggle')) {
        closeSidebar();
      }
    });

    // Window resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        detectDevice();
        handleResize();
      }, 250);
    });

    // Module navigation events
    document.addEventListener('navigate', (e) => {
      loadModule(e.detail.module);
    });

    // Data update events
    document.addEventListener('dataUpdated', (e) => {
      handleDataUpdate(e.detail);
    });

    // Touch gesture support
    setupTouchGestures();
  }

  // Toggle sidebar
  function toggleSidebar() {
    AppState.sidebarOpen = !AppState.sidebarOpen;
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active', AppState.sidebarOpen);
    document.body.classList.toggle('sidebar-open', AppState.sidebarOpen);
  }

  // Close sidebar
  function closeSidebar() {
    AppState.sidebarOpen = false;
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('active');
    document.body.classList.remove('sidebar-open');
  }

  // Detect device type
  function detectDevice() {
    const width = window.innerWidth;
    AppState.isMobile = width <= 768;
    AppState.isTablet = width > 768 && width <= 1024;
    
    document.body.classList.toggle('mobile', AppState.isMobile);
    document.body.classList.toggle('tablet', AppState.isTablet);
    document.body.classList.toggle('desktop', !AppState.isMobile && !AppState.isTablet);
  }

  // Handle window resize
  function handleResize() {
    // Close sidebar on desktop
    if (!AppState.isMobile && !AppState.isTablet && AppState.sidebarOpen) {
      closeSidebar();
    }

    // Refresh current module for responsive changes
    if (AppState.currentModule) {
      const event = new CustomEvent('moduleResize', { detail: { module: AppState.currentModule } });
      document.dispatchEvent(event);
    }
  }

  // Load a module
  function loadModule(moduleName) {
    console.log(`Loading module: ${moduleName}`);
    
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    // Clear current content
    mainContent.innerHTML = '';

    // Update state
    AppState.currentModule = moduleName;

    // Close sidebar on mobile
    if (AppState.isMobile || AppState.isTablet) {
      closeSidebar();
    }

    // Load the appropriate module
    switch (moduleName) {
      case 'dashboard':
        if (typeof DashboardModule !== 'undefined') {
          DashboardModule.render(mainContent);
        }
        break;
      case 'doctors':
        if (typeof DoctorsModule !== 'undefined') {
          DoctorsModule.render(mainContent);
        }
        break;
      case 'appointments':
        if (typeof AppointmentsModule !== 'undefined') {
          AppointmentsModule.render(mainContent);
        }
        break;
      case 'calendar':
        if (typeof CalendarModule !== 'undefined') {
          CalendarModule.render(mainContent);
        }
        break;
      case 'settings':
        if (typeof SettingsModule !== 'undefined') {
          SettingsModule.render(mainContent);
        }
        break;
      default:
        mainContent.innerHTML = '<div class="placeholder-content"><p>Module not found</p></div>';
    }
  }

  // Handle data updates
  function handleDataUpdate(data) {
    console.log('Data updated:', data);
    
    // Refresh current module if affected
    if (shouldRefreshModule(data)) {
      loadModule(AppState.currentModule);
    }
  }

  // Check if module should refresh based on data update
  function shouldRefreshModule(data) {
    const { type } = data;
    const { currentModule } = AppState;

    if (currentModule === 'dashboard') return true;
    if (currentModule === 'doctors' && type === 'doctor') return true;
    if (currentModule === 'appointments' && type === 'appointment') return true;
    if (currentModule === 'calendar' && type === 'appointment') return true;

    return false;
  }

  // Setup touch gestures
  function setupTouchGestures() {
    if (!('ontouchstart' in window)) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleGesture();
    }, { passive: true });

    function handleGesture() {
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      const absX = Math.abs(diffX);
      const absY = Math.abs(diffY);

      // Swipe detection (horizontal swipe must be more significant than vertical)
      if (absX > absY && absX > 100) {
        if (diffX > 0 && touchStartX < 50) {
          // Swipe right from left edge - open sidebar
          if (!AppState.sidebarOpen && (AppState.isMobile || AppState.isTablet)) {
            toggleSidebar();
          }
        } else if (diffX < 0 && AppState.sidebarOpen) {
          // Swipe left - close sidebar
          closeSidebar();
        }
      }
    }
  }

  // Expose global API
  window.DentalApp = {
    loadModule,
    getState: () => ({ ...AppState }),
    toggleSidebar,
    closeSidebar
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();