const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize,DataTypes) =>{
    let alias = "UserCategory"
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
    };
    let config ={
        //tabletName: "usersCategories",
        //timeStamps: true,
        underscored: true,
    }
    const UserCategory = sequelize.define(alias, cols,config);

    UserCategory.associate = function(models){
        UserCategory.hasMany(models.User,{
            as: "users",
            foreignKey: "user_categories_id"
        } )
    }    

    return UserCategory
  
}