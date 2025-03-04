
# Instruções para Rodar o Back-end do Projeto

Para rodar o projeto, siga as seguintes instruções:

1. No terminal, dentro da pasta `back-end`, rode:

    ```sh
    npm install
    ```

    Isso irá instalar as dependências do projeto.

2. Crie uma base de dados no PostgreSQL chamada `database_development`.

3. Crie uma conta gratuita no [ngrok](https://ngrok.com/) e copie seu token.

4. No arquivo `package.json` dentro da pasta `back-end`, altere o token existente para o seu token:

    ```json
    
    "setup:ngrok": "ngrok config add-authtoken SEU-TOKEN-AQUI"
    ```

5. Rode o comando:

    ```sh
    npm run setup:ngrok
    ```

    Esse comando deve ser executado apenas uma vez.

6. Rode o comando:

    ```sh
    npm run startngrok
    ```

    Espere a execução e copie a URL gerada no campo "Forwarding". Você precisará dela para rodar o front-end.

7. Finalmente, rode o comando:

    ```sh
    npm run dev
    ```

    Isso irá iniciar o back-end do projeto.
