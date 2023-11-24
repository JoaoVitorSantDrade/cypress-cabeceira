const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://cabeceira-web.vercel.app",
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
      testFiles: "**/*.spec.js"; // Padrão para os arquivos de teste
      pluginsFile: "cypress/plugins/index.js";
      supportFile: "cypress/support/index.js";
    },
  },
  env: {
    url: "https://cabeceira-web.vercel.app",
    USER: "jj@gmail.com",
    USER_PASSWORD: "12345678",
    BOOK_ID: "41bUDwAAQBAJ"
  },
});

