const models = require('../models')

const createSintoma = async (request, reply) => {
  const { usuario_id, data, descricao } = request.body; 

  if(!descricao) {
	reply.status(400).send({erro: 'Campo descrição é obrigatório!'})
	return
  } else if(!data) {
	reply.status(400).send({erro: 'Campo data é obrigatório!'})
	return
  }

  try {
    const sintoma = await models.Sintomas.create({usuario_id, data, descricao})
    reply.send(sintoma)
  } catch (err) {
    reply.status(500).send({ erro: 'falha ao cadastrar sintoma.', details: err})
  }
}

const getSintomaByIdUser = async (request, reply) => {
	const { id } = request.params;
  
	try {
	  const sintomas = await models.Sintomas.findAll({
		where: { usuario_id: id } 
	  });
  
	  if (sintomas.length > 0) {
		reply.send(sintomas);
	  } else {
		reply.status(404).send({ erro: "Nenhum sintoma encontrado para o usuário especificado!" });
	  }
	} catch (err) {
	  reply.status(500).send({ erro: 'Erro ao obter sintomas.', details: err.message });
	}
  };

const  updateSintoma = async ( request, reply ) => {
	const { id } = request.params;
  	const { descricao } = request.body;

	if(!descricao) {
		reply.status(400).send({erro: 'Campo descrição é obrigatório!'})
		return
	}

	try {
		const sintoma = await models.Sintomas.findByPk(id)
		if(sintoma) {
			sintoma.descricao = descricao
			await sintoma.save()

			reply.send({message: 'Alteração realizada com sucesso!'})
		} else {
			reply.status(404).send({ erro: "nenhum sintoma encontrado!"})
		}
	} catch (err) {
		reply.status(500).send({ erro: 'Erro ao obter sintomas.', details: err})
	}
}

const deleteSintoma = async ( request, reply ) => {
	const { id } = request.params;

	try {
		const sintoma = await models.Sintomas.findByPk(id)
		if(sintoma) {
			await sintoma.destroy()

			reply.send({message: "sintoma deletado com sucesso!"})
		} else {
			reply.status(404).send({ erro: "Não foi possível deletar sintoma!"})
		}
	} catch (err) {
		reply.status(500).send({ erro: 'Erro ao deletar sintomas.', details: err})
	}
}

module.exports = {
  createSintoma,
  getSintomaByIdUser,
  updateSintoma,
  deleteSintoma,
};