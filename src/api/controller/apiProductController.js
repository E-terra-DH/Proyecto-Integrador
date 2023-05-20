const DB = require('../../../database/models');

const apiProductController = {

     findAll: (req,res) => {
     //uso el modelo que quiero consultar
         DB.Product
         .findAll({
            atributes: [
                'id', 'name', 'description']
        })
         .then (Product => {
             return res.json({
                 total: Product.length, 
                 data: Product,
                 id: Product.id,
                 //status: 200, //si fue satisfactorio el req
                 detail: "http://localhost:3006/api/product/" + Product.id
             })
        })
    
     },
    show: (req,res) => {
         DB.Product
        .findByPk(req.params.id)
        .then (product => {
            return res.status(200).json({
                data: product,
                status: 200 //si fue satisfactorio el req
            })
        })
    },
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