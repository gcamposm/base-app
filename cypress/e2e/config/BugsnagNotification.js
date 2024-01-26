let windowDebugSpy;

Cypress.on('window:before:load', win => {
  windowDebugSpy = cy.spy(win.console, 'debug');
});

describe('Testing Bugsnag', () => {
  it.only('Bugsnag must load a page', () => {
    cy.login().then(() => {
      cy.visit('/companies');
      cy.wait(5000).then(() => {
        expect(windowDebugSpy).to.be.calledWith('[bugsnag]', 'Loaded!');
      });
    });
  });
});
