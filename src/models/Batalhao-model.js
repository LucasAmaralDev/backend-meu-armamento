const {Model, DataTypes} = require('sequelize');

class BatalhaoModel extends Model{
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
            tableName: 'batalhao',
            modelName: 'Batalhao',
            timestamps: false
        })
    }

    static associate(models){
        this.hasMany(models.Militar, {foreignKey: 'batalhao', as: 'militar'})
    }
}

module.exports = {BatalhaoModel};