const {Model, DataTypes} = require('sequelize');

class FabricanteModel extends Model{
    
        static init(sequelize){
            super.init({
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
                nome: {
                    type: DataTypes.STRING(100),
                    allowNull: false
                }
            },{
                sequelize,
                tableName: 'fabricante',
                modelName: 'Fabricante',
                timestamps: false
            }
            )
        }
    
        static associate(models){
            this.hasMany(models.Arma, {foreignKey: 'fabricante', as: 'fabricante'})
        }
    
}

module.exports = {FabricanteModel};