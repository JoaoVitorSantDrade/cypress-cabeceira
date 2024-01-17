describe('Entrando no Tabuleiro', () => {
    it('Cria a sala', () => {
        cy.CriarSala('Usuario1')
        cy.EntrarSala('Usuario2')
        cy.IniciarPartida()
    })
  })
