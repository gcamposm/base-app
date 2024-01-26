// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { setAuth } from '../../src/utils/auth';

Cypress.Commands.add('login', () => {
  cy.request({
    url: 'http://localhost:5500/v/login',
    method: 'POST',
    body: { user: { email: Cypress.env('test_email'), password: Cypress.env('test_password') } },
    headers: { 'Content-Type': 'application/json' }
  }).then(res => {
    setAuth(res.body, { remember: true });
    return true;
  });
});

Cypress.Commands.add('loginCommercial', () => {
  cy.request({
    url: 'http://localhost:5500/v/login',
    method: 'POST',
    body: { user: { email: 'commercial@shipit.cl', password: Cypress.env('test_password') } }, // user solo con rol commercial
    headers: { 'Content-Type': 'application/json' }
  }).then(res => {
    setAuth(res.body, { remember: true });
    return true;
  });
});
