export default class CadastroPage {
    inputName = '#name';
    inputEmail = '#email';
    buttonSalvar = 'button[type="submit"]';
    linkVoltar = '[href="/users"]';
    linkNovoCadastro = '[href="/users/novo"]'

    typeNome(nome) {
        cy.get(this.inputName).type(nome);
    }

    typeEmail(email) {
        cy.get(this.inputEmail).type(email);
    }

    clickButtonSalvar() {
        cy.get(this.buttonSalvar).click();
    }

    clickLinkVoltar () {
        cy.get(this.linkVoltar).click();
    }

    criaUsuario(nome, email) {
        this.typeNome(nome);
        this.typeEmail(email);
        this.clickButtonSalvar();
    }
}