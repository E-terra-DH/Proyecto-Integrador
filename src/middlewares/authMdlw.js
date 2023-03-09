/*
Si el usuario esta loggeado llevelo al profile 
*/

const authMdlw = (req, res, next) => {
    if (req.session.userLogged)     {   //!req.cookies.userLogged)
             return res.redirect('/profile');
}
next();
};


module.exports = authMdlw;

