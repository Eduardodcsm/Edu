/**
 * FILTER COMPONENT
 * Search and filter functionality
 */

const FilterComponent = (function() {
  'use strict';

  function createSearchBar(options = {}) {
    const {
      id = 'search',
      placeholder = 'Search...',
      onSearch = null
    } = options;

    const input = DOMUtils.createElement('input', {
      type: 'text',
      id,
      className: 'form-control',
      placeholder
    });

    if (onSearch) {
      let timeout;
      input.addEventListener('input', (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => onSearch(e.target.value), 300);
      });
    }

    return input;
  }

  function createFilterSelect(options = {}) {
    const {
      id,
      label,
      options: filterOptions = [],
      onFilter = null
    } = options;

    const select = FormComponent.createSelect({
      id,
      label,
      options: filterOptions,
      onChange: (e) => onFilter && onFilter(e.target.value)
    });

    return select;
  }

  return { createSearchBar, createFilterSelect };

})();