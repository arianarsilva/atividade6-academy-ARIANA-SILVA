export default class ListaPage {

    inputPesquisa = "input[placeholder='E-mail ou nome']"
    outputName = "[data-test=userDataName]";
    outputEmail = "[data-test=userDataEmail]";
    linkNovoCadastro = '[href="/users/novo"]';

    linkPaginacaoAtual = '#paginacaoAtual';
    buttonVoltarPagina = '#paginacaoVoltar';
    buttonProximaPagina = '#paginacaoProximo';

    buttonDelete = "[data-test='userDataDelete']";

    typeinputPesquisa (input) {
        cy.get(this.inputPesquisa).type(input);
    }

    getOutputName() {
        return cy.get(this.outputName);
    }

    getOutputEmail() {
        return cy.get(this.outputEmail);
    }

    getCadastrarUsuarioButton() {
        return cy.get(this.linkNovoCadastro);
    }

    getButtonDelete() {
        return cy.get(this.buttonDelete);
    }
}