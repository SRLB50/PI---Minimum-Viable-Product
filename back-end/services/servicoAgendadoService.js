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
