import '@testing-library/cypress/add-commands'


Cypress.Commands.add('LoginCabeceira', (login, password) => {
    cy.visit(Cypress.env("url"))
    cy.get('input[name="email"]',{ timeout: 10000 }).should('not.be.disabled')
    cy.get('input[name="email"]').type(login)
    cy.get('input[name="password"]').type(password)
    cy.contains('Acessar',{ timeout: 10000 }).click();
    cy.wait(1500);
});

Cypress.Commands.add('Explore', () => {
    cy.get('header',{ timeout: 10000 }).should('exist');
    cy.get('header').contains('Explorar',{ timeout: 10000 }).should('exist');
    cy.get('header').contains('Explorar').click()
    cy.wait(1500);
});

Cypress.Commands.add('Profile', () => {
    cy.get('header').within(() => {
        cy.get('[href="/profile"]',{ timeout: 10000 }).first().click()
      })
      cy.url({ timeout: 10000 }).should('eq', Cypress.env("url") + '/profile')
});

