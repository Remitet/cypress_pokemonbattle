const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      login: "autotest@mail.com",
      password: "Autotest!1",
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: "https://pokemonbattle-stage.me",
  },
});
