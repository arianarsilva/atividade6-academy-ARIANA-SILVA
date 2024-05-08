# language: pt

Funcionalidade: Atualizar Usuários

Contexto: O usuário deve estar cadastrado e deseja atualizar os dados
    Dado que acessei a página de detalhes de um usuário
    Quando acessar à opção de editar cadastro

Cenário: Deve ser possível alterar o nome
    E digitar um novo nome válido
    E confirmar a operação de edição
    Então o nome do usuário será atualizado

Cenário: Deve ser possível alterar o email
    E digitar um novo email válido
    E confirmar a operação de edição
    Então o nome do usuário será atualizado

Cenário: Não deve ser possível deixar o campo nome em branco
    E apagar o campo com nome existente
    Então o sistema exibirá um alerta

Cenário: Não deve ser possível deixar o campo email em branco
    E apagar o campo com email existente existente
    Então o sistema exibirá um alerta

Cenário: Não deve ser possível atualizar o e-mail de um usuário para um e-mail que já está em uso por outro usuário registrado.
    E  digitar um email que já está cadastrado diferente do atual
    Então o sistema exibirá o alerta para email existente


Cenário: Não deve ser possível atualizar o nome para que tenha mais de 100 caracteres.
    E  digitar um nome com mais de 100 caracteres
    Então sistema exibirá uma mensagem de erro


Cenário: Não deve ser possível atualizar o nome para que tenha mais de 100 caracteres.
    E  digitar um email com mais de 60 caracteres
    Então sistema exibirá uma mensagem de erro
    E não permitirá que o usuário seja atualizado


