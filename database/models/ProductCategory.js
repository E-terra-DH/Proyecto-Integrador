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
        tablename: "productcategories",
        timestamps: false,
        underscored: true,
    }
    const ProductCategory = sequelize.define(alias, cols,config);
   ProductCategory.associate = function(models){
        ProductCategory.hasMany(models.Product,{
            as: "products",
            foreignKey: "products_categories_id"
        } )
    }    
    return ProductCategory
  
}