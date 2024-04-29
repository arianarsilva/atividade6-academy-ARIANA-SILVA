import { faker } from '@faker-js/faker';
import CadastroPage from '../support/pages/cadastro.page';
import ListaPage  from '../support/pages/lista.page';

describe('Teste frontEnd', () => {
  describe('Cadastro de usuários', () => {
    var paginaCadastro = new CadastroPage;
    const usuario = criaUsuario();
    const nome = usuario.name;
    const email = usuario.email;
    beforeEach(() => {
      cy.visit(Cypress.env('baseUrl') + '/novo');
    });

    it('Deve existir um link para a página de Criar novo de Usuário', () => {
      cy.visit(Cypress.env('baseUrl'))
      cy.contains(paginaCadastro.linkNovoCadastro, 'Novo').should('be.visible');
    });

    it('Não deve ser possível cadastrar usuário com e-mail existente', () => {
      const novoUsuario = {
        name: 'New User name',
        email: 'new@email.com'
      };

      cy.request({
        method: 'POST',
        url: Cypress.env('apiBaseUrl') + '/users',
        body: novoUsuario,
        failOnStatusCode: false
      })

      cy.intercept('POST', '/api/v1/users').as('postUsuario');

      paginaCadastro.criaUsuario(novoUsuario.name, novoUsuario.email);

      cy.wait('@postUsuario').then(() => {
        cy.wait(1000);
        cy.contains('Este e-mail já é utilizado por outro usuário.')

      });

    });

    it('Não deve ser possível cadastrar um usuário sem informar o nome', () => {
      paginaCadastro.typeEmail(email);
      paginaCadastro.clickButtonSalvar();

      cy.contains('O campo nome é obrigatório.').should('be.visible');
    });

    it('Não deve ser possível cadastrar um usuário sem o campo e-mail', () => {
      paginaCadastro.typeNome('Marilia Silva');
      paginaCadastro.clickButtonSalvar();

      cy.contains('O campo e-mail é obrigatório.')
    })

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

  describe('Lista de usuários', () => {
    var paginaLista = new ListaPage;

    beforeEach(() =>{
      cy.visit(Cypress.env('baseUrl'));
    });
    it('Deve ser possível receber todas as informações dos usuários cadastrados após consulta', () => {

    })
    it('Deve ter opção de cadastrar usuário, caso não exista usuário cadastrado', () => {

    })
  });

  describe('Pesquisa de usuários', () => {
    it('Deve ser possível pesquisar um texto para realizar a pesquisa de usuário', () => {

    })
    it('Não deve aparecer usuário cadastrado ao fornecer nome incorreto', () => {
      
    })

    it('Não deve aparecer usuário cadastrado ao fornecer e-mail incorreto', () => {

    })
    it('Devem ser apresentadas todas as informações do cliente pesquisado', () => {

    })

  });
});

function criaUsuario() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
  };
}