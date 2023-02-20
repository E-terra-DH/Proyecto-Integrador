
const userController = {
    register: (req, res) => {
         res.render('./users/register');
    },
    login: (req, res) => {
     res.render('./users/login');
    },
    edit:(req,res)=>{
        //TODO:implementar
    },
    delete:(req,res)=>{
        //TODO:implementar

    }

};

module.exports = userController;