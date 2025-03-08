const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Empresa, Cliente } = require("../models");

const secret = "seu_segredo_secreto"; // Coloque isso no .env

async function autenticarUsuario(email, senha) {
	let usuario = await Empresa.findOne({ where: { email } });
	let isCompany = true;
	if (!usuario) {
		usuario = await Cliente.findOne({ where: { email } });
		isCompany = false;
		if (!usuario) {
			throw new Error("Usuário não encontrado");
		}
	}

	const senhaValida = await bcrypt.compare(senha, usuario.senha);
	if (!senhaValida) {
		throw new Error("Senha incorreta");
	}

	const token = jwt.sign(
		{
			id: usuario.cnpj || usuario.cpf,
			tipo: usuario.cnpj ? "empresa" : "cliente",
		},
		secret,
		{ expiresIn: "1h" }
	);

	return { usuario, isCompany, token, userKey: usuario.cnpj || usuario.cpf };
}

async function login(req, res) {
	try {
		const { email, senha } = req.body;
		if (!email || !senha) {
			return res
				.status(400)
				.send({ error: "E-mail e senha são obrigatórios" });
		}

		const { usuario, isCompany, token, userKey } = await autenticarUsuario(email, senha);

		return res.send({ usuario: { nome: usuario.nome, email: usuario.email, empresa: isCompany, userKey:userKey }, token });
	} catch (error) {
		return res
			.status(401)
			.send({ error: "Unauthorized", message: error.message });
	}
}

module.exports = { autenticarUsuario, login };
