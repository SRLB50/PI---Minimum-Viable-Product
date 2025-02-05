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

// Rotas de serviços
fastify.get('/services', async(request, reply) => servico.getService(request, reply))
fastify.get('/services/user', async(request, reply) => servico.getServiceById(request, reply))
fastify.post('/services/create', async(request, reply) => servico.postService(request, reply))
fastify.delete('/services/remove', async(request, reply) => servico.removeService(request, reply))
fastify.put('/services/update', async(request, reply) => servico.updateService(request, reply))

fastify.get("/scheduledServices", async (request, reply) => servicoAgendado.getAllScheduledServices(request, reply))
fastify.get("/scheduledServices/company", async (request, reply) => servicoAgendado.getScheduledServicesByCompany(request, reply))
fastify.post("/scheduledServices/create", async (request, reply) => servicoAgendado.postScheduledService(request, reply))
fastify.delete("/scheduledServices/remove", async (request, reply) => servicoAgendado.removeScheduledService(request, reply))
fastify.put("/scheduledServices/update", async (request, reply) => servicoAgendado.updateScheduledService(request, reply))

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
