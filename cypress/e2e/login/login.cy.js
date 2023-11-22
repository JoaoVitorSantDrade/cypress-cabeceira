describe('Login with User', () => {
    it('Login', () => {
      cy.visit(Cypress.env("url") +'/Login')
      cy.get('input[name="email"]').type(Cypress.env("USER"))
      cy.get('input[name="password"]').type(Cypress.env("USER_PASSWORD"))
      cy.contains('Acessar').click();
      cy.wait(500);
      cy.url().should('eq', Cypress.env("url") + '/');
    })
  })
