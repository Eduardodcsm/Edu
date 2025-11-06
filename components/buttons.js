/**
 * BUTTON COMPONENT
 * Reusable button with different variants and touch optimization
 */

const ButtonComponent = (function() {
  'use strict';

  function create(options = {}) {
    const {
      text = 'Button',
      variant = 'primary',
      size = 'normal',
      icon = null,
      onClick = null,
      className = '',
      disabled = false,
      fullWidth = false,
      type = 'button'
    } = options;

    const classes = [
      'btn',
      `btn--${variant}`,
      size !== 'normal' ? `btn--${size}` : '',
      fullWidth ? 'btn--full-width' : '',
      className
    ].filter(Boolean).join(' ');

    const button = DOMUtils.createElement('button', {
      type,
      className: classes,
      disabled
    });

    if (icon) {
      const iconEl = DOMUtils.createElement('span', { className: 'btn-icon' }, [icon]);
      button.appendChild(iconEl);
    }

    const textEl = DOMUtils.createElement('span', {}, [text]);
    button.appendChild(textEl);

    if (onClick) {
      button.addEventListener('click', onClick);
    }

    // Add ripple effect for touch
    DOMUtils.addRippleEffect(button);

    return button;
  }

  return { create };

})();