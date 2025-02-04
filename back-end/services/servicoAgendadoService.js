const models = require("./../models")

class ScheduledService{
    constructor(companyId=""){
        this.companyId = companyId
    }

    get = async () => await models.ServicoAgendado.findAll()
    
    getCompanyServices = async () => await models.ServicoAgendado.findAll({
        where : {
            empresa_id : this.companyId
        }
    })

    post = async agendamento => {
        const {data, client_id, servico_id, empresa_id} = agendamento

        return await models.ServicoAgendado.create({
            data        : data,
            client_id   : client_id,
            servico_id  : servico_id,
            empresa_id  : empresa_id
        })
    }

    remove = async id => await models.ServicoAgendado.destroy({
        where : {
            id : id
        }
    })

    update = async (agendamento, id) => {
        const {data, client_id, servico_id, empresa_id} = agendamento

        return await models.ServicoAgendado.update({
            data        : data,
            client_id   : client_id,
            servico_id  : servico_id,
            empresa_id  : empresa_id
        },{
            where : {
                id : id
            }
        })
    }
}

const getAllScheduledServices = async (request, reply) => {
    const instance = ScheduledService()

    reply.send(await instance.get())
}

const getScheduledServicesByCompany = async (request, reply) =>{
    const {companyId} = request.query
    const instance = ScheduledService(companyId)

    reply.send(await instance.getCompanyServices())
}

const postScheduledService = async (request, reply) => {
    const {scheduling} = request.body

    const valuesOfSchedulingEmpty = Object.values(scheduling)

    const empty = valuesOfSchedulingEmpty.includes("") || valuesOfSchedulingEmpty.includes(null)

    if (empty) {
        reply.code(400).send({success : false, message: "Preencha todos os dados da API"})
        return 
    }

    const instance = ScheduledService()

    reply.send(await instance.post(scheduling))
}

const removeScheduledService = async (request, reply) =>{
    const {id} = request.query

    const empty = ['', null, undefined].includes(id)

    if (empty) {
        reply
    }
}