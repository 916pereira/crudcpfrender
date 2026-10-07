# CRUD com busca por CPF
Node.js + Express + JSON Server 0.17.4. Banco local: db.json.

## Executar
npm install
node server.js
Abra http://localhost:3000.

## Páginas e JavaScript
- public/post/index.html e post.js: POST
- public/get/index.html e get.js: GET e busca por CPF
- public/put/index.html e put.js: PUT com busca por CPF
- public/delete/index.html e delete.js: DELETE com confirmação
Todas possuem navegação. A lista oferece links para editar/excluir o registro.

## Render
Publique os arquivos na raiz do repositório GitHub (package.json e server.js na raiz).
Crie um Web Service conectado ao repositório.
Language: Node
Build Command: npm install
Start Command: node server.js
Root Directory: deixe vazio
Plano: Free
O servidor usa process.env.PORT e host 0.0.0.0.
O Dockerfile é opcional. Selecione Node para usar os comandos acima.

## Testar
CPF fictício inicial: 12345678900. Cadastre outro CPF com 11 dígitos, liste, altere e exclua.
Todos os campos da atividade estão presentes, além de CPF e ID.

## Limitação da hospedagem
O arquivo db.json é alterado pelo JSON Server. No Render sem disco persistente,
as alterações podem ser perdidas quando o serviço reiniciar ou for publicado novamente.
Os dados iniciais do repositório serão restaurados. Use somente dados fictícios.
