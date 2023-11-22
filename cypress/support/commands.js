import '@testing-library/cypress/add-commands'


Cypress.Commands.add('LoginCabeceira', () => {
    cy.visit(Cypress.env("url") +'/Login')
    cy.get('input[name="email"]').type(Cypress.env("USER"))
      cy.get('input[name="password"]').type(Cypress.env("USER_PASSWORD"))
    cy.contains('Acessar').click();
    cy.wait(500);
});

Cypress.Commands.add('Explore', () => {
    cy.visit(Cypress.env("url") +'/explore')
    cy.wait(1500);
});

Cypress.Commands.add('Profile', () => {
    cy.get('header').within(() => {
        cy.get('[href="/profile"]').first().click()
      })
      cy.url().should('eq', Cypress.env("url") + '/profile')
});