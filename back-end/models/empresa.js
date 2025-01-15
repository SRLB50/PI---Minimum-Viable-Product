module.exports = (sequelize, DataTypes) => {
  const Empresa = sequelize.define("Empresa", {
    cnpj: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Empresa.associate = function(models) {
    Empresa.hasMany(models.Servico, { foreignKey: 'empresa_id' });
    Empresa.hasMany(models.ServicoAgendado, { foreignKey: 'empresa_id' });
  }

  return Empresa;
};
