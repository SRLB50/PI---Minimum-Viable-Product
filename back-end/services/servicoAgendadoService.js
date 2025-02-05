const models = require("./../models")

class ScheduledService {
    constructor(companyId = "") {
        this.companyId = companyId
    }

    get = async () => await models.ServicoAgendado.findAll({
        attributes: ['id', 'data', 'cliente_id', 'servico_id', 'empresa_id'], // Campos da tabela principal
        include: [
            {
                model: models.Cliente,
                as: 'cliente', 
                attributes : ["nome", "cpf", "email"],
                required: true
            },
            {
                model: models.Servico,
                as: 'servico', 
                attributes : ["titulo", "valor"],
                required: true
            },
        ]
    })

    getCompanyServices = async () => await models.ServicoAgendado.findAll({
        attributes: ['id', 'data', 'cliente_id', 'servico_id', 'empresa_id'], // Campos da tabela principal
        include: [
            {
                model: models.Cliente,
                as: 'cliente', 
                attributes : ["nome", "cpf", "email"],
                required: true
            },
            {
                model: models.Servico,
                as: 'servico', 
                attributes : ["titulo", "valor"],
                required: true
            },
        ],
        where: {
            empresa_id: this.companyId
        }
    })

    post = async agendamento => {
        const { data, client_id, servico_id, empresa_id } = agendamento

        return await models.ServicoAgendado.create({
            data: data,
            cliente_id: client_id,
            servico_id: servico_id,
            empresa_id: empresa_id
        })
    }

    remove = async id => await models.ServicoAgendado.destroy({
        where: {
            id: id
        }
    })

    update = async (agendamento, id) => {
        const { data, client_id, servico_id, empresa_id } = agendamento

        return await models.ServicoAgendado.update({
            data: data,
            client_id: client_id,
            servico_id: servico_id,
            empresa_id: empresa_id
        }, {
            where: {
                id: id
            }
        })
    }
}

const getAllScheduledServices = async (request, reply) => {
    const instance = new ScheduledService()

    reply.send(await instance.get())
}

const getScheduledServicesByCompany = async (request, reply) => {
    const { companyId } = request.query
    const instance = new ScheduledService(companyId)

    reply.send(await instance.getCompanyServices())
}

const postScheduledService = async (request, reply) => {
    const { scheduling } = request.body

    const valuesOfSchedulingEmpty = Object.values(scheduling)

    const empty = valuesOfSchedulingEmpty.includes("") || valuesOfSchedulingEmpty.includes(null)

    if (empty) {
        reply.code(400).send({ success: false, message: "Preencha todos os dados da API" })
        return
    }

    const instance = new ScheduledService()

    reply.send(await instance.post(scheduling))
}

const removeScheduledService = async (request, reply) => {
    const { id } = request.query

    const empty = ['', null, undefined].includes(id)

    if (empty) {
        reply.code(400).send({ success: false, message: "Preencha todos os dados da API" })
    }

    const instance = new ScheduledService()
    const dataRemove = await instance.remove(id)
    
    dataRemove == 1 ? reply.send({success: true, message: "Serviço removido com sucesso!"}) : reply.status(500).send({success: false, message: "Erro ao remover o serviço! Contate a equipe de suporte."})
}

const updateScheduledService = async (request, reply) => {
    const {id} = request.query
    
    const { scheduling } = request.body

    const valuesOfSchedulingEmpty = Object.values(scheduling)

    const empty = valuesOfSchedulingEmpty.includes("") || valuesOfSchedulingEmpty.includes(null)

    if (empty) {
        reply.code(400).send({ success: false, message: "Preencha todos os dados da API" })
        return
    }

    const instance = new ScheduledService()
    const dataUpdate = await instance.update(scheduling, id)
    
    dataUpdate[0] > 0 ? reply.send({success: true, message: "Serviço atualizado com sucesso!"}) : reply.status(500).send({success: false, message: "Erro ao atualizar o serviço! Contate a equipe de suporte."})
}

module.exports = {
    getAllScheduledServices,
    getScheduledServicesByCompany,
    postScheduledService,
    removeScheduledService,
    updateScheduledService
}