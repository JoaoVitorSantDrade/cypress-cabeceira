import '@testing-library/cypress/add-commands'


Cypress.Commands.add('LoginCabeceira', (login, password) => {
    cy.visit(Cypress.env("url"))
    cy.get('input[name="email"]').should('not.be.disabled')
    cy.get('input[name="email"]').type(login)
      cy.get('input[name="password"]').type(password)
    cy.contains('Acessar').click();
});

Cypress.Commands.add('Explore', () => {
    cy.get('header').should('exist');
    cy.get('header').contains('Explorar').should('exist');
    cy.get('header').contains('Explorar').click()
    cy.wait(1500);
});

Cypress.Commands.add('Profile', () => {
    cy.get('header').within(() => {
        cy.get('[href="/profile"]').first().click()
      })
      cy.wait(1500);
      cy.url().should('eq', Cypress.env("url") + '/profile')
});

