/*
Si el usuario esta loggeado llevelo al profile 
*/

const authMdlw = (req, res, next) => {
    if (req.session && req.session.userLogged) {   //!req.cookies.userLogged)
        console.log(req.session);
        return res.redirect('/profile');
}
next();
};


module.exports = authMdlw;

