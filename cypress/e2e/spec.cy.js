describe('Visit login page', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/login')
  })
})

describe('Visit register page', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/register')
  })
})
