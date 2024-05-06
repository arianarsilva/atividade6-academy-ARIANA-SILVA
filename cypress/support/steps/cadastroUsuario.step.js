import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { faker } from "@faker-js/faker";
import CadastroPage from "../pages/cadastro.page";
import ListaPage from "../pages/lista.page";

var paginaCadastro = new CadastroPage();
var listaUsuarios = new ListaPage();

Given("que acessei a funcionalidade de cadastro", function () {
  cy.visit(Cypress.env("baseUrl") + "/novo");
});

// cadastro com sucesso
When("informar um novo nome e email", function () {
  var novoEmail = faker.internet.email();
  paginaCadastro.cadastrar(faker.person.firstName() + " Silva", novoEmail);
  cy.wrap(novoEmail).as("emailFaker");
  cy.get("@emailFaker").then((email) => cy.log(email));
});

When("confirmar a operação", function () {
  cy.intercept("POST", "api/v1/users").as("postUsuario");
  paginaCadastro.clickLinkVoltar();
});

Then("o usuário deverá ser cadastrado", function () {
  cy.get("@emailFaker").then((email) => {
    listaUsuarios.typeinputPesquisa(email);
    listaUsuarios.getOutputEmail().should("be.visible", email.slice(0, 21));
  });
});

//tentativa de cadastro sem nome
When("informar um novo e-mail", function () {
  paginaCadastro.typeEmail("ariana@qa.com");
});

When("tentar salvar o usuário", function () {
  paginaCadastro.clickButtonSalvar();
});

Then("o usuário não será cadastrado", function () {
  cy.contains("O campo nome é obrigatório.").should("be.visible");
});

//tentativa de cadastro sem email
When("informar um novo nome", function (tabela) {
  const dados = tabela.rowsHash();
  paginaCadastro.typeNome(dados.nome);
});
When("tentar salvar o usuário", function () {
  paginaCadastro.clickButtonSalvar();
});

Then("não será possível efetuar o cadastro", function () {
  cy.contains("O campo e-mail é obrigatório.").should("be.visible");
});

//tentativa de cadastro com email existente
When("informar um nome", function () {
  const novoUsuario = {
    name: "New Username",
    email: "new@email.com",
  };

  cy.request({
    method: "POST",
    url: Cypress.env("apiBaseUrl") + "/users",
    body: novoUsuario,
    failOnStatusCode: false,
  });

  paginaCadastro.typeNome(novoUsuario.name);

  When("informar um e-mail que já está cadastrado", function () {
    cy.intercept("POST", "api/v1/users").as("postUsuario");
    cy.get("@postUsuario");

    paginaCadastro.typeEmail(novoUsuario.email);
  });

  When("clicar em salvar", function () {
    paginaCadastro.clickButtonSalvar();
  });

  Then("não será possível cadastrar usuário", function () {
    cy.contains("Este e-mail já é utilizado por outro usuário.").should('be.visible');
  });
});
