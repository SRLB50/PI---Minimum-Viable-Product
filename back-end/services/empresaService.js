const {Empresa, Endereco, sequelize} = require('../models');

const createCompany = async (request, reply) => {
  const { cnpj, nome, email, telefone, enderecos, senha } = request.body;

  console.log("Iniciando criação da empresa...");
  console.log("Dados recebidos:", { cnpj, nome, email, telefone, enderecos });

  if(!cnpj || !nome || !email || !telefone || !enderecos || !senha) {
    reply.status(400).send({erro: 'Por favor, preencha todos os campos!'})
    return
  }

  const transaction = await sequelize.transaction();

  try {
    const empresa = await Empresa.create(
      {cnpj, nome, email, telefone, senha},
      {transaction}
    );

    const enderecosCriados = await Endereco.bulkCreate(
      enderecos.map((endereco) => ({
        entidadeId: empresa.cnpj,
        entidadeTipo: "empresa",
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
    reply.status(500).send({ erro: 'Falha ao cadastrar empresa.', details: err})
  }
}

module.exports = {
  createCompany,
};