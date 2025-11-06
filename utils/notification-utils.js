/**
 * NOTIFICATION UTILITIES
 * Helper functions for notifications (used by components)
 */

const NotificationUtils = (function() {
  'use strict';

  let notificationQueue = [];
  let isShowing = false;

  // Show notification
  function show(type, message, duration = 3000) {
    notificationQueue.push({ type, message, duration });
    processQueue();
  }

  // Process notification queue
  function processQueue() {
    if (isShowing || notificationQueue.length === 0) return;

    isShowing = true;
    const notification = notificationQueue.shift();
    
    // Dispatch event for NotificationComponent to handle
    DOMUtils.dispatch('showNotification', notification);

    setTimeout(() => {
      isShowing = false;
      processQueue();
    }, notification.duration);
  }

  // Success notification
  function success(message, duration) {
    show('success', message, duration);
  }

  // Error notification
  function error(message, duration) {
    show('error', message, duration);
  }

  // Warning notification
  function warning(message, duration) {
    show('warning', message, duration);
  }

  // Info notification
  function info(message, duration) {
    show('info', message, duration);
  }

  return {
    show,
    success,
    error,
    warning,
    info
  };

})();