/**
 * FORM COMPONENTS
 * Reusable form elements with validation
 */

const FormComponent = (function() {
  'use strict';

  function createInput(options = {}) {
    const {
      id,
      label,
      type = 'text',
      value = '',
      placeholder = '',
      required = false,
      helper = '',
      onChange = null
    } = options;

    const group = DOMUtils.createElement('div', { className: 'form-group' });

    if (label) {
      const labelEl = DOMUtils.createElement('label', {
        for: id,
        className: 'form-label'
      }, [label, required ? ' ' : '']);

      if (required) {
        const req = DOMUtils.createElement('span', { className: 'required' }, ['*']);
        labelEl.appendChild(req);
      }

      group.appendChild(labelEl);
    }

    const input = DOMUtils.createElement('input', {
      type,
      id,
      className: 'form-control',
      value,
      placeholder,
      required
    });

    if (onChange) {
      input.addEventListener('input', onChange);
    }

    group.appendChild(input);

    if (helper) {
      const helperEl = DOMUtils.createElement('span', { className: 'helper-text' }, [helper]);
      group.appendChild(helperEl);
    }

    const errorEl = DOMUtils.createElement('span', {
      className: 'error-message',
      id: `${id}-error`
    });
    group.appendChild(errorEl);

    return group;
  }

  function createSelect(options = {}) {
    const {
      id,
      label,
      options: selectOptions = [],
      value = '',
      required = false,
      onChange = null,
      placeholder = 'Select option'
    } = options;

    const group = DOMUtils.createElement('div', { className: 'form-group' });

    if (label) {
      const labelEl = DOMUtils.createElement('label', {
        for: id,
        className: 'form-label'
      }, [label, required ? ' ' : '']);

      if (required) {
        const req = DOMUtils.createElement('span', { className: 'required' }, ['*']);
        labelEl.appendChild(req);
      }

      group.appendChild(labelEl);
    }

    const select = DOMUtils.createElement('select', {
      id,
      className: 'form-control',
      required
    });

    const placeholderOpt = DOMUtils.createElement('option', { value: '' }, [placeholder]);
    select.appendChild(placeholderOpt);

    selectOptions.forEach(opt => {
      const optEl = DOMUtils.createElement('option', {
        value: opt.value || opt
      }, [opt.label || opt]);
      select.appendChild(optEl);
    });

    select.value = value;

    if (onChange) {
      select.addEventListener('change', onChange);
    }

    group.appendChild(select);

    const errorEl = DOMUtils.createElement('span', {
      className: 'error-message',
      id: `${id}-error`
    });
    group.appendChild(errorEl);

    return group;
  }

  function createTextarea(options = {}) {
    const {
      id,
      label,
      value = '',
      placeholder = '',
      required = false,
      rows = 3,
      onChange = null
    } = options;

    const group = DOMUtils.createElement('div', { className: 'form-group' });

    if (label) {
      const labelEl = DOMUtils.createElement('label', {
        for: id,
        className: 'form-label'
      }, [label, required ? ' ' : '']);

      if (required) {
        const req = DOMUtils.createElement('span', { className: 'required' }, ['*']);
        labelEl.appendChild(req);
      }

      group.appendChild(labelEl);
    }

    const textarea = DOMUtils.createElement('textarea', {
      id,
      className: 'form-control',
      rows,
      placeholder,
      required
    });
    textarea.value = value;

    if (onChange) {
      textarea.addEventListener('input', onChange);
    }

    group.appendChild(textarea);

    return group;
  }

  function showError(inputId, message) {
    const errorEl = document.getElementById(`${inputId}-error`);
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  function clearError(inputId) {
    const errorEl = document.getElementById(`${inputId}-error`);
    if (errorEl) {
      errorEl.textContent = '';
    }
  }

  return {
    createInput,
    createSelect,
    createTextarea,
    showError,
    clearError
  };

})();