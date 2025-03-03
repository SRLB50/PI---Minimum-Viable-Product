import { url } from "./configs/config.json"

type BodyServices  = {
    titulo     : string
    descricao  : string
    valor      : number
    idUser     : string
}

class RegisterServices {

    
    body : BodyServices
    constructor(body: BodyServices) {
        this.body = body
    }

    #getBasicAuth() {
        return btoa(``)
    }

    #getRequest() {
        let header = new Headers();
        // const auth = this.#getBasicAuth()
        // header.append("Authorization", `Basic ${auth}`);
        header.append("Content-Type", "application/json")

        const body = JSON.stringify(this.body);
        const requestOptions = {
            method: 'POST',
            headers: header,
            body: body
        };
        return requestOptions
    }
    async execute() {
        try {
            const requestOptions = this.#getRequest();

            const response = await fetch(`${url}/services/create`, requestOptions);

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }

            const result = await response.json();
            const data = {
                success: true,
                ...result
            };

            console.log(data)
            return data;
        } catch (error) {
            console.error("Erro na execução:", error);
            return {
                success: false,
                error: error
            };
        }
    }
}

class GetRegister{
    
    pkUser:string
    
    constructor(pkUser:string){
        this.pkUser = pkUser
    }
    // #getBasicAuth() {
    //     return btoa(`${user}:${password}`)
    // }

    #getRequest() {
        let header = new Headers();
        // const auth = this.#getBasicAuth()
        // header.append("Authorization", `Basic ${auth}`);
        header.append("Content-Type", "application/json")

        const requestOptions = {
            method: 'GET',
            headers: header
        };
        return requestOptions
    }
    async execute() {
        try {
            const requestOptions = this.#getRequest()
            const data = await fetch(this.pkUser ? `${url}/services?idUser=${this.pkUser}` : `${url}/services`, requestOptions)
                .then(response => response.json())
                .then(result => result)
                .catch(error => error);


            return data
        } catch (error) {
            alert(error)
        }
    }
}

export default {
    RegisterServices, 
    GetRegister
}