describe('Show side bar elements', () => {
  it('show admin side bar', () => {
    cy.login().then(() => {
      cy.visit('/dashboard');
      cy.wait(5000).then(() => {
        cy.contains('BackOffice').should('exist');
        cy.contains('Compañías').should('exist');
        cy.contains('Estados').should('exist');
        cy.contains('Administración').should('exist');
      });
    });
  });
  it('show commercial side bar', () => {
    cy.loginCommercial().then(() => {
      cy.visit('/dashboard');
      cy.wait(5000).then(() => {
        cy.contains('Compañías').should('exist');
        cy.contains('Administración').should('exist');
      });
    });
  });
});
