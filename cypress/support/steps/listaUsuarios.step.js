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

Given("que acessei a página de listagens de usuários", function () {
  cy.visit(Cypress.env("baseUrl"));
});

When("informo um e-mail válido já cadastrado", function () {
  listaUsuarios.typeinputPesquisa(usuarioCriado.email);
});

Then("o usuário cadastrado deverá aparecer na lista", function () {
  listaUsuarios.getOutputEmail().should("be.visible", usuarioCriado.email.slice(0, 21));;
});

When("informo o email de um usuário não cadastrado", function () {
  cy.intercept('GET', '**/api/v1/users', {
    statusCode: 200,
    body: []
  }).as('getUser')
  cy.wait('@getUser');
});

Then('o usuário não aparecerá na lista', function () {
  cy.contains('Ops! Não existe nenhum usuário para ser exibido.').should('be.visible')

})

Then('aparecerá a opção para cadastrar novo usuário', function () {
  cy.contains(listaUsuarios.linkNovoCadastro, 'Cadastre um novo usuário')

})

Then('o sistema deve exibir a lista dos primeiros 6 usuários', function () {
  cy.intercept('GET', '**/api/v1/users', {
    statusCode: 200,
    fixture: 'listaPaginacao.json',
  }).as('getUsers');
  cy.wait('@getUsers');

})
Then('o sistema deve permitir controles de paginação para acessar os usuários restantes', function () {
  cy.get(listaUsuarios.linkPaginacaoAtual).contains('1 de 2').and('be.visible');
});

Then('o sistema deve exibir a página da lista de usuários', function () {
  cy.intercept('GET', '**/api/v1/users', {
    statusCode: 200,
    fixture: 'listaUser.json',
  }).as('getUsers');
  cy.wait('@getUsers');
});

Then('o sistema não deve permitir a navegação entre a paginação', function () {
  cy.get(listaUsuarios.buttonProximaPagina).should('be.disabled').and('be.visible');
  cy.get(listaUsuarios.buttonVoltarPagina).should('be.disabled').and('be.visible');
  cy.get(listaUsuarios.linkPaginacaoAtual).contains('1 de 1').and('be.visible');
});
