export default class AtualizarPage {

    inputNewName = "#userName";
    inputNewEmail = "#userEmail";

    buttonEditar = "button[type='button']";
    buttonCancelar = "button.sc-kpDqfm cEXnaz";
    buttonSalvar = "button[type='submit']";

    clickButtonEditar() {
        cy.get(this.buttonEditar).click();

        
    }
    clickButtonSalvar() {
        cy.get(this.buttonSalvar).click();
    }
    typeInputNewName(name) {
        cy.get(this.inputNewName).type(name);
    }

    typeInputNewEmail(email) {
        cy.get(this.inputNewEmail).type(email);
    }
}