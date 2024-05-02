import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { faker } from "@faker-js/faker";
import ListaPage from "../pages/lista.page";

var listaUsuarios = new ListaPage();
const usuarioCriado = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
};

Given("existe um usuário cadastrado", function () {
  cy.request({
    method: "POST",
    url: "https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users",
    body: usuarioCriado
  });
});

Given("que acessei a funcionalidade de listagens de usuários", function () {
  cy.visit(Cypress.env("baseUrl"));
});

When("verifico os usuários listados", function () {});

Then("o usuário cadastrado deverá aparecer na lista", function () {
  listaUsuarios.typeinputPesquisa(usuarioCriado.name);
  listaUsuarios.getOutputEmail().should("be.visible", usuarioCriado.name);
 // cy.contains(usuarioCriado.nome).should('be.visible');
});
