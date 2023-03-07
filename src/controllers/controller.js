
const controller = {
    index: (req, res) => {
       res.render('./users/index');
    },
    login:(req,res)=>{
        res.render('auth/login',{
            title:'login'
        });
    },

    processLogin: (req, res) => {
        let users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));//lee el archivo JSON y lo convierte en array
        let user = users.find(user => user.Usuario == req.body.Usuario);

        if (user) {
            req.session.userLogged = user;
            if (req.body.remember) {
                res.cookie(
                    'userLogged',
                    user,
                    { maxAge: 120000 } // valor en milisigundos que va a guardar la cookie del lado del cliente 1 minuto
                )

            }
            res.redirect('/profile');
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        req.clearCookie('userLogged')
        return res.redirect('/');


    },
    profile: (req, res) => {
        res.render('users/profile', {
            title: 'Profile',
            user: req.session.userLogged
        })
    }
};

module.exports = controller;