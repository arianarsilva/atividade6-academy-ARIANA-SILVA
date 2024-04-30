import { faker } from '@faker-js/faker';
import CadastroPage from '../support/pages/cadastro.page';
import ListaPage from '../support/pages/lista.page';

describe('Teste frontEnd', () => {
  describe('Cadastro de usuários', () => {
    var paginaCadastro = new CadastroPage;
    var paginaListaUsuario = new ListaPage;

    const usuario = criaUsuario();
    const nome = usuario.name;
    const email = usuario.email;
    beforeEach(() => {
      cy.visit(Cypress.env('baseUrl') + '/novo');
    });

    it('Deve ser possível criar novo usuário com nome e email válidos', () => {
      paginaCadastro.cadastrar(nome, email);
      cy.contains('Usuário salvo com sucesso!');

    });

    it('Deve existir um link para a página de Criar novo de Usuário', () => {
      cy.visit(Cypress.env('baseUrl'))
      cy.contains(paginaCadastro.linkNovoCadastro, 'Novo').should('be.visible');
    });

    it('Não deve ser possível cadastrar usuário com e-mail existente', () => {
      const novoUsuario = {
        name: 'New Username',
        email: 'new@email.com'
      };

      cy.request({
        method: 'POST',
        url: Cypress.env('apiBaseUrl') + '/users',
        body: novoUsuario,
        failOnStatusCode: false
      })

      cy.intercept('POST', '/api/v1/users').as('postUsuario');

      paginaCadastro.cadastrar(novoUsuario.name, novoUsuario.email);

      cy.wait('@postUsuario').then(() => {
        cy.wait(1000);
        cy.contains('Este e-mail já é utilizado por outro usuário.')

      });

    });

    it.only('Não deve ser possível cadastrar um usuário sem informar o nome', () => {
      // Arrange
      cy.intercept('POST', '**/api/v1/users', cy.spy().as('postUsuario'));

      // Act
      paginaCadastro.typeEmail(email);
      paginaCadastro.clickButtonSalvar();

      // Assert
      cy.contains('O campo nome é obrigatório.').should('be.visible');
      cy.get('@postUsuario').should('not.have.been.called')

  });

  it('Não deve ser possível cadastrar um usuário sem o campo e-mail', () => {
  
    cy.intercept('POST', '**/api/v1/users', cy.spy().as('postUsuario'));

    paginaCadastro.typeNome(nome);
    paginaCadastro.clickButtonSalvar();

    cy.contains('O campo e-mail é obrigatório.');
    cy.get('@postUsuario').should('not.have.been.called');
  });

  it('Não deve ser possível cadastrar um usuário sem o @ no email', () => {
    paginaCadastro.typeNome(nome);
    paginaCadastro.typeEmail('emailsemarroba.com');
    paginaCadastro.clickButtonSalvar();
    cy.contains('Formato de e-mail inválido').should('be.visible');
  })

  it('Não deve ser possível cadastrar um nome com mais de 100 caracteres', () => {
    cy.fixture('/stringAleatoria.json').then((caracteres) => {
      const nomeInvalido = nome + caracteres.name;
      paginaCadastro.typeNome(nomeInvalido);

      paginaCadastro.typeEmail(email);
      paginaCadastro.clickButtonSalvar();

      cy.contains('Informe no máximo 100 caracteres para o nome').should('be.visible')
    });
  })

  it('Não deve ser possível cadastrar um e-mail com mais de 60 caracteres', () => {
    cy.fixture('/stringAleatoria.json').then((caracteres) => {
      const emailInvalido = caracteres.email + email;
      paginaCadastro.typeNome(nome);

      paginaCadastro.typeEmail(emailInvalido);
      paginaCadastro.clickButtonSalvar();

      cy.contains('Informe no máximo 60 caracteres para o e-mail').should('be.visible')
    })
  });
});


});

function criaUsuario() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
  };
}