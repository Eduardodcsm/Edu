/**
 * MODAL COMPONENT
 * Reusable modal dialog system with bottom sheet support for mobile
 */

const ModalComponent = (function() {
  'use strict';

  let modals = {};

  function init() {
    // Setup modal container
    const container = document.getElementById('modalContainer');
    if (!container) {
      const newContainer = document.createElement('div');
      newContainer.id = 'modalContainer';
      document.body.appendChild(newContainer);
    }
  }

  function create(options = {}) {
    const {
      id,
      title = 'Modal',
      content = '',
      footer = null,
      size = 'normal',
      onClose = null,
      closeOnOverlay = true
    } = options;

    const modalId = id || `modal_${Date.now()}`;

    const modal = DOMUtils.createElement('div', {
      className: 'modal',
      id: modalId,
      role: 'dialog',
      'aria-labelledby': `${modalId}-title`,
      'aria-hidden': 'true'
    });

    const modalContent = DOMUtils.createElement('div', {
      className: `modal-content ${size !== 'normal' ? `modal-content--${size}` : ''}`
    });

    // Header
    const header = DOMUtils.createElement('div', { className: 'modal-header' });
    const titleEl = DOMUtils.createElement('h3', { id: `${modalId}-title` }, [title]);
    const closeBtn = DOMUtils.createElement('button', {
      className: 'modal-close',
      'aria-label': 'Close modal'
    }, ['×']);

    closeBtn.addEventListener('click', () => {
      close(modalId);
      if (onClose) onClose();
    });

    header.appendChild(titleEl);
    header.appendChild(closeBtn);

    // Body
    const body = DOMUtils.createElement('div', { className: 'modal-body' });
    if (typeof content === 'string') {
      body.innerHTML = content;
    } else if (content instanceof Node) {
      body.appendChild(content);
    }

    modalContent.appendChild(header);
    modalContent.appendChild(body);

    // Footer
    if (footer) {
      const footerEl = DOMUtils.createElement('div', { className: 'modal-footer' });
      if (Array.isArray(footer)) {
        footer.forEach(btn => footerEl.appendChild(btn));
      } else if (footer instanceof Node) {
        footerEl.appendChild(footer);
      }
      modalContent.appendChild(footerEl);
    }

    modal.appendChild(modalContent);

    // Close on overlay click
    if (closeOnOverlay) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          close(modalId);
          if (onClose) onClose();
        }
      });
    }

    modals[modalId] = modal;

    const container = document.getElementById('modalContainer');
    container.appendChild(modal);

    return modalId;
  }

  function open(modalId) {
    const modal = modals[modalId] || document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function close(modalId) {
    const modal = modals[modalId] || document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  function closeAll() {
    Object.keys(modals).forEach(id => close(id));
  }

  function destroy(modalId) {
    const modal = modals[modalId];
    if (modal) {
      modal.remove();
      delete modals[modalId];
    }
  }

  return {
    init,
    create,
    open,
    close,
    closeAll,
    destroy
  };

})();