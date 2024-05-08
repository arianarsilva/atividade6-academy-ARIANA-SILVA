import {
    Given,
    When,
    Then,
    Before,
} from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import ListaPage from "../pages/lista.page";
import AtualizarPage from "../pages/atualizar.page";

var listaUsuarios = new ListaPage();
var atualizarUsuario = new AtualizarPage();
const userCriado = {
    name: faker.person.firstName() + ' Silva',
    email: faker.internet.email(),
}
var userId;

Before(() => {
    cy.request({
        method: "POST",
        url: Cypress.env("apiBaseUrl") + "/users",
        body: userCriado
    }).then((response) => {
        userId = response.body.id;
    })
})

Given('que acessei a página de detalhes de um usuário', function () {
    cy.visit(Cypress.env("baseUrl") + '/' + userId);
})

When('acessar à opção de editar cadastro', function () {
    atualizarUsuario.clickButtonEditar();
})

When('digitar um novo nome válido', function () {
    cy.get("#userName").clear();
    atualizarUsuario.typeInputNewName(faker.person.firstName() + ' Sauro');
})

When('confirmar a operação de edição', function () {
    atualizarUsuario.clickButtonSalvar();
})

Then('o nome do usuário será atualizado', function () {
    cy.contains('Informações atualizadas com sucesso!').should('be.visible')
});

//
When('digitar um novo email válido', function () {

    cy.get("#userEmail").clear();
    atualizarUsuario.typeInputNewEmail(faker.internet.email());
})

//
When('apagar o campo com nome existente', function () {
    cy.get("#userName").clear();
    atualizarUsuario.clickButtonSalvar();
})
Then('o sistema exibirá um alerta', function () {
    cy.contains('O campo nome é obrigatório.').should('be.visible')
});

Then('digitar um email que já está cadastrado diferente do atual', function () {
    atualizarUsuario.typeInputNewName(userCriado.name);
    cy.get("#userEmail").clear();
    atualizarUsuario.typeInputNewEmail(userCriado.email);
    atualizarUsuario.clickButtonSalvar();
});
Then('o sistema exibirá o alerta para email existente', function () {

    cy.contains('Este e-mail já é utilizado por outro usuário.').should('be.visible')
});

// Cenário: Não deve ser possível atualizar o e-mail de um usuário para um e-mail que já está em uso por outro usuário registrado.
// E  digitar um email que já está cadastrado diferente do atual
// Então o sistema exibirá um alerta