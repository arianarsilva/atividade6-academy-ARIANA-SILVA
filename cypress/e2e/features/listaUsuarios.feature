# language: pt

Funcionalidade: Lista de usuários

Contexto: O usuário deve ter acessado a funcionalidade de listagens de usuários
    Dado que acessei a página de listagens de usuários

@cadastroUsuario
Cenário: Deve ser possível encontrar um usuário já cadastrado
    Quando informo um e-mail válido já cadastrado
    Então o usuário cadastrado deverá aparecer na lista

Cenário: Deve existir uma opção para cadastrar usuário quando não existirem usuários cadastrados
    Quando informo o email de um usuário não cadastrado
    Então o usuário não aparecerá na lista
    E aparecerá a opção para cadastrar novo usuário

Cenário: Deve exibir paginação se existir mais de 6 usuários cadastrados
    Então o sistema deve exibir a lista dos primeiros 6 usuários
    E o sistema deve permitir controles de paginação para acessar os usuários restantes
    
Cenário: Não deve ser possível a navegação entre as páginas caso haja menos de 6 usuários
    Então o sistema deve exibir a página da lista de usuários
    E o sistema não deve permitir a navegação entre a paginação

