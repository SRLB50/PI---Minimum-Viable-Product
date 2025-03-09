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

    #getRequest() {
        let header = new Headers();
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

    #getRequest() {
        let header = new Headers();
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
            const data = await fetch(this.pkUser ? `${url}/services/user?idUser=${this.pkUser}` : `${url}/services`, requestOptions)
                .then(response => response.json())
                .then(result => result)
                .catch(error => error);


            return data
        } catch (error) {
            alert(error)
        }
    }
}

class GetAllServices{
    constructor(){}

    #getRequest() {
        let header = new Headers();
        header.append("Content-Type", "application/json")

        const requestOptions = {
            method: 'GET',
            headers: header
        };

        return requestOptions
    }
    async execute() {
        try {
            const requestOptions = this.#getRequest();

            const response = await fetch(`${url}/services`, requestOptions);

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }

            const result = await response.json();
            //console.log(result)
            const data = {
                success: true,
                dataResult : result
            };

            return data;
        } catch (error) {
            console.error("Erro na execução:", error);
            return {
                success: false,
                error: error,
                dataResult : null
            };
        }
    }
}

class UpdateService{
    
    body : BodyServices
    id : number | undefined

    constructor(body: BodyServices, id: number) {
        this.body = body
        this.id = id
    }

    #getRequest() {
        let header = new Headers();
        header.append("Content-Type", "application/json")

        const requestOptions = {
            method: 'PUT',
            headers: header,
            body: JSON.stringify({
                "titulo" : this.body.titulo,
                "descricao": this.body.descricao,
                "valor": this.body.valor
            })
        };

        return requestOptions
    }
    async execute() {
        try {
            const requestOptions = this.#getRequest();

            const response = await fetch(`${url}/services/update?idService=${this.id}&idUser=${this.body.idUser}`, requestOptions);

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }

            const result = await response.json();
            const data = {
                success: true,
                ...result
            };

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

class RemoveService{
    
    id : number
    idUser : string
    constructor(id:number, idUser: string){
        this.id = id
        this.idUser = idUser
    }

    #getRequest() {
        let header = new Headers();
        header.append("Content-Type", "application/json")

        const requestOptions = {
            method: 'DELETE',
            headers: header
        };

        return requestOptions
    }
    async execute() {
        try {
            const requestOptions = this.#getRequest();

            const response = await fetch(`${url}/services/remove?idService=${this.id}&idEmpresa=${this.idUser}`, requestOptions);

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }

            const result = await response.json();
            const data = {
                success: true,
                ...result
            };

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

export default {
    RegisterServices, 
    GetRegister,
    UpdateService,
    RemoveService,
    GetAllServices
}