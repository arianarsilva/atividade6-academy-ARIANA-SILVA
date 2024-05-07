            # language: pt

            Funcionalidade: Cadastro de Usuário

            Contexto: Usuário deve ter acessado o sistema
            Dado que acessei a funcionlidade de cadastro
            @ignore
            Cenário: Cadastro de usuário com sucesso
            Quando informar um novo nome e email
            E confirmar a operação
            Então o usuário deverá ser cadastrado
            @ignore
            Cenário: Não deve ser possível cadastrar um usuário apenas com o e-mail
            Quando informar um novo e-mail
            E tentar salvar o usuário
            Então o usuário não será cadastrado


            Cenário: Não deve ser possível cadastrar um usuário apenas com o nome
            Quando informar um novo nome para cadastro
            | nome | Ariana Rebeca Silva |
E confirmar a operação salvando o cadastro
Então não será possível efetuar o cadastro
@ignore
Cenário: Não deve ser possível cadastrar um usuário com e-mail existente
Quando informar um nome e e-mail que já está cadastrado
E tentar salvar o usuário para confirmar operação
Então não será possível cadastrar usuário
@ignore
Cenário: Não deve ser possível cadastrar um nome com mais de 100 caracteres
Quando informar um nome com mais de 100 caracteres
E informar um email válido
E confirmar a tentativa de cadastro
Então o cadastro não será completado
@ignore
Cenário: Não deve ser possível cadastrar um e-mail com mais de 60 caracteres
Quando informar um nome válido
E informar um email com mais de 60 caracteres
E validar a tentativa de cadastro
Então não será possível cadastrar email com 60 caracteres
@ignore
Cenário: Não deve ser possível cadastrar um nome e email com menos de 4 caracteres
Quando informar um nome com menos de 4 caracteres
E informar um email válido para o cadastro
E validar a operação
Então não será possível cadastrar usuário com menos de 4 caracteres no nome

