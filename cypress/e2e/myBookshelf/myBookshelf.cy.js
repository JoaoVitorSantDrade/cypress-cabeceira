describe('See Bookshelf', () => {

    beforeEach(() => {
      cy.viewport(1920, 1080)
      cy.LoginCabeceira()
    })

    afterEach(() => {
      cy.visit("/")
    });

    it('Ter ao menos 3 Sections', () => {
      
      cy.get('h1').should(($h1) => {

        // Certifique-se de que existem pelo menos 3 elementos h1
        expect($h1).to.have.length.at.least(3);
  
        // Obtenha o texto de cada elemento h1
        const textosH1 = $h1.map((index, elemento) => Cypress.$(elemento).text()).get();
  
        // Certifique-se de que os textos são distintos
        expect(textosH1).to.have.lengthOf(new Set(textosH1).size);
      });
    })

    it('Ter opções Minha cabeceira e Explorar no Header', () => {

      cy.get('header').should('exist');
      cy.get('header').contains('Minha cabeceira').should('exist');
      cy.get('header').contains('Explorar').should('exist');

    })

    it('Ir em Explorar', () => {

      cy.get('header').should('exist');
      cy.get('header').contains('Explorar').should('exist');
      cy.get('header').contains('Explorar').click()
      cy.wait(1500)
      cy.url().should('eq', 'http://localhost:5173/explore');

    })

    it('Ir em Explorar e pesquisar um tema', () => {
      cy.Explore()
      cy.get('input').type("Sapo")
      cy.get('[id="searchBooks"]').click()
      cy.wait(1000)
      cy.get('[id="searchResult"]').within(() => {
        cy.contains("sapo").should('exist');
      })
    })

    it('Ir em Explorar e adicionar um livro', () => {
      cy.Explore()
      cy.get('[id="S7g3AgAAQBAJ"').click()
      cy.contains("Adicionar").click()  
      cy.wait(100)
      cy.contains("Minha cabeceira").click()
      cy.contains("Tecnologia").should("exist");
    })
    
    it('Ir na Cabeceira e verificar se livro está no lugar correto', () => {
      cy.get('[id="Quero ler_keen"]').should("exist");
      cy.get('[id="Quero ler_keen"]').within(() => {
        cy.get('[id="S7g3AgAAQBAJ"]').should("exist");
      })
    })

    it('Ir na Cabeceira e alterar status de um livro', () => {
      cy.get('[id="S7g3AgAAQBAJ"]').should("exist");
      cy.get('[id="S7g3AgAAQBAJ"]').click()
      cy.wait(100)
      cy.get('[id="modalBody"]').within(() => {
        cy.get('[name="bookshelfStatus"]')
        .invoke('val')
        .should('eq',"WANT_TO_READ")

        cy.wait(200)

        cy.get('select').should('be.visible').select('READING', {force: true})

        cy.wait(200)

        cy.contains("Atualizar leitura").click();

      })
    })

    it('Verificar se livro teve seus status alterado', () => {
      cy.get('[id="Lendo_keen"]').should("exist");
      cy.get('[id="Lendo_keen"]').within(()=>{
        cy.get('[id="S7g3AgAAQBAJ"]').should("exist");
      })
    })

    it('Alterar paginas lidas do livro para 5', () => {
      cy.get('[id="Lendo_keen"]').should("exist");
      cy.get('[id="Lendo_keen"]').within(()=>{
        cy.get('[id="S7g3AgAAQBAJ"]').should("exist");
        cy.get('[id="S7g3AgAAQBAJ"]').click()
      })
        cy.get('[id="modalBody"]').within(()=>{
          cy.get('[name="bookshelfStatus"]')
          .invoke('val')
          .should('eq',"READING")
          cy.get('input').type("5")
          cy.contains("Atualizar leitura").click();
        })
        cy.get('[id="S7g3AgAAQBAJ"]').within(()=>{
          cy.get('p').contains(5).should('exist');
        })
      })

    it('Retornar livro para quero ler', () => {
      cy.get('[id="Lendo_keen"]').should("exist");
      cy.get('[id="Lendo_keen"]').within(()=>{
        cy.get('[id="S7g3AgAAQBAJ"]').should("exist");
        cy.get('[id="S7g3AgAAQBAJ"]').click()
      })
      cy.get('[id="modalBody"]').within(() => {
        cy.get('[name="bookshelfStatus"]')
        .invoke('val')
        .should('eq',"READING")

        cy.wait(200)

        cy.get('select').should('be.visible').select('WANT_TO_READ', {force: true})

        cy.wait(200)

        cy.contains("Atualizar leitura").click();

      })
    })
  })

    

