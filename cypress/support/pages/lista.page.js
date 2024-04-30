export default class ListaPage {

    listaUsuarios = ".sc-fHjqPf dLIfot";
    inputPesquisa = "input[placeholder='E-mail ou nome']"
    linkNewUser = ".sc-bmzYkS dmSxaj";

    typeNome (nome) {
        cy.get(this.inputPesquisa).type(nome);
    }
    typeEmail (email) {
        cy.get(this.inputPesquisa).type(email);
    }

    clickButtonNew (){
        cy.get(this.linkNewUser).click
    }

    getListaUsuarios() {
        return cy.get(this.listaUsuarios);
    }

}