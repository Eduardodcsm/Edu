/**
 * CARD COMPONENT
 * Reusable card for displaying information
 */

const CardComponent = (function() {
  'use strict';

  function create(options = {}) {
    const {
      title = '',
      content = '',
      footer = null,
      className = '',
      onClick = null
    } = options;

    const card = DOMUtils.createElement('div', {
      className: `card ${className}`
    });

    if (title) {
      const header = DOMUtils.createElement('div', { className: 'card__header' });
      const titleEl = DOMUtils.createElement('h3', {}, [title]);
      header.appendChild(titleEl);
      card.appendChild(header);
    }

    const body = DOMUtils.createElement('div', { className: 'card__body' });
    if (typeof content === 'string') {
      body.innerHTML = content;
    } else if (content instanceof Node) {
      body.appendChild(content);
    }
    card.appendChild(body);

    if (footer) {
      const footerEl = DOMUtils.createElement('div', { className: 'card__footer' });
      if (typeof footer === 'string') {
        footerEl.innerHTML = footer;
      } else if (footer instanceof Node) {
        footerEl.appendChild(footer);
      }
      card.appendChild(footerEl);
    }

    if (onClick) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', onClick);
    }

    return card;
  }

  function createMetricCard(options = {}) {
    const { icon, label, value, color, trend } = options;

    const card = DOMUtils.createElement('div', { className: 'metric-card' });

    const iconEl = DOMUtils.createElement('div', {
      className: 'metric-icon',
      style: `background: ${color || 'var(--color-bg-1)'};`
    }, [icon || '📊']);

    const content = DOMUtils.createElement('div', { className: 'metric-content' });
    const labelEl = DOMUtils.createElement('div', { className: 'metric-label' }, [label]);
    const valueEl = DOMUtils.createElement('div', { className: 'metric-value' }, [value]);

    content.appendChild(labelEl);
    content.appendChild(valueEl);

    if (trend) {
      const trendEl = DOMUtils.createElement('div', { className: 'metric-trend' }, [trend]);
      content.appendChild(trendEl);
    }

    card.appendChild(iconEl);
    card.appendChild(content);

    return card;
  }

  return { create, createMetricCard };

})();