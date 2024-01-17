import '@testing-library/cypress/add-commands'
import clipboard from 'clipboardy';


let salaID = "";

Cypress.Commands.add('CriarSala', (Usuario) => { // Ok
    cy.visit(Cypress.env("url"))
    cy.contains('Criar Sala', { timeout: 10000 }).click();
    cy.get('input[id="input-nick"]').type(Usuario)
    cy.contains('Criar Sala e Entrar', { timeout: 10000 }).should('not.be.disabled').click();
    cy.contains('COPIAR', { timeout: 10000 }).parent().within(() => { 
        cy.get('input').then(($input) => {
            salaID = $input.val();
        });
    });
})

Cypress.Commands.add('IniciarPartida', () => {
     cy.get('[id="participante_0"]', { timeout: 10000}).within(() => { 
        cy.get('select').select('Programador Jr')
     })
     cy.get('[id="participante_1"]', { timeout: 10000}).within(() => { 
        cy.get('select').select("Testador")
     })
    cy.contains('Iniciar Partida', { timeout: 10000 }).should('not.be.disabled').click()
 })


Cypress.Commands.add('EntrarSala', (Usuario) => {
    cy.window().then(win => {
        win.open(`${salaID}`, '_blank')
        win.focus()
        cy.get('input[id="input-nick"]').type(Usuario)
        cy.contains('Entrar na Sala', { timeout: 10000}).should('not.be.disabled').click()
        cy.contains('Histórico', { timeout: 60000}).should('exist')
    })
 })


 // https://agile-life-web.onrender.com/sala/16e781ba-3ba1-4663-ba00-6ab615f5cded/configuracao
 // http://localhost:5173/convite/bf6fc79a-ea42-4ca6-be78-0bcd31892872