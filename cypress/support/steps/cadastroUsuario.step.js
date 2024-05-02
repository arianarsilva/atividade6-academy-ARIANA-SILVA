import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { faker } from "@faker-js/faker";
import CadastroPage from "../pages/cadastro.page";
import ListaPage from "../pages/lista.page";

var paginaCadastro = new CadastroPage();
var listaUsuarios = new ListaPage();
var email = faker.internet.email();

Given("que acessei a funcionalidade de cadastro", function () {
  cy.visit(Cypress.env("baseUrl") + "/novo");
});

When("informar um novo nome", function () {
  paginaCadastro.typeNome(faker.person.fullName());
});

When("informar um novo e-mail", function () {
  paginaCadastro.typeEmail(email);
});

When("confirmar a operação", function () {
  paginaCadastro.clickButtonSalvar();
});

Then("o usuário deverá ser cadastrado", function () {
  paginaCadastro.clickLinkVoltar();
  listaUsuarios.typeinputPesquisa(email);
  listaUsuarios.getOutputEmail().should('be.visible', email);
});

Then ('o usuário não será exibido na lista', function () {
  listaUsuarios.getOutputName();
});
