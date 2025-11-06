/**
 * TABLE COMPONENT
 * Responsive data table with sorting and pagination
 */

const TableComponent = (function() {
  'use strict';

  function create(options = {}) {
    const {
      columns = [],
      data = [],
      sortable = true,
      onSort = null,
      onRowClick = null
    } = options;

    const container = DOMUtils.createElement('div', { className: 'table-container' });
    const table = DOMUtils.createElement('table', { className: 'appointments-table', role: 'table' });

    // Header
    const thead = DOMUtils.createElement('thead');
    const headerRow = DOMUtils.createElement('tr');

    columns.forEach(col => {
      const th = DOMUtils.createElement('th', {
        role: 'columnheader',
        className: col.sortable !== false && sortable ? 'sortable' : '',
        'data-sort': col.field || ''
      }, [col.label]);

      if (col.sortable !== false && sortable && onSort) {
        th.addEventListener('click', () => onSort(col.field));
      }

      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Body
    const tbody = DOMUtils.createElement('tbody');
    data.forEach(row => {
      const tr = DOMUtils.createElement('tr');

      columns.forEach(col => {
        const td = DOMUtils.createElement('td');
        const value = col.render ? col.render(row) : row[col.field];
        
        if (typeof value === 'string') {
          td.innerHTML = value;
        } else if (value instanceof Node) {
          td.appendChild(value);
        }

        tr.appendChild(td);
      });

      if (onRowClick) {
        tr.style.cursor = 'pointer';
        tr.addEventListener('click', () => onRowClick(row));
      }

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    container.appendChild(table);

    return container;
  }

  function createPagination(options = {}) {
    const {
      currentPage = 1,
      totalPages = 1,
      onPageChange = null
    } = options;

    const pagination = DOMUtils.createElement('div', { className: 'pagination' });

    // Previous button
    const prevBtn = ButtonComponent.create({
      text: 'Previous',
      variant: 'secondary',
      size: 'small',
      disabled: currentPage === 1,
      onClick: () => onPageChange && onPageChange(currentPage - 1)
    });
    pagination.appendChild(prevBtn);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        const pageBtn = ButtonComponent.create({
          text: String(i),
          variant: i === currentPage ? 'primary' : 'secondary',
          size: 'small',
          onClick: () => onPageChange && onPageChange(i)
        });
        pagination.appendChild(pageBtn);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        const dots = DOMUtils.createElement('span', {}, ['...']);
        pagination.appendChild(dots);
      }
    }

    // Next button
    const nextBtn = ButtonComponent.create({
      text: 'Next',
      variant: 'secondary',
      size: 'small',
      disabled: currentPage === totalPages,
      onClick: () => onPageChange && onPageChange(currentPage + 1)
    });
    pagination.appendChild(nextBtn);

    return pagination;
  }

  return { create, createPagination };

})();