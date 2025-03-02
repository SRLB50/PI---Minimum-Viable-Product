module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define("Cliente", {
    cpf: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      unique: true,
      validate: {
        is: {
          args: [/^\d{11}$/],
          msg: 'O CPF deve conter 11 dígitos numéricos',
        }
      }
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'O e-mail fornecido não é válido',
        },
      },
    },
    telefone: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        is: {
          args: [/^\d{10,11}$/],
          msg: 'Número de telefone inválido',
        }
      }
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCreate: async (cliente) => {
        if (cliente.senha) {
          const bcrypt = require('bcryptjs');
          cliente.senha = await bcrypt.hash(cliente.senha, 8);
        }
      },
      beforeUpdate: async (cliente) => {
        if (cliente.changed('senha')) {
          const bcrypt = require('bcryptjs');
          cliente.senha = await bcrypt.hash(cliente.senha, 8);
        }
      }
    }
  });

  Cliente.associate = function(models) {
    Cliente.hasMany(models.ServicoAgendado, { foreignKey: 'cliente_id' });
    Cliente.hasMany(models.Endereco, {
      foreignKey: "entidadeId",
      constraints: false,
      scope: {entidadeTipo: "cliente"},
      as: "enderecos"
    });
  };

  return Cliente;
};
