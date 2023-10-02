const { Model, DataTypes } = require('sequelize');

class ArmaModel extends Model {

    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            numeroSerie: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            fabricante: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'fabricante',
                    key: 'id',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            },
            emUso: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
            ,
            modelo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            calibre: {
                type: DataTypes.STRING,
                allowNull: false
            },
            capacidadeCarregador: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            estadoConservacao: {
                type: DataTypes.STRING,
                allowNull: false
            },
            tipo: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'tipoArma',
                    key: 'id',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            },
            dataCadastro: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            anoFabricacao: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            armeiro_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'Arma',
            tableName: 'arma',
            timestamps: false
        });
    }

    static associate(models) {
        this.belongsTo(models.Armeiro, { foreignKey: 'armeiro_id', as: 'armeiro' });
        this.hasMany(models.Acautelamento, { foreignKey: 'arma_id', as: 'acautelamentos' });
        this.belongsTo(models.TipoArma, { foreignKey: 'tipo', as: 'tipoArma' });
        this.belongsTo(models.Fabricante, { foreignKey: 'fabricante', as: 'fabricanteArma' });
    }

}

module.exports = { ArmaModel };