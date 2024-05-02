#language: pt

Funcionalidade: Lista de usuários

Cenário: Encontrar um usuário já cadastrado
    Dado existe um usuário cadastrado
    E que acessei a funcionalidade de listagens de usuários
    Quando verifico os usuários listados
    Então o usuário cadastrado deverá aparecer na lista