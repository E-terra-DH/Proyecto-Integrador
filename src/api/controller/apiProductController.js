const DB = require('../../../database/models');

const apiProductController = {

     findAll: async (req,res) => {
     //uso el modelo que quiero consultar
        const products = await DB.Product
         .findAll({
            atributes: [
                'id', 'name', 'description']
        });
         res.json ({
                status: 200,
                total: products.length, 
                data: products.map(product => {
                    return {
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        detail: "http://localhost:3006/api/product/" + product.id
                    }
             })
        })
    
     },

     cat: async (req, res) => {
        try {
          const cat = await DB.ProductCategory.findByPk(req.params.id);
          
          if (!cat) {
            return res.status(404).json({ error: 'Category not found' });
          }
      
          const categoryData = {
            id: cat.id,
            name: cat.name,
            detail: `http://localhost:3006/api/product/categories/${cat.id}`
          };
          
          res.json(categoryData);
        } catch (error) {
          console.error('Error retrieving category:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      },
    
    last: async (req,res) => {
        //uso el modelo que quiero consultar
           const products = await DB.Product.findAll();
           const last = products[products.length -1];
           res.json({
            id: last.id,
            name: last.name,
            description: last.description,
            image: "http://localhost:3006/Images/" + last.image
           })
        },

    show: async (req,res) => {
        const product = await DB.Product
        .findByPk(req.params.id)
        res.json({
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            image: "http://localhost:3006/Images/" + product.image
        })
   
    }
//     store: (req,res) => {
//          DB.Movie
//         .create(req.body)
//         .then (movie => {
//             return res.status(200).json({
//                 data: movie,
//                 status: 200, //si fue satisfactorio el req
//                 created: 'ok'
//             })
//         })
//     },
//        delete: (req,res) => {
//          DB.Movie
//         .destroy({
//             where: {
//                id: req.params.id
//        }
//     })
//         .then (response => {
//             return res.json(response)
//             })
//     },
//      search: (req,res) => {
//          DB.Movie
//         .findAll({
//             where: {
//                 title: {[Op.like]: '%' + req.query.keyword + '%'};
//             }

//         })
//         .then (movies => {
//             if(movies.length > 0) {
//                 return res.status(200).json(movies);
//             }

//             return res.status(200).json('no existen peliculas');
//         })

//     },
// }
}

module.exports = apiProductController;