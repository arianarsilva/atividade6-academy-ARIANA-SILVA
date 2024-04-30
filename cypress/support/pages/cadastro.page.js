export default class CadastroPage {
    inputName = '#name';
    inputEmail = '#email';
    buttonSalvar = 'button[type="submit"]';
    linkVoltar = '[href="/users"]';
    linkNovoCadastro = '[href="/users/novo"]'

    linkNomeEmail = ".sc-gsFSXq mUpIH"

    listaUsuarios = '#listaUsuarios';

    typeNome(nome) {
        cy.get(this.inputName).type(nome);
    }

    typeEmail(email) {
        cy.get(this.inputEmail).type(email);
    }

    clickButtonSalvar() {
        cy.get(this.buttonSalvar).click();
    }

    // getListaUsuarios() {
    //     return cy.get(this.listaUsuarios);
    // }

    clickLinkVoltar () {
        cy.get(this.linkVoltar).click();
    }

    cadastrar(nome, email) {
        this.typeNome(nome);
        this.typeEmail(email);
        this.clickButtonSalvar();
    }

    typeSearchUsuario() {
        cy.get(this.linkNomeEmail);
    }
}