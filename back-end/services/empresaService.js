const models = require('../models');
const bcrypt = require("bcryptjs")

const createUsuario = async (request, reply) => {
  const { nome, email, password, data_nascimento } = request.body;
  try {
    if (![nome, email, password, data_nascimento].includes("")) {
      const senha = await bcrypt.hash(password, 8)

      console.log(nome + " " + email + " " + senha)
      const usuario = await models.Usuario.create({ nome, email, senha, data_nascimento });
      reply.send({message: 'usuário cadastrado com sucesso!', dados: usuario});
    } else {
      reply.status(400).send({ error: "Falta envio de dados" })
    }
  } catch (err) {

    reply.status(500).send({ error: 'Falha ao criar usuário', details: err.toString() });
  }
};

module.exports = {
  createUsuario
};
