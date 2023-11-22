
describe('Register User', () => {
    it('Register a User', () => {
      cy.visit(Cypress.env("url") + '/')
      cy.contains("Criar").should('exist').click()
      cy.get('input[name="name"]').type("Joao Vitor")
      cy.get('input[name="lastName"]').type("Santos de Andrade")
      cy.get('input[name="email"]').type(Cypress.env("USER"))
      cy.get('input[name="password"]').type(Cypress.env("USER_PASSWORD"))
      cy.get('input[name="confirmPassword"]').type("12345678")
      cy.contains('Criar').click();
    })
  })
