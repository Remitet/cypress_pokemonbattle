const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureWriter(on, config);
      require('@cypress/grep/src/plugin')(config);
      require('cypress-terminal-report/src/installLogsPrinter')(on);
      return config;
    },
    env: {
      login: "autotest@mail.com",
      password: "Autotest!1",
      allure: true,
      allureAttachRequests: true,
      allureResultsPath: "./AllureReport/allure-results",
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: "https://pokemonbattle-stage.me",
    video: false,
    blockHosts: ["*yandex.ru"],
    videosFolder: "./output/videos",
    reportsFolder: "./output/reports",
    downloadsFolder: "/output/downloads",
    screenshotsFolder: "./AllureReport/screenshots",
  },
});
