const { Model, DataTypes } = require('sequelize');

class MilitarModel extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            registroMilitar: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            batalhao: {
                type: DataTypes.STRING,
                allowNull: false
            },
            dataCadastro: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            armeiro_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'Militar',
            tableName: 'militar',
            timestamps: false
        });
    }

    static associate(models) {
        this.belongsTo(models.Armeiro, { foreignKey: 'armeiro_id', as: 'armeiro' });
        this.hasMany(models.Acautelamento, { foreignKey: 'militar_id', as: 'acautelamentos' });
    }

}

module.exports = { MilitarModel };