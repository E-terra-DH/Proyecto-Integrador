const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize,DataTypes) =>{
    let alias = "User"
    let cols = {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type:DataTypes.STRING,
            allowNull: false,
        }, 
        surname: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatar:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_categories_id:{
            type: DataTypes.INTEGER,
            allowNull: true,

        },
       
    };
    let config ={
        tableName: "users",
        timestamps: false,
        underscored: true,
    }
    const User = sequelize.define(alias, cols,config);

    User.associate = function(models){
        User.belongsTo(models.UserCategory,{
            as: "userCategories",
            foreignKey: "userCategories_id"
        } )
    }    
    return User
}
