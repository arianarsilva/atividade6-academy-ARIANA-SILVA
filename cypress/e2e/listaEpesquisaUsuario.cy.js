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
    const novoUsuario = {
      name: nome,
      email: email
    }

    cy.intercept('GET', '**/api/v1/users', {
      statusCode: 200,
      body: [
        {
          "id": "9a8a973f-7473-486f-997f-51258e09ac01",
          "name": "Blanca Ratke",
          "email": "sabryna.green82@hotmail.com",
          "createdAt": "2024-04-29T19:55:37.632Z",
          "updatedAt": "2024-04-29T19:55:37.632Z"
        },
        {
          "id": "97319d5b-f019-4557-84b2-1ef4a79b4b5e",
          "name": "Howard Franey",
          "email": "golda.schinner@gmail.com",
          "createdAt": "2024-04-29T19:55:38.265Z",
          "updatedAt": "2024-04-29T19:55:38.265Z"
        },
        {
          "id": "09459776-f270-4185-8679-5d48083cd092",
          "name": "Dr. Alfredo Abernathy",
          "email": "hellen.funk@yahoo.com",
          "createdAt": "2024-04-29T19:57:55.069Z",
          "updatedAt": "2024-04-29T19:57:55.069Z"
        },],
    }).as('getUser')

    //paginaLista.typeNome(nome);

    cy.request({
      method: 'GET',
      url: 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users',
      //body: novoUsuario
    });

    cy.wait('@getUser')
    cy.contains("Blanca Ratke");
  })

  it('Deve ter opção de cadastrar usuário, caso não exista usuário cadastrado', () => {

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