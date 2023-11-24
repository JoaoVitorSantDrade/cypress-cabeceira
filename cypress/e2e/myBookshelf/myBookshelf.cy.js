describe('Verify bookshelf', () => {

    beforeEach(() => {
      cy.viewport(1920, 1080)
      cy.LoginCabeceira(Cypress.env("USER"),Cypress.env("USER_PASSWORD"))
      cy.wait(1000)
    })

    afterEach(() => {
      cy.wait(1000)
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
      cy.wait(1000)
      cy.url().should('eq', Cypress.env('url') + '/explore');

    })
  })

  describe('In Explore', () => {

    beforeEach(() => {
      cy.viewport(1920, 1080)
      cy.LoginCabeceira(Cypress.env("USER"),Cypress.env("USER_PASSWORD"))
    })

    afterEach(() => {
      cy.wait(1000)
    });

    it('Ir em Explorar e pesquisar um tema (Sapo)', () => {
      cy.Explore()
      cy.get('input').type("Sapo")
      cy.get('[id="searchBooks"]').click()
      cy.get('[id="searchResult"]',{ timeout: 10000 }).within(() => {
        cy.contains("sapo",{ timeout: 10000 }).should('exist');
      })
    })

    it('Ir em Explorar e adicionar um livro', () => {
      cy.Explore()
      cy.get('input', { timeout: 10000 }).clear()
      cy.get(`[id=${Cypress.env("BOOK_ID")}]`,{ timeout: 30000 }).within(() => {
        cy.get('img').click()
      })
      cy.contains("Adicionar",{ timeout: 10000 }).click()
      cy.get('[id="1"]', { timeout: 10000 }).should('exist');
      cy.contains("Minha cabeceira").click()
      cy.get(`[id=${Cypress.env("BOOK_ID")}]`,{ timeout: 10000 }).should("exist");
    })
  })
  

  describe('Cabeceira possible Actions', () => {

    beforeEach(() => {
      cy.viewport(1920, 1080)
      cy.LoginCabeceira(Cypress.env("USER"),Cypress.env("USER_PASSWORD"))
    })

    afterEach(() => {
      cy.wait(1500)
    });

    it('Ir na Cabeceira e verificar se livro está no lugar correto', () => {
      cy.get('[id="Quero ler_keen"]',{ timeout: 10000 }).should("exist");
      cy.get('[id="Quero ler_keen"]').within(() => {
        cy.get(`[id=${Cypress.env("BOOK_ID")}]`,{ timeout: 10000 }).should("exist");
      })
    })

    it('Ir na Cabeceira e alterar status de um livro', () => {
      cy.get(`[id=${Cypress.env("BOOK_ID")}]`,{ timeout: 10000 }).should("exist");
      cy.get(`[id=${Cypress.env("BOOK_ID")}]`).click()
      cy.get('[id="modalBody"]',{ timeout: 10000 }).within(() => {
        cy.get('[name="bookshelfStatus"]',{ timeout: 10000 })
        .invoke('val')
        .should('eq',"WANT_TO_READ")

        cy.get('select',{ timeout: 10000 }).should('be.visible').select('READING')

        cy.contains("Atualizar leitura",{ timeout: 10000 }).click();

      })
    })

    it('Verificar se livro teve seus status alterado', () => {
      cy.get('[id="Lendo_keen"]',{ timeout: 10000 }).should("exist");
      cy.get('[id="Lendo_keen"]').within(()=>{
        cy.get(`[id=${Cypress.env("BOOK_ID")}]`,{ timeout: 10000 }).should("exist");
      })
    })

    it('Alterar paginas lidas do livro para 5', () => {
      cy.get('[id="Lendo_keen"]',{ timeout: 10000 }).should("exist");
      cy.get('[id="Lendo_keen"]').within(()=>{
        cy.get(`[id=${Cypress.env("BOOK_ID")}]`,{ timeout: 10000 }).should("exist");
        cy.get(`[id=${Cypress.env("BOOK_ID")}]`).click()
      })
        cy.get('[id="modalBody"]',{ timeout: 10000 }).within(()=>{
          cy.get('[name="bookshelfStatus"]')
          .invoke('val')
          .should('eq',"READING")
          cy.get('input').clear().type("5")
          cy.contains("Atualizar leitura").click();
        })
        cy.get(`[id=${Cypress.env("BOOK_ID")}]`,{ timeout: 10000 }).within(()=>{
          cy.get('p').contains(5).should('exist');
        })
      })

    it('Retornar livro para quero ler', () => {
      cy.get('[id="Lendo_keen"]',{ timeout: 10000 }).should("exist");
      cy.get('[id="Lendo_keen"]').within(()=>{
        cy.get(`[id=${Cypress.env("BOOK_ID")}]`,{ timeout: 10000 }).should("exist");
        cy.get(`[id=${Cypress.env("BOOK_ID")}]`).click()
      })
      cy.get('[id="modalBody"]',{ timeout: 10000 }).within(() => {
        cy.get('[name="bookshelfStatus"]')
        .invoke('val')
        .should('eq',"READING")


        cy.get('select',{ timeout: 10000 }).should('be.visible').select('WANT_TO_READ')


        cy.contains("Atualizar leitura",{ timeout: 10000 }).click();

      })
    })

    it('Remover livro da cabeceira', () => {
      cy.get(`[id=${Cypress.env("BOOK_ID")}]`,{ timeout: 10000 }).should("exist");
      cy.get(`[id=${Cypress.env("BOOK_ID")}]`).click()
      cy.get('[id="modalBody"]',{ timeout: 10000 }).within(() => {
        cy.get('form').within(() => {
          cy.get('img',{ timeout: 10000 }).click()
        })
      })
      cy.contains('Deletar').click();
      cy.get(`[id=${Cypress.env("BOOK_ID")}]`,{ timeout: 10000 }).should("not.exist");
    })
  })

  describe('UserProfile Actions', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080)
      cy.LoginCabeceira(Cypress.env("USER"),Cypress.env("USER_PASSWORD"))
    })

    afterEach(() => {
      cy.wait(1000)
    })
    
    it('Verificar se profile Button existe', () => {
      cy.get('header').within(() => {
        cy.get('[href="/profile"]').first().should("exist")
      })
    })

    it('Entrar no profile', () => {
      cy.Profile()

    })

    it('Entrar no profile e verificar dados', () => {
      cy.Profile()
      cy.contains("Joao Vitor Santos de Andrade").should('exist')
      cy.contains('j@gmail.com').should('exist')
    })

    it('Entrar no profile e editar Nome', () => {
      cy.Profile()
      cy.contains("Joao Vitor Santos de Andrade",{ timeout: 10000 }).should('exist')
      cy.contains('j@gmail.com').should('exist')
      cy.contains('Editar perfil',{ timeout: 10000 }).should('exist').click()

      cy.get('[id="updateUserModal"]',{ timeout: 10000 }).should('exist')
      cy.get('form',{ timeout: 10000 }).should('exist').within(()=>{
        cy.get('[id="name"]').clear().type("Pedro")
        cy.get('button').click()
      })
      cy.contains("Joao Vitor Santos de Andrade").should('not.exist')
      cy.contains("Pedro Santos de Andrade").should('exist')
    })

    it('Entrar no profile e editar Sobrenome', () => {
      cy.Profile()
      cy.contains("Pedro Santos de Andrade",{ timeout: 10000 }).should('exist')
      cy.contains('j@gmail.com').should('exist')
      cy.contains('Editar perfil',{ timeout: 10000 }).should('exist').click()

      cy.get('[id="updateUserModal"]',{ timeout: 10000 }).should('exist')
      cy.get('form').should('exist').within(()=>{
        cy.get('[id="lastname"]').clear().type("Cecilio")
        cy.get('button').click()
      })
      cy.contains("Pedro Santos de Andrade").should('not.exist')
      cy.contains("Pedro Cecilio").should('exist')
    })

    it('Entrar no profile e trocar erroneamente a senha', () => {
      cy.Profile()
      cy.contains('Editar perfil',{ timeout: 10000 }).should('exist').click()

      cy.get('[id="updateUserModal"]',{ timeout: 10000 }).should('exist')
      cy.get('form',{ timeout: 10000 }).should('exist').within(()=>{
        cy.get('[id="password"]').clear().type("12345")
        cy.get('button').click()
      })
      cy.get('[role="alert"]').should('exist')
      
    })

    it('Entrar no profile e trocar corretamente a senha', () => {
      cy.Profile()
      cy.contains('Editar perfil',{ timeout: 10000 }).should('exist').click()

      cy.get('[id="updateUserModal"]',{ timeout: 10000 }).should('exist')
      cy.get('form',{ timeout: 10000 }).should('exist').within(()=>{
        cy.get('[id="password"]').clear().type(Cypress.env("USER_PASSWORD") + Cypress.env("USER_PASSWORD"))
        cy.get('button').click()
      })
      cy.get('[role="alert"]').should('not.exist')
      
    })

  })

  describe('New User Actions', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080)
    })

    afterEach(() => {
      cy.wait(1000)
    })

    it('Logar com senha antiga/errada ', () => {
      cy.LoginCabeceira(Cypress.env('USER'),Cypress.env('USER_PASSWORD'))
      cy.get('[role="alert"]',{ timeout: 10000 }).should('exist')

    })

    it('Logar com senha atual ', () => {
      cy.LoginCabeceira(
        Cypress.env('USER'),
        Cypress.env('USER_PASSWORD') + Cypress.env('USER_PASSWORD')
        )
      
      cy.get('[role="alert"]').should('not.exist')
      cy.url().should('eq', Cypress.env("url") + '/');
    })

    it('Deslogar', () => {
      cy.LoginCabeceira(
        Cypress.env('USER'),
        Cypress.env('USER_PASSWORD') + Cypress.env('USER_PASSWORD')
        )
      cy.Profile()
      cy.contains('Sair',{ timeout: 10000 }).should('exist').click() 
      cy.url().should('eq', Cypress.env("url") + '/login');
    })

    it('Alterar para senha antiga', () => {
      cy.LoginCabeceira(
        Cypress.env('USER'),
        Cypress.env('USER_PASSWORD') + Cypress.env('USER_PASSWORD')
        )
      cy.Profile()
      cy.contains('Editar perfil',{ timeout: 10000 }).should('exist').click()

      cy.get('[id="updateUserModal"]',{ timeout: 10000 }).should('exist')
      cy.get('form',{ timeout: 10000 }).should('exist').within(()=>{
        cy.get('[id="password"]',{ timeout: 10000 }).clear().type(Cypress.env("USER_PASSWORD"))
        cy.get('button').click()
      })
      cy.get('[role="alert"]').should('not.exist')
      cy.contains('Sair',{ timeout: 10000 }).should('exist').click() 
      cy.url().should('eq', Cypress.env("url") + '/login');
    })

    it('Alterar para usuário antigo', () => {
      cy.LoginCabeceira(
        Cypress.env('USER'),
        Cypress.env('USER_PASSWORD')
        )
      cy.Profile()
      cy.contains('Editar perfil',{ timeout: 10000 }).should('exist').click()

      cy.get('[id="updateUserModal"]',{ timeout: 10000 }).should('exist')
      cy.get('form',{ timeout: 10000 }).should('exist').within(()=>{
        cy.get('[id="name"]').clear().type("Joao Vitor")
        cy.get('[id="lastname"]').clear().type("Santos de Andrade")
        cy.get('button').click()
      })
      cy.get('[role="alert"]').should('not.exist')
      cy.contains("Pedro Cecilio").should('not.exist')
      cy.contains("Joao Vitor Santos de Andrade").should('exist')
      cy.contains('Sair',{ timeout: 10000 }).should('exist').click() 
      cy.url().should('eq', Cypress.env("url") + '/login');
    })

  })
    

