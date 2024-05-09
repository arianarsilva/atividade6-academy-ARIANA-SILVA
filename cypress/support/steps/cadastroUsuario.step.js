import {
  Given,
  When,
  Then,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";
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
When("informar um novo nome para cadastro", function (tabela) {
  const dados = tabela.rowsHash();
  cy.log(dados);
  paginaCadastro.typeNome(dados.nome);
});
When("confirmar a operação salvando o cadastro", function () {
  paginaCadastro.clickButtonSalvar();
});

Then("não será possível efetuar o cadastro", function () {
  cy.contains("O campo e-mail é obrigatório.").should("be.visible");
});

//tentativa de cadastro com email existente

When("informar um nome e e-mail que já está cadastrado", function () {
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

  cy.intercept("POST", "api/v1/users").as("postUsuario");
  paginaCadastro.typeNome(novoUsuario.name);
  paginaCadastro.typeEmail(novoUsuario.email);
});

When("tentar salvar o usuário para confirmar operação", function () {
  cy.get("@postUsuario").then(() => {
    paginaCadastro.clickButtonSalvar();
  });
});

Then("não será possível cadastrar usuário", function () {
  cy.contains("Este e-mail já é utilizado por outro usuário.").should(
    "be.visible"
  );
});

// mais de 100 caracteres
When('informar um nome com mais de 100 caracteres', function () {
  paginaCadastro.typeNome(faker.string.alpha(101));

});

When('informar um email válido', function () {
  paginaCadastro.typeEmail(faker.internet.email());

});
When('confirmar a tentativa de cadastro', function () {
  paginaCadastro.clickButtonSalvar();

});
Then('o cadastro não será completado', function() {
  cy.contains('Informe no máximo 100 caracteres para o nome').should('be.visible');

});

// mais de 60 caracteres
When('informar um nome válido', function () {
  paginaCadastro.typeNome(faker.person.firstName() + ' Silva');

});

When('informar um email com mais de 60 caracteres', function () {
  paginaCadastro.typeEmail(faker.string.alpha(51) + '@gmail.com');

});

When('validar a tentativa de cadastro', function () {
  paginaCadastro.clickButtonSalvar();

});

Then('não será possível cadastrar email com 60 caracteres', function() {
  cy.contains('Informe no máximo 60 caracteres para o e-mail').should('be.visible');

});

// menos de 4 caracteres
When('informar um nome com menos de 4 caracteres', function () {

  paginaCadastro.typeNome('Ari'); 
});

When('informar um email válido para o cadastro', function () {
  paginaCadastro.typeEmail('ariana@teste.com');
  });

  When('validar a operação', function () {
    paginaCadastro.clickButtonSalvar();
  });
  
  Then('não será possível cadastrar usuário com menos de 4 caracteres no nome', function() {
    cy.contains('Informe pelo menos 4 letras para o nome.').should('be.visible');
  
  });
