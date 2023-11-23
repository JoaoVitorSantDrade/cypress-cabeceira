describe('Visit login page', () => {
  it('passes', () => {
    cy.visit(Cypress.env('url') + '/login')
  })
})

describe('Visit register page', () => {
  it('passes', () => {
    cy.visit(Cypress.env('url') + '/register')
  })
})
