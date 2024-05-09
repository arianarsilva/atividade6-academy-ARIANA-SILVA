# language: pt

Funcionalidade: Atualizar Usuários

Contexto: O usuário deve estar cadastrado e deseja atualizar os dados
Dado que acessei a página de detalhes de um usuário

@criaUsuario
Cenário: Deve ser possível alterar o nome
Quando acessar à opção de editar cadastro
E digitar um novo nome válido
E confirmar a operação de edição
Então o nome do usuário será atualizado

@criaUsuario
Cenário: Deve ser possível alterar o email
Quando acessar à opção de editar cadastro
E digitar um novo email válido
E confirmar a operação de edição
Então o email do usuário será atualizado

@criaUsuario
Cenário: Não deve ser possível deixar o campo nome em branco
Quando acessar à opção de editar cadastro
E apagar o campo com nome existente
Então o sistema exibirá um alerta

@criaUsuario
Cenário: Não deve ser possível deixar o campo email em branco
Quando acessar à opção de editar cadastro
E apagar o campo com email existente
Então o sistema exibirá o alerta para preencher o campo email

@emailRepetido
Cenário: Não deve ser possível atualizar o e-mail de um usuário para um e-mail que já está em uso por outro usuário registrado.
Quando acessar à opção de editar cadastro
E digitar um email que já está cadastrado
E tentar salvar o usuário para confirmar operação
Então o sistema exibirá o alerta para email existente


Cenário: Não deve ser possível atualizar o nome para que tenha mais de 100 caracteres.
Quando acessar à opção de editar cadastro
E digitar um nome com mais de 100 caracteres
Então sistema exibirá uma mensagem de erro


Cenário: Não deve ser possível atualizar o email para que tenha mais de 60 caracteres.
Quando acessar à opção de editar cadastro
E digitar um email com mais de 60 caracteres
Então o sistema exibirá uma mensagem de erro


