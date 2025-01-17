const fastify = require('fastify')({ logger: true });
const Sequelize = require('sequelize');
const models = require('./models');
const clientService = require('./services/clienteService');
const empresaService = require('./services/empresaService');
const servico = require('./services/servicoService');
const servicoAgendado = require('./services/servicoAgendadoService');
const authService = require("./services/authService")

// sincronizar Database
models.sequelize.sync().then(() => {
  console.log('Database sincronizada');
}).catch(err => {
  console.error('Erro ao conectar no banco:', err);
});

// Rota para criar usuário
// fastify.post('/usuarios', usuarioService.createUsuario)

//Rota de login
// fastify.post('/login', authService.login)

// Roda o server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('porta 3000 está rodando http://localhost:3000');
  } catch (err) {
    console.log('deu ruim')
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
