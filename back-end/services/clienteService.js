const {Cliente, Endereco, ServicoAgendado, sequelize} = require('../models');

const createClient = async (request, reply) => {
  const { cpf, nome, email, telefone, enderecos, senha } = request.body;

  console.log("Iniciando criação do cliente...");
  console.log("Dados recebidos:", { cpf, nome, email, telefone, enderecos, senha });

  if(!cpf || !nome || !email || !telefone || !enderecos || !senha) {
	reply.status(400).send({erro: 'Por favor, preencha todos os campos!'})
	return
  }
  const enderecosArray = Array.isArray(enderecos) ? enderecos : [enderecos];

  const transaction = await sequelize.transaction();

  try {
    const cliente = await Cliente.create(
      {cpf, nome, email, telefone, senha},
      {transaction}
    );

    const enderecosCriados = await Endereco.bulkCreate(
      enderecosArray.map((endereco) => ({
        entidadeId: cliente.cpf,
        entidadeTipo: "cliente",
        ...endereco,
      })),
      {transaction}
    );

    await transaction.commit();

    reply.status(201).send({
      sucesso: 'Usuário cadastrado' ,
      dados: {cliente, enderecos: enderecosCriados},
    });

  } catch (err) {
    await transaction.rollback();
    console.error("Erro ao criar cliente:", err.message, err.stack);
    reply.status(500).send({ erro: 'Falha ao cadastrar usuário.', details: err.message , stack: err.stack });
  }
}

const getClient = async (request, reply) => {
  const { email } = request.query;

  try {
    const cliente = await Cliente.findOne({
      where: { email: email },
      include: [
        {
          model: Endereco,
          as: 'enderecos', 
        }
      ]
    });

    console.log(cliente, 'cliente')

    if (cliente) {
      return reply.send(cliente);
    } else {
      return reply.status(404).send({ message: 'Cliente não encontrado' });
    }
  } catch (error) {
    console.error(error, 'erroooooooooooooooooooo buscar cliente');
    return reply.status(500).send({ message: 'Erro ao buscar cliente' });
  }
}

const getClientServices = async (request, reply) => {
  const { email } = request.params;

  try {
    const cliente = await Cliente.findOne({
      where: { email: email },
      include: [
        {
          model: ServicoAgendado,
          as: 'ServicoAgendado', // Inclui os serviços agendados
        }
      ]
    });

    if (cliente) {
      // Se o cliente for encontrado, retornamos apenas os serviços agendados
      const servicos = cliente.ServicoAgendado;
      if (servicos && servicos.length > 0) {
        return reply.send(servicos);
      } else {
        return reply.status(404).send({ message: 'Nenhum serviço agendado encontrado para este cliente' });
      }
    } else {
      return reply.status(404).send({ message: 'Cliente não encontrado' });
    }
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: 'Erro ao buscar serviços agendados do cliente' });
  }
};


module.exports = {
  createClient,
  getClient,
  getClientServices
};