/**
 * DOM UTILITIES
 * Helper functions for DOM manipulation
 */

const DOMUtils = (function() {
  'use strict';

  // Create element with attributes and children
  function createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);
    
    // Set attributes
    Object.keys(attributes).forEach(key => {
      if (key === 'className') {
        element.className = attributes[key];
      } else if (key === 'dataset') {
        Object.keys(attributes[key]).forEach(dataKey => {
          element.dataset[dataKey] = attributes[key][dataKey];
        });
      } else if (key.startsWith('on') && typeof attributes[key] === 'function') {
        const eventName = key.substring(2).toLowerCase();
        element.addEventListener(eventName, attributes[key]);
      } else {
        element.setAttribute(key, attributes[key]);
      }
    });

    // Append children
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child instanceof Node) {
        element.appendChild(child);
      }
    });

    return element;
  }

  // Query selector with optional context
  function qs(selector, context = document) {
    return context.querySelector(selector);
  }

  // Query selector all with optional context
  function qsa(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
  }

  // Add event listener with delegation
  function on(element, event, selector, handler) {
    if (typeof selector === 'function') {
      handler = selector;
      element.addEventListener(event, handler);
    } else {
      element.addEventListener(event, (e) => {
        if (e.target.matches(selector) || e.target.closest(selector)) {
          handler.call(e.target.closest(selector), e);
        }
      });
    }
  }

  // Remove all children
  function empty(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  // Show element
  function show(element) {
    element.classList.remove('hidden');
    element.style.display = '';
  }

  // Hide element
  function hide(element) {
    element.classList.add('hidden');
  }

  // Toggle element visibility
  function toggle(element) {
    element.classList.toggle('hidden');
  }

  // Add ripple effect to element
  function addRippleEffect(element) {
    element.classList.add('ripple');
  }

  // Dispatch custom event
  function dispatch(eventName, detail = {}, element = document) {
    const event = new CustomEvent(eventName, { detail, bubbles: true });
    element.dispatchEvent(event);
  }

  return {
    createElement,
    qs,
    qsa,
    on,
    empty,
    show,
    hide,
    toggle,
    addRippleEffect,
    dispatch
  };

})();