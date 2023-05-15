const db = require('../../../database/models/Product');

const apiProductController = {}

//     list: (req,res) => {
//       //uso el modelo que quiero consultar
//         DB.Movie
//         .findAll()
//         .then (movies => {
//             return res.status.json({
//                 total: movies.length, 
//                 data: movies,
//                 status: 200 //si fue satisfactorio el req
//             })
//         })
    
//     },
//     show: (req,res) => {
//          DB.Movie
//         .findByPk(req.params.id)
//         .then (movie => {
//             return res.status(200).json({
//                 data: movie,
//                 status: 200 //si fue satisfactorio el req
//             })
//         })
//     },
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

module.exports = apiProductController;