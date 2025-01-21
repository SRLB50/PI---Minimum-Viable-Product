const models = require("./../models")

class Service {
    constructor(userPKId=""){
        this.userPKId = userPKId
    }

    async get(){
      return await models.Servico.findAll()
    }

    async findByPKUSer(){
        return await models.Servico.findAll({
            where:  {
                empresa_id: this.userPKId
            }
        })
    }

    async post(){

    }

    async remove(){

    }

    update(){
        
    }
}

const getService = async (request, reply) => {
    const instanceService = new Service()
    const data = await instanceService.get()

    reply.send(data)
}

const getServiceById = async (request, reply) => {
    
    const {idUser} = request.query
    console.log("PARAMETROS")
    console.log(request.query)
    console.log(request)
    if (['', null, undefined].includes(idUser)) {
        reply.status(400).send({error: 'Envie o ID do usuário para buscar os serviços'})
    }

    const instanceService = new Service(idUser)
    const data = await instanceService.findByPKUSer()

    reply.send(data)
}

module.exports ={
    getService,
    getServiceById
}