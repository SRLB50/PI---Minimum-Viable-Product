module.exports = (sequelize, DataTypes) => {
  const Empresa = sequelize.define("Empresa", {
    cnpj: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      unique: true,
      validate: {
        is: {
          args: [/^\d{14}$/],
          msg: 'O CNPJ deve conter 14 dígitos numéricos',
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
          args: [/^\(\d{2}\)\d{4,5}-\d{4}$/],
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
      beforeCreate: async (empresa) => {
        if (empresa.senha) {
          const bcrypt = require('bcryptjs');
          empresa.senha = await bcrypt.hash(empresa.senha, 8);
        }
      },
      beforeUpdate: async (empresa) => {
        if (empresa.changed('senha')) {
          const bcrypt = require('bcryptjs');
          empresa.senha = await bcrypt.hash(empresa.senha, 8);
        }
      }
    }
  });

  Empresa.associate = function(models) {
    Empresa.hasMany(models.Servico, { foreignKey: 'empresa_id' });
    Empresa.hasMany(models.ServicoAgendado, { foreignKey: 'empresa_id' });
    Empresa.hasMany(models.Endereco, {
      foreignKey: "entidadeId",
      constraints: false,
      scope: {entidadeTipo: "empresa"},
      as: "enderecos"
    });
  };

  return Empresa;
};