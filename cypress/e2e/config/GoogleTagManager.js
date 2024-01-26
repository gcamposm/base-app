describe('Testing Google Tag Manager', () => {
  it('Google Tag Manager must load a page', () => {
    cy.login().then(() => {
      cy.visit('/backoffice');
      cy.wait(3000).then(() => {
        cy.window().then(window => {
          assert.isDefined(window.dataLayer, 'window.dataLayer is defined');

          assert.isDefined(
            window.dataLayer.find(x => x.event === 'gtm.js'),
            'GTM is loaded'
          );
        });
      });
    });
  });
});
