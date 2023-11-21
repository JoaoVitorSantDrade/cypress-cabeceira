const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
      testFiles: "**/*.spec.js"; // Padrão para os arquivos de teste
      pluginsFile: "cypress/plugins/index.js";
      supportFile: "cypress/support/index.js";
    },
  },
  env: {
    url: "http://localhost:5173",
  },
});

