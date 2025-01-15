module.exports = (sequelize, DataTypes) => {
  const ServicoAgendado = sequelize.define("ServicoAgendado", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cliente_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Clientes",
        key: "cpf",
      },
    },
    servico_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Servicos",
        key: "id",
      },
    },
    empresa_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Empresas",
        key: "cnpj",
      },
    },
  });

  ServicoAgendado.associate = function(models) {
    ServicoAgendado.belongsTo(models.Cliente, { foreignKey: 'cliente_id' });
    ServicoAgendado.belongsTo(models.Servico, { foreignKey: 'servico_id' });
    ServicoAgendado.belongsTo(models.Empresa, { foreignKey: 'empresa_id' });
  }

  return ServicoAgendado;
};
