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

    async post(titulo, descricao, valor, idUser){
        return await models.Servico.create({
            titulo: titulo, 
            descricao: descricao, 
            valor: Number(valor), 
            empresa_id : idUser
        })
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
    
    if (['', null, undefined].includes(idUser)) {
        reply.status(400).send({error: 'Envie o ID do usuário para buscar os serviços'})
    }

    const instanceService = new Service(idUser)
    const data = await instanceService.findByPKUSer()

    reply.send(data)
}

const postService = async(request, reply) => {
    const {titulo, descricao, valor, idUser} = request.body

    const notEmptyData = titulo != "" && descricao != "" && valor != "" && idUser != ""

    if (notEmptyData) {
        const instance = new Service()
        const dataPost = await instance.post(titulo, descricao, valor, idUser)
        console.log(dataPost.sql)

        reply.send(dataPost)
    }
}

module.exports ={
    getService,
    getServiceById,
    postService
}