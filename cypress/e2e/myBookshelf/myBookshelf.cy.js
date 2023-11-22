describe('Verify bookshelf', () => {

    beforeEach(() => {
      cy.viewport(1920, 1080)
      cy.LoginCabeceira(Cypress.env("USER"),Cypress.env("USER_PASSWORD"))
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
      cy.wait(1500)
      cy.url().should('eq', Cypress.env('url') + '/explore');

    })
  })

  describe('Go to Explore', () => {

    beforeEach(() => {
      cy.viewport(1920, 1080)
      cy.LoginCabeceira(Cypress.env("USER"),Cypress.env("USER_PASSWORD"))
    })

    afterEach(() => {
      cy.wait(1000)
    });

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
      cy.wait(2000)
      cy.contains("Minha cabeceira").click()
      cy.wait(1000)
      cy.get('[id="S7g3AgAAQBAJ"').should("exist");
    })
  })

  describe('Cabeceira possible Actions', () => {

    beforeEach(() => {
      cy.viewport(1920, 1080)
      cy.LoginCabeceira(Cypress.env("USER"),Cypress.env("USER_PASSWORD"))
    })

    afterEach(() => {
      cy.wait(1000)
    });

    it('Ir na Cabeceira e verificar se livro está no lugar correto', () => {
      cy.get('[id="Quero ler_keen"]').should("exist");
      cy.get('[id="Quero ler_keen"]').within(() => {
        cy.get('[id="S7g3AgAAQBAJ"]').should("exist");
      })
    })

    it('Ir na Cabeceira e alterar status de um livro', () => {
      cy.get('[id="S7g3AgAAQBAJ"]').should("exist");
      cy.get('[id="S7g3AgAAQBAJ"]').click()
      cy.wait(500)
      cy.get('[id="modalBody"]').within(() => {
        cy.get('[name="bookshelfStatus"]')
        .invoke('val')
        .should('eq',"WANT_TO_READ")

        cy.wait(200)

        cy.get('select').should('be.visible').select('READING')

        cy.wait(2000)

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
          cy.get('input').clear().type("5")
          cy.contains("Atualizar leitura").click();
        })
        cy.wait(500)
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

        cy.get('select').should('be.visible').select('WANT_TO_READ')

        cy.wait(200)

        cy.contains("Atualizar leitura").click();

      })
    })

    it('Remover livro da cabeceira', () => {
      cy.get('[id="S7g3AgAAQBAJ"]').should("exist");
      cy.get('[id="S7g3AgAAQBAJ"]').click()
      cy.get('[id="modalBody"]').within(() => {
        cy.get('form').within(() => {
          cy.get('img').click()
        })
      })
      cy.contains('Deletar').click();
      cy.get('[id="S7g3AgAAQBAJ"]').should("not.exist");
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
      cy.contains("Joao Vitor Santos de Andrade").should('exist')
      cy.contains('j@gmail.com').should('exist')
      cy.contains('Editar perfil').should('exist').click()

      cy.get('[id="updateUserModal"]').should('exist')
      cy.get('form').should('exist').within(()=>{
        cy.get('[id="name"]').clear().type("Pedro")
        cy.get('button').click()
      })
      cy.contains("Joao Vitor Santos de Andrade").should('not.exist')
      cy.contains("Pedro Santos de Andrade").should('exist')
    })

    it('Entrar no profile e editar Sobrenome', () => {
      cy.Profile()
      cy.contains("Pedro Santos de Andrade").should('exist')
      cy.contains('j@gmail.com').should('exist')
      cy.contains('Editar perfil').should('exist').click()

      cy.get('[id="updateUserModal"]').should('exist')
      cy.get('form').should('exist').within(()=>{
        cy.get('[id="lastname"]').clear().type("Cecilio")
        cy.get('button').click()
      })
      cy.contains("Pedro Santos de Andrade").should('not.exist')
      cy.contains("Pedro Cecilio").should('exist')
    })

    it('Entrar no profile e trocar erroneamente a senha', () => {
      cy.Profile()
      cy.contains('Editar perfil').should('exist').click()

      cy.get('[id="updateUserModal"]').should('exist')
      cy.get('form').should('exist').within(()=>{
        cy.get('[id="password"]').clear().type("12345")
        cy.get('button').click()
      })
      cy.get('[role="alert"]').should('exist')
      
    })

    it('Entrar no profile e trocar corretamente a senha', () => {
      cy.Profile()
      cy.contains('Editar perfil').should('exist').click()

      cy.get('[id="updateUserModal"]').should('exist')
      cy.get('form').should('exist').within(()=>{
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
      cy.get('[role="alert"]').should('exist')

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
      cy.contains('Sair').should('exist').click() 
      cy.url().should('eq', Cypress.env("url") + '/login');
    })

    it('Alterar para senha antiga', () => {
      cy.LoginCabeceira(
        Cypress.env('USER'),
        Cypress.env('USER_PASSWORD') + Cypress.env('USER_PASSWORD')
        )
      cy.Profile()
      cy.contains('Editar perfil').should('exist').click()

      cy.get('[id="updateUserModal"]').should('exist')
      cy.get('form').should('exist').within(()=>{
        cy.get('[id="password"]').clear().type(Cypress.env("USER_PASSWORD"))
        cy.get('button').click()
      })
      cy.get('[role="alert"]').should('not.exist')
      cy.contains('Sair').should('exist').click() 
      cy.url().should('eq', Cypress.env("url") + '/login');
    })

    it('Alterar para usuário antigo', () => {
      cy.LoginCabeceira(
        Cypress.env('USER'),
        Cypress.env('USER_PASSWORD')
        )
      cy.Profile()
      cy.contains('Editar perfil').should('exist').click()

      cy.get('[id="updateUserModal"]').should('exist')
      cy.get('form').should('exist').within(()=>{
        cy.get('[id="name"]').clear().type("Joao Vitor")
        cy.get('[id="lastname"]').clear().type("Santos de Andrade")
        cy.get('button').click()
      })
      cy.get('[role="alert"]').should('not.exist')
      cy.contains("Pedro Cecilio").should('not.exist')
      cy.contains("Joao Vitor Santos de Andrade").should('exist')
      cy.contains('Sair').should('exist').click() 
      cy.url().should('eq', Cypress.env("url") + '/login');
    })

  })
    

