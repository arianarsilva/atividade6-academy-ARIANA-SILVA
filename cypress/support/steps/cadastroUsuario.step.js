import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { faker } from "@faker-js/faker";
import CadastroPage from "../pages/cadastro.page";
import ListaPage from "../pages/lista.page";

var paginaCadastro = new CadastroPage();
var listaUsuarios = new ListaPage();

Given("que acessei a funcionalidade de cadastro", function () {
  cy.visit(Cypress.env("baseUrl") + "/novo");
});

When("informar um novo nome", function () {
  paginaCadastro.typeNome(faker.person.fullName());
});

When("informar um novo e-mail", function () {
  var novoEmail = faker.internet.email();
  cy.wrap(novoEmail).as("emailFaker");
  cy.get("@emailFaker").then((email) => cy.log(email));
  paginaCadastro.typeEmail(novoEmail);
});

When("confirmar a operação", function () {
  cy.intercept("POST", "api/v1/users").as("postUsuario");
  paginaCadastro.clickButtonSalvar();
  paginaCadastro.clickLinkVoltar();
});

Then("o usuário deverá ser cadastrado", function () {

  cy.get("@emailFaker").then((email) => {
    listaUsuarios.typeinputPesquisa(email);
    listaUsuarios.getOutputEmail().should("be.visible", email.slice(0, 21));
  });
});

Then("o usuário não será exibido na lista", function () {
  cy.wait('@postUsuario');
  listaUsuarios.getOutputName().should('not.contain');
});
