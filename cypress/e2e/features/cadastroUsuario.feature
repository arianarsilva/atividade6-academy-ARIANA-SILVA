# language: pt

# Funcionalidade: Cadastro de Usuário

# Cenário: Cadastro de usuário com sucesso
#     Dado que acessei a funcionalidade de cadastro
#     Quando informar um novo nome e email
#     E confirmar a operação
#     Então o usuário deverá ser cadastrado

# Cenário: Não deve ser possível cadastrar um usuário apenas com o e-mail
#     Dado que acessei a funcionalidade de cadastro
#     Quando informar um novo e-mail
#     E tentar salvar o usuário
#     Então o usuário não será cadastrado


# Cenário: Não deve ser possível cadastrar um usuário apenas com o nome
#     Dado que acessei a funcionalidade de cadastro
#     Quando informar um novo nome
#     | nome | Ariana Rebeca Silva|
#     E tentar salvar o usuário
#     Então não será possível efetuar o cadastro

# Cenário: Não deve ser possível cadastrar um usuário com e-mail existente
#     Dado que acessei a funcionalidade de cadastro
#     Quando informar um nome
#     E informar um e-mail que já está cadastrado
#     E clicar em salvar
#     Então não será possível cadastrar usuário

Cenário: Não deve ser possível cadastrar um nome com mais de 100 caracteres
    Dado que acessei a funcionalidade de cadastro
    Quando informar um nome
    E informar um e-mail que já está cadastrado
    E clicar em salvar
    Então não será possível cadastrar usuário

Cenário: Não deve ser possível cadastrar um e-mail com mais de 60 caracteres
    Dado que acessei a funcionalidade de cadastro
    Quando informar um nome
    E informar um e-mail que já está cadastrado
    E clicar em salvar
    Então não será possível cadastrar usuário

Cenário: Não deve ser possível cadastrar um nome e email com menos de 4 caracteres
    Dado que acessei a funcionalidade de cadastro
    Quando informar um nome
    E informar um e-mail que já está cadastrado
    E clicar em salvar
    Então não será possível cadastrar usuário

