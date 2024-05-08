import {
    Given,
    When,
    Then,
    Before,
} from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import ListaPage from "../pages/lista.page";

var listaUsuarios = new ListaPage();
const usuarioCriado = {
    name: faker.person.firstName() + 'Silva',
    email: faker.internet.email(),
};

Before({ tags: '@cadastroUsuario' }, () => {
    cy.request({
      method: "POST",
      url: Cypress.env("apiBaseUrl") + "/users",
      body: usuarioCriado
    });
  })

Given('que acessei a funcionalidade de pesquisa de usuários', function () {
    cy.visit(Cypress.env('baseUrl'));
});

When('informo um e-mail cadastrado', function () {

});


Then('o sistema exibe as informações do usuário cadastrado', function () {

});

When('informo e-mail não cadastrado', function () {

});

Then('o sistema não exibe nenhum usuário', function () {

});

Then('aparecerá a opção para cadastrar novo usuário', function () {

});


