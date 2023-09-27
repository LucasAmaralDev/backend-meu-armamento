const { Model, DataTypes } = require('sequelize');


class ArmeiroModel extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: true
            },
            registroMilitar: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            senha: {
                type: DataTypes.STRING,
                allowNull: false
            },
            fotoPerfil: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }, {
            sequelize,
            modelName: 'Armeiro',
            tableName: 'armeiro',
            timestamps: false
        });
    }

    static associate(models) {
        this.hasMany(models.Arma, { foreignKey: 'armeiro_id', as: 'arma' });
        this.hasMany(models.Militar, { foreignKey: 'armeiro_id', as: 'usuario' });
    }

}

module.exports = { ArmeiroModel };