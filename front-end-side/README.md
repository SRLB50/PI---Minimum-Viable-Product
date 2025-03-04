# Instruções para Rodar o Front-End do Projeto

## Passo 1: Configurar o Ambiente

1. Após rodar o back-end, crie um arquivo `.env` na raiz do front-end.
2. Dentro deste arquivo, coloque a URL gerada pelo ngrok. Escreva no arquivo da seguinte maneira:

    ```env
    API_URL=*sua url aqui*
    ```

## Passo 2: Rodar o Front-End

1. Dentro da pasta `front-end-side`, abra o terminal.
2. No terminal, digite os seguintes comandos:

    ```sh
    npm install
    ```

    Pressione `Enter` e espere terminar a execução.

    ```sh
    npm run prestart
    ```

    Pressione `Enter` e espere terminar a execução.

    ```sh
    npm start
    ```

    Pressione `Enter` e espere terminar a execução. Após, escaneie o QR Code gerado com o aplicativo Expo Go em seu celular.
