export default class ListaPage {

    listaUsuarios = ".listaUsuarios";
    inputPesquisa = "placeholder = [E-mail ou nome]"
    linkNewUser = '.sc-bmzYkS dmSxaj'

    typeNome (nome) {
        cy.get(this.inputPesquisa).type(nome);
    }
    typeEmail (email) {
        cy.get(this.inputpesquisa).type(email);
    }

    clickButtonNew (){
        cy.get(this.linkNewUser).click
    }
}