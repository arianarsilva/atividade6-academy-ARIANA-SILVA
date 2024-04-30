import { faker } from '@faker-js/faker';
import ListaPage from '../support/pages/lista.page';

describe('Pesquisar usuários', () => {
  const paginaLista = new ListaPage;
  const usuario = criaUsuario();

  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'));
  });

  it('Não devem ser apresentadas informações se nao houver usuário cadastrado', () => {
    paginaLista.typeinputPesquisa(faker.lorem.words(10));

    paginaLista.getOutputName().should('have.length', 0)
    paginaLista.getOutputEmail().should('have.length', 0)
  })

  it('Devem ser apresentadas todas as informações do cliente pesquisado', () => {
    cy.request(
      'POST',
      Cypress.env('apiBaseUrl') + '/users',
      usuario,
    );

    paginaLista.typeinputPesquisa(usuario.name);

    paginaLista.getOutputName().contains(usuario.name)
    paginaLista.getOutputName().should('have.length', 1)
    paginaLista.getOutputEmail().should('have.length', 1)
  });
});

function criaUsuario() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
  };
}