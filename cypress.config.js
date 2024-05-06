const { defineConfig } = require("cypress");
const cucumber = require ("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  e2e: {
    env: {
    apiBaseUrl: 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1',
    baseUrl: 'https://rarocrud-frontend-88984f6e4454.herokuapp.com/users',
    TAGS: 'not @ignore'
  },
  specPattern:'cypress/e2e/**/*.feature',
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber());
    },
  },
});