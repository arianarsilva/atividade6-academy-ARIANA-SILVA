import { faker } from '@faker-js/faker';
import CadastroPage from '../support/pages/cadastro.page';
import ListaPage from '../support/pages/lista.page';

describe('Lista de usuários', () => {
  var paginaCadastro = new CadastroPage;
  var paginaLista = new ListaPage;

  const usuario = criaUsuario();
  const nome = usuario.name;
  const email = usuario.email;
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'));
  });

  it.only('Deve ser possível receber todas as informações dos usuários cadastrados após consulta', () => {

    cy.intercept('GET', '**/api/v1/users', {
      statusCode: 200,
      fixture: 'listaUser.json'
    }).as('getUser')


    cy.request({
      method: 'GET',
      url: 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users',
    });

    cy.wait('@getUser')
    cy.contains("Blanca Ratke").should('be.visible');

  })

  it('Deve ter opção de cadastrar usuário, caso não exista usuário cadastrado', () => {

    cy.intercept('GET', '**/api/v1/users', {
      statusCode: 200,
      fixture: 'listaUser.json'
    }).as('getUser')
    
    paginaLista.typeNome('Unknown Name');

  })


  describe('Pesquisa de usuários', () => {
    it('Deve ser possível pesquisar um texto para realizar a pesquisa de usuário', () => {

    })
    it('Não deve aparecer usuário cadastrado ao fornecer nome incorreto', () => {

    })

    it('Não deve aparecer usuário cadastrado ao fornecer e-mail incorreto', () => {

    })
    it('Devem ser apresentadas todas as informações do cliente pesquisado', () => {

      cy.intercept({
        method: 'POST',
        url: Cypress.env('apiBaseUrl') + '/users',
        body: {
          name: nome,
          email: email,
        },
      }).as('postUser');
      cy.intercept('POST', '/api/v1/users').as('postUsuario');


      paginaLista.typeNome(nome);

      // cy.wait('@postUser');
      // cy.contains(paginaLista.listaUsuarios, email);

    });
  })

});

function criaUsuario() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
  };
}