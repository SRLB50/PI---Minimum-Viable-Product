
# Instruções para Rodar o Projeto

Para rodar o projeto, siga as seguintes instruções:

No CMD, dentro da pasta `back-end`, rode:

```sh
npm install     /* - para instalar as dependências */
criar no postgreSQL uma base da dados chamada 'database_development' /* - para rodar o projeto back-end */
crie uma conta gratuita no https://ngrok.com/ e copie seu token
no arquivo package.json dentro da pasta back-end, altere o token existente para o SEU token ---  "setup:ngrok": "ngrok config add-authtoken SEU-TOKEN-AQUI"
rode o comando 'npm run setup:ngrok' uma única vez
rode 'npm run dev' /* - para rodar o projeto back-end */
