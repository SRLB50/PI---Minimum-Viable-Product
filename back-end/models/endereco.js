module.exports = (sequelize, DataTypes) => {
  const Endereco = sequelize.define('Endereco' , {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      entidadeId: {
        type: DataTypes.STRING,
        allowNull: false,          
      },
      entidadeTipo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['cliente', 'empresa']],
            msg: 'Tipo de entidade inválido'
          }
        }
      },
      cep: {
          type: DataTypes.STRING(9),
          allowNull: false,
          validate: {
              is: {
                args: [/^\d{8}$/],
                msg: 'CEP inválido',
              },
          },
      },
      endereco: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      numero: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      complemento: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      cidade: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      estado: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              isIn: {
                args: [[
                  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
                  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
                  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
                ]],
                msg: 'UF inválida. Insira uma sigla válida (ex: SP, RJ, MG).',
              },
          },        
      },
  });

  Endereco.associate = function(models) {
      Endereco.belongsTo(models.Cliente, { 
        foreignKey: 'entidadeId',
        targetKey: 'cpf',
        constraints: false,
        as: 'cliente',       
      });

      Endereco.belongsTo(models.Empresa, { 
        foreignKey: 'entidadeId',
        targetKey: 'cnpj',
        constraints: false,
        as: 'empresa',       
      });
  }

  return Endereco;
}