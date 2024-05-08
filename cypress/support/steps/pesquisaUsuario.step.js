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
    name: faker.person.firstName() + ' Silva',
    email: faker.internet.email(),
};

Before({ tags: '@cadastroUsuario' }, () => {
    cy.request({
        method: "POST",
        url: Cypress.env("apiBaseUrl") + "/users",
        body: usuarioCriado
    });
    cy.log(usuarioCriado.email);
})

Given('que acessei a funcionalidade de pesquisa de usuários', function () {
    cy.visit(Cypress.env('baseUrl'));
});

When('informo um e-mail cadastrado', function () {
    listaUsuarios.typeinputPesquisa(usuarioCriado.email);
});

Then('o sistema exibe as informações do usuário cadastrado', function () {
    listaUsuarios.getOutputEmail().should("be.visible", usuarioCriado.email.slice(0, 21));
    listaUsuarios.getOutputName().should("be.visible", usuarioCriado.name);

});

When('informo e-mail não cadastrado', function () {
    listaUsuarios.typeinputPesquisa('notanuser@gmail.com');
});

Then('o sistema não exibe nenhum usuário', function () {
    cy.contains('Ops! Não existe nenhum usuário para ser exibido.').should('be.visible')

});

Then('aparecerá a opção para cadastrar novo usuário', function () {
    cy.contains(listaUsuarios.linkNovoCadastro, 'Cadastre um novo usuário')
});


