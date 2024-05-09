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


Before(() => {
    cy.request({
        method: "POST",
        url: Cypress.env("apiBaseUrl") + "/users",
        body: {
            name: faker.person.firstName() + ' Silva',
            email: faker.internet.email(),
        }
    }).then((response) => {
        cy.wrap(response.body.id).as('userId')

    })
})

Given('que acessei a página de detalhes de um usuário', function () {
    cy.get('@userId').then((userId) => {

        cy.visit(Cypress.env("baseUrl") + '/' + userId);
    })
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
});

Then('o email do usuário será atualizado', function () {
    cy.contains('Informações atualizadas com sucesso!').should('be.visible')
})

// nome em branco
When('apagar o campo com nome existente', function () {
    cy.get("#userName").clear();
    atualizarUsuario.clickButtonSalvar();
})
Then('o sistema exibirá um alerta', function () {
    cy.contains('O campo nome é obrigatório.').should('be.visible')
});

// email em branco
When('apagar o campo com email existente', function () {
    cy.get("#userEmail").clear();
    atualizarUsuario.clickButtonSalvar();
})

Then('o sistema exibirá o alerta para preencher o campo email', function () {
    cy.contains('O campo e-mail é obrigatório.').should('be.visible')
});
//

When('digitar um email que já está cadastrado', function () {
    const novoUsuario = {
        name: faker.person.firstName() + ' Santos',
        email: 'brutus@gmail.com',
    };
    cy.intercept("POST", "api/v1/users").as("postUsuario");
    cy.request({
        method: "POST",
        url: Cypress.env("apiBaseUrl") + "/users",
        body: novoUsuario,
        failOnStatusCode: false,
    });
    cy.get('#userEmail').clear();

    atualizarUsuario.typeInputNewEmail(novoUsuario.email);
});

When("tentar salvar o usuário para confirmar operação", function () {
    cy.get("@postUsuario").then(() => {
        atualizarUsuario.clickButtonSalvar();
    });
});

Then('o sistema exibirá o alerta para email existente', function () {
    cy.contains('Este e-mail já é utilizado por outro usuário.').should('be.visible')
    
});

//
When('digitar um nome com mais de 100 caracteres', function () {
cy.get('#userName').clear();
atualizarUsuario.typeInputNewName(faker.string.alpha(102));
atualizarUsuario.clickButtonSalvar();
});

Then('sistema exibirá uma mensagem de erro', function () {
    cy.contains('Informe no máximo 100 caracteres para o nome').should('be.visible');
});
//
When('digitar um email com mais de 60 caracteres', function () {
    atualizarUsuario.typeInputNewEmail(faker.string.alpha(61) + '@gmail.com')
    atualizarUsuario.clickButtonSalvar();
});

Then('o sistema exibirá uma mensagem de erro', function () {
    cy.contains('Informe no máximo 60 caracteres para o e-mail').should('be.visible')
});
