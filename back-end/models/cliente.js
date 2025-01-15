module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define("Cliente", {
    cpf: {
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

  Cliente.associate = function(models) {
    Cliente.hasMany(models.ServicoAgendado, { foreignKey: 'cliente_id' });
  }

  return Cliente;
};
