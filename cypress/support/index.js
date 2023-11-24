import '@testing-library/cypress/add-commands';

before(() => {
    // Verifica se o teste está sendo executado no GitHub Actions
    if (Cypress.config('isCI') && process.env.CI === 'true' && process.env.GITHUB_ACTIONS === 'true') {
      // Definir os timeouts específicos para o GitHub Actions
      Cypress.config('defaultCommandTimeout', 15000); // timeout para comandos
      Cypress.config('pageLoadTimeout', 30000); // timeout para carregamento da página
  
    }
  }); 