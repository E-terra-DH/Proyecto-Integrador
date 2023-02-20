
const userController = {
    register: (req, res) => {
         res.render('./users/register');
    },
    login: (req, res) => {
     res.render('./users/login');
    },

    edit:(req,res)=>{
        let idUser = req.params.idUser;

        req.send(idUser);
    },
    list: (req,res) => {

    },
    
    update: (req, res) => {
         //TODO:implementar
    },

    delete:(req,res)=>{
        //TODO:implementar

    },
    destroy: (req, res) => {
        //TODO:implementar
    },
//   list: (req, res) => {
//        let users = [
//
//        ]
//   }
};

module.exports = userController;