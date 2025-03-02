const {Cliente, Endereco, sequelize} = require('../models');

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


module.exports = {
  createClient,
};