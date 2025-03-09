import { url } from "./configs/config.json"


class GetScheduledServices {


    pkCompany:string | null
    constructor(pkCompany : string | null) {
        this.pkCompany = pkCompany
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
            const requestOptions = this.#getRequest();

            const response = await fetch(`${url}/scheduledServices?companyId=${this.pkCompany}`, requestOptions);

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }

            const result = await response.json();
            const data = {
                success: true,
                dataResult : result
            };
            console.log(data)
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

export default {
    GetScheduledServices
}