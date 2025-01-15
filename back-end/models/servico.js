module.exports = (sequelize, DataTypes) => {
  const Servico = sequelize.define('Servico', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    empresa_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Empresas',
        key: 'cnpj',
      },
    },
  });

  Servico.associate = function(models) {
    Servico.belongsTo(models.Empresa, { foreignKey: 'empresa_id' })
    Servico.hasMany(models.ServicoAgendado, { foreignKey: 'servico_id' });
  }

  return Servico;
};
