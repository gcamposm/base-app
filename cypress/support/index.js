// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/cypress/add-commands';
// import 'cypress-file-upload';
// Import commands.js using ES2015 syntax:
import './commands';

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

// Fails the tests, aparently because it detects its not loaded
/* Cypress.on('window:before:load', function(win) {
  const original = win.EventTarget.prototype.addEventListener;

  win.EventTarget.prototype.addEventListener = function() {
    if (arguments && arguments[0] === 'beforeunload') {
      return;
    }
    return original.apply(this, arguments);
  };

  Object.defineProperty(win, 'onbeforeunload', {
    get: function() {},
    set: function() {}
  });
}); */

// Alternatively you can use CommonJS syntax:
// require('./commands')
