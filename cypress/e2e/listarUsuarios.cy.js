import ListaPage from '../support/pages/lista.page';

describe('Listar Usuarios', () => {
    var paginaLista = new ListaPage;

    it('Deve ser possível receber todas as informações dos usuários cadastrados após consulta', () => {
        cy.intercept('GET', '**/api/v1/users', {
            statusCode: 200,
            fixture: 'listaUser.json'
        }).as('getUser')

        cy.visit(Cypress.env('baseUrl'));
        
        cy.wait('@getUser')
        paginaLista.getOutputName().contains("Blanca Ratke")
        paginaLista.getOutputEmail().contains("sabryna.green82@")
        paginaLista.getOutputName().contains("Howard Franey")
        paginaLista.getOutputEmail().contains("golda.schinner@")
        paginaLista.getOutputName().contains("Dr. Alfredo Abernathy")
        paginaLista.getOutputEmail().contains("hellen.funk@")
    })

    it('Deve ter opção de cadastrar usuário, caso não exista usuário cadastrado', () => {
        cy.intercept('GET', '**/api/v1/users', {
            statusCode: 200,
            body: []
        }).as('getUser')

        cy.visit(Cypress.env('baseUrl'));
        
        cy.contains('Ops! Não existe nenhum usuário para ser exibido.');
        paginaLista.getCadastrarUsuarioButton().should('be.visible')
        paginaLista.getCadastrarUsuarioButton().contains('Cadastre um novo usuário')
    })
})