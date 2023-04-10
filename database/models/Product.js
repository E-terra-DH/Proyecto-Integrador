const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize,DataTypes) =>{
    let alias = "Product"
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type:DataTypes.STRING,
            allowNull: false,
        }, 
        price: {
            type:DataTypes.DECIMAL,
            allowNull: false,
        },
        description: {
            type:DataTypes.TEXT,
            allowNull: true,
        },
        image: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        stock:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        products_categories_id:{
            type: DataTypes.INTEGER,
            allowNull: true,

        },
       
    };
    let config ={
        tableName: "products",
        timestamps: false,
        underscored: true,

    }
    const Product = sequelize.define(alias, cols,config);

    Product.associate = function(models){
        Product.belongsTo(models.ProductCategory,{
            as: "productsCategories",
            foreignKey: "products_categories_id"
        } )
    }    
    return Product
  
}