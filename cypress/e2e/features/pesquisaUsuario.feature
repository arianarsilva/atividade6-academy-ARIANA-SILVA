# language: pt

Funcionalidade: Pesquisa de Usuários

Contexto: O usuário deve ter acessado a funcionalidade de pesquisa de usuários
    Dado que acessei a funcionalidade de pesquisa de usuários

@cadastroUsuario
Cenário: Devem ser apresentadas todas as informações do usuário pesquisado buscando o e-mail
    Quando informo um e-mail cadastrado
    Então o sistema exibe as informações do usuário cadastrado

Cenário: Não devem ser apresentadas informações se nao houver usuário cadastrado
    Quando informo e-mail não cadastrado
    Então o sistema não exibe nenhum usuário
    E aparecerá a opção para cadastrar novo usuário

Cenário: Não devem ser apresentadas informações se nao houver usuário cadastrado
    Quando informo e-mail não cadastrado
    Então o sistema não exibe nenhum usuário
    E aparecerá a opção para cadastrar novo usuário
