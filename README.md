<p align="center">
  <img src=./src/assets/images/dark-logo.svg/>
</p>

# Sobre o projeto

Letmeask é um projeto desenvolvido durante NLW - Next Level Week #6 da RocketSeat. Se trata de uma plataforma para criar salas de perguntas e respostas para ser usada em lives.

# Tecnologias usadas :computer:

- React
- TypeScript
- SASS
- Firebase

# Como executar o projeto :rocket:
```bash
  # Clone esse respositório
  $ git clone https://github.com/wander-junior/letmeask.git
  $ cd letmeask
  
  # Instale as dependências
  $ yarn
  
  # Execute a aplicação
  $ yarn start
  
  # A aplicação estará disponível através do seu browser no localhost:3000
```

# Milha extra :new_moon:

Um desafio proposto pela RocketSeat é de implementar novas funcionalidades à aplicação, para praticar os conceitos estudados durante a semana. As novas funcionalidades desenvolvidas foram:

- ## Responsividade

Todas as telas da aplicação estão responsivas para desktop, tablet e smartphones.

- ## Dark theme 

Foi adicionada a funcionalidade de troca de temas (claro e escuro). Além disso, o tema escolhido pelo o usuário fica salvo no navegador, usando o localStorage.

- ## Autenticação por Facebook

Foi adicionada a possibilidade de criar uma nova sala usando o facebook, com autenticação feita pelo Firebase.

- ## Notificações (toast)

Foi adicionado um sistema de notificações, usando o pacote react-notifications, para notificar o usuário de sucessos, avisos e erros.

- ## Modais

Foram adicionados modais para remover perguntas e para encerrar sala.

- ## Ordenação de perguntas

As perguntas são ordenadas por número de curtidas, ajudando a destacar as perguntas mais relevantes. Para a animação de quando uma pergunta troca de posição, foi usado o pacote react-flip-move.

<br/><br/><br/>

<p align="center">Feito por Wander Júnior Cruz</p>
