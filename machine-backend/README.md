# Machine System Backend
Aplicação Fullstack para gerenciamento de `máquinas industriais`.

Este repositório corresponde ao back-end da aplicação, responsável por toda a lógica de negócios e API. 
# Tecnologias utilizadas
- Node.js + Express + Zod (validação)
- TypeScript
- PostgreSQL + Prisma ORM
- Git + GitHub
- Padrões de projeto: Clean Code, SOLID, MVC
  
#### Endpoints:

#### GET:
````doc
http://localhost:3333/machine
````
#### POST:
````doc
http://localhost:3333/machine
````
#### PUT:
````doc
http://localhost:3333/machine/:id
````
#### DELETE:
````doc
http://localhost:3333/machine/:id
````
#### Como rodar o projeto localmente
- clone o repositorio
 ````doc
git clone https://github.com/SEU_USUARIO/machine-system-backend.git
cd machine-system-backend
````
#### Instale as dependências:
````doc
npm install
````
#### Configure as variáveis de ambiente:
Crie um arquivo .env com as configs do banco:
````doc
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
````
#### Rode o Migration:
````doc
npx prisma migrate dev
````
#### Inicie o servidor:
````doc
npm run dev
````
# Autores
Desenvolvedor backend -  `@ManoelaBDEV` responsavel por toda a lógica e fluxo do CRUD.

Desenvolvedor frontend - `@KauanPaulinoAT` responsavel por criar o layout e consumir API.