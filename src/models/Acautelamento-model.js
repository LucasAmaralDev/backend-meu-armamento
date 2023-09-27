const { Model, DataTypes } = require('sequelize');

class AcautelamentoModel extends Model {

    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            dataAcautelamento: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            dataDevolucao: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            militar_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            arma_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            armeiro_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        }, {
            sequelize,
            modelName: 'Acautelamento',
            tableName: 'acautelamento',
            timestamps: false
        });
    }

    static associate(models) {
        this.belongsTo(models.Arma, { foreignKey: 'arma_id', as: 'arma' });
        this.belongsTo(models.Militar, { foreignKey: 'militar_id', as: 'militar' });
        this.belongsTo(models.Armeiro, { foreignKey: 'armeiro_id', as: 'armeiro' });
    }


}

module.exports = { AcautelamentoModel };