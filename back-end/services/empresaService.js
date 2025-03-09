const {Empresa, Endereco, ServicoAgendado, sequelize} = require('../models');

const createCompany = async (request, reply) => {
  const { cnpj, nome, email, telefone, enderecos, senha } = request.body;

  console.log("Iniciando criação da empresa...");
  console.log("Dados recebidos:", { cnpj, nome, email, telefone, enderecos });

  if(!cnpj || !nome || !email || !telefone || !enderecos || !senha) {
    reply.status(400).send({erro: 'Por favor, preencha todos os campos!'})
    return
  }

  const enderecosArray = Array.isArray(enderecos) ? enderecos : [enderecos];

  const transaction = await sequelize.transaction();

  try {
    const empresa = await Empresa.create(
      {cnpj, nome, email, telefone, senha},
      {transaction}
    );

    const enderecosCriados = await Endereco.bulkCreate(
      enderecosArray.map((endereco) => ({
        entidadeId: empresa.cnpj,
        entidadeTipo: "empresa",
        estado: endereco.estado.toUpperCase(),
        ...endereco,
      })),
      {
        transaction,
        validate: true
      }
    );

    await transaction.commit();

    reply.status(201).send({
      sucesso: 'Empresa cadastrada',
      dados: {empresa, enderecos: enderecosCriados},
    });

  } catch (err) {
    await transaction.rollback();
    console.error("Erro ao criar empresa:", err);
    reply.status(500).send({ erro: 'Falha ao cadastrar empresa.', details: err.message , stack: err.stack})
  }
}

const getCompanyData = async (request, reply) => {
  const { email } = request.query;

  try {
    const empresa = await Empresa.findOne({
      where: { email: email }, // Buscando a empresa pelo email
      include: [
        {
          model: Endereco,
          as: 'enderecos', // Inclui os endereços da empresa
        }
      ]
    });

    if (empresa) {
      // Se a empresa for encontrada, retornamos os dados completos
      return reply.send(empresa);
    } else {
      return reply.status(404).send({ message: 'Empresa não encontrada' });
    }
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: 'Erro ao buscar dados da empresa' });
  }
};

const getCompanyServices = async (request, reply) => {
  const { email } = request.params;

  try {
    const empresa = await Empresa.findOne({
      where: { email: email }, // Buscando a empresa pelo email
      include: [
        {
          model: ServicoAgendado,
          as: 'ServicoAgendado', // Inclui os serviços agendados da empresa
        }
      ]
    });

    if (empresa) {
      // Se a empresa for encontrada, retornamos apenas os serviços agendados
      const servicos = empresa.ServicoAgendado;
      if (servicos && servicos.length > 0) {
        return reply.send(servicos);
      } else {
        return reply.status(404).send({ message: 'Nenhum serviço agendado encontrado para esta empresa' });
      }
    } else {
      return reply.status(404).send({ message: 'Empresa não encontrada' });
    }
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: 'Erro ao buscar serviços agendados da empresa' });
  }
};

module.exports = {
  createCompany,
  getCompanyData,
  getCompanyServices
};