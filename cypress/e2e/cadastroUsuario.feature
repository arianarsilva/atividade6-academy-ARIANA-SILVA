# language: pt

Funcionalidade: Cadastro de Usuário

Cenário: Cadastro de usuário com sucesso
    Dado que acessei a funcionalidade de cadastro
    Quando informar um novo nome
    E informar um novo e-mail
    E confirmar a operação
    Então o usuário deverá ser cadastrado

    Cenário: Usuário não será exibido na lista
    Dado que acessei a funcionalidade de cadastro
    Quando informar um novo nome
    E informar um novo e-mail
    E confirmar a operação
    Então o usuário não será exibido na lista