const { where } = require("sequelize")
const models = require("./../models")

class Service {
    constructor(userPKId=""){
        this.userPKId = userPKId
    }

    async get(){
      return await models.Servico.findAll()
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

module.exports ={
    getService,
}