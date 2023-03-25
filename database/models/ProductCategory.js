const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize,DataTypes) =>{
    let alias = "ProductCategory"
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
        //tabletName: "productsCategories",
        //timeStamps: true,
        underscored: true,
    }
    const ProductCategory = sequelize.define(alias, cols,config);
   ProductCategory.associate = function(models){
        ProductCategory.hasMany(models.Product,{
            as: "products",
            foreignKey: "productsCategories_id"
        } )
    }    
    return ProductCategory
  
}