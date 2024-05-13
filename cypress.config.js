const { defineConfig } = require('cypress');

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  e2e: {

    setupNodeEvents(on, config) {

    },
    baseUrl: "https://localhost:3000",
    "username": "",
    "password": ""
  },
});