const {Model, DataTypes} = require('sequelize');

class TipoArmaModel extends Model{

    static init(sequelize){
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            tipo: {
                type: DataTypes.STRING(100),
                allowNull: false
            }
        },{
            sequelize,
            tableName: 'tipoArma',
            modelName: 'TipoArma',
            timestamps: false
        }
        )
    }

    static associate(models){
        this.hasMany(models.Arma, {foreignKey: 'tipo', as: 'tipoArma'})
    }

}

module.exports = {TipoArmaModel};