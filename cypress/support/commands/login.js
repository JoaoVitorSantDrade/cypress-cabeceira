Cypress.Commands.add('LoginCabeceira', () => {
    cy.visit(Cypress.env("url") +'/Login')
    cy.get('input[name="email"]').type("j@gmail.com")
    cy.get('input[name="password"]').type("12345678")
    cy.contains('Acessar').click();
    cy.wait(500);
});