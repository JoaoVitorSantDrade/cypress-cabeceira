
describe('Register User', () => {
    it('Register a User', () => {
      cy.visit('http://localhost:5173/register')
      cy.get('input[name="name"]').type("Joao Vitor")
      cy.get('input[name="lastName"]').type("Santos de Andrade")
      cy.get('input[name="email"]').type("j@gmail.com")
      cy.get('input[name="password"]').type("12345678")
      cy.get('input[name="confirmPassword"]').type("12345678")
      cy.contains('Criar').click();
    })
  })
