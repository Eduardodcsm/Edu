/**
 * NOTIFICATION COMPONENT
 * Toast notification system
 */

const NotificationComponent = (function() {
  'use strict';

  let container;

  function init() {
    container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    // Listen for notification events
    document.addEventListener('showNotification', (e) => {
      show(e.detail.type, e.detail.message, e.detail.duration);
    });

    // Add styles
    if (!document.getElementById('toast-styles')) {
      const style = document.createElement('style');
      style.id = 'toast-styles';
      style.textContent = `
        .toast-container {
          position: fixed;
          bottom: var(--space-24);
          right: var(--space-24);
          z-index: 10000;
          display: flex;
          flex-direction: column;
          gap: var(--space-12);
          pointer-events: none;
        }
        .toast {
          background: var(--color-surface);
          border: 1px solid var(--color-card-border);
          border-radius: var(--radius-base);
          padding: var(--space-16);
          box-shadow: var(--shadow-lg);
          min-width: 300px;
          max-width: 400px;
          display: flex;
          align-items: center;
          gap: var(--space-12);
          animation: slideIn 0.3s var(--ease-standard);
          pointer-events: auto;
        }
        .toast.hiding {
          animation: slideOut 0.3s var(--ease-standard) forwards;
        }
        .toast-icon {
          font-size: var(--font-size-xl);
          flex-shrink: 0;
        }
        .toast-message {
          flex: 1;
          font-size: var(--font-size-sm);
          color: var(--color-text);
        }
        .toast--success { border-left: 4px solid var(--color-success); }
        .toast--error { border-left: 4px solid var(--color-error); }
        .toast--warning { border-left: 4px solid var(--color-warning); }
        .toast--info { border-left: 4px solid var(--color-info); }
        @keyframes slideIn {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(120%); opacity: 0; }
        }
        @media (max-width: 768px) {
          .toast-container {
            bottom: var(--space-16);
            right: var(--space-16);
            left: var(--space-16);
          }
          .toast {
            min-width: 0;
            max-width: none;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  function show(type = 'info', message = '', duration = 3000) {
    const icons = {
      success: '✓',
      error: '✗',
      warning: '⚠',
      info: 'ℹ'
    };

    const toast = DOMUtils.createElement('div', {
      className: `toast toast--${type}`
    });

    const icon = DOMUtils.createElement('span', {
      className: 'toast-icon'
    }, [icons[type] || icons.info]);

    const messageEl = DOMUtils.createElement('span', {
      className: 'toast-message'
    }, [message]);

    toast.appendChild(icon);
    toast.appendChild(messageEl);

    container.appendChild(toast);

    // Auto dismiss
    setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 300);
    }, duration);

    // Click to dismiss
    toast.addEventListener('click', () => {
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 300);
    });
  }

  return { init, show };

})();